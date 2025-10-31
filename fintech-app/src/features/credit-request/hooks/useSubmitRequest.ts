import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { uploadKyc } from "@/features/auth/services/kycService";
import { amlVerification } from "../services/amlService";
import { createRequest, finishRequest, getDraftRequestData, updateRequest } from "../services/requestService";
import { uploadAnnualFinancials, uploadTaxReturn } from "../services/documentsService";
import { signCreditRequest } from "../services/signatureService";
import { requestFormSchema } from "../schemas/RequestFormsSchema";
import { normalizeRequestData } from "../utils/normalizers";
import { parseRiskLevel } from "../utils/parsers";
import z from "zod";
import type { FormEvent } from "react";
import type { RequestFormsData } from "../types";
import { useAuth } from "@/hooks/useAuth";
import type { LoadingMsgState } from "@/types";
import { getPymeByAuthId } from "@/features/auth/services/pymeService";

interface UseSubmitRequestProps {
  formData: RequestFormsData
  setLoading: (l: LoadingMsgState) => void
  setError: (e: string) => void
  setValidationErrors: (errors: Record<string, string>) => void
}

export const useSubmitRequest = ({ formData, setLoading, setError, setValidationErrors }: UseSubmitRequestProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading({ active: true, message: "Procesando datos de tu solicitud." });
    setValidationErrors({});

    const result = requestFormSchema.safeParse(formData);
    if (!result.success) {
      const flattened = z.flattenError(result.error);
      const fieldErrors: Record<string, string> = {};

      for (const [key, msgs] of Object.entries(flattened.fieldErrors)) {
        if (msgs && msgs.length > 0) fieldErrors[key] = msgs.join("\n");
      }

      setValidationErrors(fieldErrors);
      setLoading({ active: false, message: "" });
      return;
    }

    try {
      const token = Cookies.get("token");
      if (!token) throw new Error("No hay token disponible");

      // 1-Validación KYC
      setLoading({ active: true, message: "Validando tu Identidad" });

      const kycRes = await uploadKyc({
        nationalIdNumber: formData.beneficiary.dni,
        ...formData.kycData
      }, token);

      if (kycRes.verified) {
        setError(kycRes.observation);
        return;
      }

      // 2-Validación AML
      setLoading({ active: true, message: "Validando fiabilidad" });
      const amlRes = await amlVerification(token);

      if (amlRes?.riskLevel) {
        setLoading({ active: true, message: `Nivel de riesgo: ${amlRes.riskLevel}` });
        await new Promise(resolve => setTimeout(resolve, 2500));
      }
      const parsedRiskLevel = parseRiskLevel(amlRes.riskLevel);

      // 3- Crear solicitud de crédito (PUT)
      let creditFormId: string;
      
      setLoading({ active: true, message: "Verificando borrador" });
      const requestData = await getDraftRequestData(token);
      const pymeData = await getPymeByAuthId(token);
      
      if (!pymeData?.pymeId) throw new Error("El usuario no ha cargado los datos de su empresa");

      const normalized = normalizeRequestData(formData.creditData, parsedRiskLevel);
      
      if (requestData?.id) {
        creditFormId = requestData.id;
      } else {
        setLoading({ active: true, message: "Creando solicitud" });
        const { id } = await createRequest(normalized, pymeData.pymeId, token);
        creditFormId = id;
      }

      setLoading({ active: true, message: "Cargando datos" });
      await updateRequest(normalized, creditFormId, token);


      setLoading({ active: true, message: "Cargando documentos" });
      if (formData.documents.annualFinancials) 
        await uploadAnnualFinancials(token, creditFormId, formData.documents.annualFinancials);
      if (formData.documents.taxReturn) 
        await uploadTaxReturn(token, creditFormId, formData.documents.taxReturn);


      setLoading({ active: true, message: "Habilitando tu solicitud" });
      await finishRequest(normalized, creditFormId, token);

      // 4- Firma con PDF
      setLoading({ active: true, message: "Firmando tu solicitud" });
      if (!user?.id) throw new Error("Usuario no encontrado");
      await signCreditRequest(token, creditFormId, user.id);

      // Recibido en PymeHome.tsx
      navigate(ROUTES.DASHBOARD.PYME.OVERVIEW, { state: { requestSuccess: true } });

    } catch (err) {
      console.error(err);
      setLoading({ active: true, message: "Error en el proceso" });
      await new Promise(res => setTimeout(res, 2500));
    } finally {
      setLoading({ active: false, message: "" });
    }
  };

  return { handleSubmit };
}

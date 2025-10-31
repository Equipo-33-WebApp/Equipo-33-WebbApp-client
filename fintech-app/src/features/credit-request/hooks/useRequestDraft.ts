import Cookies from "js-cookie";
import { createRequest, getDraftRequestData, updateRequest } from "../services/requestService";
import { uploadAnnualFinancials, uploadTaxReturn } from "../services/documentsService";
import { normalizeRequestData } from "../utils/normalizers";
import type { RequestFormsData } from "../types";
import type { LoadingMsgState } from "@/types";
import { getPymeByAuthId } from "@/features/auth/services/pymeService";

interface UseRequestDraftProps {
  formData: RequestFormsData
  setLoading: (l: LoadingMsgState) => void
  setError: (e: string) => void
  setValidationErrors: (errors: Record<string, string>) => void
}

export const useRequestDraft = ({ formData, setLoading, setError, setValidationErrors }: UseRequestDraftProps) => {
  const saveDraft = async () => {
    setError("");
    setValidationErrors({});
    setLoading({ active: true, message: "Guardando borrador" });
    await new Promise(resolve => setTimeout(resolve, 2500));

    try {
      const token = Cookies.get("token");
      if (!token) return;

      let creditFormId: string;

      const requestData = await getDraftRequestData(token);
      const pymeData = await getPymeByAuthId(token);

      if (!pymeData?.pymeId) throw new Error("El usuario no ha cargado los datos de su empresa");
      const normalizedRequestData = normalizeRequestData(formData.creditData);

      if (requestData?.id) {
        creditFormId = requestData.id;
      } else {
        const { id } = await createRequest(normalizedRequestData, pymeData.pymeId, token);
        creditFormId = id;
      }

      await updateRequest(normalizedRequestData, creditFormId, token);

      if (formData.documents.annualFinancials) {
        await uploadAnnualFinancials(token, creditFormId, formData.documents.annualFinancials)
      }

      if (formData.documents.taxReturn) {
        await uploadTaxReturn(token, creditFormId, formData.documents.taxReturn)
      }


      setLoading({ active: true, message: "Borrador guardado ✅" });
      await new Promise(resolve => setTimeout(resolve, 2500));
    } catch (err) {
      console.error("Error al guardar borrador:", err);
      setLoading({ active: true, message: "Error al guardar borrador" })
      await new Promise(resolve => setTimeout(resolve, 2500));
    } finally {
      setLoading({ active: false, message: "" });
    }
  };

  return { saveDraft };
}

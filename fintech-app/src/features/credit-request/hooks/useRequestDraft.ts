import Cookies from "js-cookie";
import { createRequest, getCurrentUserDraftRequestIdAndPymeId, updateRequest } from "../services/requestService";
import { uploadAnnualFinancials, uploadTaxReturn } from "../services/documentsService";
import { normalizeRequestData } from "../utils/normalizers";
import type { RequestFormsData } from "../types";
import type { LoadingMsgState } from "@/types";

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

      // Endpoints de borrador
      const { creditFormId, pymeId } = await getCurrentUserDraftRequestIdAndPymeId(token);
      if (!pymeId) throw new Error("Este usuario no ha completado la información de su pyme");

      if (!creditFormId) {
        await createRequest(pymeId, token);
      }

      const normalizedRequestData = normalizeRequestData(formData.creditData);

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

import { useEffect, useMemo, useState, type ReactNode } from "react";
import type { RequestFormsData } from "../types";
import { RequestContext } from "./requestContext";
import { requestSteps } from "@/constants/steps";
import type { LoadingMsgState } from "@/types";
import { useSubmitRequest } from "../hooks/useSubmitRequest";
import { useRequestDraft } from "../hooks/useRequestDraft";
import Cookies from "js-cookie";
import { getDraftRequestData } from "../services/requestService";

export const RequestProvider = ({ children }: { children: ReactNode }) => {
  const [step, setStep] = useState(0);
  const nextStep = () => setStep(prev => Math.min(prev + 1, requestSteps.length));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 0));

  const [loading, setLoading] = useState<LoadingMsgState>({
    active: false,
    message: "",
  });
  const [error, setError] = useState<string>("");
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<RequestFormsData>({
    creditData: {
      amount: 0,
      termInMonths: 6,
      annualIncome: 0,
      netIncome: 0,
      creditDestination: "Capital de Trabajo",
    },
    documents: {
      annualFinancials: null,
      taxReturn: null,
    },
    beneficiary: {
      dni: "",
    },
    kycData: {
      idDocumentFront: null,
      faceSelfie: null
    },
    declarations: {
      pep: false,
      fatca: false,
      illicit: false,
      veracity: false,
      terms: false,
      signature: false
    },
  });

  const hooksProps = { formData, setLoading, setError, setValidationErrors }

  const { saveDraft } = useRequestDraft(hooksProps);
  const { handleSubmit } = useSubmitRequest(hooksProps);

  useEffect(() => {
    const loadFormData = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) return;

        const data = await getDraftRequestData(token);
        if (!data) return;

        setFormData(prev => ({
          ...prev,
          creditData: {
            amount: data.amount ?? 0,
            termInMonths: data.termInMonths ?? 6,
            annualIncome: data.annualIncome ?? 0,
            netIncome: data.netIncome ?? 0,
            creditDestination: data.creditDestination ?? "Capital de Trabajo",
          }
        }));
      } catch (err) {
        console.error("Error cargando form data:", err);
      }
    };

    loadFormData();
  }, []);


  const updateForm = <K extends keyof RequestFormsData>(
    section: K,
    field: keyof RequestFormsData[K],
    value: RequestFormsData[K][keyof RequestFormsData[K]]
  ) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const isCreditDataComplete = useMemo(() =>
    formData.creditData.amount > 0 &&
    !!formData.creditData.termInMonths &&
    formData.creditData.annualIncome > 0 &&
    formData.creditData.netIncome > 0 &&
    !!formData.creditData.creditDestination
    , [formData.creditData]);

  const isDocumentsComplete = useMemo(() =>
    !!formData.documents.annualFinancials && !!formData.documents.taxReturn
    , [formData.documents]);

  const isKycComplete = useMemo(() =>
    !!formData.beneficiary.dni &&
    !!formData.kycData.idDocumentFront &&
    !!formData.kycData.faceSelfie
    , [formData.beneficiary, formData.kycData]);

  const isDeclarationsComplete = useMemo(() =>
    formData.declarations.pep &&
    formData.declarations.fatca &&
    formData.declarations.illicit &&
    formData.declarations.veracity
    , [formData.declarations]);

  const isFinalConsentComplete = useMemo(() =>
    formData.declarations.terms && formData.declarations.signature
    , [formData.declarations]);

  const isAllCompleted = useMemo(() =>
    isCreditDataComplete &&
    isDocumentsComplete &&
    isKycComplete &&
    isDeclarationsComplete &&
    isFinalConsentComplete
    , [
      isCreditDataComplete,
      isDocumentsComplete,
      isKycComplete,
      isDeclarationsComplete,
      isFinalConsentComplete
    ]);

  return (
    <RequestContext.Provider
      value={{
        formData,
        updateForm,
        step,
        nextStep,
        prevStep,
        setStep,
        isCreditDataComplete,
        isDocumentsComplete,
        isKycComplete,
        isDeclarationsComplete,
        isFinalConsentComplete,
        isAllCompleted,
        handleSubmit,
        loading,
        validationErrors,
        error,
        saveDraft
      }}
    >
      {children}
    </RequestContext.Provider>
  );
}

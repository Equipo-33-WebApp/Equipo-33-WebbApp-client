import { createContext, type FormEvent } from "react";
import type { RequestFormsData } from "../types";
import type { LoadingMsgState } from "@/types";

interface RequestContextType {
  formData: RequestFormsData
  updateForm: <K extends keyof RequestFormsData>(
    section: K,
    field: keyof RequestFormsData[K],
    value: RequestFormsData[K][keyof RequestFormsData[K]]
  ) => void
  step: number
  nextStep: () => void
  prevStep: () => void
  setStep: (s: number) => void
  isCreditDataComplete: boolean
  isDocumentsComplete: boolean
  isKycComplete: boolean
  isDeclarationsComplete: boolean
  isFinalConsentComplete: boolean
  isAllCompleted: boolean
  handleSubmit: (e: FormEvent) => void
  loading: LoadingMsgState
  validationErrors: Record<string, string>
  error: string,
  saveDraft: () => void
}

export const RequestContext = createContext<RequestContextType | null>(null);
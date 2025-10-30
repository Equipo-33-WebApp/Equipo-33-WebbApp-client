import type { CreditData, UpdateCreditRequestBody } from "../types"

export const normalizeRequestData = (data: CreditData, riskLevel?: string | null): UpdateCreditRequestBody => {
  const normalizedData = {
    amount: data.amount | 0,
    termInMonths: data.termInMonths | 6,
    annualIncome: data.annualIncome | 0,
    netIncome: data.netIncome | 0,
    creditDestination: data.creditDestination || "Capital de Trabajo",
    riskLevel: riskLevel || "High",
    status: "Draft"
  }

  return normalizedData
}
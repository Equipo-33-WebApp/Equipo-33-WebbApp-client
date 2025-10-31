export interface RequestData {
    id: string
    amount: number
    termInMonths: number
    annualIncome: number
    netIncome: number
    creditDestination: string
    riskLevel: string
    purpose: string
    status: string
    updatedAt: string
    pymeId: string
    companyName: string
    sector: string
}

export interface LoadingMsgState {
  active: boolean
  message?: string
}
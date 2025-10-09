export interface DashboardMenuItem {
    id: string,
    label: string,
    to: string,
    icon: React.ElementType
}

interface DashboardAccountDataFormBase {
  firstName: string
  lastName: string
  email: string
  avatar: string
}

export interface DashboardPymeAccountDataForm
  extends DashboardAccountDataFormBase {
  businessType: string
}

export interface DashboardOperatorAccountDataForm
  extends DashboardAccountDataFormBase {
  operatorNumber: number
}

export interface DashboardRequestSummaryData {
    total: number
    approved: number
    pending: number
    rejected: number
}
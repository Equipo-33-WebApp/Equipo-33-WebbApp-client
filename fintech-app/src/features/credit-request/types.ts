export interface RequestFormsData {
  creditData: CreditData
  documents: RequestDocs
  beneficiary: RequestBeneficiary
  kycData: RequestKycData
  declarations: RequestDeclarations
}

export interface CreditData {
  amount: number
  termInMonths: number
  annualIncome: number
  netIncome: number
  creditDestination: string
}

export interface RequestDocs {
  annualFinancials: File | null
  taxReturn: File | null
}

export interface RequestBeneficiary {
  dni: string
}

export interface RequestKycData {
  idDocumentFront: File | null
  faceSelfie: File | null
}

export interface RequestDeclarations {
  pep: boolean
  fatca: boolean
  illicit: boolean
  veracity: boolean
  terms: boolean
  signature: boolean
}

export interface DeclarationItem<K extends keyof RequestDeclarations> {
  title: string;
  desc: string;
  value: K;
}

export interface AmlResponse {
  id: string
  riskLevel: string
  flags: string[]
  resultSummary: string
  requiresManualReview: boolean
  createdAt: string
}

export interface Document {
  id: string
  creditFormId: string
  fileUrl: string
  // example: "https://plcvrcrltiynybkgesly.supabase.co/storage/v1/object/public/credit-documents/af8dba72-79aa-4cef-8d3b-efeabfab215e/annualFinancials/estados-financieros-2025.pdf"
  createdAt: string
}

export interface CreateCreditRequestResponse {
  userId: string
  pymeId: string
  amount: number
  termInMonths: number
  annualIncome: number
  netIncome: number
  creditDestination: string
  riskLevel: string
  status: string
  createdAt: string
  updatedAt: string | null
  uploadedDocuments: Document[]
  id: string
}

export interface UpdateCreditRequestBody {
  amount: number
  termInMonths: number
  annualIncome: number
  netIncome: number
  creditDestination: string
  riskLevel: string
  status: string
}

export interface UpdateCreditRequestResponse {
  userId: string
  pymeId: string
  amount: number
  termInMonths: number
  annualIncome: number
  netIncome: number
  creditDestination: string
  riskLevel: string
  status: string
  createdAt: string
  updatedAt: string
  uploadedDocuments: Document[]
  id: string
}

export interface UploadDocumentResponse {
  message: string
  filePath: string
  url: string
}
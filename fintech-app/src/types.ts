export interface RequestData {
  id: string;
  pymeId: string;
  companyName: string;
  amount: number;
  purpose: string;
  creditDestination: string;
  annualIncome: number;
  netIncome: number;
  termInMonths: number;
  status: string;
  riskLevel: string;
  sector: string;
  createdAt: string;
  updatedAt: string;
  uploadedDocuments: Array<{
    id: string;
    fileUrl: string;
  }>;
}

export interface UserProfile {
  name: string;
  email: string;
  company: string;
  role: string;
}

export interface RequestDeclarations {
  pep: boolean;
  fatca: boolean;
  illicit: boolean;
  veracity: boolean;
  terms: boolean;
  signature: boolean;
}


export interface AmlCheck {
  id: string;
  riskLevel: string;
  flags: string[];
  resultSummary: string;
  requiresManualReview: boolean;
  createdAt: string;
}

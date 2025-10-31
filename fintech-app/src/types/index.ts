export interface RequestData {
    id: string;
    amount: number;
    termInMonths: number;
    annualIncome: number;
    netIncome: number;
    creditDestination: string;
    riskLevel: string;
    purpose: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    pymeId: string;
    companyName: string;
    sector: string;
    uploadedDocuments?: Array<{ 
        id: string; 
        fileUrl: string; 
    }>;
}

export interface LoadingMsgState {
  active: boolean;
  message?: string;
}

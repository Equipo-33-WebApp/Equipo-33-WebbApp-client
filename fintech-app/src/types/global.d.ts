type UserRole = "PYME" | "OPERATOR" ;

interface User {
  id: string;
  firstName: string;
  lastName: string
  email: string;
  role: UserRole;
  createdAt: string;
  pymeData?: PymeUserData | null;
}

interface PymeUserData {
  companyName: string;
  address: string;
  sector: string;
  employees: number;
  phone: string;
  hasKycValidated: boolean;
  pymeId: string
}

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

interface ApiError {
  status: number;
  message: string;
  details?: unknown;
}
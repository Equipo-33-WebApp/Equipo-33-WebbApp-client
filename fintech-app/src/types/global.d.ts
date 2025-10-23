// Tipos globales sujetos a cambios según el progreso del backend

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
}

// interface User {
//   id: number;
//   firstName: string;
//   lastName: string;
//   email: string;
//   role: UserRole;
//   avatar?: string;
//   createdAt?: string;
//   phone?: string;
//   pymeData?: PymeUserData
// }

// interface PymeUserData {
//   companyName?: string;
//   address?: string;
//   sector?: string;
//   employees?: number;
//   hasKycValidated: boolean;
//   hasCompleteInfo: boolean;
// }

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
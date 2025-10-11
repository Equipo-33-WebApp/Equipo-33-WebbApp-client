// Tipos globales sujetos a cambios según el progreso del backend

type UserRole = "pyme" | "operator" ;

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  avatar?: string;
  businessType: string;

  // Nuevos campos
  phone?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
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
// Tipos globales sujetos a cambios según el progreso del backend

type UserRole = "pyme" | "operator" ;

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  token?: string;
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
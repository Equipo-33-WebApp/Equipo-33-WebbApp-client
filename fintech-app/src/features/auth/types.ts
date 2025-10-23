export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  token: string;
}

export interface UserRegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface UserUpdateData {
  firstName: string;
  lastName: string;
}

export interface PymeRegisterData {
  companyName: string;
  address: string;
  sector: string;
  employees: number;
  phone: string;
}

export interface KycValidationData {
  nationalIdNumber: string;
  idDocumentFront: File | null;
  faceSelfie: File | null;
}

export interface KycResponse {
  verified: boolean;
  percentage: string;
  observation: string;
}

export interface RegisterResponse {
  userId: string;
}

export interface PymeRegisterResponse {
  authId: string;
  companyName: string;
  address: string;
  sector: string;
  employees: number;
  phone: string;
  createdAt: string;
  hasKycValidated: boolean;
  id: string;
}
import { createContext } from "react";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  hasPymeData: boolean;
  hasKyc: boolean;
  isFullyRegistered: boolean;
  login: (token: string, user: User, fromRegister?: boolean) => void;
  updateUserPyme: (pymeData: PymeUserData | null) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
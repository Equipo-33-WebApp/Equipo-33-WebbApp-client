import { createContext } from "react";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (role?: UserRole) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
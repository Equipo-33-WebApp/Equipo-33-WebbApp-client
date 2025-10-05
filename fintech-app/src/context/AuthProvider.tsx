import { useState, useCallback, useEffect } from "react";
import type { ReactNode } from "react";
import { ROLE_PYME } from "@/constants/roles";
import { AuthContext } from "./authContext";
import { useNavigate } from "react-router-dom";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => !!user);

  useEffect(() => {
    localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  const navigate = useNavigate();

  const login = useCallback(
    (mockRole: UserRole = ROLE_PYME) => {
      const mockUser: User = {
        id: "1",
        name: "Armando Casas",
        email: "armin@example.com",
        role: mockRole,
      };

      setUser(mockUser);
      setIsAuthenticated(true);

      localStorage.setItem("user", JSON.stringify(mockUser));
      localStorage.setItem("isAuthenticated", "true");

      navigate("/dashboard");
    },
    [navigate]
  );

  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
    navigate("/");
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

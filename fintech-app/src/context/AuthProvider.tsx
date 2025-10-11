import { useState, useCallback, useEffect } from "react";
import type { ReactNode } from "react";
import { ROLE_PYME } from "@/constants/roles";
import { AuthContext } from "./authContext";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

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
    (token: string, user: User) => {
      const mockUser: User = {
        id: user.id || 1,
        firstName: user.firstName || "Javier",
        lastName: user.lastName || "López",
        email: user.email || "javi64@example.com",
        avatar: user.avatar || "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200",
        businessType: user.businessType || "Comercial",
        role: "pyme",
      };

      setUser(mockUser);
      setIsAuthenticated(true);

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(mockUser));
      localStorage.setItem("isAuthenticated", "true");

      if (mockUser?.role === ROLE_PYME)
        navigate(ROUTES.DASHBOARD.PYME.OVERVIEW)
      else
        navigate(ROUTES.DASHBOARD.OPERATOR.OVERVIEW)
    },
    [navigate]
  );

  const testLogin = useCallback(
    (mockRole: UserRole = ROLE_PYME) => {
      const mockUser: User = {
        id: 1,
        firstName: "Javier",
        lastName: "López",
        email: "javi64@example.com",
        avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200",
        businessType: "Comercial",
        role: mockRole,
      };

      setUser(mockUser);
      setIsAuthenticated(true);

      localStorage.setItem("user", JSON.stringify(mockUser));
      localStorage.setItem("isAuthenticated", "true");

      if (mockUser?.role === ROLE_PYME)
        navigate(ROUTES.DASHBOARD.PYME.OVERVIEW)
      else
        navigate(ROUTES.DASHBOARD.OPERATOR.OVERVIEW)
    },
    [navigate]
  );

  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("isAuthenticated");
    navigate(ROUTES.BASE);
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, testLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

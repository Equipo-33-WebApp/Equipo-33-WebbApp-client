import { useState, useCallback, useEffect } from "react";
import type { ReactNode } from "react";
import { ROLE_PYME } from "@/constants/roles";
import { AuthContext } from "./authContext";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import Cookies from "js-cookie";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });
  
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!Cookies.get("token"));
  const [hasPymeData, setHasPymeData] = useState(false);
  const [hasKyc, setHasKyc] = useState(false);
  const [isFullyRegistered, setIsFullyRegistered] = useState(false);

  useEffect(() => {
    if (user) {
      const hasPyme = !!user.pymeData;
      const hasKycValidated = !!user.pymeData?.hasKycValidated;

      setHasPymeData(hasPyme);
      setHasKyc(hasKycValidated);
      setIsFullyRegistered(isAuthenticated && hasPyme && hasKycValidated);
    } else {
      setHasPymeData(false);
      setHasKyc(false);
      setIsFullyRegistered(false);
    }
  }, [user, isAuthenticated]);

  const navigate = useNavigate();

  const login = useCallback(
    (token: string, user: User, fromRegister = false) => {
      setUser(user);
      setIsAuthenticated(true);

      Cookies.set("token", token, { expires: 1, secure: true, sameSite: "strict" });
      localStorage.setItem("user", JSON.stringify(user));

      if (fromRegister) return;

      if (user?.role === ROLE_PYME)
        navigate(ROUTES.DASHBOARD.PYME.OVERVIEW)
      else
        navigate(ROUTES.DASHBOARD.OPERATOR.OVERVIEW)
    },
    [navigate]
  );

  const updateUserPyme = useCallback((pymeData: PymeUserData | null) => {
    setUser(prev => {
      if (!prev || !pymeData) return prev;

      const updatedUser = { ...prev, pymeData };

      localStorage.setItem("user", JSON.stringify(updatedUser));
      return updatedUser;
    });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
    Cookies.remove("token");
    localStorage.removeItem("user");
    navigate(ROUTES.BASE);
  }, [navigate]);

  return (
    <AuthContext.Provider 
      value={{ user, isAuthenticated, hasPymeData, hasKyc, isFullyRegistered, login, updateUserPyme, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

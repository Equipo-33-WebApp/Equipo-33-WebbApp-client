import React from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { ALL_ROLES } from "@/constants/roles";

import { LandingPage } from "@/pages/LandingPage";
import { DashboardRoutes } from "./DashboardRoutes";

// Según que ruta privada se use, especificar roles con las constantes:
// ALL_ROLES, ROLE_PYME o ROLE_OPERATOR

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/dashboard/*"
        element={
          <PrivateRoute allowedRoles={ALL_ROLES}>
            <DashboardRoutes />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRouter;

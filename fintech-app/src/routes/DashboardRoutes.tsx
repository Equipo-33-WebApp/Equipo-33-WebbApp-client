import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import { ROLE_OPERATOR, ROLE_PYME } from "@/constants/roles";
import { useAuth } from "@/hooks/useAuth";

import {
  PymeHome,
  PymeApplications,
  PymeAccount
} from "@/features/dashboard/pages";
import {
  OperatorHome,
  OperatorReview,
  OperatorReports,
  OperatorAccount
} from "@/features/dashboard/pages";
import { ROUTES } from "@/constants/routes";
import { RequestLayout } from "@/layouts/RequestLayout";
import { RequestProvider } from "@/features/credit-request/context/RequestProvider";



export const DashboardRoutes = () => {

  const { user } = useAuth();

  if (!user) return <p>Cargando...</p>;

  const defaultRedirect =
    user?.role === ROLE_PYME ? ROUTES.DASHBOARD.PYME.OVERVIEW : ROUTES.DASHBOARD.OPERATOR.OVERVIEW;

  return (
    <Routes>
      <Route element={<DashboardLayout role={user.role} />}>

        <Route index element={<Navigate to={defaultRedirect} replace />} />

        <Route
          path="pyme/*"
          element={
            <PrivateRoute allowedRoles={[ROLE_PYME]}>
              <Routes>
                <Route index element={<Navigate to="overview" replace />} />
                <Route path="overview" element={<PymeHome />} />
                <Route path="applications" element={<PymeApplications />} />
                <Route 
                  path="request" 
                  element={
                    <RequestProvider>
                      <RequestLayout />
                    </RequestProvider>
                  } 
                />
                <Route path="account" element={<PymeAccount />} />
              </Routes>
            </PrivateRoute>
          }
        />

        <Route
          path="op/*"
          element={
            <PrivateRoute allowedRoles={[ROLE_OPERATOR]}>
              <Routes>
                <Route index element={<Navigate to="overview" replace />} />
                <Route path="overview" element={<OperatorHome />} />
                <Route path="review" element={<OperatorReview />} />
                <Route path="reports" element={<OperatorReports />} />
                <Route path="account" element={<OperatorAccount />} />
              </Routes>
            </PrivateRoute>
          }
        />

      </Route>
    </Routes>
  );
}

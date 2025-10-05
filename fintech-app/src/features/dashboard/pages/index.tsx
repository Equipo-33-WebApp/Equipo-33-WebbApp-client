import React from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { OperatorDashboard } from "./OperatorDashboard";
import { PymeDashboard } from "./PymeDashboard";
import { useAuth } from "@/hooks/useAuth";
import { ROLE_PYME } from "@/constants/roles";

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <p>Cargando...</p>;
  }

  const dashboardView =
    user.role === ROLE_PYME ? <PymeDashboard /> : <OperatorDashboard />;

  return <DashboardLayout>{dashboardView}</DashboardLayout>;
};
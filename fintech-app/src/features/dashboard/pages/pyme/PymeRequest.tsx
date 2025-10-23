import React from "react";
import { RequestInfo } from "../../components/pyme/RequestInfo";
import { RequestConfirmation } from "../../components/pyme/RequestConfirmation";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

export const PymeRequest: React.FC = () => {

  const { isFullyRegistered } = useAuth();

  if (!isFullyRegistered) return <Navigate to={ROUTES.DASHBOARD.BASE} replace />

  return (
    <section className="space-y-8 animate-fade-right">
      <header>
        <h1 className="text-2xl font-semibold text-gray-900">Solicitud de Crédito</h1>
        <p className="text-gray-600 mt-1 text-sm">
          Antes de continuar, revisá atentamente la información y condiciones que aplican a las solicitudes de crédito para PYMEs.
        </p>
      </header>

      <RequestInfo />
      <RequestConfirmation />
    </section>
  );
};

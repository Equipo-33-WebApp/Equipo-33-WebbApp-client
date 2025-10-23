import React from "react";
import { RequestCard } from "@/features/dashboard/components/pyme/RequestCard";
import { requestsMock } from "@/features/dashboard/mocks/requestsMock";
import { Navigate, useNavigate } from "react-router-dom";
import { SummaryCard } from "../../components/SummaryCard";
import { useRequestStats } from "../../hooks/useRequestStats";
import { ROUTES } from "@/constants/routes";
import { useAuth } from "@/hooks/useAuth";

export const PymeApplications: React.FC = () => {
  const { total, approved, pending, rejected } = useRequestStats();
  const navigate = useNavigate();

  const { isFullyRegistered } = useAuth();

  if (!isFullyRegistered) return <Navigate to={ROUTES.DASHBOARD.BASE} replace />

  const summaryInfo = [
    { label: "Solicitudes Totales", value: total, color: "bg-blue-50 text-blue-700" },
    { label: "Aprobadas", value: approved, color: "bg-green-50 text-green-700" },
    { label: "Pendientes", value: pending, color: "bg-yellow-50 text-yellow-700" },
    { label: "Rechazadas", value: rejected, color: "bg-red-50 text-red-700" },
  ];

  return (
    <section className="space-y-8 animate-fade-right">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Mis Solicitudes</h1>
          <p className="text-gray-600 text-sm mt-1">
            Revisa el estado de tus solicitudes de crédito y consulta tu historial reciente.
          </p>
        </div>

        <button 
          onClick={() => navigate(ROUTES.DASHBOARD.PYME.REQUEST)}
          className="inline-flex w-fit items-center gap-2 px-5 py-2 bg-accent hover:bg-accent/80 text-white font-medium rounded-lg shadow-md transition"
        >
          + Nueva Solicitud
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {summaryInfo.map(({ label, value, color }) => (
          <SummaryCard label={label} value={value} color={color} />
        ))}
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">Historial reciente</h2>
        {requestsMock.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {requestsMock.map(req => (
              <RequestCard key={req.id} {...req} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">Aún no has realizado solicitudes.</p>
        )}
      </div>
    </section>
  );
};

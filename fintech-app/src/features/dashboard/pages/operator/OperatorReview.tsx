import React from "react";
import { requestsMock } from "@/features/dashboard/mocks/requestsMock";
import { STATUS_PENDING } from "@/constants/requestStatus";
import { SummaryCard } from "../../components/SummaryCard";
import { RequestTable } from "../../components/operator/RequestTable";
import { StatesLegend } from "../../components/StatesLegend";

export const OperatorReview: React.FC = () => {
  const pending = requestsMock.filter(r => r.status === STATUS_PENDING).length;

  return (
    <section className="space-y-8 animate-fade-right">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Revisión de Solicitudes</h1>
          <p className="text-gray-600 text-sm mt-1">
            Gestiona las solicitudes enviadas por las PyMEs y toma decisiones según los criterios del banco.
          </p>
        </div>
      </div>


      <div className="flex flex-wrap gap-4">
        <StatesLegend />
        <SummaryCard label="Pendientes" value={pending} color="bg-yellow-50 text-yellow-700" />
      </div>

      <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-x-auto">
        <RequestTable requests={requestsMock} />
      </div>
    </section>
  );
};

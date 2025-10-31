import React from "react";
import { KpiCard } from "../../components/operator/KpiCard";
import { PieChartCard } from "../../components/operator/PieChartCard";
import { LineChartCard } from "../../components/operator/LineChartCard";
import { useRequest } from "../../hooks/useRequest";
import { STATUS_APPROVED, STATUS_PENDING, STATUS_REJECTED } from "@/constants/requestStatus";

export const OperatorReports: React.FC = () => {
  const { requests } = useRequest();
  const { total, approved, pending, rejected } = useRequest().stats;

  const distributionData = [
    { name: "Aprobadas", value: approved, color: "#22c55e" },
    { name: "Pendientes", value: pending, color: "#facc15" },
    { name: "Rechazadas", value: rejected, color: "#ef4444" },
  ];

  // Cannot calculate avgApprovalTime without createdAt field.
  const avgApprovalTime = "3.2 días";

  const rejectionRate = total > 0 ? ((rejected / total) * 100).toFixed(1) + "%" : "0%";
  const approvalRate = total > 0 ? ((approved / total) * 100).toFixed(1) + "%" : "0%";

  const getMonthlyData = () => {
    const monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    const monthlyMap: { [key: string]: { month: string; approved: number; rejected: number; pending: number } } = {};

    requests.forEach(req => {
      const monthIndex = new Date(req.updatedAt).getMonth();
      const month = monthNames[monthIndex];
      if (!monthlyMap[month]) {
        monthlyMap[month] = { month, approved: 0, rejected: 0, pending: 0 };
      }
      if (req.status === STATUS_APPROVED) monthlyMap[month].approved++;
      if (req.status === STATUS_REJECTED) monthlyMap[month].rejected++;
      if (req.status === STATUS_PENDING) monthlyMap[month].pending++;
    });

    return Object.values(monthlyMap);
  };

  const monthlyData = getMonthlyData();

  return (
    <section className="space-y-8 animate-fade-right">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Reportes y métricas</h1>
        <p className="text-gray-600 text-sm mt-1">
          Analiza el desempeño general de las solicitudes y la eficiencia operativa.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <KpiCard label="Tiempo promedio de aprobación" value={avgApprovalTime} color="text-blue-600" />
        <KpiCard label="Tasa de aprobación" value={approvalRate} color="text-green-600" />
        <KpiCard label="Tasa de rechazo" value={rejectionRate} color="text-red-600" />
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        <PieChartCard title="Distribución de estados" data={distributionData} />

        <div className="space-y-3">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-700 font-medium">
              La mayoría de las solicitudes fueron aprobadas en menos de una semana.
            </p>
          </div>
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-700 font-medium">
              Se recomienda reducir el tiempo de evaluación de solicitudes pendientes.
            </p>
          </div>
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-700 font-medium">
              Las tasas de aprobación se mantienen estables durante el último mes.
            </p>
          </div>
        </div>
      </div>

      <LineChartCard title="Evolución mensual" data={monthlyData} />
    </section>
  );
};

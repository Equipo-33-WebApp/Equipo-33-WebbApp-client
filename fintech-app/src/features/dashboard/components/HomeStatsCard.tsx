import { useAuth } from "@/hooks/useAuth";
import type { DashboardRequestSummaryData } from "../types";
import { ROLE_PYME } from "@/constants/roles";

interface HomeStatsCardProps {
  statsData: DashboardRequestSummaryData
}

export const HomeStatsCard: React.FC<HomeStatsCardProps> = ({ statsData }) => {

  const { user } = useAuth();

  const stats = [
    { label: "Totales", value: statsData.total },
    { label: "Aprobadas", value: statsData.approved },
    { label: "Pendientes", value: statsData.pending },
    { label: "Rechazadas", value: statsData.rejected },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 flex flex-col">
      <h2 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">
        Resumen general
      </h2>
      <div className="flex flex-col gap-3 flex-1">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex justify-between p-3 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition"
          >
            <span className="text-gray-600 font-medium">{stat.label}</span>
            <span className="text-blue-600 font-bold text-lg">{stat.value}</span>
          </div>
        ))}
      </div>
      {user?.role === ROLE_PYME ? (
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-gray-700">
          💡 Recuerda: Mantén tus balances actualizados, adjunta todos los documentos
          y revisa plazos y tasas antes de solicitar un nuevo crédito.
        </div>
      ):(<></>)}
    </div>

  )
}
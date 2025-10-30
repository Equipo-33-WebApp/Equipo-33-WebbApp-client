import React from "react";
import { useRequestStats } from "@/features/dashboard/hooks/useRequestStats";
import { userOpMock } from "../constants/user";
import { HomeStatsCard } from "@/features/dashboard/components/HomeStatsCard";
import { PendingRequestsCard } from "@/features/dashboard/components/operator/PendingRequestsCard";
import { UserCard } from "@/features/dashboard/components/UserCard";
import { useNavigate } from "react-router-dom";




export const OpOverview: React.FC = () => {

  const stats = useRequestStats();

  const navigate = useNavigate();

  return (
    <section className="space-y-6 animate-fade-right">
      <h1 className="text-2xl font-semibold text-gray-800">
        Bienvenido, {userOpMock?.firstName}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <HomeStatsCard statsData={stats} />
          <button 
            onClick={() => navigate("/test/opmetrics")}
            className="bg-accent w-fit py-2 px-4 rounded-md font-semibold text-white"
          >
            Ver Métricas
          </button>
          <PendingRequestsCard />
        </div>

        <div className="flex flex-col gap-6">
          <UserCard user={userOpMock} />
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-gray-700">
            💡 Consejo: Revisa con prioridad las solicitudes más antiguas y marca el
            estado correspondiente una vez finalizado el análisis.
          </div>
        </div>
      </div>
    </section>
  );
};
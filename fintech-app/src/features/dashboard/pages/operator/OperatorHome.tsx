import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

import { UserCard } from "../../components/UserCard";
import { PendingRequestsCard } from "../../components/operator/PendingRequestsCard";
import { HomeStatsCard } from "../../components/HomeStatsCard";
import { useRequest } from "../../hooks/useRequest";
import { RequestDetailModal } from "../../components/operator/RequestDetailModal";
import type { RequestData } from "@/types";

export const OperatorHome: React.FC = () => {
  const { user } = useAuth();
  const { stats, reloadRequests } = useRequest();
  const [selectedRequest, setSelectedRequest] = useState<RequestData | null>(null);

  const handleOpenModal = (request: RequestData) => {
    setSelectedRequest(request);
  };

  const handleCloseModal = () => {
    setSelectedRequest(null);
  };

  const handleRequestUpdate = () => {
    reloadRequests();
  };

  return (
    <section className="space-y-6 animate-fade-right">
      <h1 className="text-2xl font-semibold text-gray-800">
        Bienvenido, {user?.firstName}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <HomeStatsCard statsData={stats} />
          <PendingRequestsCard onOpenModal={handleOpenModal} />
        </div>

        <div className="flex flex-col gap-6">
          <UserCard user={user} />
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-gray-700">
            💡 Consejo: Revisa con prioridad las solicitudes más antiguas y marca el
            estado correspondiente una vez finalizado el análisis.
          </div>
        </div>
      </div>

      <RequestDetailModal 
        isOpen={!!selectedRequest}
        onClose={handleCloseModal}
        request={selectedRequest}
        onRequestUpdate={handleRequestUpdate}
      />
    </section>
  );
};

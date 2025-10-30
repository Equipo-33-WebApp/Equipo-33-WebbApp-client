import React from "react";

import { STATUS_PENDING } from "@/constants/requestStatus";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { useRequest } from "../../hooks/useRequest";
import type { RequestData } from "@/types";
import { formatDate } from "@/utils/date";

interface PendingRequestsCardProps {
    onOpenModal: (request: RequestData) => void;
}

export const PendingRequestsCard: React.FC<PendingRequestsCardProps> = ({ onOpenModal }) => {
  const navigate = useNavigate();
  const { requests } = useRequest();
  const pendingRequests = requests.filter(r => r.status === STATUS_PENDING).slice(0, 4);

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">
        Solicitudes pendientes
      </h2>

      <div className="space-y-3">
        {pendingRequests.length > 0 ? (
          pendingRequests.map((req) => (
            <div
              key={req.id}
              className="p-3 bg-gray-50 rounded-lg flex flex-col sm:flex-row justify-between items-center hover:bg-blue-50 cursor-pointer transition"
              onClick={() => onOpenModal(req)}
            >
              <div>
                <p className="text-gray-800 font-medium">{req.companyName}</p>
                <p className="text-sm text-gray-500">
                  Solicitado: {formatDate(req.updatedAt)}
                </p>
              </div>
              <span className="text-xs bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-semibold">
                Pendiente
              </span>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No hay solicitudes pendientes.</p>
        )}
      </div>

      <button
        onClick={() => navigate(ROUTES.DASHBOARD.OPERATOR.REVIEW)}
        className="mt-5 w-full bg-accent text-white py-2 rounded-lg text-sm font-medium hover:bg-accent/70 transition"
      >
        Ver todas las solicitudes
      </button>
    </div>
  );
};

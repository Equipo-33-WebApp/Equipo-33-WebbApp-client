import React from "react";

import { STATUS_PENDING } from "@/constants/requestStatus";
import { useNavigate } from "react-router-dom";
import { requestsMock } from "../../mocks/requestsMock";
import { ROUTES } from "@/constants/routes";

export const PendingRequestsCard: React.FC = () => {
  const navigate = useNavigate();
  const pendingRequests = requestsMock.filter(r => r.status === STATUS_PENDING).slice(0, 4);

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
              className="p-3 bg-gray-50 rounded-lg flex justify-between items-center hover:bg-blue-50 cursor-pointer transition"
            //   onClick={() => navigate(`/dashboard/op/requests/${req.id}`)}
            >
              <div>
                <p className="text-gray-800 font-medium">{req.business}</p>
                <p className="text-sm text-gray-500">
                  Solicitado: {new Date(req.date).toLocaleDateString()}
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

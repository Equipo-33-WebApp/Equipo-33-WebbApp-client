import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { usePymeRequests } from '../../hooks/usePymeRequests';
import { RequestCard } from './RequestCard';
import type { RequestData } from "@/types";

interface PymeRecentRequestsCardProps {
  onOpenModal: (request: RequestData) => void;
}

export const PymeRecentRequestsCard: React.FC<PymeRecentRequestsCardProps> = ({ onOpenModal }) => {
  const navigate = useNavigate();
  const { requests, isLoading, error } = usePymeRequests();

  const recentRequests = requests.slice(0, 3);

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">
        Mis Solicitudes Recientes
      </h2>

      <div className="space-y-4">
        {isLoading ? (
          <p className="text-gray-500 italic">Cargando...</p>
        ) : error ? (
          <p className="text-red-500 italic">Error al cargar las solicitudes.</p>
        ) : recentRequests.length > 0 ? (
          recentRequests.map(req => <RequestCard business={req.companyName} date={req.createdAt} key={req.id} {...req} onClick={() => onOpenModal(req)} />)
        ) : (
          <p className="text-gray-500 text-sm">No tienes solicitudes recientes.</p>
        )}
      </div>

      <button
        onClick={() => navigate(ROUTES.DASHBOARD.PYME.APPLICATIONS)}
        className="mt-5 w-full bg-accent text-white py-2 rounded-lg text-sm font-medium hover:bg-accent/70 transition"
      >
        Ver Todas Mis Solicitudes
      </button>
    </div>
  );
};

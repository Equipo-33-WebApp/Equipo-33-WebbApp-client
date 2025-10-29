import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Card } from '@/components/ui/Card';
import type { RequestData } from '@/types';

// Helper to determine badge color based on status
const getStatusBadgeColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'aprobado':
      return 'bg-green-100 text-green-800';
    case 'pendiente':
      return 'bg-yellow-100 text-yellow-800';
    case 'rechazado':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getRiskBadgeColor = (riskLevel: string) => {
    switch (riskLevel.toLowerCase()) {
      case 'bajo':
        return 'bg-green-100 text-green-800';
      case 'medio':
        return 'bg-yellow-100 text-yellow-800';
      case 'alto':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };


interface RequestDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: RequestData | null;
}

export const RequestDetailModal: React.FC<RequestDetailModalProps> = ({
  isOpen,
  onClose,
  request,
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);


  if (!isOpen || !request || !isClient) {
    return null;
  }

  const modalContent = (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 animate-fade-in">
      <Card className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl transform transition-all duration-300">
        <div className="p-6 relative">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Detalle de Solicitud</h2>
              <p className="text-sm text-gray-500">Solicitud #{request.id}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 absolute top-4 right-4"
            >
                <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {/* PYME Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Información de la PyME</h3>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Nombre:</span>
                <span className="text-gray-900">{request.companyName}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Industria:</span>
                <span className="text-gray-900">{request.sector}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Ingresos Anuales:</span>
                <span className="text-gray-900">${request.annualIncome.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Ingresos Netos:</span>
                <span className="text-gray-900">${request.netIncome.toLocaleString()}</span>
              </div>
               <div className="flex justify-between">
                <span className="font-medium text-gray-600">PyME ID:</span>
                <span className="text-gray-900">{request.pymeId}</span>
              </div>
            </div>

            {/* Credit Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Detalles del Crédito</h3>
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-600">Estado:</span>
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(request.status)}`}>
                  {request.status}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-600">Nivel de Riesgo:</span>
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRiskBadgeColor(request.riskLevel)}`}>
                  {request.riskLevel}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Monto Solicitado:</span>
                <span className="font-bold text-lg text-blue-600">${request.amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Plazo:</span>
                <span className="text-gray-900">{request.termInMonths} meses</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Destino:</span>
                <span className="text-gray-900">{request.creditDestination}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Propósito:</span>
                <span className="text-gray-900">{request.purpose}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Fecha de Solicitud:</span>
                <span className="text-gray-900">{new Date(request.updatedAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-3">
             <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cerrar
            </button>
            <button
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Rechazar
            </button>
            <button
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Aprobar
            </button>
          </div>
        </div>
      </Card>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

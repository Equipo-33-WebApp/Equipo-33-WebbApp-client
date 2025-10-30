import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Card } from '@/components/ui/Card';
import type { RequestData } from '@/types';
import { useRequestUpdate } from '../../hooks/useRequestUpdate';
import { formatDate } from "@/utils/date";

// Constants for request status
const REQUEST_STATUS = {
  PENDING: 'Pending',
  ON_REVIEW: 'OnReview',
  APPROVED: 'Approved',
  REJECTED: 'Rejected',
} as const;

// Helper to translate status from English to Spanish
const translateStatus = (status: string) => {
  if (!status) return 'No especificado';
  
  switch (status) {
    case 'Pending':
      return 'Pendiente';
    case 'OnReview':
      return 'En Revisión';
    case 'Approved':
      return 'Aprobado';
    case 'Rejected':
      return 'Rechazado';
    default:
      return 'No especificado';
  }
};

// Helper to determine badge color based on status
const getStatusBadgeColor = (status: string) => {
  switch (status) {
    case 'Approved':
      return 'bg-green-100 text-green-800';
    case 'Pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'OnReview':
      return 'bg-blue-100 text-blue-800';
    case 'Rejected':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

// Helper to translate risk level from English to Spanish
const translateRiskLevel = (riskLevel: string) => {
    if (!riskLevel) return 'No especificado';

    switch (riskLevel.toLowerCase()) {
      case 'low':
        return 'Bajo';
      case 'medium':
        return 'Medio';
      case 'high':
        return 'Alto';
      default:
        return 'No especificado';
    }
};

const getRiskBadgeColor = (riskLevel: string) => {
    const translatedRisk = translateRiskLevel(riskLevel);
    switch (translatedRisk.toLowerCase()) {
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
  onRequestUpdate?: () => void;
}

export const RequestDetailModal: React.FC<RequestDetailModalProps> = ({
  isOpen,
  onClose,
  request,
  onRequestUpdate,
}) => {
  const [isClient, setIsClient] = useState(false);
  const { updateStatus, isLoading, error } = useRequestUpdate(() => {
    onRequestUpdate?.();
    onClose();
  });

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
                <span className="text-gray-900">{request.companyName || 'No especificado'}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Industria:</span>
                <span className="text-gray-900">{request.sector || 'No especificado'}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Ingresos Anuales:</span>
                <span className="text-gray-900">
                  {request.annualIncome ? `$${request.annualIncome.toLocaleString()}` : 'No especificado'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Ingresos Netos:</span>
                <span className="text-gray-900">
                  {request.netIncome ? `$${request.netIncome.toLocaleString()}` : 'No especificado'}
                </span>
              </div>
               <div className="flex flex-col justify-between">
                <p className="font-medium text-gray-600 text-nowrap">PyME ID:</p>
                <p className="text-gray-900">{request.pymeId}</p>
              </div>
            </div>

            {/* Credit Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Detalles del Crédito</h3>
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-600">Estado:</span>
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(request.status || '')}`}>
                  {translateStatus(request.status)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-600">Nivel de Riesgo:</span>
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRiskBadgeColor(request.riskLevel || '')}`}>
                  {translateRiskLevel(request.riskLevel)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Monto Solicitado:</span>
                <span className="font-bold text-lg text-blue-600">
                  {request.amount ? `$${request.amount.toLocaleString()}` : 'No especificado'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Plazo:</span>
                <span className="text-gray-900">
                  {request.termInMonths ? `${request.termInMonths} meses` : 'No especificado'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Destino:</span>
                <span className="text-gray-900">{request.creditDestination || 'No especificado'}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Propósito:</span>
                <span className="text-gray-900">{request.purpose || 'No especificado'}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Fecha de Solicitud:</span>
                <span className="text-gray-900">
                  {request.updatedAt ? formatDate(request.updatedAt) : 'No especificado'}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col space-y-4">
            {error && (
              <div className="text-sm text-red-600 text-center">
                {error.message}
              </div>
            )}
            <div className="flex flex-wrap justify-end gap-3">
              <button
                onClick={onClose}
                disabled={isLoading}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50"
              >
                Cerrar
              </button>

              {/* Botones según el estado actual */}
              {request?.status === REQUEST_STATUS.PENDING && (
                <>
                  <button
                    onClick={() => request && updateStatus(request.id, REQUEST_STATUS.ON_REVIEW)}
                    disabled={isLoading}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                  >
                    {isLoading ? 'Procesando...' : 'Mover a Revisión'}
                  </button>
                  <button
                    onClick={() => request && updateStatus(request.id, REQUEST_STATUS.REJECTED)}
                    disabled={isLoading}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                  >
                    {isLoading ? 'Procesando...' : 'Rechazar'}
                  </button>
                </>
              )}

              {request?.status === REQUEST_STATUS.ON_REVIEW && (
                <>
                  <button
                    onClick={() => request && updateStatus(request.id, REQUEST_STATUS.APPROVED)}
                    disabled={isLoading}
                    className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                  >
                    {isLoading ? 'Procesando...' : 'Aprobar'}
                  </button>
                  <button
                    onClick={() => request && updateStatus(request.id, REQUEST_STATUS.REJECTED)}
                    disabled={isLoading}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                  >
                    {isLoading ? 'Procesando...' : 'Rechazar'}
                  </button>
                </>
              )}

              {(request?.status === REQUEST_STATUS.APPROVED || request?.status === REQUEST_STATUS.REJECTED) && (
                <button
                  onClick={() => request && updateStatus(request.id, REQUEST_STATUS.ON_REVIEW)}
                  disabled={isLoading}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {isLoading ? 'Procesando...' : 'Reabrir y Mover a Revisión'}
                </button>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

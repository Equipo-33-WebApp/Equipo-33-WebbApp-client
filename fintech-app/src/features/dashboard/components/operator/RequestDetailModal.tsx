import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import type { RequestData, AmlCheck } from "@/types";
import { formatDate } from "@/utils/date";
import { useRequestUpdate } from "../../hooks/useRequestUpdate";
import { useOperatorAmlChecks } from "../../hooks/useOperatorAmlChecks";

interface RequestDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: RequestData | null;
  onUpdate: () => void;
}

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

const riskLevelDisplay: Record<string, { label: string; color: string }> = {
  High: { label: "Alto", color: "bg-red-100 text-red-800" },
  Medium: { label: "Medio", color: "bg-yellow-100 text-yellow-800" },
  Low: { label: "Bajo", color: "bg-green-100 text-green-800" },
};

const ExpandableText: React.FC<{ text: string; maxLength?: number }> = ({ text, maxLength = 120 }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    if (text.length <= maxLength) return <p className="text-sm text-gray-700 leading-relaxed">{text}</p>;
    return (
        <div className="text-sm text-gray-700 leading-relaxed">
            <p>{isExpanded ? text : `${text.substring(0, maxLength)}...`}</p>
            <button onClick={() => setIsExpanded(!isExpanded)} className="text-blue-600 hover:underline text-xs font-bold mt-1">
                {isExpanded ? 'Leer menos' : 'Leer más'}
            </button>
        </div>
    );
};

const AmlCheckSkeleton = () => (
    <div className="space-y-4">
        {[...Array(1)].map((_, i) => (
            <div key={i} className="p-4 bg-gray-50 rounded-lg border animate-pulse">
                <div className="h-5 w-20 bg-gray-200 rounded-full mb-3"></div>
                <div className="h-4 bg-gray-200 rounded-md w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded-md w-3/4"></div>
            </div>
        ))}
    </div>
);

const AmlCheckSection: React.FC<{ checks: AmlCheck[]; isLoading: boolean; error: Error | null }> = ({ checks, isLoading, error }) => {
    if (isLoading) return <AmlCheckSkeleton />;
    if (error) return <p className="text-center text-red-600 bg-red-50 p-4 rounded-lg">Error: {error.message}</p>;
    if (checks.length === 0) return <p className="text-center text-gray-500 bg-gray-50 p-4 rounded-lg">No se encontraron verificaciones AML para esta PyME.</p>;

    return (
        <div className="space-y-4 max-h-60 overflow-y-auto pr-2 -mr-2">
            {checks.map(check => {
                const risk = riskLevelDisplay[check.riskLevel] || { label: check.riskLevel, color: 'bg-gray-100 text-gray-800' };
                return (
                  <div key={check.id} className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-3">
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${risk.color}`}>{risk.label}</span>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                              <span>{formatDate(check.createdAt)}</span>
                          </div>
                      </div>
                      <ExpandableText text={check.resultSummary} />
                      {check.flags && check.flags.length > 0 && (
                          <div className="mt-4">
                              <h4 className="text-xs font-bold text-gray-500 mb-2">Alertas Detectadas:</h4>
                              <div className="flex flex-wrap gap-2">
                                  {check.flags.map((flag, index) => (
                                      <span key={index} className="px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded-md">{flag}</span>
                                  ))}
                              </div>
                          </div>
                      )}
                      {check.requiresManualReview && (
                          <div className="mt-4 pt-3 border-t border-dashed flex items-center gap-2 text-sm text-amber-700 font-semibold">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                              <span>Requiere Revisión Manual</span>
                          </div>
                      )}
                  </div>
                )
            })}
        </div>
    );
};

export const RequestDetailModal: React.FC<RequestDetailModalProps> = ({ isOpen, onClose, request, onUpdate }) => {
  
  const { updateStatus, isLoading: isUpdating, error: updateError, data: updateData } = useRequestUpdate();
  const { checks: amlChecks, isLoading: isLoadingAml, error: errorAml } = useOperatorAmlChecks(request?.pymeId);
  const [showAml, setShowAml] = useState(false);
  
  useEffect(() => {
    if (updateData) {
      const timer = setTimeout(() => {
        onUpdate();
        onClose();
      }, 1200);
      return () => clearTimeout(timer); // Cleanup on unmount
    }
  }, [updateData, onUpdate, onClose]);

  if (!isOpen || !request) return null;
  
  const handleStatusChange = (newStatus: string) => {
    if (request) {
      updateStatus(request.id, newStatus);
    }
  };
  
  const getDocumentName = (url: string) => {
    try {
      const segments = new URL(url).pathname.split('/');
      const docType = segments[segments.length - 2];
      if (docType === 'annualFinancials') return 'Estados Financieros Anuales';
      if (docType === 'taxReturn') return 'Declaración de Impuestos';
      return "Documento";
    } catch (error) {
      console.log(error)
      return "Documento";
    }
  };

  const riskDisplay = riskLevelDisplay[request.riskLevel] || { label: request.riskLevel, color: 'bg-gray-100 text-gray-800' };
  const status = { label: translateStatus(request.status), color: getStatusBadgeColor(request.status) };

  const modalContent = (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 relative border-b">
            <h2 className="text-2xl font-bold text-gray-900">Revisión de Solicitud</h2>
            <p className="text-sm text-gray-500">Solicitud de {request.companyName} (PyME ID: {request.pymeId})</p>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 absolute top-4 right-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
        </div>

        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 text-sm">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Información de la PyME</h3>
              <div className="flex justify-between"><span className="font-medium text-gray-600">Empresa:</span><span className="text-gray-900">{request.companyName}</span></div>
              <div className="flex justify-between"><span className="font-medium text-gray-600">Sector:</span><span className="text-gray-900">{request.sector}</span></div>
              <div className="flex justify-between"><span className="font-medium text-gray-600">Fecha de Solicitud:</span><span className="text-gray-900">{formatDate(request.createdAt)}</span></div>
              <div className="flex justify-between"><span className="font-medium text-gray-600">Última Actualización:</span><span className="text-gray-900">{formatDate(request.updatedAt)}</span></div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Detalles del Crédito</h3>
              <div className="flex justify-between items-center"><span className="font-medium text-gray-600">Estado:</span><span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${status.color}`}>{status.label}</span></div>
              <div className="flex justify-between items-center"><span className="font-medium text-gray-600">Nivel de Riesgo:</span><span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${riskDisplay.color}`}>{riskDisplay.label}</span></div>
              <div className="flex justify-between"><span className="font-medium text-gray-600">Monto Solicitado:</span><span className="font-bold text-lg text-blue-600">${request.amount.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="font-medium text-gray-600">Plazo:</span><span className="text-gray-900">{request.termInMonths} meses</span></div>
              <div className="flex justify-between"><span className="font-medium text-gray-600">Destino:</span><span className="text-gray-900">{request.creditDestination}</span></div>
            </div>
          </div>

          {request.uploadedDocuments && request.uploadedDocuments.length > 0 && (
            <div className="mt-6 pt-6 border-t">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Documentos Adjuntos</h3>
              <ul className="space-y-3">
                {request.uploadedDocuments.map(doc => (
                  <li key={doc.id}>
                    <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-blue-600 hover:underline text-sm font-medium p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-blue-50 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                      <span>{getDocumentName(doc.fileUrl)}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-8 pt-6 border-t">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">Historial de Verificaciones AML</h3>
              <button onClick={() => setShowAml(!showAml)} className="text-sm font-medium text-blue-600 hover:text-blue-800">
                {showAml ? 'Ocultar' : 'Mostrar'}
              </button>
            </div>
            {showAml && (
              <div className="mt-4">
                <AmlCheckSection checks={amlChecks} isLoading={isLoadingAml} error={errorAml} />
              </div>
            )}
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-b-2xl flex items-center justify-between">
            <div className="flex-grow min-h-[20px]">
                {updateError && <p className="text-sm text-red-600">Error al actualizar: {updateError.message}</p>}
                {updateData && <p className="text-sm text-green-600">¡Estado actualizado con éxito!</p>}
            </div>
            
            <div className="flex items-center gap-3">
                {/* Botones según el estado actual */}
                {isUpdating ? <div className="px-4 py-2 text-sm font-medium text-gray-500">Procesando...</div> : <>
                  {request?.status === REQUEST_STATUS.PENDING && (
                    <>
                      <button
                        onClick={() => handleStatusChange(REQUEST_STATUS.ON_REVIEW)}
                        disabled={isUpdating}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                      >
                        Mover a Revisión
                      </button>
                      <button
                        onClick={() => handleStatusChange(REQUEST_STATUS.REJECTED)}
                        disabled={isUpdating}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                      >
                        Rechazar
                      </button>
                    </>
                  )}

                  {request?.status === REQUEST_STATUS.ON_REVIEW && (
                    <>
                      <button
                        onClick={() => handleStatusChange(REQUEST_STATUS.APPROVED)}
                        disabled={isUpdating}
                        className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                      >
                        Aprobar
                      </button>
                      <button
                        onClick={() => handleStatusChange(REQUEST_STATUS.REJECTED)}
                        disabled={isUpdating}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                      >
                        Rechazar
                      </button>
                    </>
                  )}

                  {(request?.status === REQUEST_STATUS.APPROVED || request?.status === REQUEST_STATUS.REJECTED) && (
                    <button
                      onClick={() => handleStatusChange(REQUEST_STATUS.ON_REVIEW)}
                      disabled={isUpdating}
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                    >
                      Reabrir y Mover a Revisión
                    </button>
                  )}
                </>}
                <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors">Cerrar</button>
            </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

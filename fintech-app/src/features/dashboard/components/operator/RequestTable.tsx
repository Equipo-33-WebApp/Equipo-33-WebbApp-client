import React, { useState, useMemo } from "react";
import {
  STATUS_APPROVED,
  STATUS_PENDING,
  STATUS_ONREVIEW,
  STATUS_REJECTED
} from "@/constants/requestStatus";
import { RequestDetailModal } from './RequestDetailModal';
import type { RequestData } from "@/types";
import { Pagination } from './Pagination';
import { SortableHeader } from './SortableHeader';
import { formatDate } from "@/utils/date";

interface RequestTableProps {
  requests: RequestData[];
  onRequestsUpdate: (status?: string) => void;
  currentFilter?: string;
}

const statusDisplay: Record<string, { label: string; color: string }> = {
  [STATUS_APPROVED]: { label: 'Aprobado', color: 'bg-green-100 text-green-800' },
  [STATUS_PENDING]: { label: 'Pendiente', color: 'bg-yellow-100 text-yellow-800' },
  [STATUS_ONREVIEW]: { label: 'En revisión', color: 'bg-blue-100 text-blue-800' },
  [STATUS_REJECTED]: { label: 'Rechazado', color: 'bg-red-100 text-red-800' },
};

type SortColumn = keyof RequestData | '';

export const RequestTable: React.FC<RequestTableProps> = ({ requests, onRequestsUpdate, currentFilter }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<RequestData | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>(currentFilter || "");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<SortColumn>('companyName');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const requestsPerPage = 10;

  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
    setCurrentPage(1);
  };

  const sortedRequests = useMemo(() => {
    if (!sortColumn) return requests;

    return [...requests].sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [requests, sortColumn, sortDirection]);

  const statusOptions = [
    { value: "", label: "Todos" },
    { value: STATUS_PENDING, label: "Pendientes" },
    { value: STATUS_ONREVIEW, label: "En Revisión" },
    { value: STATUS_APPROVED, label: "Aprobados" },
    { value: STATUS_REJECTED, label: "Rechazados" },
  ];

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = event.target.value;
    setSelectedStatus(newStatus);
    onRequestsUpdate(newStatus || undefined);
    setCurrentPage(1);
  };

  const handleOpenModal = (request: RequestData) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRequest(null);
  };

  const indexOfLastRequest = currentPage * requestsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
  const currentRequests = sortedRequests.slice(indexOfFirstRequest, indexOfLastRequest);
  const totalPages = Math.ceil(sortedRequests.length / requestsPerPage);

  return (
    <div className="space-y-4 p-2">
      <div className="flex justify-end">
        <select
          value={selectedStatus}
          onChange={handleStatusChange}
          className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {statusOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              <SortableHeader
                column="companyName"
                label="Empresa"
                sortColumn={sortColumn}
                sortDirection={sortDirection}
                onSort={handleSort as (column: string) => void}
              />
              <SortableHeader
                column="status"
                label="Estatus"
                sortColumn={sortColumn}
                sortDirection={sortDirection}
                onSort={handleSort as (column: string) => void}
              />
              <SortableHeader
                column="amount"
                label="Monto"
                sortColumn={sortColumn}
                sortDirection={sortDirection}
                onSort={handleSort as (column: string) => void}
                className="hidden sm:table-cell"
              />
              <SortableHeader
                column="updatedAt"
                label="Fecha"
                sortColumn={sortColumn}
                sortDirection={sortDirection}
                onSort={handleSort as (column: string) => void}
                className="hidden md:table-cell"
              />
              <th className="px-4 py-2 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentRequests.map((req) => (
              <tr key={req.id} className="border-t hover:bg-gray-50 transition">
                <td className="px-4 py-2 font-medium text-gray-900">
                  {req.companyName}
                </td>
                <td className="px-4 py-2">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusDisplay[req.status]?.color || 'bg-gray-100 text-gray-800'}`}>
                    {statusDisplay[req.status]?.label || 'Desconocido'}
                  </span>
                </td>
                <td className="px-4 py-2 hidden sm:table-cell">${req.amount.toLocaleString()}</td>
                <td className="px-4 py-2 hidden md:table-cell">
                  {formatDate(req.updatedAt)}
                </td>
                <td className="px-4 py-2 text-right">
                  <button 
                    onClick={() => handleOpenModal(req)}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Ver detalle
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-700">
          Mostrando {sortedRequests.length > 0 ? indexOfFirstRequest + 1 : 0} a {Math.min(indexOfLastRequest, sortedRequests.length)} de {sortedRequests.length} solicitudes
        </span>
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
      <RequestDetailModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        request={selectedRequest}
        onRequestUpdate={() => onRequestsUpdate(currentFilter)}
      />
    </div>
  );
};

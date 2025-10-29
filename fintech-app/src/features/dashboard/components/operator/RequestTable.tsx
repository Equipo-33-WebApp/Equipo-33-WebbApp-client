import React, { useState } from "react";
import { STATUS_APPROVED, STATUS_PENDING } from "@/constants/requestStatus";
import { RequestDetailModal } from './RequestDetailModal';
import type { RequestData } from "@/types";

interface RequestTableProps {
  requests: RequestData[];
}

export const RequestTable: React.FC<RequestTableProps> = ({ requests }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<RequestData | null>(null);

  const handleOpenModal = (request: RequestData) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRequest(null);
  };

  const requestsData = [...requests].sort((a, b) => {
    if (a.status === STATUS_PENDING && b.status !== STATUS_PENDING) return -1;
    if (a.status !== STATUS_PENDING && b.status === STATUS_PENDING) return 1;
    return 0;
  });

  return (
    <>
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-2">Empresa</th>
              <th className="px-4 py-2 hidden sm:table-cell">Monto</th>
              <th className="px-4 py-2 hidden md:table-cell">Fecha</th>
              <th className="px-4 py-2 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {requestsData.map((req) => (
              <tr key={req.id} className="border-t hover:bg-gray-50 transition">
                <td 
                    className={`px-4 py-2 font-medium ${
                      req.status === STATUS_APPROVED
                        ? "bg-green-100 text-green-700"
                        : req.status === STATUS_PENDING
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                >
                  {req.companyName}
                </td>
                <td className="px-4 py-2 hidden sm:table-cell">${req.amount.toLocaleString()}</td>
                <td className="px-4 py-2 hidden md:table-cell">
                  {new Date(req.updatedAt).toLocaleDateString()}
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
      <RequestDetailModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        request={selectedRequest} 
      />
    </>
  );
};

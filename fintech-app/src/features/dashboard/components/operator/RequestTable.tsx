import React from "react";
import { STATUS_APPROVED, STATUS_PENDING } from "@/constants/requestStatus";
import type { RequestData } from "@/types";

interface RequestTableProps {
  requests: RequestData[];
}

export const RequestTable: React.FC<RequestTableProps> = ({ requests }) => {

  const requestsData = [...requests].sort((a, b) => {
    if (a.status === STATUS_PENDING && b.status !== STATUS_PENDING) return -1;
    if (a.status !== STATUS_PENDING && b.status === STATUS_PENDING) return 1;
    return 0;
  });


  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-700">
        <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
          <tr>
            <th className="px-6 py-3">Empresa</th>
            <th className="px-6 py-3">Monto</th>
            <th className="px-6 py-3">Fecha</th>
            <th className="px-6 py-3">Estado</th>
            <th className="px-6 py-3 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {requestsData.map((req) => (
            <tr key={req.id} className="border-t hover:bg-gray-50 transition">
              <td className="px-6 py-3 font-medium">{req.business}</td>
              <td className="px-6 py-3">${req.amount.toLocaleString()}</td>
              <td className="px-6 py-3">
                {new Date(req.date).toLocaleDateString()}
              </td>
              <td className="px-6 py-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    req.status === STATUS_APPROVED
                      ? "bg-green-50 text-green-700"
                      : req.status === STATUS_PENDING
                      ? "bg-yellow-50 text-yellow-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {req.status}
                </span>
              </td>
              <td className="px-6 py-3 text-right">
                <button
                //   onClick={navigate}
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
  );
};

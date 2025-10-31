import React from "react";
import {
  STATUS_APPROVED,
  STATUS_PENDING,
  STATUS_ONREVIEW,
  STATUS_REJECTED
} from "@/constants/requestStatus";
import { formatDate } from "@/utils/date";

interface RequestCardProps {
  business: string;
  amount: number;
  date: string;
  status: string;
  onClick: () => void;
}

const statusDisplay: Record<string, { label: string; color: string }> = {
  [STATUS_APPROVED]: { label: 'Aprobado', color: 'bg-green-100 text-green-800' },
  [STATUS_PENDING]: { label: 'Pendiente', color: 'bg-yellow-100 text-yellow-800' },
  [STATUS_ONREVIEW]: { label: 'En revisión', color: 'bg-blue-100 text-blue-800' },
  [STATUS_REJECTED]: { label: 'Rechazado', color: 'bg-red-100 text-red-800' },
};

export const RequestCard: React.FC<RequestCardProps> = ({ business, amount, date, status, onClick }) => {
  const display = statusDisplay[status] || { label: status, color: 'bg-gray-100 text-gray-800' };

  return (
    <div 
      onClick={onClick}
      className="bg-white p-5 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer animate-fade-in"
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-bold text-gray-800 text-lg">{business}</h3>
        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${display.color}`}>
          {display.label}
        </span>
      </div>
      <div className="space-y-1 text-sm">
        <p className="text-gray-500 flex justify-between">
          <span>Monto Solicitado:</span>
          <span className="font-medium text-gray-900">${amount.toLocaleString()}</span>
        </p>
        <p className="text-gray-500 flex justify-between">
          <span>Última Actualización:</span>
          <span className="font-medium text-gray-900">{formatDate(date)}</span>
        </p>
      </div>
    </div>
  );
};

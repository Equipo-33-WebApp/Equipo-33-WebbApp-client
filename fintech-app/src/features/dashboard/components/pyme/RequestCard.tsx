import { STATUS_APPROVED, STATUS_PENDING, STATUS_REJECTED } from "@/constants/requestStatus";
import React from "react";

interface RequestCardProps {
  id: string
  business: string
  amount: number
  date: string
  status: string
}

export const RequestCard: React.FC<RequestCardProps> = ({
  id,
  business,
  amount,
  date,
  status,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case STATUS_APPROVED:
        return "text-green-600 bg-green-100";
      case STATUS_PENDING:
        return "text-yellow-600 bg-yellow-100";
      case STATUS_REJECTED:
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="p-4 rounded-xl shadow-sm border bg-white hover:shadow-md transition">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-lg">{business}</h3>
        <span className={`px-3 py-1 text-sm rounded-full ${getStatusColor(status)}`}>
          {status}
        </span>
      </div>
      <p className="text-sm text-gray-500">ID: {id}</p>
      <p className="text-gray-700 font-medium mt-2">
        Monto: ${amount.toLocaleString()}
      </p>
      <p className="text-sm text-gray-500">
        Fecha: {new Date(date).toLocaleDateString("es-AR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}
      </p>
    </div>
  );
};

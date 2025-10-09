import React from "react";

interface KpiCardProps {
  label: string;
  value: string | number;
  color: string;
}
export const KpiCard: React.FC<KpiCardProps> = ({ label, value, color }) => (
  <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
    <p className="text-sm text-gray-600">{label}</p>
    <p className={`text-2xl font-semibold ${color}`}>{value}</p>
  </div>
);

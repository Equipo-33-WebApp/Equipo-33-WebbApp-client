import React from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

interface LineChartCardProps {
  title: string;
  data: { 
    month: string;
    approved: number;
    rejected: number;
    pending: number 
  }[];
}
export const LineChartCard: React.FC<LineChartCardProps> = ({ title, data }) => {
  const legend = [
    { name: "Aprobadas", color: "#22c55e" },
    { name: "Pendientes", color: "#facc15" },
    { name: "Rechazadas", color: "#ef4444" },
  ];

  return (
    <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hidden md:block">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">{title}</h2>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 min-w-[320px] h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="approved" stroke="#22c55e" name="Aprobadas" />
              <Line type="monotone" dataKey="rejected" stroke="#ef4444" name="Rechazadas" />
              <Line type="monotone" dataKey="pending" stroke="#facc15" name="Pendientes" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-col justify-center gap-2">
          {legend.map((d) => (
            <div key={d.name} className="flex items-center gap-2 text-sm text-gray-700">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }}></span>
              {d.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

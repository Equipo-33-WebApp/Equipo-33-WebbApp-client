import React from "react";
import { PieChart, Pie, Cell } from "recharts";

interface PieChartCardProps {
  title: string;
  data: { 
    name: string;
    value: number;
    color: string 
  }[];
}
export const PieChartCard: React.FC<PieChartCardProps> = ({ title, data }) => (
  <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center">
    <h2 className="text-lg font-semibold mb-4 text-gray-800">{title}</h2>
    <PieChart width={240} height={240}>
      <Pie data={data} dataKey="value" nameKey="name" outerRadius={90} label>
        {data.map((d, i) => (
          <Cell key={i} fill={d.color} />
        ))}
      </Pie>
    </PieChart>
    <div className="flex flex-wrap justify-center gap-4 mt-3">
      {data.map((d) => (
        <div key={d.name} className="flex items-center gap-2 text-sm text-gray-700">
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }}></span>
          {d.name}
        </div>
      ))}
    </div>
  </div>
);

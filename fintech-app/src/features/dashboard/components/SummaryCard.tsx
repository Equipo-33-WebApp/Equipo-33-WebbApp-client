interface SummaryCardProps {
  label: string;
  value: number;
  color?: string;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ label, value, color = "" }) => (
  <div className={`p-5 rounded-2xl shadow-md border flex flex-col justify-between ${color}`}>
    <div className="flex items-center justify-between">
      <p className="text-sm font-medium text-gray-700">{label}</p>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
  </div>
);
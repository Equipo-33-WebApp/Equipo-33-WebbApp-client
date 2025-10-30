import { DotFilledIcon } from "@/components/icons"

interface RequirementsInfoCardProps {
  title: string
  data: string[]
}

export const RequirementsInfoCard: React.FC<RequirementsInfoCardProps> = ({ title, data }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      <ul className="space-y-2 text-sm text-gray-700">
        {data.map((d) => (
          <li key={d} className="flex items-center gap-2">
            <DotFilledIcon classname="text-primary w-4 h-4" />
            {d}
          </li>
        ))}
      </ul>
    </div>
  )
}
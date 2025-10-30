import { useRequestForms } from "../hooks/useRequestForms"
import type { RequestDeclarations } from "../types"

interface RequestCheckboxCardProps {
  index: number
  title: string
  desc: string
  value: keyof RequestDeclarations
}

export const RequestCheckboxCard: React.FC<RequestCheckboxCardProps> = ({ index, title, desc, value }) => {

  const { formData, updateForm } = useRequestForms();

  const declarationsSection = "declarations";
  const checked = formData.declarations[value];

  return (
    <div key={index} className="border border-primary/40 rounded-xl p-4 space-y-2">
      <label className="flex items-start gap-2 cursor-pointer">
        <input 
        type="checkbox"
        checked={checked}
        onChange={(e) => updateForm(declarationsSection, value, e.target.checked)} 
        className="mt-1 cursor-pointer" 
        />
        <div>
          <h4 className="font-medium text-gray-800">{title}</h4>
          <p className="text-sm text-gray-600">{desc}</p>
        </div>
      </label>
    </div>
  )
}
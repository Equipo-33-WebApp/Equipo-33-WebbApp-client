import { countries, economicActivities } from "../../constants/requestData"

export const FundsSource: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">Origen de fondos</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        {/* Actividad economica */}
        <div>
          <label className="block text-sm text-gray-700 mb-1">Actividad Económica Principal</label>
          <select
            className="w-full rounded-lg p-3 bg-gray-50 text-gray-900 border border-gray-300 focus:ring-2 focus:ring-[var(--color-primary)] outline-none"
          >
            <option value="" disabled>Selecciona una actividad</option>
            {economicActivities.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>

        {/* Pais de Operaciones */}
        <div>
          <label className="block text-sm text-gray-700 mb-1">País de Operaciones</label>
          <select
            className="w-full rounded-lg p-3 bg-gray-50 text-gray-900 border border-gray-300 focus:ring-2 focus:ring-[var(--color-primary)] outline-none"
          >
            <option value="" disabled>Selecciona un país</option>
            {countries.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>

        {/* Proveedores (Opcional) */}
        <div>
          <label className="block text-sm text-gray-700 mb-1">
            Proveedores principales (opcional)
          </label>
          <textarea
            maxLength={500}
            className="w-full rounded-lg p-3 resize-none bg-gray-50 text-gray-900 border border-gray-300 focus:ring-2 focus:ring-[var(--color-primary)] outline-none"
            rows={3}
            placeholder="Especifica brevemente tus proveedores más importantes"
          />
        </div>

      </div>
    </div>
  )
} 
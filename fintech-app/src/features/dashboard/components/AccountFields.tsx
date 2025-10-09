import type { DashboardOperatorAccountDataForm, DashboardPymeAccountDataForm } from "../types";


export interface AccountFieldsProps {
  formData: DashboardPymeAccountDataForm | DashboardOperatorAccountDataForm
  isEditing: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export const AccountFields: React.FC<AccountFieldsProps> = ({ formData, isEditing, handleChange }) => {

  const isPyme = 
  (data: DashboardPymeAccountDataForm | DashboardOperatorAccountDataForm): 
  data is DashboardPymeAccountDataForm => "businessType" in data;

  return (
    <div className="grid sm:grid-cols-2 gap-4 pt-2">
      <div>
        <label className="text-sm text-gray-600">Nombre</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          disabled={!isEditing}
          onChange={handleChange}
          className={`mt-1 w-full rounded-lg border px-3 py-2 text-sm ${
            isEditing ? "border-gray-300" : "bg-gray-50 cursor-not-allowed"
          }`}
        />
      </div>

      <div>
        <label className="text-sm text-gray-600">Apellido</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          disabled={!isEditing}
          onChange={handleChange}
          className={`mt-1 w-full rounded-lg border px-3 py-2 text-sm ${
            isEditing ? "border-gray-300" : "bg-gray-50 cursor-not-allowed"
          }`}
        />
      </div>

      <div>
        <label className="text-sm text-gray-600">Correo electrónico</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          disabled
          className="mt-1 w-full rounded-lg border px-3 py-2 text-sm bg-gray-50 cursor-not-allowed"
        />
      </div>

      {isPyme(formData) ? (
        <div>
          <label className="text-sm text-gray-600">Tipo de empresa</label>
          <select
            name="businessType"
            value={formData.businessType}
            disabled={!isEditing}
            onChange={handleChange}
            className={`mt-1 w-full rounded-lg border px-3 py-2 text-sm ${
              isEditing ? "border-gray-300" : "bg-gray-50 cursor-not-allowed"
            }`}
          >
            <option value="">Seleccionar</option>
            <option value="PyME">PyME</option>
            <option value="Autónomo">Autónomo</option>
            <option value="Cooperativa">Cooperativa</option>
            <option value="Startup">Startup</option>
          </select>
        </div>
      ) : (
        <div>
          <label className="text-sm text-gray-600">Número de operador</label>
          <input
            type="text"
            name="operatorNumber"
            value={formData.operatorNumber}
            disabled={!isEditing}
            onChange={handleChange}
            className={`mt-1 w-full rounded-lg border px-3 py-2 text-sm ${
              isEditing ? "border-gray-300" : "bg-gray-50 cursor-not-allowed"
            }`}
          />
        </div>
      )}
    </div>

  );
}
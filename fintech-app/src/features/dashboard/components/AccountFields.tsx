import type { DashboardOperatorAccountDataForm, DashboardPymeAccountDataForm } from "../types";


export interface AccountFieldsProps {
  formData: DashboardPymeAccountDataForm | DashboardOperatorAccountDataForm
  isEditing: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export const AccountFields: React.FC<AccountFieldsProps> = ({ formData, isEditing, handleChange }) => {

  // const isPyme = 
  // (data: DashboardPymeAccountDataForm | DashboardOperatorAccountDataForm): 
  // data is DashboardPymeAccountDataForm => "sector" in data;

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
    </div>

  );
}
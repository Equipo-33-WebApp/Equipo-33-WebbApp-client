import defaultAvatar from "@/assets/defaultAvatar.webp"
import type { DashboardOperatorAccountDataForm, DashboardPymeAccountDataForm } from "../types";

export interface HeaderInfoProps {
  formData: DashboardPymeAccountDataForm | DashboardOperatorAccountDataForm
}

export const AvatarSection: React.FC<HeaderInfoProps> = ({ formData }) => (
  <div className="flex items-center gap-4">
    <img
      src={formData.avatar || defaultAvatar}
      alt="Avatar de usuario"
      className="w-16 h-16 rounded-full border object-cover ring-4 ring-accent/20"
    />
    <div>
      <h2 className="font-semibold text-lg text-gray-800">
        {formData.firstName} {formData.lastName}
      </h2>
      <p className="text-gray-500 text-sm">{formData.email}</p>
    </div>
  </div>
);
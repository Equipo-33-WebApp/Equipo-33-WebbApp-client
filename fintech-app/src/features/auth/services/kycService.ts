import { API_URL } from "@/constants/api";
import type { KycValidationData, KycResponse } from "../types";

export const uploadKyc = async (data: KycValidationData, token: string): Promise<KycResponse> => {
  const formData = new FormData();
  formData.append("nationalIdNumber", data.nationalIdNumber || "");
  if (data.idDocumentFront) formData.append("idDocumentFront", data.idDocumentFront);
  if (data.faceSelfie) formData.append("faceSelfie", data.faceSelfie);

  const res = await fetch(`${API_URL}/kycverification/verify_identity`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Error al verificar identidad: ${text}`);
  }

  return res.json();
};

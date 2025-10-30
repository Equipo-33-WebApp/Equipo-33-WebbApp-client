import { API_URL } from "@/constants/api";
import type { AmlResponse } from "../types";

export const amlVerification = async (token: string): Promise<AmlResponse> => {
  const res = await fetch(`${API_URL}/aml/check`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Error al verificar fiabilidad de la empresa: ${text}`);
  }

  return res.json();
};
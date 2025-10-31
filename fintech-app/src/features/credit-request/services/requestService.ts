import { API_URL } from "@/constants/api";
import type { CreateCreditRequestBody, CreateCreditRequestResponse, GetCreditRequestResponse, UpdateCreditRequestBody, UpdateCreditRequestResponse } from "../types";

export const createRequest = async (data: CreateCreditRequestBody, pymeId: string, token: string): Promise<CreateCreditRequestResponse> => {
  const res = await fetch(`${API_URL}/creditform`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ pymeId, ...data })
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Error al crear la solicitud de crédito: ${text}`);
  }

  return await res.json();
};

export const getDraftRequestData = async (token: string): Promise<GetCreditRequestResponse | null> => {
  const res = await fetch(`${API_URL}/creditform/auth`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (res.status === 404) return null;

  if (!res.ok) throw new Error("No se pudo obtener la solicitud");

  return res.json();
};

export const updateRequest = async (data: UpdateCreditRequestBody, creditFormId: string, token: string): Promise<UpdateCreditRequestResponse> => {
  const res = await fetch(`${API_URL}/creditform/${creditFormId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Error al actualizar la solicitud de crédito: ${text}`);
  }

  return await res.json();
};

export const finishRequest = async (data: UpdateCreditRequestBody, creditFormId: string, token: string): Promise<UpdateCreditRequestResponse> => {
  const parsedData = { ...data, status: "Pending" }

  const res = await fetch(`${API_URL}/creditform/${creditFormId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(parsedData),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Error al actualizar la solicitud de crédito: ${text}`);
  }

  return await res.json();
};

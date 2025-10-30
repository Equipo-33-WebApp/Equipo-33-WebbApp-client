import { API_URL } from "@/constants/api";
import type { CreateCreditRequestResponse, UpdateCreditRequestBody, UpdateCreditRequestResponse } from "../types";

export const createRequest = async (pymeId: string, token: string): Promise<CreateCreditRequestResponse> => {
  const res = await fetch(`${API_URL}/creditform`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ pymeId }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Error al crear la solicitud de crédito: ${text}`);
  }

  return await res.json();
};

export const getDraftRequestData = async (creditFormId: string, token: string) => {
  const res = await fetch(`${API_URL}/creditform/${creditFormId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("No se pudo obtener la solicitud");
  return res.json();
};


export const getCurrentUserDraftRequestIdAndPymeId = async (token: string): Promise<{ creditFormId: string, pymeId: string }> => {
  const newRequest = {
    pymeId: "055c718a-2b23-490e-b90e-edd4f6885aea",
    amount: 0,
    termInMonths: 0,
    annualIncome: 0,
    netIncome: 0,
    creditDestination: "Capital de Trabajo",
    riskLevel: "High",
    status: "Draft",
    purpose: "Capital de Trabajo"
  }
  
  const res = await fetch(`${API_URL}/creditform/`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newRequest)
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Error al obtener la solicitud: ${text}`);
  }

  const data: UpdateCreditRequestResponse = await res.json();

  return { creditFormId: data.id, pymeId: data.pymeId };
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

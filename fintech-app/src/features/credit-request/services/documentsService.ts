import { API_URL } from "@/constants/api";
import type { UploadDocumentResponse } from "../types";

export async function uploadAnnualFinancials(token: string, creditFormId: string, file: File): Promise<UploadDocumentResponse> {
  const formData = new FormData();
  formData.append("File", file);

  const res = await fetch(`${API_URL}/uploadeddocument/upload/annualfinancials/${creditFormId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: formData
  });

  if (!res.ok) throw new Error("Error al subir archivo");

  return res.json();
}

export async function uploadTaxReturn(token: string, creditFormId: string, file: File): Promise<UploadDocumentResponse> {
  const formData = new FormData();
  formData.append("File", file);

  const res = await fetch(`${API_URL}/uploadeddocument/upload/taxreturn/${creditFormId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: formData
  });

  if (!res.ok) throw new Error("Error al subir archivo");

  return res.json();
}

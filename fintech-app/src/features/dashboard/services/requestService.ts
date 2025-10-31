import { STATUS_APPROVED, STATUS_DRAFT, STATUS_ONREVIEW, STATUS_PENDING, STATUS_REJECTED } from "@/constants/requestStatus";
import { API_URL } from "@/constants/api";
import { getToken } from "@/utils/getToken";
import type { RequestData } from "@/types";

export const fetchRequests = async (status?: string, page?: number, limit?: number) => {
  const token = getToken()
  const url = new URL(`${API_URL}/operatorPanel`);
  if (status) {
    url.searchParams.append('status', status);
  }
  if (page) {
    url.searchParams.append('page', String(page));
  }
  if (limit) {
    url.searchParams.append('pageSize', String(limit));
  }
  const res = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  });
  const resquests = await res.json();
  return resquests.data;
};

export const updateRequestStatus = async (id: string, status: string) => {
  const token = getToken()
  const res = await fetch(`${API_URL}/operatorpanel/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ status: status })
  });

  if (!res.ok)  {
  throw new Error(`Error al actualizar la solicitud (${res.status})`);
}

  return res.json();
};

export const calculateStats = (requests: RequestData[]) => {
  const total = requests.filter(r => r.status !== STATUS_DRAFT).length;
  const approved = requests.filter(r => r.status === STATUS_APPROVED).length;
  const pending = requests.filter(r => r.status === STATUS_PENDING).length;
  const onReview = requests.filter(r => r.status === STATUS_ONREVIEW).length;
  const rejected = requests.filter(r => r.status === STATUS_REJECTED).length;

  return { total, approved, pending, onReview, rejected };
};

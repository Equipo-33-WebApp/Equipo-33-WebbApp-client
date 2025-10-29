import { STATUS_APPROVED, STATUS_DRAFT, STATUS_ONREVIEW, STATUS_PENDING, STATUS_REJECTED } from "@/constants/requestStatus";
import { API_URL } from "@/constants/api";
import { getToken } from "@/utils/getToken";
import type { RequestData } from "@/types";

export const fetchRequests = async () => {
  const token = getToken()
  const res = await fetch(`${API_URL}/panel`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  });
  const resquests = await res.json();
  return resquests.data;
};

export const calculateStats = (requests: RequestData[]) => {
  const total = requests.filter(r => r.status !== STATUS_DRAFT).length;
  const approved = requests.filter(r => r.status === STATUS_APPROVED).length;
  const pending = requests.filter(r => r.status === STATUS_PENDING).length;
  const onReview = requests.filter(r => r.status === STATUS_ONREVIEW).length;
  const rejected = requests.filter(r => r.status === STATUS_REJECTED).length;

  return { total, approved, pending, onReview, rejected };
};

import { requestsMock } from "@/features/dashboard/mocks/requestsMock";
import { STATUS_APPROVED, STATUS_PENDING, STATUS_REJECTED } from "@/constants/requestStatus";

export const fetchRequests = async () => {
  // Conectar con backend
  return requestsMock;
};

export const calculateStats = (requests: typeof requestsMock) => {
  const total = requests.length;
  const approved = requests.filter(r => r.status === STATUS_APPROVED).length;
  const pending = requests.filter(r => r.status === STATUS_PENDING).length;
  const rejected = requests.filter(r => r.status === STATUS_REJECTED).length;

  return { total, approved, pending, rejected };
};

import { useState, useEffect } from "react";
import { fetchRequests, calculateStats } from "../services/requestService";
import type { DashboardRequestSummaryData } from "../types";
import type { RequestData } from "@/types";
import { useAuth } from "@/hooks/useAuth";
import { ROLE_OPERATOR } from "@/constants/roles";

export const useRequest = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardRequestSummaryData>(
    { total: 0, approved: 0, pending: 0, onReview: 0, rejected: 0 }
  );
  const [requests, setRequests] = useState<RequestData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadData = async (status?: string) => {
    if (user?.role !== ROLE_OPERATOR) {
      setRequests([]);
      return;
    }
    try {
      setIsLoading(true);
      setError(null);
      const requests = await fetchRequests(status);
      const filteredRequests = requests.filter((r: { status: string; }) => r.status !== 'Draft');
      setRequests(filteredRequests);
      setStats(calculateStats(requests));
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error al cargar las solicitudes'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === ROLE_OPERATOR) {
      loadData();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return { stats, requests, isLoading, error, reloadRequests: loadData };
};

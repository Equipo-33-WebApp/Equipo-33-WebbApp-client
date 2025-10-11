import { useState, useEffect } from "react";
import { fetchRequests, calculateStats } from "../services/requestService";
import type { DashboardRequestSummaryData } from "../types";

export const useRequestStats = () => {
  const [stats, setStats] = useState<DashboardRequestSummaryData>(
    { total: 0, approved: 0, pending: 0, rejected: 0 }
  );

  useEffect(() => {
    const loadData = async () => {
      const requests = await fetchRequests();
      setStats(calculateStats(requests));
    };
    loadData();
  }, []);

  return stats;
};

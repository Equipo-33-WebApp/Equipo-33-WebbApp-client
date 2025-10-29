import { useState, useEffect } from "react";
import { fetchRequests, calculateStats } from "../services/requestService";
import type { DashboardRequestSummaryData } from "../types";
import type { RequestData } from "@/types";

export const useRequest = () => {
  const [stats, setStats] = useState<DashboardRequestSummaryData>(
    { total: 0, approved: 0, pending: 0, onReview: 0, rejected: 0 }
  );
  const [requests, setRequests] = useState<RequestData[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const requests = await fetchRequests();
      setRequests(requests.filter((r: { status: string; }) => r.status !== 'Draft'));
      setStats(calculateStats(requests));
    };
    loadData();
  }, []);

  return { stats, requests };
};

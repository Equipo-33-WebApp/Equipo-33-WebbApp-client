import { useState, useEffect, useCallback } from 'react';
import { fetchPymeRequests } from '../services/pymeRequestService';
import type { RequestData } from '@/types';
import {
  STATUS_APPROVED,
  STATUS_DRAFT,
  STATUS_ONREVIEW,
  STATUS_PENDING,
  STATUS_REJECTED,
} from '@/constants/requestStatus';

interface PymeRequestsState {
  requests: RequestData[];
  isLoading: boolean;
  error: Error | null;
  reloadRequests: () => void;
  requestCounts: {
    pending: number;
    approved: number;
    rejected: number;
    onReview: number;
    draft: number;
    total: number;
  };
}

export const usePymeRequests = (): PymeRequestsState => {
  const [requests, setRequests] = useState<RequestData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [requestCounts, setRequestCounts] = useState({
    pending: 0,
    approved: 0,
    rejected: 0,
    onReview: 0,
    draft: 0,
    total: 0,
  });

  const loadRequests = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetchPymeRequests();
      if (response && Array.isArray(response.data)) {
        const data: RequestData[] = response.data;
        setRequests(data);

        const counts = {
          pending: data.filter((req) => req.status === STATUS_PENDING).length,
          approved: data.filter((req) => req.status === STATUS_APPROVED).length,
          rejected: data.filter((req) => req.status === STATUS_REJECTED).length,
          onReview: data.filter((req) => req.status === STATUS_ONREVIEW).length,
          draft: data.filter((req) => req.status === STATUS_DRAFT).length,
          total: data.length,
        };
        setRequestCounts(counts);
      } else {
        setRequests([]);
        setRequestCounts({
          pending: 0,
          approved: 0,
          rejected: 0,
          onReview: 0,
          draft: 0,
          total: 0,
        });
      }
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRequests();
  }, [loadRequests]);

  return { requests, isLoading, error, reloadRequests: loadRequests, requestCounts };
};

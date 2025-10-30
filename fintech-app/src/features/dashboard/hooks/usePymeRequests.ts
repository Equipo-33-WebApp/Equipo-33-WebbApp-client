import { useState, useEffect, useCallback } from 'react';
import { fetchPymeRequests } from '../services/pymeRequestService';
import type { RequestData } from '@/types';

interface PymeRequestsState {
  requests: RequestData[];
  isLoading: boolean;
  error: Error | null;
  reloadRequests: () => void;
}

export const usePymeRequests = (): PymeRequestsState => {
  const [requests, setRequests] = useState<RequestData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const loadRequests = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetchPymeRequests();
      // Assuming the API returns an object with a `requests` property which is an array
      if (response && Array.isArray(response.requests)) {
        setRequests(response.requests);
      } else {
        // Handle cases where the response is not as expected
        setRequests([]);
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

  return { requests, isLoading, error, reloadRequests: loadRequests };
};

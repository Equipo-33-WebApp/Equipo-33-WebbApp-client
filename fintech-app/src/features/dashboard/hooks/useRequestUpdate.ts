import { useState } from 'react';
import { updateRequestStatus } from '../services/requestService';
import type { RequestData } from '@/types';

interface UseRequestUpdateReturn {
  isLoading: boolean;
  error: Error | null;
  updateStatus: (requestId: string, newStatus: string) => Promise<void>;
  data: RequestData | null;
}

export const useRequestUpdate = (onSuccess?: () => void): UseRequestUpdateReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<RequestData | null>(null);

  const updateStatus = async (requestId: string, newStatus: string) => {
    try {
      setIsLoading(true);
      setError(null);
      setData(null);
      
      const updatedRequest = await updateRequestStatus(requestId, newStatus);
      setData(updatedRequest);
      onSuccess?.();
    } catch (err) {
      console.error('Error updating request:', err);
      const errorMessage = err instanceof Error ? err.message : 'Error al actualizar la solicitud';
      setError(new Error(errorMessage));
      setData(null);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    updateStatus,
    data
  };
};
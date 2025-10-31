import { useState, useEffect } from 'react';
import { getToken } from '@/utils/getToken';
import type { AmlCheck } from '@/types';
import { API_URL } from '@/constants/api';

export const useAmlChecks = () => {
  const [checks, setChecks] = useState<AmlCheck[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchAmlChecks = async () => {
      try {
        setIsLoading(true);
        const token = getToken();

        if (!token) {
          throw new Error('Authentication token not found.');
        }

        const response = await fetch(`${API_URL}/aml/my-checks`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ message: 'Failed to fetch AML checks' }));
          throw new Error(errorData.message || `Failed to fetch AML checks. Status: ${response.status}`);
        }

        const data: AmlCheck[] = await response.json();
        setChecks(data);

      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAmlChecks();
  }, []);

  return { checks, isLoading, error };
};

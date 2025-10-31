import { useState, useEffect } from 'react';
import { getToken } from '@/utils/getToken';
import type { AmlCheck } from '@/types';
import { API_URL } from '@/constants/api';

export const useOperatorAmlChecks = (pymeId: string | undefined) => {
  const [checks, setChecks] = useState<AmlCheck[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!pymeId) {
        setChecks([]);
        return;
    }

    const fetchAmlChecks = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const token = getToken();

        if (!token) {
          throw new Error('Authentication token not found.');
        }

        const response = await fetch(`${API_URL}/operatorpanel/aml-by-pyme${pymeId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ message: 'Failed to fetch AML checks for PyME' }));
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
  }, [pymeId]);

  return { checks, isLoading, error };
};

import { useState, useCallback } from 'react';
import { NewsflashesAPI, CreateNewsflashRequest } from '../services';

export function useCreateNewsflash() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createNewsflash = useCallback(async (newsflashData: CreateNewsflashRequest) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await NewsflashesAPI.createNewsflash(newsflashData);
      
      if (!response.success) {
        throw new Error('Failed to create newsflash');
      }

      return response.data.newsflash;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to create newsflash';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    createNewsflash,
    isLoading,
    error,
    clearError,
  };
}

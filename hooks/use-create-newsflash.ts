import { useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NewsflashesAPI, CreateNewsflashRequest } from '../services';

export function useCreateNewsflash() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createNewsflash = useCallback(async (newsflashData: CreateNewsflashRequest) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const response = await NewsflashesAPI.createNewsflash(newsflashData, token);
      
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

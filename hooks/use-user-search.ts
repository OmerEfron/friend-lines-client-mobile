import { useState, useCallback } from 'react';
import { UsersAPI, SearchUsersResponse } from '../services';

export function useUserSearch() {
  const [users, setUsers] = useState<SearchUsersResponse['data']['users']>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchUsers = useCallback(async (query: string) => {
    if (!query.trim()) return;

    try {
      setIsLoading(true);
      setError(null);

      const response = await UsersAPI.searchUsers(
        { q: query, page: 1, limit: 50 }
      );

      if (response.success && response.data) {
        setUsers(response.data.users);
      } else {
        setError('Failed to search users');
      }
    } catch (err) {
      console.error('Error searching users:', err);
      setError('Failed to search users. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearResults = useCallback(() => {
    setUsers([]);
    setError(null);
  }, []);

  return {
    users,
    isLoading,
    error,
    searchUsers,
    clearResults,
  };
}

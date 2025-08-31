import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FriendshipsAPI, FriendshipsListResponse } from '../services';
import { useAuth } from '../contexts/auth-context';

export function useFriends() {
  const [friends, setFriends] = useState<FriendshipsListResponse['data']['friends']>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { user } = useAuth();

  const fetchFriends = useCallback(async (pageNum: number = 1, append: boolean = false) => {
    if (!user) return;

    try {
      setIsLoading(true);
      setError(null);

      const token = await AsyncStorage.getItem('token');
      if (!token) {
        setError('Authentication token not found');
        return;
      }

      const response = await FriendshipsAPI.getFriendsList(token, pageNum, 20);

      if (response.success && response.data) {
        const newFriends = response.data.friends;
        const pagination = response.data.pagination;

        if (append) {
          setFriends(prev => [...prev, ...newFriends]);
        } else {
          setFriends(newFriends);
        }

        // Handle missing pagination data gracefully
        if (pagination) {
          setHasMore(pageNum < pagination.totalPages);
        } else {
          // If no pagination data, assume no more pages if we got fewer than 20 items
          setHasMore(newFriends.length >= 20);
        }
        setPage(pageNum);
      }
    } catch (err) {
      console.error('Error fetching friends:', err);
      setError('Failed to fetch friends. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const refresh = useCallback(() => {
    fetchFriends(1, false);
  }, [fetchFriends]);

  const loadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      fetchFriends(page + 1, true);
    }
  }, [fetchFriends, isLoading, hasMore, page]);

  useEffect(() => {
    if (user) {
      refresh();
    }
  }, [user, refresh]);

  return {
    friends,
    isLoading,
    error,
    hasMore,
    refresh,
    loadMore,
  };
}

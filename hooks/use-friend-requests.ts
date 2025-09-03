import { useState, useEffect, useCallback } from 'react';
import { FriendshipsAPI, PendingRequestsResponse } from '../services';
import { useAuth } from '../contexts/auth-context';

export function useFriendRequests() {
  const [requests, setRequests] = useState<PendingRequestsResponse['data']['requests']>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { user } = useAuth();

  const fetchRequests = useCallback(async (pageNum: number = 1, append: boolean = false) => {
    if (!user) return;

    try {
      setIsLoading(true);
      setError(null);

      const response = await FriendshipsAPI.getPendingRequests(pageNum, 20);

      if (response.success && response.data) {
        const newRequests = response.data.requests;
        const pagination = response.data.pagination;

        if (append) {
          setRequests(prev => [...prev, ...newRequests]);
        } else {
          setRequests(newRequests);
        }

        // Handle missing pagination data gracefully
        if (pagination) {
          setHasMore(pageNum < pagination.totalPages);
        } else {
          // If no pagination data, assume no more pages if we got fewer than 20 items
          setHasMore(newRequests.length >= 20);
        }
        setPage(pageNum);
      }
    } catch (err) {
      console.error('Error fetching friend requests:', err);
      setError('Failed to fetch friend requests. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const refresh = useCallback(() => {
    fetchRequests(1, false);
  }, [fetchRequests]);

  const loadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      fetchRequests(page + 1, true);
    }
  }, [fetchRequests, isLoading, hasMore, page]);

  useEffect(() => {
    if (user) {
      refresh();
    }
  }, [user, refresh]);

  return {
    requests,
    isLoading,
    error,
    hasMore,
    refresh,
    loadMore,
  };
}

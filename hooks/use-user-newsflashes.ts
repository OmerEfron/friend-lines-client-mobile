import { useState, useEffect, useCallback } from 'react';
import { ProfileAPI } from '../services/profile-api';
import { UserNewsflashesResponse } from '../types/profile';
import { useAuth } from '../contexts/auth-context';

interface NewsflashWithAuthor {
  _id: string;
  authorId: string;
  content: string;
  targetType: 'friends' | 'group';
  targetId?: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  author: {
    uuid: string;
    username: string;
    fullName: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  };
}

interface UseUserNewsflashesResult {
  newsflashes: NewsflashWithAuthor[];
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
  refresh: () => Promise<void>;
  loadMore: () => Promise<void>;
}

export function useUserNewsflashes(userId?: string): UseUserNewsflashesResult {
  const { user } = useAuth();
  const [newsflashes, setNewsflashes] = useState<NewsflashWithAuthor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchNewsflashes = useCallback(async (page: number = 1, append: boolean = false) => {
    try {
      if (page === 1) {
        setIsLoading(true);
      }
      setError(null);

      // Use the provided userId, or current user's ID if no userId provided
      const targetUserId = userId || user?.uuid;
      
      if (!targetUserId) {
        setError('User not found');
        return;
      }

      const response = await ProfileAPI.getUserNewsflashes(targetUserId, page, 20);

      if (response.success && response.data?.newsflashes) {
        const newNewsflashes = response.data.newsflashes;
        
        if (append) {
          setNewsflashes(prev => [...prev, ...newNewsflashes]);
        } else {
          setNewsflashes(newNewsflashes);
        }

        const { pagination } = response.data;
        setHasMore(pagination.page < pagination.totalPages);
        setCurrentPage(page);
      } else {
        setError('Failed to load newsflashes');
      }
    } catch (err) {
      console.error('Error fetching user newsflashes:', err);
      setError(err instanceof Error ? err.message : 'Failed to load newsflashes');
    } finally {
      setIsLoading(false);
    }
  }, [userId, user?.uuid]);

  const refresh = useCallback(async () => {
    await fetchNewsflashes(1, false);
  }, [fetchNewsflashes]);

  const loadMore = useCallback(async () => {
    if (!isLoading && hasMore) {
      await fetchNewsflashes(currentPage + 1, true);
    }
  }, [fetchNewsflashes, isLoading, hasMore, currentPage]);

  useEffect(() => {
    fetchNewsflashes(1, false);
  }, [fetchNewsflashes]);

  return {
    newsflashes,
    isLoading,
    error,
    hasMore,
    refresh,
    loadMore,
  };
}

import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NewsflashesAPI, MyFeedResponse } from '../services';
import { useAuth } from '../contexts/auth-context';

export function useNewsflashes() {
  const [newsflashes, setNewsflashes] = useState<MyFeedResponse['data']['newsflashes']>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { user } = useAuth();

  const fetchNewsflashes = useCallback(async (pageNum: number = 1, append: boolean = false) => {
    if (!user) {
      console.log('🔒 [useNewsflashes] No user available, skipping fetch');
      return;
    }
    
    try {
      setIsLoading(true);
      setError(null);
      
      // Get token from AsyncStorage
      const token = await AsyncStorage.getItem('token');
      console.log('🔑 [useNewsflashes] Token retrieved:', token ? 'exists' : 'missing');
      
      if (!token || token === 'registration-complete' || token.trim() === '') {
        setError('No valid authentication token found. Please login again.');
        setIsLoading(false);
        return;
      }
      
      console.log('🔑 [useNewsflashes] Token length:', token.length);
      console.log('🔑 [useNewsflashes] Token starts with:', token.substring(0, 20) + '...');
      
      console.log('🌐 [useNewsflashes] Fetching newsflashes for page:', pageNum);
      const response = await NewsflashesAPI.getMyFeed(token, pageNum, 20);
      
      if (response.success && response.data) {
        const newNewsflashes = response.data.newsflashes;
        const pagination = response.data.pagination;
        
        // Debug logging to see the actual structure
        console.log('📰 [useNewsflashes] Raw newsflashes response:', {
          count: newNewsflashes.length,
          firstNewsflash: newNewsflashes[0] ? {
            id: newNewsflashes[0]._id,
            content: newNewsflashes[0].content?.substring(0, 50) + '...',
            hasAuthor: !!newNewsflashes[0].author,
            authorKeys: newNewsflashes[0].author ? Object.keys(newNewsflashes[0].author) : 'no author'
          } : 'no newsflashes'
        });
        
        if (append) {
          setNewsflashes(prev => [...prev, ...newNewsflashes]);
        } else {
          setNewsflashes(newNewsflashes);
        }
        
        setHasMore(pageNum < pagination.totalPages);
        setPage(pageNum);
        console.log('✅ [useNewsflashes] Successfully fetched', newNewsflashes.length, 'newsflashes');
      }
    } catch (err) {
      console.error('💥 [useNewsflashes] Error fetching newsflashes:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch newsflashes');
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const refresh = useCallback(() => {
    console.log('🔄 [useNewsflashes] Refreshing newsflashes...');
    fetchNewsflashes(1, false);
  }, [fetchNewsflashes]);

  const loadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      console.log('📄 [useNewsflashes] Loading more newsflashes...');
      fetchNewsflashes(page + 1, true);
    }
  }, [fetchNewsflashes, isLoading, hasMore, page]);

  useEffect(() => {
    // Add a small delay to ensure the token is available after login
    const timer = setTimeout(() => {
      if (user) {
        console.log('⏰ [useNewsflashes] User available, starting to fetch newsflashes...');
        refresh();
      }
    }, 500); // 500ms delay

    return () => clearTimeout(timer);
  }, [user, refresh]);

  return {
    newsflashes,
    isLoading,
    error,
    hasMore,
    refresh,
    loadMore,
  };
}

import { useState, useEffect, useCallback } from 'react';
import { GroupsAPI } from '../services/groups-api';
import { NewsflashWithAuthor } from '../services/newsflashes-api';

export function useGroupFeed(groupId: string) {
  const [newsflashes, setNewsflashes] = useState<NewsflashWithAuthor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchGroupNewsflashes = useCallback(async (pageNum: number = 1, append: boolean = false) => {
    if (!groupId) {
      console.log('🔒 [useGroupFeed] No groupId provided');
      return;
    }
    
    try {
      setIsLoading(true);
      setError(null);
      
      console.log('🌐 [useGroupFeed] Fetching group newsflashes for page:', pageNum);
      const response = await GroupsAPI.getGroupNewsflashes(groupId, pageNum, 20);
      
      console.log('📰 [useGroupFeed] Raw API response:', JSON.stringify(response, null, 2));
      
      if (response.success && response.data) {
        const rawNewsflashes = response.data.newsflashes || [];
        
        // Transform group newsflashes to match NewsflashWithAuthor format
        const newNewsflashes = rawNewsflashes.map((newsflash: any) => ({
          ...newsflash,
          author: {
            uuid: newsflash.authorId || 'unknown',
            username: newsflash.author?.fullName?.toLowerCase().replace(/\s+/g, '') || 'unknown',
            fullName: newsflash.author?.fullName || 'Unknown User',
            email: '',
            createdAt: '',
            updatedAt: '',
          }
        }));
        
        if (append) {
          setNewsflashes(prev => [...prev, ...newNewsflashes]);
        } else {
          setNewsflashes(newNewsflashes);
        }
        
        // Handle pagination
        const pagination = response.data.pagination;
        if (pagination) {
          setHasMore(pageNum < pagination.totalPages);
        } else {
          setHasMore(newNewsflashes.length >= 20);
        }
        setPage(pageNum);
        console.log('✅ [useGroupFeed] Successfully fetched', newNewsflashes.length, 'newsflashes');
      }
    } catch (err) {
      console.error('💥 [useGroupFeed] Error fetching group newsflashes:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch group newsflashes');
    } finally {
      setIsLoading(false);
    }
  }, [groupId]);

  const refresh = useCallback(() => {
    console.log('🔄 [useGroupFeed] Refreshing group newsflashes...');
    fetchGroupNewsflashes(1, false);
  }, [fetchGroupNewsflashes]);

  const loadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      console.log('📄 [useGroupFeed] Loading more group newsflashes...');
      fetchGroupNewsflashes(page + 1, true);
    }
  }, [fetchGroupNewsflashes, isLoading, hasMore, page]);

  useEffect(() => {
    if (groupId) {
      console.log('⏰ [useGroupFeed] GroupId available, starting to fetch newsflashes...');
      refresh();
    }
  }, [groupId, refresh]);

  return {
    newsflashes,
    isLoading,
    error,
    hasMore,
    refresh,
    loadMore,
  };
}

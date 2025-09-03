import { useState, useEffect, useCallback } from 'react';
import { GroupsAPI, GroupsListResponse } from '../services/groups-api';
import { useAuth } from '../contexts/auth-context';

export function useGroups() {
  const [groups, setGroups] = useState<GroupsListResponse['data']['groups']>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { user } = useAuth();

  const fetchGroups = useCallback(async (pageNum: number = 1, append: boolean = false) => {
    if (!user) {
      console.log('🔒 [useGroups] No user available, skipping fetch');
      return;
    }
    
    try {
      setIsLoading(true);
      setError(null);
      
      console.log('🌐 [useGroups] Fetching groups for page:', pageNum);
      const response = await GroupsAPI.getMyGroups(pageNum, 20);
      
      if (response.success && response.data) {
        const newGroups = response.data.groups;
        const pagination = response.data.pagination;
        
        if (append) {
          setGroups(prev => [...prev, ...newGroups]);
        } else {
          setGroups(newGroups);
        }
        
        if (pagination) {
          setHasMore(pageNum < pagination.totalPages);
        } else {
          setHasMore(newGroups.length >= 20);
        }
        setPage(pageNum);
        console.log('✅ [useGroups] Successfully fetched', newGroups.length, 'groups');
      }
    } catch (err) {
      console.error('💥 [useGroups] Error fetching groups:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch groups');
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const refresh = useCallback(() => {
    console.log('🔄 [useGroups] Refreshing groups...');
    fetchGroups(1, false);
  }, [fetchGroups]);

  const loadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      console.log('📄 [useGroups] Loading more groups...');
      fetchGroups(page + 1, true);
    }
  }, [fetchGroups, isLoading, hasMore, page]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (user) {
        console.log('⏰ [useGroups] User available, starting to fetch groups...');
        refresh();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [user, refresh]);

  return {
    groups,
    isLoading,
    error,
    hasMore,
    refresh,
    loadMore,
  };
}

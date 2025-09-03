import { useState } from 'react';
import { GroupsAPI, CreateGroupRequest } from '../services/groups-api';

export function useCreateGroup() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createGroup = async (groupData: CreateGroupRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      console.log('🏷️ [useCreateGroup] Creating group:', groupData);
      
      const response = await GroupsAPI.createGroup(groupData);
      
      if (response.success) {
        console.log('✅ [useCreateGroup] Group created successfully');
        return response.data.group;
      } else {
        throw new Error('Failed to create group');
      }
    } catch (err) {
      console.error('💥 [useCreateGroup] Error creating group:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to create group';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createGroup,
    isLoading,
    error,
  };
}

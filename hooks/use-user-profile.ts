import { useState, useEffect } from 'react';
import { ProfileAPI } from '../services/profile-api';
import { UserProfile, UserStats } from '../types/profile';

interface UseUserProfileResult {
  profile: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export function useUserProfile(userId?: string): UseUserProfileResult {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = userId 
        ? await ProfileAPI.getUserProfile(userId)
        : await ProfileAPI.getCurrentUserProfile();

      if (response.success && response.data?.user) {
        setProfile(response.data.user);
      } else {
        setError('Failed to load profile');
      }
    } catch (err) {
      console.error('Error fetching user profile:', err);
      setError(err instanceof Error ? err.message : 'Failed to load profile');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [userId]);

  return {
    profile,
    isLoading,
    error,
    refresh: fetchProfile,
  };
}

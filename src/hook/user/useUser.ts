import { useEffect } from 'react';
import { useUserStore } from '@/store/userStore';

/**
 * Hook to access user data
 * Automatically fetches user data on first load if not already loaded
 */
export const useUser = () => {
  const { user, isLoading, error, fetchUser } = useUserStore();
  
  useEffect(() => {
    if (!user && !isLoading) {
      fetchUser();
    }
  }, [user, isLoading, fetchUser]);

  return {
    user,
    isLoading,
    error,
    fetchUser
  };
}; 
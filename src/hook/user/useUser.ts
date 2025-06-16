import { useUserStore } from '@/store/userStore';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@/querykey';

/**
 * Hook to access user data
 * Automatically fetches user data on first load if not already loaded
 */
export const useUser = () => {
  const {user, isLoading, error, fetchUser } = useUserStore();

  const {
    data
  } = useQuery({
    queryKey: [QueryKeys.USER],
    queryFn: fetchUser,
  });

  return {
    user,
    isLoading,
    error,
    fetchUser,
  };
};

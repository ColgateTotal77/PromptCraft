import { useQuery } from '@tanstack/react-query';
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser';
import { fetchUserStats } from '@/features/user/api';

export const useUserStats = () => {
  const user = useCurrentUser();

  const query = useQuery({
    queryKey: [ 'user-stats', user?.id ],
    queryFn: () => fetchUserStats(user!.id),
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 5,
  });

  return {
    user,
    stats: query.data,
    isLoading: user === undefined || query.isLoading,
    isError: query.isError,
  };
};

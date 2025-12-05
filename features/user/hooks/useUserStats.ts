import { useQuery } from '@tanstack/react-query';
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser';
import { fetchUserStats } from '@/features/user/api';
import { LIMITS } from '@/lib/constants';

const mockData = {
  improverUsageCount: 0,
  extractorUsageCount: 0,
  isPro: false,
  limit: LIMITS.UNLOGGED,
  profile: {
    username: 'undefined',
    avatarUrl: null,
    email: 'undefined',
  },
};

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
    stats: query.data || mockData,
    isLoading: user === undefined || query.isLoading,
    isError: query.isError,
  };
};

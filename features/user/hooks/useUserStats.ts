'use client';

import { trpc } from '@/lib/trpc';
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser';
import { LIMITS } from '@/lib/constants';

const mockData = {
  improverUsageCount: 0,
  extractorUsageCount: 0,
  isPro: false,
  limit: LIMITS.UNLOGGED,
  profile: {
    username: 'Guest',
    avatarUrl: null,
    email: 'undefined',
  },
};

export const useUserStats = () => {
  const user = useCurrentUser();

  const query = trpc.getStats.useQuery(undefined, {
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

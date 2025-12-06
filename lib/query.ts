import { QueryClient } from '@tanstack/react-query';

export const query = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24,
    },
  },
});

export const queryKeys = {
  USER_STATS: 'userStats',
}

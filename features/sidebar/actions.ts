import { supabase } from '@/server/services/supabaseClient';
import { LIMITS } from '@/lib/constants';
import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { useQuery } from '@tanstack/react-query';

export type UserStatsData = {
  improverUsageCount: number;
  extractorUsageCount: number;
  isPro: boolean;
  limit: number;
  profile: {
    username: string | null;
    avatar_url: string | null;
    email: string | null;
  };
};

export const fetchUserStats = async (userId: string): Promise<UserStatsData | null> => {
  const toDay = new Date(new Date().setHours(0, 0, 0, 0)).toISOString();

  const [ profileRes, subRes, improverUsage, extractorUsage ] = await Promise.all([
    supabase.from('profiles').select('username, avatar_url, email').eq('id', userId).single(),
    supabase.from('subscriptions').select('status').eq('user_id', userId).in('status', [ 'active' ]).maybeSingle(),
    supabase.from('optimizedPrompts').select('*', {
      count: 'exact',
      head: true
    }).eq('user_id', userId).gte('created_at', toDay),
    supabase.from('extractedTemplates').select('*', {
      count: 'exact',
      head: true
    }).eq('user_id', userId).gte('created_at', toDay),
  ]);

  const isPro = !!subRes.data;

  return {
    improverUsageCount: improverUsage.count || 0,
    extractorUsageCount: extractorUsage.count || 0,
    isPro,
    limit: isPro ? LIMITS.PRO : LIMITS.FREE,
    profile: profileRes.data || {
      username: "undefined",
      avatar_url: null,
      email: "undefined",
    }
  };
};

export const useUserStats = () => {
  const [ user, setUser ] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const query = useQuery({
    queryKey: ['user-stats', user?.id],
    queryFn: () => fetchUserStats(user!.id),
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 5,
  })

  return {
    user,
    stats: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
  }
};

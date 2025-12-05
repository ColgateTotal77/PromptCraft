import { supabase } from '@/lib/supabaseClient';
import { LIMITS } from '@/lib/constants';
import { UserStatsData } from '@/features/user/types';

export const fetchUserStats = async (userId: string): Promise<UserStatsData> => {
  const toDay = new Date(new Date().setHours(0, 0, 0, 0)).toISOString();

  const [ profileRes, subRes, improverUsage, extractorUsage ] = await Promise.all([
    supabase.from('profiles')
      .select('username, avatarUrl, email')
      .eq('id', userId)
      .single(),
    supabase.from('subscriptions')
      .select('status')
      .eq('userId', userId)
      .in('status', [ 'active' ])
      .maybeSingle(),
    supabase.from('optimizedPrompts')
      .select('*', {
        count: 'exact',
        head: true
      })
      .eq('userId', userId)
      .gte('createdAt', toDay),
    supabase.from('extractedTemplates')
      .select('*', {
        count: 'exact',
        head: true
      })
      .eq('userId', userId)
      .gte('createdAt', toDay),
  ]);

  const isPro = !!subRes.data;

  return {
    improverUsageCount: improverUsage.count || 0,
    extractorUsageCount: extractorUsage.count || 0,
    isPro,
    limit: profileRes.data ? (isPro ? LIMITS.PRO : LIMITS.FREE) : LIMITS.UNLOGGED,
    profile: profileRes.data || {
      username: 'undefined',
      avatarUrl: null,
      email: 'undefined',
    }
  };
};

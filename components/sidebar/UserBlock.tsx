'use client';

import React from 'react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { DS } from '@/lib/design-system';
import { Loading } from '@/components/ui/loading';
import { UserStatsData, useUserStats } from '@/features/sidebar/actions';
import { LogOut } from 'lucide-react';
import { signInWithGitlab, signInWithGoogle, signOutUser } from '@/features/auth/actions';

const UserAvatar = ({ profile }: { profile: UserStatsData['profile'] }) => {
  return profile.avatar_url ? (
    <img
      src={ profile.avatar_url }
      alt={ `${ profile.username }'s avatar` }
      className={ cn(DS.avatar.base, DS.avatar.sm) }
    />
  ) : (
    <div className={ cn(DS.avatar.base, DS.avatar.sm) }>
      { profile.username?.[0]?.toUpperCase() || 'U' }
    </div>
  );
};

export function UserBlock() {
  const { user, stats, isLoading } = useUserStats();

  if (isLoading) return <Loading/>;
  if (!user) return (
    <div className={cn(DS.card.glass, 'flex flex-col gap-3 p-4 text-center shadow-md')}>
      <p className={cn(DS.text.metaMuted, 'text-sm mb-1')}>
        Sign in to track progress and unlock Pro limits.
      </p>

      <button
        onClick={signInWithGoogle}
        className={cn(DS.button.primary, 'w-full justify-center')}
      >
        Sign in with Google
      </button>

      <button
        onClick={signInWithGitlab}
        className={cn(DS.button.secondary, 'w-full justify-center')}
      >
        Sign in with Gitlab
      </button>

      <p className={cn(DS.text.metaMuted, 'text-xs mt-2')}>
        Your data is secured by Supabase Auth.
      </p>
    </div>
  );//temporary
  if (!stats) return <p className={DS.text.metaMuted}>Could not load usage data.</p>;
  const currentUsage = (stats.extractorUsageCount || 0) + (stats.improverUsageCount || 0);
  const limit = stats.limit;
  const progressPercentage = Math.min((currentUsage / limit) * 100, 100);
  const plan = stats.isPro ? 'Pro Plan' : 'Free Plan';

  return (
    <div className={ cn(DS.card.glass, 'flex flex-col gap-2 p-4') }>
      <div className="flex flex-col gap-4">
        <div className={ cn(DS.text.metaMuted, 'flex justify-between') }>
          <span>Daily Generations</span>
          <span>{ currentUsage } / { limit }</span>
        </div>
        <Progress value={ progressPercentage }/>
      </div>
      <div className="flex items-center gap-3">
        <UserAvatar profile={stats.profile} />
        <div className="flex-1 min-w-0">
          <p className={ cn(DS.text.h4, 'truncate') }>{ stats.profile.username }</p> {/*Todo check what is truncate*/ }
          <p className={ cn(DS.text.metaMuted, 'font-normal truncate') }>{ plan }</p>
        </div>
        <button
          className={ cn(DS.button.ghost, 'p-1 h-auto') }
          onClick={signOutUser}
        >
          <LogOut size={ 16 }/>
        </button>
      </div>
    </div>
  );
}

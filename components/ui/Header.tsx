'use client';

import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/server/services/supabaseClient';
import { UserAvatar } from '@/components/UserAvatar';
import { LoginDialog } from '@/components/ui/LoginDialog';

export function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setUser(data.session.user);
    });

    const { data: { subscription } } =
      supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user || null);
      });

    return () => subscription?.unsubscribe();
  }, []);

  return (
    <>
      <div className="absolute top-4 right-4 flex items-center gap-2 z-9999">
        {user?.user_metadata ? (
          <>
            <UserAvatar avatar_url={user.user_metadata.avatar_url} />
            <span className="font-medium">{user.user_metadata.nickname}</span>
          </>
        ) : (
          <button
            className="bg-gray-800 px-4 py-1 rounded"
            onClick={() => setDialogOpen(true)}
          >
            Login
          </button>
        )}
      </div>

      <LoginDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </>
  );
}

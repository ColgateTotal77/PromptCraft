'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/server/auth/supabaseClient';
import { User } from '@supabase/supabase-js';

export function Header () {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({data}) => {
      if (data.session) {
        setUser(data.session.user);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription?.unsubscribe();
  }, []);

  return (
    <header className="flex justify-between items-center p-4 border-b">
      <div className="text-xl font-bold">PromptCraft</div>
      <div>
        {user ? (
          <div className="flex items-center gap-2">
            <img
              src={user.user_metadata?.avatar_url || '/default-avatar.png'}
              alt="Avatar"
              className="w-8 h-8 rounded-full"
            />
            <span>{user.user_metadata?.nickname}</span>
          </div>
        ) : (
          <button className="bg-blue-600 text-white px-4 py-1 rounded">Login</button>
        )}
      </div>
    </header>
  );
}

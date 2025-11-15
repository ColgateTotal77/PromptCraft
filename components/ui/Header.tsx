'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/server/auth/supabaseClient';
import { User } from '@supabase/supabase-js';

export function Header() {
  const [ user, setUser ] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
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
    <div className="absolute top-4 right-4 flex items-center gap-2 z-9999">
      { user ? (
        <>
          <img
            src={ user.user_metadata.avatar_url || '/default-avatar.png' }
            alt="Avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="font-medium">{ user.user_metadata.nickname }</span>
        </>
      ) : (
        <button className="bg-gray-800 px-4 py-1 rounded">
          Login
        </button>
      ) }
    </div>
  );
}

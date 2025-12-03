'use client';

import { supabase } from '@/lib/supabaseClient';

export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${ window.location.origin }/auth/callback`
    }
  });

  if (error) console.error(error);
  return data;
}

export async function signInWithGitlab() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${ window.location.origin }/auth/callback`
    }
  });

  if (error) console.error(error);
  return data;
}

export async function signOutUser() {
  await supabase.auth.signOut();
}

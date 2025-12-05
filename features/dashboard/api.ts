import { createSupabase } from '@/lib/supabaseServer';
import { insertOptimizedPromptProps } from '@/features/dashboard/types';

export async function insertOptimizedPrompt(props: insertOptimizedPromptProps) {
  const supabase = await createSupabase();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { isSuccess: false, message: 'Unauthorized' };
  }

  const { data, error } = await supabase
    .from('optimizedPrompts')
    .insert([ { ...props, userId: user.id } ])
    .select();

  if (error) {
    console.error("Supabase Insertion Error:", error);
    return { isSuccess: false, message: 'Failed to create post.' };
  }

  return { isSuccess: true, message: 'Post created successfully!', data };
}

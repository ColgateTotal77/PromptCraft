import { createSupabase } from '@/lib/supabaseServer';
import { insertOptimizedPromptProps } from '@/features/dashboard/types/optimizerTypes';
import { insertExtractedTemplateProps } from '@/features/dashboard/types/extractorTypes';

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
    return { isSuccess: false, message: 'Failed to save prompt.' };
  }

  return { isSuccess: true, message: 'Prompt created successfully!', data };
}

export async function insertExtractedTemplate(props: insertExtractedTemplateProps) {
  const supabase = await createSupabase();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { isSuccess: false, message: 'Unauthorized' };
  }

  const { data, error } = await supabase
    .from('extractedTemplates')
    .insert([ { ...props, userId: user.id } ])
    .select();

  if (error) {
    console.error("Supabase Insertion Error:", error);
    return { isSuccess: false, message: 'Failed to save template.' };
  }

  return { isSuccess: true, message: 'Template created successfully!', data };
}

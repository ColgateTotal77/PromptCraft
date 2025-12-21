import { z } from 'zod';

export const LanguageSchema = z.enum(['MATCH_USER', 'ENGLISH']);
export type Language = z.infer<typeof LanguageSchema>;

export const LANGUAGE_LABELS: Record<Language, string> = {
  MATCH_USER: 'Auto',
  ENGLISH: 'English',
}

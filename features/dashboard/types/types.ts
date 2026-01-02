import { z } from 'zod';

export interface SettingDetail {
  label: string;
  tooltip: string;
}

export const LanguageSchema = z.enum(['MATCH_USER', 'ENGLISH']);
export type Language = z.infer<typeof LanguageSchema>;

export const LANGUAGE_DETAILS: Record<
  z.infer<typeof LanguageSchema>,
  SettingDetail
> = {
  MATCH_USER: {
    label: 'Auto-detect',
    tooltip:
      'The system will detect your input language and keep the optimized prompt in the same language.',
  },
  ENGLISH: {
    label: 'Always English',
    tooltip:
      'Translates and optimizes the prompt into English, regardless of the input language. Recommended for best AI performance.',
  },
};

export const langInstruction = (language: Language) => (
  language === 'MATCH_USER'
    ? "Detect user's language. Use ONLY that language."
    : 'Output EVERYTHING in English.'
)


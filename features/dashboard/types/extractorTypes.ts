import { z } from 'zod';
import { LanguageSchema } from '@/features/dashboard/types/types';

export const ExtractionSettingsSchema = z.object({
  language: LanguageSchema,
});

export type ExtractionSettings = z.infer<typeof ExtractionSettingsSchema>;

export const DEFAULT_EXTRACTION_SETTINGS: ExtractionSettings = {
  language: 'MATCH_USER',
};

export const ExtractedTemplateOutputSchema = z.object({
  template: z.string(),
  title: z.string(),
});

export type ExtractedTemplateOutput = z.infer<typeof ExtractedTemplateOutputSchema>;

export const InsertExtractedTemplatePropsSchema = z.object({
  title: z.string(),
  originalPrompt: z.string().min(1),
  extractedTemplate: z.string(),
  settings: ExtractionSettingsSchema,
});

export type InsertExtractedTemplateProps = z.infer<typeof InsertExtractedTemplatePropsSchema>;

import { z } from 'zod';
import { LanguageSchema } from '@/features/dashboard/types/types';

export const TemplateSyntaxSchema = z.enum([
  'SQUARE_BRACKETS',
  'HANDLEBARS',
  'DOLLAR_SIGN',
  'ANGLE_BRACKETS',
]);
export type TemplateSyntax = z.infer<typeof TemplateSyntaxSchema>;

export const GeneralizationLevelSchema = z.enum([
  'CONSERVATIVE',
  'BALANCED',
  'AGGRESSIVE',
]);
export type GeneralizationLevel = z.infer<typeof GeneralizationLevelSchema>;

export const SYNTAX_DISPLAY_LABELS: Record<TemplateSyntax, string> = {
  SQUARE_BRACKETS: 'Square Brackets [Data]',
  HANDLEBARS: 'Handlebars {{data}}',
  DOLLAR_SIGN: 'ES6 Template ${data}',
  ANGLE_BRACKETS: 'Angle Brackets <Data>',
};

export const GENERALIZATION_DISPLAY_LABELS: Record<GeneralizationLevel, string> = {
  CONSERVATIVE: 'Conservative (Entities only)',
  BALANCED: 'Balanced (Recommended)',
  AGGRESSIVE: 'Aggressive (Abstract Framework)',
};

export const ExtractionSettingsSchema = z.object({
  syntax: TemplateSyntaxSchema,
  level: GeneralizationLevelSchema,
  language: LanguageSchema,
});
export type ExtractionSettings = z.infer<typeof ExtractionSettingsSchema>;

export const DEFAULT_EXTRACTION_SETTINGS: ExtractionSettings = {
  syntax: 'SQUARE_BRACKETS',
  level: 'BALANCED',
  language: 'MATCH_USER',
};

export const TemplateVariableSchema = z.object({
  name: z.string(),
  label: z.string(),
  description: z.string().optional(),
  type: z.enum(['text', 'number', 'select', 'date']),
  defaultValue: z.string().optional(),
});
export type TemplateVariable = z.infer<typeof TemplateVariableSchema>;

export const ExtractedTemplateOutputSchema = z.object({
  template: z.string(),
  variables: z.array(TemplateVariableSchema),
  title: z.string(),
  description: z.string(),
});
export type ExtractedTemplateOutput = z.infer<typeof ExtractedTemplateOutputSchema>;

export const InsertExtractedTemplatePropsSchema = z.object({
  prompt: z.string().min(1),
  template: z.string().min(1),
});
export type InsertExtractedTemplateProps = z.infer<typeof InsertExtractedTemplatePropsSchema>;

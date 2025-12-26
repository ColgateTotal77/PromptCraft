import { z } from 'zod';
import { LanguageSchema } from '@/features/dashboard/types/types';

export const PromptFrameworkSchema = z.enum(['STANDARD', 'CO-STAR', 'RTF', 'TAG']);
export type PromptFramework = z.infer<typeof PromptFrameworkSchema>;

export const MissingInfoStrategySchema = z.enum([
  'USE_PLACEHOLDERS',
  'INFER_CREATIVELY',
  'ASK_QUESTIONS',
]);
export type MissingInfoStrategy = z.infer<typeof MissingInfoStrategySchema>;

export const FRAMEWORK_DISPLAY_LABELS: Record<PromptFramework, string> = {
  STANDARD: 'Standard Improvement',
  'CO-STAR': 'CO-STAR (Context, Obj...)',
  RTF: 'RTF (Role, Task, Format)',
  TAG: 'TAG (Task, Action, Goal)',
};

export const MISSING_INFO_DISPLAY_LABELS: Record<MissingInfoStrategy, string> = {
  USE_PLACEHOLDERS: 'Add Placeholders like [Data]',
  INFER_CREATIVELY: 'Infer Creatively',
  ASK_QUESTIONS: 'Ask Clarifying Questions',
};

export const OptimizationSettingsSchema = z.object({
  framework: PromptFrameworkSchema,
  missingInfo: MissingInfoStrategySchema,
  language: LanguageSchema,
});
export type OptimizationSettings = z.infer<typeof OptimizationSettingsSchema>;

export const DEFAULT_OPTIMIZER_SETTINGS: OptimizationSettings = {
  framework: 'STANDARD',
  missingInfo: 'USE_PLACEHOLDERS',
  language: 'MATCH_USER',
};

export const OptimizedPromptOutputSchema = z.object({
  scores: z.object({
    clarity: z.number().min(0).max(100),
    context: z.number().min(0).max(100),
  }),
  optimizedPrompt: z.string(),
  framework: PromptFrameworkSchema,
});
export type OptimizedPromptOutput = z.infer<typeof OptimizedPromptOutputSchema>;

export const InsertOptimizedPromptPropsSchema = z.object({
  prompt: z.string().min(1),
  optimizedPrompt: z.string(),
  scores: z.object({
    clarity: z.number(),
    context: z.number(),
  }),
  settings: OptimizationSettingsSchema,
});

export type InsertOptimizedPromptProps = z.infer<typeof InsertOptimizedPromptPropsSchema>;

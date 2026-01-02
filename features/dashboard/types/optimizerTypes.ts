import { z } from 'zod';
import {
  LanguageSchema,
  SettingDetail,
} from '@/features/dashboard/types/types';

export const PromptFrameworkSchema = z.enum([
  'MODULAR',
  'CO-STAR',
  'RTF',
  'TAG',
]);
export type PromptFramework = z.infer<typeof PromptFrameworkSchema>;

export const FRAMEWORK_DETAILS: Record<PromptFramework, SettingDetail> = {
  'MODULAR': {
    label: 'Modular (Best for Logic)',
    tooltip:
      'Highly structured approach using Role, Context, Task, and Constraints. Perfect for complex technical or creative tasks.',
  },
  'CO-STAR': {
    label: 'CO-STAR (Marketing)',
    tooltip:
      'Focuses on Context, Objective, Style, Tone, Audience, and Response. Ideal for social media and business communication.',
  },
  'RTF': {
    label: 'RTF (Role-Task-Format)',
    tooltip:
      'A concise framework that defines who the AI is, what the task is, and the specific output format.',
  },
  'TAG': {
    label: 'TAG (Task-Action-Goal)',
    tooltip:
      'Straightforward and action-oriented. Best for quick instructions where the end goal is the priority.',
  },
};

export const PromptVariableSchema = z.object({
  // originalPhrase: z.string(),
  category: z.string(),
  options: z.array(z.string()),
});

export const scoresSchema = z.object({
  clarity: z.number().min(0).max(100),
  context: z.number().min(0).max(100),
});

export const OptimizedPromptOutputSchema = z.object({
  scores: scoresSchema,
  optimizedPrompt: z.string(),
  variables: z.array(PromptVariableSchema),
  framework: PromptFrameworkSchema.optional(),
});

export type OptimizedPromptOutput = z.infer<typeof OptimizedPromptOutputSchema>;

export const OptimizationSettingsSchema = z.object({
  framework: PromptFrameworkSchema,
  language: LanguageSchema,
});

export type OptimizationSettings = z.infer<typeof OptimizationSettingsSchema>;

export const DEFAULT_OPTIMIZER_SETTINGS: z.infer<
  typeof OptimizationSettingsSchema
> = {
  framework: 'MODULAR',
  language: 'ENGLISH',
};

export const OptimizedPromptHistorySchema = z.object({
  id: z.string(),
  type: z.literal('optimized'),
  prompt: z.string(),
  settings: OptimizationSettingsSchema,
  scores: scoresSchema,
  optimizedPrompt: z.string(),
  createdAt: z.date(),
});

export type OptimizedPromptHistoryProps = z.infer<
  typeof OptimizedPromptHistorySchema
>;

// types/prompt-craft.ts

// Доступные фреймворки для оптимизации
export type PromptFramework =
  | 'STANDARD'   // Обычное улучшение (ясность + структура)
  | 'CO-STAR'    // Context, Objective, Style, Tone, Audience, Response
  | 'RTF'        // Role, Task, Format
  | 'TAG';       // Task, Action, Goal

export type MissingInfoStrategy =
  | 'USE_PLACEHOLDERS'
  | 'INFER_CREATIVELY';

export interface OptimizationSettings {
  framework?: PromptFramework;
  missingInfo?: MissingInfoStrategy;
  language?: 'MATCH_USER' | 'ENGLISH';
}

export const DEFAULT_SETTINGS: OptimizationSettings = {
  framework: 'STANDARD',
  missingInfo: 'USE_PLACEHOLDERS',
  language: 'MATCH_USER',
};

export interface OptimizedPromptOutput {
  scores: { clarity: number, context: number };
  optimized_prompt: string;
}

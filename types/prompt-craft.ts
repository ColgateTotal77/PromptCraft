// types/prompt-craft.ts

export const enum PromptFramework {
  STANDARD = 'STANDARD', // Обычное улучшение (ясность + структура)
  CO_STAR = 'CO-STAR',   // Context, Objective, Style, Tone, Audience, Response
  RTF = 'RTF',           // Role, Task, Format
  TAG = 'TAG',           // Task, Action, Goal
}

export const enum MissingInfoStrategy {
  USE_PLACEHOLDERS = 'USE_PLACEHOLDERS',
  INFER_CREATIVELY = 'INFER_CREATIVELY',
  ASK_QUESTIONS = 'ASK_QUESTIONS', //ToDo
}

export const enum Language {
  MATCH_USER = 'MATCH_USER',
  ENGLISH = 'ENGLISH',
}

export const FRAMEWORK_DISPLAY_LABELS: Record<PromptFramework, string> = {
  [PromptFramework.STANDARD]: 'Standard Improvement',
  [PromptFramework.CO_STAR]: 'CO-STAR (Context, Obj...)',
  [PromptFramework.RTF]: 'RTF (Role, Task, Format)',
  [PromptFramework.TAG]: 'TAG (Task, Action, Goal)',
};

export const MISSING_INFO_DISPLAY_LABELS: Record<MissingInfoStrategy, string> = {
  [MissingInfoStrategy.USE_PLACEHOLDERS]: 'Add Placeholders like [Data]',
  [MissingInfoStrategy.INFER_CREATIVELY]: 'Infer Creatively',
  [MissingInfoStrategy.ASK_QUESTIONS]: 'Ask Clarifying Questions',
};

export const LANGUAGE_LABELS: Record<Language, string> = {
  [Language.MATCH_USER]: 'Auto',
  [Language.ENGLISH]: 'English',
}

export interface OptimizationSettings {
  framework: PromptFramework;
  missingInfo: MissingInfoStrategy;
  language: Language;
}

export const DEFAULT_SETTINGS: OptimizationSettings = {
  framework: PromptFramework.STANDARD,
  missingInfo: MissingInfoStrategy.USE_PLACEHOLDERS,
  language: Language.MATCH_USER,
};

export interface OptimizedPromptOutput {
  scores: { clarity: number, context: number };
  optimized_prompt: string;
}

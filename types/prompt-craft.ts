// types/prompt-craft.ts

// Доступные фреймворки для оптимизации
export type PromptFramework =
  | 'STANDARD'   // Обычное улучшение (ясность + структура)
  | 'CO-STAR'    // Context, Objective, Style, Tone, Audience, Response
  | 'RTF'        // Role, Task, Format
  | 'TAG';       // Task, Action, Goal

// Стратегия работы с отсутствующей информацией
export type MissingInfoStrategy =
  | 'USE_PLACEHOLDERS' // Вставлять [INSERT DATA] (Рекомендовано для SaaS)
  | 'INFER_CREATIVELY'; // Пытаться угадать (Для новичков)

export interface OptimizationSettings {
  framework?: PromptFramework;       // Дефолт: STANDARD
  missingInfo?: MissingInfoStrategy; // Дефолт: USE_PLACEHOLDERS
  language?: 'MATCH_USER' | 'ENGLISH'; // Дефолт: MATCH_USER
}

// Дефолтные настройки
export const DEFAULT_SETTINGS: OptimizationSettings = {
  framework: 'STANDARD',
  missingInfo: 'USE_PLACEHOLDERS',
  language: 'MATCH_USER',
};

export interface OptimizedPromptOutput {
  scores: { clarity: number, context: number };
  optimized_prompt: string;
}

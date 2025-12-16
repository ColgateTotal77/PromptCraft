import { Language } from '@/features/dashboard/types/types';

// 1. Синтаксис переменных
// Важно, так как разные инструменты используют разный формат (Jinja2, LangChain, простой текст)
export const enum TemplateSyntax {
  SQUARE_BRACKETS = 'SQUARE_BRACKETS', // [Topic], [Audience] - для ручного ввода
  HANDLEBARS = 'HANDLEBARS',           // {{topic}}, {{audience}} - популярно в коде/email
  DOLLAR_SIGN = 'DOLLAR_SIGN',         // ${topic}, ${audience} - JS template literals
  ANGLE_BRACKETS = 'ANGLE_BRACKETS',   // <Topic>, <Audience> - классический стиль промптов
}

// 2. Уровень обобщения (Абстракции)
// Насколько сильно AI должен менять промпт.
export const enum GeneralizationLevel {
  CONSERVATIVE = 'CONSERVATIVE', // Заменять только конкретные имена/даты (Apple -> [Company])
  BALANCED = 'BALANCED',         // Оптимальный баланс (структура сохраняется, суть обобщается)
  AGGRESSIVE = 'AGGRESSIVE',     // Переписывает промпт в универсальный фреймворк
}

// --- Display Labels (для UI) ---

export const SYNTAX_DISPLAY_LABELS: Record<TemplateSyntax, string> = {
  [TemplateSyntax.SQUARE_BRACKETS]: 'Square Brackets [Data]',
  [TemplateSyntax.HANDLEBARS]: 'Handlebars {{data}}',
  [TemplateSyntax.DOLLAR_SIGN]: 'ES6 Template ${data}',
  [TemplateSyntax.ANGLE_BRACKETS]: 'Angle Brackets <Data>',
};

export const GENERALIZATION_DISPLAY_LABELS: Record<GeneralizationLevel, string> = {
  [GeneralizationLevel.CONSERVATIVE]: 'Conservative (Entities only)',
  [GeneralizationLevel.BALANCED]: 'Balanced (Recommended)',
  [GeneralizationLevel.AGGRESSIVE]: 'Aggressive (Abstract Framework)',
};

// --- Settings Types ---

export type ExtractionSettings = {
  syntax: TemplateSyntax;
  level: GeneralizationLevel;
  language: Language; // Используем тот же enum Language, что и в оптимизации
};

export const DEFAULT_EXTRACTION_SETTINGS: ExtractionSettings = {
  syntax: TemplateSyntax.SQUARE_BRACKETS,
  level: GeneralizationLevel.BALANCED,
  language: Language.MATCH_USER,
};

// --- Output Types ---

// Описание одной переменной, найденной AI
export type TemplateVariable = {
  name: string;        // например: "target_audience"
  label: string;       // для UI, например: "Target Audience"
  description?: string;// подсказка, что сюда писать
  type: 'text' | 'number' | 'select' | 'date'; // если включен SMART режим
  defaultValue?: string;
};

export type ExtractedTemplateOutput = {
  template: string;          // Сам текст шаблона с плейсхолдерами
  variables: TemplateVariable[]; // Список выявленных переменных (для генерации формы в UI)
  title: string;             // AI придумает название шаблону
  description: string;       // Краткое описание, что делает этот шаблон
};

// Props для сохранения/обработки
export type insertExtractedTemplateProps = {
  prompt: string;
  template: string;
}

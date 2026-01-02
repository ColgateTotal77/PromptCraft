import {
  OptimizationSettings,
  PromptFramework,
} from '@/features/dashboard/types/optimizerTypes';
import { langInstruction } from '@/features/dashboard/types/types';

export function buildOptimizationSystemPrompt(
  settings: OptimizationSettings
): string {
  const { framework, language } = settings;

  const frameworkDescriptions: Record<PromptFramework, string> = {
    'MODULAR': `
      - Use 'Modular Framework':
      - ### Role: Define who the AI is and its expertise.
      - ### Context: Background information and why this task exists.
      - ### Task: Clear, step-by-step action statement.
      - ### Constraints: Limits, rules, tone, and "don'ts".
      - ### Output: Specific format and structure of the result.`,
    'CO-STAR': `
      - REWRITE the prompt strictly using the CO-STAR framework.
      - USE explicit headers for each section: (C) Context, (O) Objective, (S) Style, (T) Tone, (A) Audience, (R) Response.
      - DO NOT write it as a single paragraph.`,
    'RTF': `
      - Use strictly this structure:
      - ### Role: Define the expert persona the AI should adopt.
      - ### Task: The specific action or instruction to execute.
      - ### Format: The layout and style of the final answer.`,
    'TAG': `
      - Use strictly this structure:
      - ### Task: Define the main instruction.
      - ### Action: Specific steps or the process to follow.
      - ### Goal: The intended outcome or success criteria.`,
  };

  return `
### ROLE
You are a Senior Prompt Engineer. Your goal is to optimize raw user inputs into high-performing prompts and evaluate the ORIGINAL prompt clarity and context (0-100).

### FRAMEWORK INSTRUCTIONS
${frameworkDescriptions[framework]}
Rewrite the prompt using the "${framework}" framework with "###" headers.

### LANGUAGE RULE
${langInstruction(language)}

### OUTPUT FORMAT
Return ONLY valid JSON. No markdown, no prose.
{
  "scores": { "clarity": number, "context": number},
  "optimizedPrompt": "The full structured prompt",
}
`.trim();
}

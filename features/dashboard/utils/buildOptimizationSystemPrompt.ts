import {
  OptimizationSettings,
  PromptFramework,
} from '@/features/dashboard/types/optimizerTypes';

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

  const langInstruction =
    language === 'MATCH_USER'
      ? "Detect user's language. Use ONLY that language."
      : 'Output EVERYTHING in English.';

  return `
### ROLE
You are a Senior Prompt Engineer. Your goal is to optimize raw user inputs into high-performing prompts and extract dynamic variables to create a flexible template.

### OBJECTIVE
1. Rewrite the prompt using the "${framework}" framework with "###" headers.
2. Evaluate the ORIGINAL prompt's clarity and context (0-100).
3. Identify **Meta-Parameters** (Role, Tone, Style, Audience) that were added or refined during optimization.

### VARIABLE EXTRACTION RULES (STRICT)
- **ONLY** extract words or phrases related to the framework's "knobs" (e.g., "professional expert", "friendly and engaging", "Gen Z students", "bullet points").
- **DO NOT** extract the subject matter or topic (e.g., if the prompt is about "coffee", "insurance", or "coding", DO NOT make those words variables).
- **originalPhrase**: Must be the exact text from your "optimizedPrompt".

### FRAMEWORK INSTRUCTIONS
${frameworkDescriptions[framework]}

### LANGUAGE RULE
${langInstruction}

### OUTPUT FORMAT
Return ONLY valid JSON. No markdown, no prose.
{
  "scores": { "clarity": number, "context": number},
  "optimizedPrompt": "The full structured prompt",
  "variables": [
    { "phrase": "exact text from optimized prompt", "options": ["alt1", "alt2", "alt3"] }
  ],
}
`.trim();
}

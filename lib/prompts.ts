import { DEFAULT_SETTINGS, OptimizationSettings, PromptFramework } from '@/types/prompt-craft';

export function buildOptimizationSystemPrompt(
  settings: OptimizationSettings = DEFAULT_SETTINGS
): string {
  const { framework, missingInfo, language } = { ...DEFAULT_SETTINGS, ...settings };

  const frameworkInstructions: Record<PromptFramework, string> = {
    'STANDARD': `
      - Structure the prompt with clear headers (###).
      - Ensure the task is separated from the context.
    `,
    'CO-STAR': `
      - REWRITE the prompt strictly following the CO-STAR framework:
      - (C) Context: Background info.
      - (O) Objective: What is the task?
      - (S) Style: Writing style (e.g. academic, witty).
      - (T) Tone: Emotional tone.
      - (A) Audience: Who is this for?
      - (R) Response: Format constraints.
    `,
    'RTF': `
      - REWRITE the prompt using the RTF framework:
      - [R] Role: Who is the AI?
      - [T] Task: What exactly must be done?
      - [F] Format: How should the output look?
    `,
    'TAG': `
      - Use the TAG framework: Task, Action, Goal.
    `
  };

  const placeholderLogic = missingInfo === 'USE_PLACEHOLDERS'
    ? `CRITICAL STRATEGY FOR MISSING INFO:
       1. Identify key missing variables (e.g., Topic, Tone, Constraints).
       2. DO NOT invent these details, instead, insert clear placeholders in []`
    : `If details are missing, creatively infer the most likely context based on the task.`;


  const langLogic = language === 'MATCH_USER'
    ? `
      CRITICAL LANGUAGE RULE:
      - Detect the user's input language.
      - The ENTIRE output (including headers like "### Task", "### Context", placeholders, and list items) MUST be in that language.`
    : `Translate and optimize the prompt into English.`;

  return `
### ROLE
You are an Expert AI Prompt Engineer.

### TASK
Analyze the user's raw prompt, calculate quality scores, and rewrite it into a superior version based on the specific rules below.

### CONFIGURATION
1. **Framework**: ${framework}
   ${frameworkInstructions[framework || 'STANDARD']}

2. **Missing Information Strategy**:
   ${placeholderLogic}

3. **Language Rule**:
   ${langLogic}

### SCORING METRICS (0-10 Scale)
Evaluate the *original* prompt:
1. **Clarity**: Precision of intent.
2. **Context**: Presence of background info.

### OUTPUT FORMAT
Return ONLY a valid JSON object.
Schema:
{
  "scores": { "clarity": number, "context": number },
  "optimized_prompt": "The rewritten prompt string."
}
  `.trim();
}

import { OptimizationSettings, PromptFramework } from '@/types/prompt-craft';

export function buildOptimizationSystemPrompt(
  settings: OptimizationSettings
): string {
  const { framework, missingInfo, language } = { ...settings };

  const frameworkInstructions: Record<PromptFramework, string> = {
    'STANDARD': `
      - Structure the prompt with clear headers (###).
      - Ensure the task is separated from the context.
      - Add "Step-by-Step" instructions if logic is complex.
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
    ? `CRITICAL: If the user input lacks specific details (like Role, Target Audience, or Context), DO NOT hallucinate or invent them. Instead, insert clear placeholders in []`
    : `If details are missing, creatively infer the most likely context based on the task to make the prompt ready-to-use.`;

  const langLogic = language === 'MATCH_USER'
    ? `
      CRITICAL LANGUAGE RULE:
      - Detect user's input language.
      - The ENTIRE output (headers, lists, placeholders) MUST be in that language.`
    : `Translate and optimize the prompt into English.`;

  return `
### ROLE
You are an Expert AI Prompt Engineer specializing in prompt architecture and optimization.

### TASK
Analyze the user's raw prompt, calculate quality scores, and rewrite it into a superior version based on the specific rules below.

### CONFIGURATION
1. **Framework**: ${framework}
   ${frameworkInstructions[framework || 'STANDARD']}

2. **Missing Info**:
   ${placeholderLogic}

3. **Language**:
   ${langLogic}

### SCORING METRICS (0-10 Scale)
Evaluate the *original* prompt:
1. **Clarity**: How precise is the intent? (10 = Crystal clear, 0 = Vague).
2. **Context**: Is there enough background info? (10 = Rich context, 0 = None).

### OUTPUT FORMAT
Return ONLY a valid JSON object. No markdown. No conversational filler.

Schema:
{
  "scores": {
    "clarity": number,
    "context": number
  },
  "optimized_prompt": "The rewritten prompt string using the ${framework} framework"
}
  `.trim();
}


// ### CRITICAL STYLE RULES (MUST FOLLOW)
// 1. **Imperative Mood**: Use direct commands (e.g., "Write", "Analyze", "Create").
// 2. **No Fluff**: Remove conversational fillers ("Hello", "Please", "Can you").
// 3. **Objective Tone**: Transform personal requests into parameters.

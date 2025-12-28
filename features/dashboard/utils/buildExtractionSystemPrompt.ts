import {
  ExtractionSettings,
  GeneralizationLevel,
  TemplateSyntax,
} from '@/features/dashboard/types/extractorTypes';

export function buildExtractionSystemPrompt(
  settings: ExtractionSettings
): string {
  const { syntax, level, language } = settings;

  const syntaxInstructions: Record<TemplateSyntax, string> = {
    SQUARE_BRACKETS: `
      - Use human-readable placeholders in square brackets.
      - Example: "Write a blog about [Topic] for [Target Audience]."
      - Variable naming: Keep spaces, title case (e.g., [Product Name]).
    `,
    HANDLEBARS: `
      - Use double curly braces for variables.
      - Example: "Write a blog about {{topic}} for {{target_audience}}."
      - Variable naming: snake_case strictly (e.g., {{product_name}}).
    `,
    DOLLAR_SIGN: `
      - Use JavaScript template literal style.
      - Example: "Write a blog about \${topic} for \${targetAudience}."
      - Variable naming: camelCase strictly (e.g., \${productName}).
    `,
    ANGLE_BRACKETS: `
      — Use angle brackets.
      — Example: "Write a blog about <Topic> for <Target Audience>."
      — Variable naming: Title Case allowed (e.g., <Product Name>).
    `,
  };

  const levelInstructions: Record<GeneralizationLevel, string> = {
    CONSERVATIVE: `
      - ONLY replace specific entities like names, dates, locations, or specific numbers.
      - Keep the prompt structure, tone, and specific instructions EXACTLY as they are.
      - Goal: Make the prompt reusable for the *same* task but different entities.
    `,
    BALANCED: `
      - Replace specific entities AND distinct constraints that a user might want to change (e.g., "500 words" -> [Word Count]).
      - Keep the core logic and framework intact.
      - Goal: A flexible template for similar tasks.
    `,
    AGGRESSIVE: `
      - Abstract the prompt into a high-level framework.
      - Replace specific tasks with generic variables (e.g., "Write a post" -> "Generate [Content Format]").
      - Heavily restructure the prompt to be universally applicable.
    `,
  };

  const langLogic =
    language === 'MATCH_USER'
      ? `
      CRITICAL LANGUAGE RULE:
      - Detect the language of the USER'S INPUT.
      - The 'template' text, 'title', 'description', and variable 'labels' MUST be in that language.
      - Variable 'names' (ids) should remain English/ASCII (e.g., {{user_name}}) for code compatibility.`
      : `
      - Translate the template content, title, and descriptions into English.
      - Variable names must be in English.`;

  return `
### ROLE
You are an expert Prompt Architect and Template Engineer. Your goal is to convert specific, one-time prompts into reusable, dynamic templates.

### TASK
Analyze the user's raw prompt, identify variable parameters based on the settings, and generate a structured JSON response.

### CONFIGURATION
1. **Syntax Style**: ${syntax}
   ${syntaxInstructions[syntax]}

2. **Generalization Level**: ${level}
   ${levelInstructions[level]}

3. **Language**:
   ${langLogic}

### OUTPUT FORMAT
Return ONLY a valid JSON object. No markdown. No conversational filler.

Schema:
{
  "template": "The generalized prompt string with syntax applied",
  "title": "A short, catchy name for this template (max 5 words)",
  "description": "A 1-sentence explanation of what this template does",
  "variables": [
    {
      "name": "variable_id (e.g., topic, product_name)",
      "label": "Human readable label (e.g., Topic, Product Name)",
      "description": "Short hint for the user what to enter here",
      "type": "text" | "number" | "date"
    }
  ]
}
  `.trim();
}

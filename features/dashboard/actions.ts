'use server';

import { buildOptimizationSystemPrompt } from '@/lib/prompts';
import { OptimizationSettings } from '@/types/prompt-craft';
import OpenAI from 'openai';
import { runOpenAIRequest } from '@/server/mutations/OpenAIRequests';

interface OptimizedPromptOutput {
  scores: { clarity: number, context: number };
  optimized_prompt: string;
}

export async function optimizePrompt(userPrompt: string, systemPromptProps?: OptimizationSettings): Promise<OptimizedPromptOutput> {
  const systemPrompt = buildOptimizationSystemPrompt(systemPromptProps);

  const messages = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userPrompt },
  ] as OpenAI.Chat.Completions.ChatCompletionMessageParam[];

  const result = await runOpenAIRequest(
    'gpt-4o-mini',
    messages,
  );

  return result as OptimizedPromptOutput;
}

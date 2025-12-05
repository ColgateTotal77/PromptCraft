'use server';

import OpenAI from 'openai';
import { buildOptimizationSystemPrompt } from '@/features/dashboard/utils/buildOptimizationSystemPrompt';
import { runOpenAIRequest } from '@/lib/openai';
import { insertOptimizedPromptProps, OptimizationSettings } from '@/features/dashboard/types';
import { insertOptimizedPrompt } from '@/features/dashboard/api';

interface OptimizedPromptOutput {
  scores: { clarity: number, context: number };
  optimizedPrompt: string;
}

export async function optimizePrompt(userPrompt: string, systemPromptProps: OptimizationSettings): Promise<OptimizedPromptOutput> {
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

export async function createPromptHistory(props: insertOptimizedPromptProps) {
  const result = await insertOptimizedPrompt(props)

  if (!result.isSuccess) {
    console.log(result.message)
  }

  console.log(result.message)
}

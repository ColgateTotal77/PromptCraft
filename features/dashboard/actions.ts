'use server';

import OpenAI from 'openai';
import { buildOptimizationSystemPrompt } from '@/features/dashboard/utils/buildOptimizationSystemPrompt';
import { runOpenAIRequest } from '@/lib/openai';
import { insertOptimizedPromptProps, OptimizationSettings } from '@/features/dashboard/types/optimizerTypes';
import { insertExtractedTemplate, insertOptimizedPrompt } from '@/features/dashboard/api';
import { buildExtractionSystemPrompt } from '@/features/dashboard/utils/buildExtractionSystemPrompt';
import {
  ExtractedTemplateOutput,
  ExtractionSettings, insertExtractedTemplateProps,
} from '@/features/dashboard/types/extractorTypes';

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

  console.log(result.message)
  return result;
}

export async function extractTemplate(userPrompt: string, systemPromptProps: ExtractionSettings): Promise<ExtractedTemplateOutput> {
  const systemPrompt = buildExtractionSystemPrompt(systemPromptProps);
  const messages = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userPrompt },
  ] as OpenAI.Chat.Completions.ChatCompletionMessageParam[];

  const result = await runOpenAIRequest(
    'gpt-4o-mini',
    messages,
  );

  console.log(JSON.stringify(result, null, 2))

  return result as ExtractedTemplateOutput;
}

export async function createExtractionHistory(props: insertExtractedTemplateProps) {
  const result = await insertExtractedTemplate(props)

  console.log(result.message)
  return result;
}

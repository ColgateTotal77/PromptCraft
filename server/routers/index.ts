import { protectedProcedure, router } from '../trpc';
import { z } from 'zod';
import { runOpenAIRequest } from '@/lib/openai';
import { buildOptimizationSystemPrompt } from '@/features/dashboard/utils/buildOptimizationSystemPrompt';
import { buildExtractionSystemPrompt } from '@/features/dashboard/utils/buildExtractionSystemPrompt';
import OpenAI from 'openai';
import { OptimizationSettingsSchema } from '@/features/dashboard/types/optimizerTypes';
import { ExtractionSettingsSchema } from '@/features/dashboard/types/extractorTypes';
import { LIMITS } from '@/lib/constants';

export const appRouter = router({
  optimize: protectedProcedure
    .input(z.object({
      userPrompt: z.string(),
      settings: OptimizationSettingsSchema,
    }))
    .mutation(async ({ input, ctx }) => {
      const systemPrompt = buildOptimizationSystemPrompt(input.settings);
      const messages = [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: input.userPrompt },
      ] as OpenAI.Chat.Completions.ChatCompletionMessageParam[];

      return await runOpenAIRequest('gpt-4o-mini', messages);
    }),

  saveOptimized: protectedProcedure
    .input(z.object({
      originalPrompt: z.string(),
      optimizedPrompt: z.string(),
      scores: z.object({ clarity: z.number(), context: z.number() }),
    }))
    .mutation(async ({ input, ctx }) => {
      const { data, error } = await ctx.supabase
        .from('optimizedPrompts')
        .insert([{ ...input, userId: ctx.user.id }])
        .select();

      if (error) throw new Error(error.message);
      return { isSuccess: true, message: 'Prompt created successfully!', data };
    }),

  extract: protectedProcedure
    .input(z.object({
      userPrompt: z.string(),
      settings: ExtractionSettingsSchema,
    }))
    .mutation(async ({ input }) => {
      const systemPrompt = buildExtractionSystemPrompt(input.settings);
      const messages = [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: input.userPrompt },
      ] as OpenAI.Chat.Completions.ChatCompletionMessageParam[];

      return await runOpenAIRequest('gpt-4o-mini', messages);
    }),

  saveExtracted: protectedProcedure
    .input(z.object({
      prompt: z.string(),
      template: z.string()
    }))
    .mutation(async ({ input, ctx }) => {
      const { data, error } = await ctx.supabase
        .from('extractedTemplates')
        .insert([ { ...input, userId: ctx.user.id } ])
        .select();

      if (error) throw new Error(error.message);
      return { isSuccess: true, message: 'Template created successfully!', data };
    }),

  getStats: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.user.id;
    const toDay = new Date(new Date().setHours(0, 0, 0, 0)).toISOString();

    const [profileRes, subRes, improverUsage, extractorUsage] = await Promise.all([
      ctx.supabase.from('profiles').select('username, avatarUrl, email').eq('id', userId).single(),
      ctx.supabase.from('subscriptions').select('status').eq('userId', userId).in('status', ['active']).maybeSingle(),
      ctx.supabase.from('optimizedPrompts').select('*', { count: 'exact', head: true }).eq('userId', userId).gte('createdAt', toDay),
      ctx.supabase.from('extractedTemplates').select('*', { count: 'exact', head: true }).eq('userId', userId).gte('createdAt', toDay),
    ]);

    const isPro = !!subRes.data;
    const limit = isPro ? LIMITS.PRO : LIMITS.FREE;

    return {
      improverUsageCount: improverUsage.count || 0,
      extractorUsageCount: extractorUsage.count || 0,
      isPro,
      limit,
      profile: profileRes.data || {
        username: 'Guest',
        avatarUrl: null,
        email: 'undefined',
      },
    };
  }),
});

export type AppRouter = typeof appRouter;

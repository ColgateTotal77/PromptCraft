import { protectedProcedure, router } from '../trpc';
import { z } from 'zod';
import { runOpenAIRequest } from '@/lib/openai';
import { buildOptimizationSystemPrompt } from '@/features/dashboard/utils/buildOptimizationSystemPrompt';
import { buildExtractionSystemPrompt } from '@/features/dashboard/utils/buildExtractionSystemPrompt';
import OpenAI from 'openai';
import {
  OptimizationSettingsSchema,
  OptimizedPromptOutputSchema,
} from '@/features/dashboard/types/optimizerTypes';
import { ExtractionSettingsSchema } from '@/features/dashboard/types/extractorTypes';
import { LIMITS } from '@/lib/constants';

export const appRouter = router({
  optimize: protectedProcedure
    .input(
      z.object({
        prompt: z.string(),
        settings: OptimizationSettingsSchema,
      })
    )
    .output(OptimizedPromptOutputSchema)
    .mutation(async ({ input, ctx }) => {
      const systemPrompt = buildOptimizationSystemPrompt(input.settings);
      const messages = [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: input.prompt },
      ] as OpenAI.Chat.Completions.ChatCompletionMessageParam[];

      const res = await runOpenAIRequest('gpt-4o-mini', messages);

      if (res.error) throw new Error(res.error.message);

      console.log('systemPrompt: ', systemPrompt);
      console.log('_____________________');
      console.log('res: ', JSON.stringify(res, null, 2));

      res.optimizedPrompt = res.optimizedPrompt.replace(
        /(?<!^|[\n\r])###\s*(?!\n)/gm,
        '\n### '
      );

      for (const variable of res.variables) {
        variable.options.push(variable.phrase);
      }

      const { data, error } = await ctx.supabase
        .from('optimizedPrompts')
        .insert([
          {
            prompt: input.prompt,
            optimizedPrompt: res.optimizedPrompt,
            scores: res.scores,
            settings: input.settings,
            userId: ctx.user.id,
          },
        ])
        .select();

      if (error) throw new Error(error.message);
      return res;
    }),

  extract: protectedProcedure
    .input(
      z.object({
        userPrompt: z.string(),
        settings: ExtractionSettingsSchema,
      })
    )
    .mutation(async ({ input, ctx }) => {
      const systemPrompt = buildExtractionSystemPrompt(input.settings);
      const messages = [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: input.userPrompt },
      ] as OpenAI.Chat.Completions.ChatCompletionMessageParam[];

      const res = await runOpenAIRequest('gpt-4o-mini', messages);
      if (res.error) throw new Error(res.error.message);

      const { data, error } = await ctx.supabase
        .from('extractedTemplates')
        .insert([
          {
            prompt: input.userPrompt,
            template: res.template,
            userId: ctx.user.id,
          },
        ])
        .select();

      if (error) throw new Error(error.message);

      return res;
    }),

  getStats: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.user.id;
    const toDay = new Date(new Date().setHours(0, 0, 0, 0)).toISOString();

    const [profileRes, subRes, improverUsage, extractorUsage] =
      await Promise.all([
        ctx.supabase
          .from('profiles')
          .select('username, avatarUrl, email')
          .eq('id', userId)
          .single(),
        ctx.supabase
          .from('subscriptions')
          .select('status')
          .eq('userId', userId)
          .in('status', ['active'])
          .maybeSingle(),
        ctx.supabase
          .from('optimizedPrompts')
          .select('*', { count: 'exact', head: true })
          .eq('userId', userId)
          .gte('createdAt', toDay),
        ctx.supabase
          .from('extractedTemplates')
          .select('*', { count: 'exact', head: true })
          .eq('userId', userId)
          .gte('createdAt', toDay),
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
  getHistory: protectedProcedure
    .input(
      z.object({
        cursor: z
          .object({
            optimizedOffset: z.number(),
            templateOffset: z.number(),
          })
          .nullish(), // tRPC infinite queries use 'cursor'
        limit: z.number().min(1).max(100).default(10),
      })
    )
    .query(async ({ ctx, input }) => {
      const limit = input.limit;
      const optimizedOffset = input.cursor?.optimizedOffset ?? 0;
      const templateOffset = input.cursor?.templateOffset ?? 0;
      const userId = ctx.user.id;

      const [optimizedRes, extractedRes] = await Promise.all([
        ctx.supabase
          .from('optimizedPrompts')
          .select('id, createdAt, scores, optimizedPrompt, prompt, settings')
          .eq('userId', userId)
          .order('createdAt', { ascending: false })
          .range(optimizedOffset, optimizedOffset + limit - 1),

        ctx.supabase
          .from('extractedTemplates')
          .select('id, createdAt, isFavorite, prompt, template')
          .eq('userId', userId)
          .order('createdAt', { ascending: false })
          .range(templateOffset, templateOffset + limit - 1),
      ]);

      const optimizedData = (optimizedRes.data || []).map((d) => ({
        ...d,
        type: 'optimized' as const,
      }));

      const templateData = (extractedRes.data || []).map((d) => ({
        ...d,
        type: 'template' as const,
      }));

      const combinedData = [...optimizedData, ...templateData].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      return {
        items: combinedData,
        nextCursor:
          combinedData.length > 0
            ? {
                optimizedOffset: optimizedOffset + optimizedData.length,
                templateOffset: templateOffset + templateData.length,
              }
            : undefined,
      };
    }),
  updateFavorite: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        isFavorite: z.boolean(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { data, error } = await ctx.supabase
        .from('extractedTemplates')
        .update({ isFavorite: input.isFavorite })
        .eq('id', input.id)
        .eq('userId', ctx.user.id)
        .select();

      if (error) {
        console.error('Supabase Error:', error);
        throw new Error(error.message);
      }

      console.log('Updated Data:', data);

      if (!data || data.length === 0) {
        console.warn('No rows were updated. Check RLS or IDs.');
      }

      return true;
    }),
});

export type AppRouter = typeof appRouter;

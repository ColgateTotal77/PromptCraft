import { InsertOptimizedPromptPropsSchema } from '@/features/dashboard/types/optimizerTypes';
import z from 'zod';
import { InsertExtractedTemplatePropsSchema } from '@/features/dashboard/types/extractorTypes';
import PromptHistoryItem from '@/features/library/components/History/PromptHistoryItem';

export const OptimizedPromptHistorySchema = InsertOptimizedPromptPropsSchema.extend({
  createdAt: z.date(),
  type: z.literal('optimized'),
});
export type OptimizedPromptHistoryProps = z.infer<typeof OptimizedPromptHistorySchema>;

export const ExtractedTemplateHistorySchema = InsertExtractedTemplatePropsSchema.extend({
  isFavorite: z.boolean(),
  createdAt: z.date(),
  type: z.literal('template'),
});
export type ExtractedTemplateHistoryProps = z.infer<typeof ExtractedTemplateHistorySchema>;

interface HistoryItemProps {
  item: OptimizedPromptHistoryProps | ExtractedTemplateHistoryProps;
}

export default function HistoryItem({ item }: HistoryItemProps) {
  const { type, ...rest } = item;

  switch (type) {
    case 'optimized':
      return <PromptHistoryItem props={ item }/>;
  }
}

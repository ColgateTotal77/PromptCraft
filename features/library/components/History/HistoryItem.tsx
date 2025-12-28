import z from 'zod';
import { InsertExtractedTemplatePropsSchema } from '@/features/dashboard/types/extractorTypes';
import PromptHistoryItem from '@/features/library/components/History/PromptHistoryItem';
import TemplateHistoryItem from '@/features/library/components/History/TemplateHistoryItem';
import { OptimizedPromptHistoryProps } from '@/features/dashboard/types/optimizerTypes';

export const ExtractedTemplateHistorySchema =
  InsertExtractedTemplatePropsSchema.extend({
    isFavorite: z.boolean(),
    type: z.literal('template'),
    id: z.string(),
    createdAt: z.date(),
  });
export type ExtractedTemplateHistoryProps = z.infer<
  typeof ExtractedTemplateHistorySchema
>;

export type historyItem =
  | OptimizedPromptHistoryProps
  | ExtractedTemplateHistoryProps;

interface HistoryItemProps {
  item: historyItem;
}

export default function HistoryItem({ item }: HistoryItemProps) {
  const { type } = item;

  switch (type) {
    case 'optimized':
      return <PromptHistoryItem props={item} />;
    case 'template':
      return <TemplateHistoryItem props={item} />;
  }
}

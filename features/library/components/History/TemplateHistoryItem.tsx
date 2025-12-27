import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  Star,
  Code2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { DS } from '@/lib/design-system';
import { ExtractedTemplateHistoryProps } from '@/features/library/components/History/HistoryItem';
import { trpc } from '@/lib/trpc';

export default function TemplateHistoryItem({ props }: { props: ExtractedTemplateHistoryProps }) {
  const { id, prompt, template, type, createdAt, isFavorite } = props;
  const [isExpanded, setIsExpanded] = useState(false);

  const utils = trpc.useUtils();

  const favoriteMutation = trpc.updateFavorite.useMutation({
    onMutate: async ({ id, isFavorite: newFavoriteStatus }) => {
      await utils.getHistory.cancel();

      const previousData = utils.getHistory.getInfiniteData({ limit: 10 });

      utils.getHistory.setInfiniteData({ limit: 10 }, (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            items: page.items.map((item) =>
              item.id === id ? { ...item, isFavorite: newFavoriteStatus } : item
            ),
          })),
        };
      });

      return { previousData };
    },
    onError: (err, newVar, context) => {
      utils.getHistory.setInfiniteData({ limit: 10 }, context?.previousData);
    },
    onSettled: () => {
      utils.getHistory.invalidate();
    },
  });

  const onFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    favoriteMutation.mutate({
      id,
      isFavorite: !isFavorite,
    });
  };

  const onCopy = async () => {
    await navigator.clipboard.writeText(template);
  };

  return (
    <div className={cn(
      DS.card.base,
      DS.card.hoverable,
      'overflow-hidden transition-all duration-200',
      isExpanded ? 'shadow-md border-gray-300' : 'hover:border-gray-300'
    )}>
      <div
        className="grid grid-cols-[auto_1fr_auto] items-center gap-4 p-4 cursor-pointer select-none"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600">
          <Code2 size={18} />
        </div>

        <div className="min-w-0">
          <p className={cn(DS.text.body, 'truncate text-gray-700 font-medium')}>
            {prompt}
          </p>
          <div className="flex items-center gap-3 mt-0.5">
            <span className="text-[10px] uppercase tracking-wider font-bold text-indigo-500">{type}</span>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span className={DS.text.metaMuted}>{new Date(createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            className="flex items-center gap-3 cursor-pointer"
            onClick={onFavorite}
          >
            <Star
              size={14}
              className={cn(
                "text-indigo-500 transition-colors",
                isFavorite ? "fill-indigo-500" : "fill-white"
              )}
            />
          </button>

          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-gray-400"
          >
            <ChevronDown size={18} />
          </motion.div>
        </div>


      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className={cn(DS.utils.topBorder, "px-4 pb-4 flex flex-col gap-6")}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <span className={cn(DS.text.label, "text-[10px]")}>Source Request</span>
                  <div className={cn(DS.card.base, "p-4 bg-gray-50 text-gray-500 text-sm h-[200px] overflow-y-auto leading-relaxed border-dashed")}>
                    {prompt}
                  </div>
                </div>
                <div className="space-y-2">
                  <span className={cn(DS.text.label, "text-[10px] text-indigo-600")}>Extracted Template</span>
                  <div className={cn(DS.card.base, "p-4 border-indigo-100 bg-indigo-50/20 text-gray-900 text-sm h-[200px] overflow-y-auto font-mono leading-relaxed shadow-sm")}>
                    {template}
                  </div>
                </div>
              </div>

              <div className={ cn(DS.utils.topBorder, 'flex justify-end gap-2') }>
                <button
                  className={ cn(DS.button.base, DS.button.secondary, 'text-xs px-3 py-1.5') }
                  onClick={onCopy}
                >
                  Copy Result
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

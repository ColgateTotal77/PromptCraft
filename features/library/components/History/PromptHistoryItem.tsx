import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Globe, LayoutTemplate, Code2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DS } from '@/lib/design-system';
import { ScoreCard } from '@/components/ScoreCard';
import { FRAMEWORK_DETAILS, OptimizedPromptHistoryProps } from '@/features/dashboard/types/optimizerTypes';
import { LANGUAGE_DETAILS } from '@/features/dashboard/types/types';

export default function PromptHistoryItem({ props }: { props: OptimizedPromptHistoryProps }) {
  const { type, prompt, optimizedPrompt, scores, settings, createdAt } = props;
  const [ isExpanded, setIsExpanded ] = useState(false);

  const onCopy = async () => {
    await navigator.clipboard.writeText(optimizedPrompt);
  };

  return (
    <div className={ cn(
      DS.card.base,
      DS.card.hoverable,
      'overflow-hidden transition-all duration-200'
    ) }>
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
        { isExpanded && (
          <motion.div
            initial={ { height: 0, opacity: 0 } }
            animate={ { height: 'auto', opacity: 1 } }
            exit={ { height: 0, opacity: 0 } }
            transition={ { duration: 0.3, ease: 'easeInOut' } }
          >
            <div className={cn(DS.utils.topBorder, "px-4 pb-4 flex flex-col gap-6")}>

              <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-4 items-center bg-gray-50/80 p-3 rounded-xl border border-gray-100 mt-4">
                <div className="flex gap-3 md:border-r md:border-gray-200 md:pr-4">
                  <ScoreCard label="Clarity" score={scores.clarity} />
                  <ScoreCard label="Context" score={scores.context} />
                </div>

                <div className="flex flex-wrap gap-x-5 gap-y-2 px-1">
                  <div className="flex items-center gap-2">
                    <LayoutTemplate size={14} className="text-gray-400" />
                    <span className={DS.text.label}>Framework:</span>
                    <span className={DS.text.meta}>{FRAMEWORK_DETAILS[settings.framework].label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe size={14} className="text-gray-400" />
                    <span className={DS.text.label}>Lang:</span>
                    <span className={DS.text.meta}>{LANGUAGE_DETAILS[settings.language].label}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <span className={cn(DS.text.label, "text-[10px]")}>Original</span>
                  <div className={cn(DS.card.base, "p-4 bg-gray-50 text-gray-500 text-sm h-[200px] overflow-y-auto leading-relaxed border-dashed")}>
                    {prompt}
                  </div>
                </div>
                <div className="space-y-2">
                  <span className={cn(DS.text.label, "text-[10px] text-indigo-600")}>Optimized Result</span>
                  <div className={cn(DS.card.base, "p-4 border-indigo-100 bg-indigo-50/20 text-gray-900 text-sm h-[200px] overflow-y-auto font-mono leading-relaxed shadow-sm")}>
                    {optimizedPrompt}
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
        ) }
      </AnimatePresence>
    </div>
  );
}

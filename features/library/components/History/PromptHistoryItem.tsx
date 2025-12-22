import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Settings2, Globe, LayoutTemplate } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DS } from '@/lib/design-system';
import { OptimizedPromptHistoryProps } from '@/features/library/components/History/HistoryItem';
import { ScoreCard } from '@/components/ScoreCard';
import { FRAMEWORK_DISPLAY_LABELS, MISSING_INFO_DISPLAY_LABELS } from '@/features/dashboard/types/optimizerTypes';
import { LANGUAGE_LABELS } from '@/features/dashboard/types/types';

export default function PromptHistoryItem({ props }: { props: OptimizedPromptHistoryProps }) {
  const { prompt, optimizedPrompt, scores, settings, createdAt } = props;
  const [ isExpanded, setIsExpanded ] = useState(false);

  return (
    <div className={ cn(
      DS.card.base,
      DS.card.hoverable,
      'overflow-hidden transition-all duration-200'
    ) }>
      <div
        className="grid grid-cols-[1fr_auto_auto] items-center gap-4 p-4 cursor-pointer select-none"
        onClick={ () => setIsExpanded(!isExpanded) }
      >
        <div>
          <p className={ cn(DS.text.body, 'truncate') }>
            { prompt }
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className={ DS.text.metaMuted }>
            { new Date(createdAt).toLocaleDateString() }
          </span>
          <motion.div
            animate={ { rotate: isExpanded ? 180 : 0 } }
            transition={ { duration: 0.2 } }
            className="text-gray-400"
          >
            <ChevronDown size={ 18 }/>
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
            <div className={ cn(DS.utils.topBorder, 'px-4 pb-6 flex flex-col gap-6') }>

              <div className="flex flex-row gap-4">
                <div className="flex flex-col flex-wrap items-start justify-between gap-4">
                  { scores && (
                    <div className="flex gap-4">
                      <ScoreCard label="Clarity" score={ scores.clarity }/>
                      <ScoreCard label="Context" score={ scores.context }/>
                    </div>
                  ) }

                  <div className={ cn(DS.card.base, 'flex flex-col gap-2 bg-gray-100 p-4') }>
                    <span className={ cn(DS.text.label, 'mb-1') }>Optimization Specs</span>

                    <div className="flex items-center gap-2">
                      <LayoutTemplate size={ 14 } className="text-xs text-gray-400"/>
                      <span className={ DS.text.meta }>Framework:</span>
                      <span className={ DS.text.metaMuted }>{ FRAMEWORK_DISPLAY_LABELS[settings.framework] }</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Settings2 size={ 14 } className="text-xs text-gray-400"/>
                      <span className={ DS.text.meta }>Strategy:</span>
                      <span className={ DS.text.metaMuted }>{ MISSING_INFO_DISPLAY_LABELS[settings.missingInfo] }</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Globe size={ 14 } className="text-xs text-gray-400"/>
                      <span className={ DS.text.meta }>Language:</span>
                      <span className={ DS.text.metaMuted }>{ LANGUAGE_LABELS[settings.language] }</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="space-y-2">
                    <span className={ DS.text.label }>Original</span>
                    <div
                      className={ cn(DS.card.base, DS.card.glass, DS.text.body, 'p-4 max-h-[150px] overflow-y-auto') }>
                      { prompt }
                    </div>
                  </div>
                  <div className="space-y-2">
                    <span className={ DS.text.label }>Optimized Result</span>
                    <div
                      className={ cn(DS.card.base, DS.card.glass, DS.text.body, 'p-4 max-h-[150px] overflow-y-auto') }>
                      { optimizedPrompt }
                    </div>
                  </div>
                </div>
              </div>

              <div className={ cn(DS.utils.topBorder, 'flex justify-end gap-2') }>
                <button className={ cn(DS.button.base, DS.button.secondary, 'text-xs px-3 py-1.5') }>
                  Copy Result
                </button>
                <button className={ cn(DS.button.base, DS.button.primary, 'text-xs px-3 py-1.5') }>
                  Export PDF
                </button>
              </div>
            </div>
          </motion.div>
        ) }
      </AnimatePresence>
    </div>
  );
}

import { cn } from '@/lib/utils';
import { DS } from '@/lib/design-system';
import { OptimizerSettingsPopover } from '@/features/dashboard/components/PromptOptimizer/OptimizerSettingsPopover';
import { AnimatePresence, motion } from 'framer-motion';
import { Sparkles, Zap } from 'lucide-react';
import { OutputSection } from '@/features/dashboard/components/PromptOptimizer/OutputSection';
import React, { useState } from 'react';
import { DEFAULT_OPTIMIZER_SETTINGS, OptimizationSettings, OptimizedPromptOutput } from '@/features/dashboard/types/optimizerTypes';
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser';
import { useQueryClient } from '@tanstack/react-query';
import { createPromptHistory, optimizePrompt } from '@/features/dashboard/actions';
import { queryKeys } from '@/lib/query';

interface PromptOptimizerProps {
  onExtract: (prompt?: string) => void;
}

export function PromptOptimizer({ onExtract }: PromptOptimizerProps) {
  const [ inputPrompt, setInputPrompt ] = useState('');
  const [ optimizationSettings, setOptimizationSettings ] = useState<OptimizationSettings>(DEFAULT_OPTIMIZER_SETTINGS);
  const [ isGenerating, setIsGenerating ] = useState(false);
  const [ result, setResult ] = useState<null | OptimizedPromptOutput>(null);
  const [ editedPrompt, setEditedPrompt ] = useState('');
  const user = useCurrentUser();
  const queryClient = useQueryClient();

  const handleImprove = async () => {
    if (!inputPrompt.trim()) return;
    setIsGenerating(true);
    const generatedData = await optimizePrompt(inputPrompt, optimizationSettings);
    setResult({ ...generatedData, framework: optimizationSettings.framework });
    setEditedPrompt(generatedData.optimizedPrompt);
    const response = await createPromptHistory({
      prompt: inputPrompt,
      scores: generatedData?.scores,
      optimizedPrompt: generatedData?.optimizedPrompt,
      settings: optimizationSettings,
    });

    if (response.isSuccess) {
      if (user?.id) {
        await queryClient.invalidateQueries({
          queryKey: [ queryKeys.USER_STATS, user.id ],
        });
      }
    } else {
    }
    setIsGenerating(false);
  };

  const updateOptimizationSettings = (
    updates: Partial<OptimizationSettings>
  ) => {
    setOptimizationSettings(prevSettings => ({
      ...prevSettings,
      ...updates,
    }));
  };

  return (
    <>
      <div className={ cn(DS.card.base, DS.input.wrapper, 'overflow-hidden') }>
            <textarea
              value={ inputPrompt }
              onChange={ (e) => setInputPrompt(e.target.value) }
              placeholder="Paste your rough idea here..."
              className={ cn(DS.input.base, DS.input.textarea, 'h-40 p-6') }
            />

        <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <OptimizerSettingsPopover
              optimizationSettings={ optimizationSettings }
              updateOptimizationSettings={ updateOptimizationSettings }
            />
            <span className={ DS.utils.dividerVertical }></span>
            <span className={ DS.text.metaMuted }>{ inputPrompt.length } chars</span>
          </div>

          <button
            onClick={ handleImprove }
            disabled={ !inputPrompt || isGenerating }
            className={ cn(
              DS.button.base,
              'px-5 py-2.5 shadow-sm',
              !inputPrompt || isGenerating
                ? DS.button.loading
                : cn(DS.button.primary, 'hover:shadow-md')
            ) }
          >
            { isGenerating ? (
              <motion.div
                animate={ { rotate: 360 } }
                transition={ { duration: 1, repeat: Infinity, ease: 'linear' } }>
                <Zap size={ 16 } className="fill-current"/> {/*Todo Change animation*/ }
              </motion.div>
            ) : (
              <Sparkles size={ 16 }/>
            ) }
            { isGenerating ? 'Optimizing...' : 'Improve Prompt' }
          </button>
        </div>
      </div>

      <AnimatePresence>
        { result &&
          <OutputSection
            promptData={ result }
            editedPrompt={ editedPrompt }
            setEditedPrompt={ setEditedPrompt }
            onExtract={ onExtract }
          />
        }
      </AnimatePresence>
    </>
  );
}

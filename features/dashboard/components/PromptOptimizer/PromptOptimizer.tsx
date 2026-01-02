import { cn } from '@/lib/utils';
import { DS } from '@/lib/design-system';
import { OptimizerSettingsPopover } from '@/features/dashboard/components/PromptOptimizer/OptimizerSettingsPopover';
import { AnimatePresence, motion } from 'framer-motion';
import { Sparkles, Zap } from 'lucide-react';
import { OutputSection } from '@/features/dashboard/components/PromptOptimizer/OutputSection';
import React, { useState } from 'react';
import {
  DEFAULT_OPTIMIZER_SETTINGS,
  OptimizationSettings,
  OptimizedPromptOutput,
} from '@/features/dashboard/types/optimizerTypes';
import { trpc } from '@/lib/trpc';

interface PromptOptimizerProps {
  onExtract: (prompt?: string) => void;
}

export function PromptOptimizer({ onExtract }: PromptOptimizerProps) {
  const [prompt, setPrompt] = useState('');
  const [settings, setSettings] = useState<OptimizationSettings>(
    DEFAULT_OPTIMIZER_SETTINGS
  );
  const [result, setResult] = useState<null | OptimizedPromptOutput>(null);
  const optimizeMutation = trpc.optimize.useMutation();
  const utils = trpc.useUtils();

  const handleImprove = async () => {
    if (!prompt.trim()) return;

    try {
      const generatedData = await optimizeMutation.mutateAsync({
        prompt,
        settings,
      });

      setResult({ ...generatedData, framework: settings.framework });
      await utils.getStats.invalidate();
    } catch (error) {
      console.log(error);
    }
  };

  const updateOptimizationSettings = (
    updates: Partial<OptimizationSettings>
  ) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      ...updates,
    }));
  };

  return (
    <>
      <div className={cn(DS.card.base, DS.input.wrapper, 'overflow-hidden')}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Paste your rough idea here..."
          className={cn(DS.input.base, DS.input.textarea, 'h-40 p-6')}
        />

        <div
          className={cn(
            DS.utils.topBorder,
            'px-6 py-4 bg-gray-50/50 flex items-center justify-between'
          )}
        >
          <div className="flex items-center gap-3">
            <OptimizerSettingsPopover
              optimizationSettings={settings}
              updateOptimizationSettings={updateOptimizationSettings}
            />
            <span className={DS.utils.dividerVertical}></span>
            <span className={DS.text.metaMuted}>{prompt.length} chars</span>
          </div>

          <button
            onClick={handleImprove}
            disabled={optimizeMutation.isPending}
            className={cn(
              DS.button.base,
              'px-5 py-2.5 shadow-sm',
              optimizeMutation.isPending
                ? DS.button.loading
                : cn(DS.button.primary, 'hover:shadow-md')
            )}
          >
            {optimizeMutation.isPending ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              >
                <Zap size={16} className="fill-current" />{' '}
                {/*Todo Change animation*/}
              </motion.div>
            ) : (
              <Sparkles size={16} />
            )}
            {optimizeMutation.isPending ? 'Optimizing...' : 'Improve Prompt'}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {result && (
          <OutputSection
            promptData={result}
            onExtract={onExtract}
          />
        )}
      </AnimatePresence>
    </>
  );
}

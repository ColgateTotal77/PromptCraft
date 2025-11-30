'use client';

import React from 'react';
import { Sliders, ChevronDown } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { DS } from '@/lib/design-system';
import {
  OptimizationSettings,
  PromptFramework,
  MissingInfoStrategy,
  Language,
  FRAMEWORK_DISPLAY_LABELS,
  MISSING_INFO_DISPLAY_LABELS,
  LANGUAGE_LABELS
} from '@/types/prompt-craft';

interface OptimizerSettingsProps {
  optimizationSettings: OptimizationSettings;
  updateOptimizationSettings: (updates: Partial<OptimizationSettings>) => void;
}

export function OptimizerSettings({ optimizationSettings, updateOptimizationSettings }: OptimizerSettingsProps) {
  const { framework, language, missingInfo } = optimizationSettings;

  const handleFrameworkChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateOptimizationSettings({ framework: e.target.value as PromptFramework });
  };

  const handleMissingInfoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateOptimizationSettings({ missingInfo: e.target.value as MissingInfoStrategy });
  };

  const handleLanguageChange = (newLang: Language) => {
    updateOptimizationSettings({ language: newLang });
  };

  const getOptions = <TEnum extends Record<string, string>>(enumObject: TEnum) => {
    return Object.entries(enumObject).map(([ key, label ]) => (
      <option key={ key } value={ key }>
        { label }
      </option>
    ));
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className={ cn(DS.button.base, DS.button.secondary, DS.utils.focusRing, 'text-xs px-3 py-1.5') }>
          <Sliders size={ 14 }/>
          Configuration
          <ChevronDown size={ 12 } className="text-gray-400"/>
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[280px]">
        <div className="space-y-4">
          <h4 className={ cn(DS.text.h4, 'pb-2 border-b border-gray-100') }>
            Optimization Settings
          </h4>

          <div className="space-y-2">
            <label className={ DS.text.label }>Framework</label>
            <select
              value={ framework }
              onChange={ handleFrameworkChange }
              className={ cn(DS.utils.focusRing, DS.text.h4, 'w-full bg-gray-50 border border-gray-200 rounded-md px-2 py-1.5') }
            >
              { getOptions(FRAMEWORK_DISPLAY_LABELS) }
            </select>
          </div>

          <div className="space-y-2">
            <label className={ DS.text.label }>Language</label>
            <div className="flex bg-gray-100 p-0.5 rounded-md">
              { Object.entries(LANGUAGE_LABELS).map(([ key, label ]) => (
                <button
                  key={ key }
                  onClick={ () => handleLanguageChange(key as Language) }
                  className={ cn(
                    'flex-1 py-1 rounded-sm',
                    language === key
                      ? 'bg-white shadow-sm ' + DS.text.meta
                      : DS.text.metaMuted
                  ) }
                >
                  { label }
                </button>
              )) }
            </div>
          </div>

          <div className="space-y-2">
            <label className={ DS.text.label }>Missing Info</label>
            <select
              value={ missingInfo }
              onChange={ handleMissingInfoChange }
              className={ cn(
                DS.utils.focusRing,
                DS.text.h4,
                'w-full bg-gray-50 border border-gray-200 rounded-md px-2 py-1.5'
              ) }
            >
              { getOptions(MISSING_INFO_DISPLAY_LABELS) }
            </select>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

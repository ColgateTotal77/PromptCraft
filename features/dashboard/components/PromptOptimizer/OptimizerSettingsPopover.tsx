'use client';

import React from 'react';
import { Sliders, ChevronDown } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { DS } from '@/lib/design-system';
import {
  FRAMEWORK_DETAILS,

  OptimizationSettings,
  PromptFramework
} from '@/features/dashboard/types/optimizerTypes';
import { Language, LANGUAGE_DETAILS, SettingDetail } from '@/features/dashboard/types/types';

interface OptimizerSettingsProps {
  optimizationSettings: OptimizationSettings;
  updateOptimizationSettings: (updates: Partial<OptimizationSettings>) => void;
}

export function OptimizerSettingsPopover({ optimizationSettings, updateOptimizationSettings }: OptimizerSettingsProps) {
  const { framework, language } = optimizationSettings;

  const handleFrameworkChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateOptimizationSettings({ framework: e.target.value as PromptFramework });
  };

  const handleLanguageChange = (newLang: Language) => {
    updateOptimizationSettings({ language: newLang });
  };

  const getOptions = <T extends Record<string, SettingDetail>>(enumObject: T) => {
    return Object.entries(enumObject).map(([ key, { label } ]) => (
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
              { getOptions(FRAMEWORK_DETAILS) }
            </select>
          </div>

          <div className="space-y-2">
            <label className={ DS.text.label }>Language</label>
            <div className="flex bg-gray-100 p-0.5 rounded-md">
              { Object.entries(LANGUAGE_DETAILS).map(([ key, { label } ]) => (
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
        </div>
      </PopoverContent>
    </Popover>
  );
}

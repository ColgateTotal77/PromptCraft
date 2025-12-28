'use client';

import React from 'react';
import { Sliders, ChevronDown } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { DS } from '@/lib/design-system';
import {
  GeneralizationLevel,
  TemplateSyntax,
  ExtractionSettings,
  SYNTAX_DISPLAY_LABELS, GENERALIZATION_DISPLAY_LABELS
} from '@/features/dashboard/types/extractorTypes';
import { Language, LANGUAGE_DETAILS } from '@/features/dashboard/types/types';

interface ExtractionSettingsProps {
  extractionSettings: ExtractionSettings;
  updateExtractionSettings: (updates: Partial<ExtractionSettings>) => void;
}

export function ExtractionSettingsPopover({ extractionSettings, updateExtractionSettings }: ExtractionSettingsProps) {
  const { syntax, level, language } = extractionSettings;

  const handleSyntaxChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateExtractionSettings({ syntax: e.target.value as TemplateSyntax });
  };

  const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateExtractionSettings({ level: e.target.value as GeneralizationLevel });
  };

  const handleLanguageChange = (newLang: Language) => {
    updateExtractionSettings({ language: newLang });
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
            Extraction Settings
          </h4>

          <div className="space-y-2">
            <label className={ DS.text.label }>Syntax</label>
            <select
              value={ syntax }
              onChange={ handleSyntaxChange }
              className={ cn(DS.utils.focusRing, DS.text.h4, 'w-full bg-gray-50 border border-gray-200 rounded-md px-2 py-1.5') }
            >
              { getOptions(SYNTAX_DISPLAY_LABELS) }
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

          <div className="space-y-2">
            <label className={ DS.text.label }>Generalization Level</label>
            <select
              value={ level }
              onChange={ handleLevelChange }
              className={ cn(
                DS.utils.focusRing,
                DS.text.h4,
                'w-full bg-gray-50 border border-gray-200 rounded-md px-2 py-1.5'
              ) }
            >
              { getOptions(GENERALIZATION_DISPLAY_LABELS) }
            </select>
          </div>

        </div>
      </PopoverContent>
    </Popover>
  );
}

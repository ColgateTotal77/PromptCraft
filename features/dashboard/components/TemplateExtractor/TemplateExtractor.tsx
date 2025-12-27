import { cn } from '@/lib/utils';
import { DS } from '@/lib/design-system';
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Sparkles, Zap } from 'lucide-react';
import { ExtractionSettingsPopover } from '@/features/dashboard/components/TemplateExtractor/ExtractionSettingsPopover';
import { OutputSection } from '@/features/dashboard/components/TemplateExtractor/OutputSection';
import {
  DEFAULT_EXTRACTION_SETTINGS,
  ExtractedTemplateOutput,
  ExtractionSettings
} from '@/features/dashboard/types/extractorTypes';
import { trpc } from '@/lib/trpc';

interface templateExtractorProps {
  initialPrompt?: string;
}

export function TemplateExtractor({ initialPrompt }: templateExtractorProps) {
  const [ inputTemplate, setInputTemplate ] = useState(initialPrompt || '');
  const [ extractionSettings, setExtractionSettings ] = useState<ExtractionSettings>(DEFAULT_EXTRACTION_SETTINGS);
  const [ result, setResult ] = useState<null | ExtractedTemplateOutput>(null);
  const [ editedTemplate, setEditedTemplate ] = useState('');
  const extractMutation = trpc.extract.useMutation();
  const utils = trpc.useUtils();

  const handleExtraction = async () => {
    if (!inputTemplate.trim()) return;
    try {
      const generatedData = await extractMutation.mutateAsync({
        userPrompt: inputTemplate,
        settings: extractionSettings
      });
      setResult(generatedData);
      setEditedTemplate(generatedData.template);

      await utils.getStats.invalidate();

    } catch (error) {
      console.log(error);
    }
  };

  const updateExtractionSettings = (
    updates: Partial<any>
  ) => {
    setExtractionSettings((prevSettings: any) => ({
      ...prevSettings,
      ...updates,
    }));
  };

  return (
    <>
      <div className={ cn(DS.card.base, DS.input.wrapper, 'overflow-hidden') }>
            <textarea
              value={ inputTemplate }
              onChange={ (e) => setInputTemplate(e.target.value) }
              placeholder="Paste your rough idea here..."
              className={ cn(DS.input.base, DS.input.textarea, 'h-40 p-6') }
            />

        <div className={ cn(DS.utils.topBorder, 'px-6 py-4 bg-gray-50/50 flex items-center justify-between') }>
          <div className="flex items-center gap-3">
            <ExtractionSettingsPopover
              extractionSettings={ extractionSettings }
              updateExtractionSettings={ updateExtractionSettings }
            />
            <span className={ DS.utils.dividerVertical }></span>
            <span className={ DS.text.metaMuted }>{ inputTemplate.length } chars</span>
          </div>

          <button
            onClick={ handleExtraction }
            disabled={ extractMutation.isPending }
            className={ cn(
              DS.button.base,
              'px-5 py-2.5 shadow-sm',
              extractMutation.isPending
                ? DS.button.loading
                : cn(DS.button.primary, 'hover:shadow-md')
            ) }
          >
            { extractMutation.isPending ? (
              <motion.div
                animate={ { rotate: 360 } }
                transition={ { duration: 1, repeat: Infinity, ease: 'linear' } }>
                <Zap size={ 16 } className="fill-current"/> {/*Todo Change animation*/ }
              </motion.div>
            ) : (
              <Sparkles size={ 16 }/>
            ) }
            { extractMutation.isPending ? 'Extraction...' : 'Improve template' }
          </button>
        </div>
      </div>

      <AnimatePresence>
        { result &&
          <OutputSection
            templateData={ result }
            editedTemplate={ editedTemplate }
            setEditedTemplate={ setEditedTemplate }
          />
        }
      </AnimatePresence>
    </>
  );
}

import { cn } from '@/lib/utils';
import { DS } from '@/lib/design-system';
import React, { useState } from 'react';
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser';
import { useQueryClient } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { Sparkles, Zap } from 'lucide-react';
import { ExtractionSettingsPopover } from '@/features/dashboard/components/TemplateExtractor/ExtractionSettingsPopover';
import { OutputSection } from '@/features/dashboard/components/TemplateExtractor/OutputSection';
import { extractTemplate } from '@/features/dashboard/actions';
import {
  DEFAULT_EXTRACTION_SETTINGS,
  ExtractedTemplateOutput,
  ExtractionSettings
} from '@/features/dashboard/types/extractorTypes';
import { queryKeys } from '@/lib/query';

interface templateExtractorProps {
  initialPrompt?: string;
}

export function TemplateExtractor({ initialPrompt }: templateExtractorProps) {
  const [ inputtemplate, setInputtemplate ] = useState(initialPrompt || '');
  const [ extractionSettings, setExtractionSettings ] = useState<ExtractionSettings>(DEFAULT_EXTRACTION_SETTINGS);
  const [ isGenerating, setIsGenerating ] = useState(false);
  const [ result, setResult ] = useState<null | ExtractedTemplateOutput>(null);
  const [ editedTemplate, setEditedTemplate ] = useState('');
  const user = useCurrentUser();
  const queryClient = useQueryClient();

  const handleExtraction = async () => {
    if (!inputtemplate.trim()) return;
    setIsGenerating(true);
    const generatedData = await extractTemplate(inputtemplate, extractionSettings);
    setResult(generatedData);
    setEditedTemplate(generatedData.template);
    // const response = await createExtractionHistory({
    //   template: inputtemplate,
    //   scores: generatedData?.scores,
    //   optimizedtemplate: generatedData?.optimizedtemplate,
    //   settings: ExtractionSettingsPopover,
    // });

    // if (response.isSuccess) {
    //   if (user?.id) {
    //     await queryClient.invalidateQueries({
    //       queryKey: [ queryKeys.USER_STATS, user.id ],
    //     });
    //   }
    // } else {
    // }
    setIsGenerating(false);
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
              value={ inputtemplate }
              onChange={ (e) => setInputtemplate(e.target.value) }
              placeholder="Paste your rough idea here..."
              className={ cn(DS.input.base, DS.input.textarea, 'h-40 p-6') }
            />

        <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ExtractionSettingsPopover
              extractionSettings={ extractionSettings }
              updateExtractionSettings={ updateExtractionSettings }
            />
            <span className={ DS.utils.dividerVertical }></span>
            <span className={ DS.text.metaMuted }>{ inputtemplate.length } chars</span>
          </div>

          <button
            onClick={ handleExtraction }
            disabled={ !inputtemplate || isGenerating }
            className={ cn(
              DS.button.base,
              'px-5 py-2.5 shadow-sm',
              !inputtemplate || isGenerating
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
            { isGenerating ? 'Extraction...' : 'Improve template' }
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

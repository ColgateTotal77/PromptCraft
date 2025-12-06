import { cn } from '@/lib/utils';
import { DS } from '@/lib/design-system';
import React from 'react';

interface PromptExtractorProps {
  initialPrompt?: string;
}

export function PromptExtractor({ initialPrompt }: PromptExtractorProps) {
  return (
    <div className={ cn(DS.card.base, DS.utils.center, 'h-64 border-dashed bg-gray-50/50') }>
      <p className="text-gray-400 text-sm">Template Extractor Logic goes here.</p>
    </div>
  );
}

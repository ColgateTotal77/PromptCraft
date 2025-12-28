'use client';

import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { PromptOptimizer } from '@/features/dashboard/components/PromptOptimizer/PromptOptimizer';
import { TemplateExtractor } from '@/features/dashboard/components/TemplateExtractor/TemplateExtractor';

export default function Workspace() {
  const [activeTab, setActiveTab] = useState('optimizer');
  const [extractorData, setExtractorData] = useState<string>('');

  const handleTransferToExtractor = (prompt?: string) => {
    if (prompt) {
      setExtractorData(prompt);
    }
    setActiveTab('extractor');
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList>
        <TabsTrigger value="optimizer">Prompt Optimizer</TabsTrigger>
        <TabsTrigger value="extractor">Template Extractor</TabsTrigger>
      </TabsList>

      <TabsContent value="optimizer" className="space-y-8">
        <PromptOptimizer onExtract={handleTransferToExtractor} />
      </TabsContent>

      <TabsContent value="extractor">
        <TemplateExtractor initialPrompt={extractorData} />
      </TabsContent>
    </Tabs>
  );
}

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Undo2, Copy, ClipboardEditIcon, FileOutput } from 'lucide-react';
import { DS } from '@/lib/design-system';
import { cn } from '@/lib/utils';
import { OptimizedPromptOutput } from '@/features/dashboard/types/optimizerTypes';
import { ScoreCard } from '@/features/dashboard/components/PromptOptimizer/ScoreCard';

interface OutputSectionProps {
  promptData: OptimizedPromptOutput;
  editedPrompt: string;
  setEditedPrompt: (prompt: string) => void;
  onExtract: (prompt?: string) => void;
}

export function OutputSection(props: OutputSectionProps) {
  const [ isEditing, setIsEditing ] = useState(false);
  const { promptData, editedPrompt, setEditedPrompt, onExtract } = props;

  const onCopy = async () => {
    await navigator.clipboard.writeText(editedPrompt);
  };

  const onEdit = () => {
    setIsEditing(prevIsEditing => !prevIsEditing);
  };

  const onReset = () => {
    setEditedPrompt(promptData.optimizedPrompt);
  }

  return (
    <motion.div
      initial={ { opacity: 0, y: 10 } }
      animate={ { opacity: 1, y: 0 } }
      exit={ { opacity: 0, y: 10 } }
      transition={ { duration: 0.4, ease: 'easeOut' } }
      className="space-y-6"
    >
      <div className="flex items-center gap-4">
        <div className={ DS.utils.divider }></div>
        <span className={ DS.text.label }>Optimized Result</span>
        <div className={ DS.utils.divider }></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <ScoreCard label="Clarity" score={ promptData.scores.clarity }/>
          <ScoreCard label="Context" score={ promptData.scores.context }/>

          <div className={ cn(DS.card.base, 'flex flex-col gap-2 bg-gray-100 p-4') }>
            <h4 className={ cn(DS.text.label, 'text-gray-900') }>Changes Made</h4>
            <ul className={ cn(DS.text.metaMuted, 'text-gray-600 space-y-2 list-disc pl-4') }>
              <li>Added { promptData.framework }</li>
              <li>Specified output format</li>
            </ul>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className={ cn(DS.card.base, 'flex flex-col overflow-hidden h-full w-full') }>
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50/30">
              <span className={ DS.text.metaMuted }> { promptData.framework } </span>
              <div className="flex items-center gap-1">
                { isEditing &&
                  <button
                    className={ cn(DS.button.base, DS.button.ghost, DS.button.icon) }
                    title="Reset"
                    onClick={ onReset }
                  >
                    <Undo2 size={ 16 }/>
                  </button>
                }
                <button
                  className={ cn(DS.button.base, DS.button.ghost, DS.button.icon) }
                  title="Copy"
                  onClick={ onCopy }
                >
                  <Copy size={ 16 }/>
                </button>
                <button
                  className={ cn(DS.button.base, DS.button.ghost, DS.button.icon) }
                  title="Edit"
                  onClick={ onEdit }
                >
                  <ClipboardEditIcon size={ 16 }/>
                </button>
                <button
                  className={ cn(DS.button.base, DS.button.ghost, DS.button.icon) }
                  title="Extract"
                  onClick={ () => onExtract(editedPrompt) }
                >
                  <FileOutput size={ 16 }/>
                </button>
              </div>
            </div>
            {/*<div className="flex flex-col gap-4 p-6 font-mono text-sm leading-relaxed text-gray-800 h-full bg-white">*/}
              <textarea
                value={ editedPrompt }
                disabled={!isEditing}
                onChange={ (e) => setEditedPrompt(e.target.value) }
                placeholder=":)"
                className={ cn(DS.input.base, DS.input.textarea, 'h-full p-6') }
              />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

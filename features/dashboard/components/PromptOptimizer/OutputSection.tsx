'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Undo2, Copy, ClipboardEditIcon, FileOutput } from 'lucide-react';
import { DS } from '@/lib/design-system';
import { cn } from '@/lib/utils';
import { OptimizedPromptOutput } from '@/features/dashboard/types/optimizerTypes';
import { ScoreCard } from '@/components/ScoreCard';

interface OutputSectionProps {
  promptData: OptimizedPromptOutput;
  onExtract: (prompt?: string) => void;
}

function VariableSelector({
  phrase,
  options,
  onSelect,
}: {
  phrase: string;
  options: string[];
  onSelect: (val: string) => void;
}) {
  return (
    <select
      className="inline-flex items-center px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-700 font-medium cursor-pointer border-none focus:ring-2 focus:ring-indigo-500 hover:bg-indigo-200 transition-colors text-sm"
      value={phrase}
      onChange={(e) => onSelect(e.target.value)}
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}

export function OutputSection(props: OutputSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPrompt, setEditedPrompt] = useState<string>("");
  const { promptData, onExtract } = props;

  useEffect(() => {
    setEditedPrompt(promptData.optimizedPrompt);
    setIsEditing(false);
  }, [promptData.optimizedPrompt, setEditedPrompt]);

  const onCopy = async () => {
    await navigator.clipboard.writeText(editedPrompt);
  };

  const onReset = () => {
    setEditedPrompt(promptData.optimizedPrompt);
    setIsEditing(false);
  };

  const handleVariableChange = (oldPhrase: string, newPhrase: string) => {
    setEditedPrompt(editedPrompt.replace(oldPhrase, newPhrase));
  };

  const renderedInteractiveText = useMemo(() => {
    if (!promptData.variables || promptData.variables.length === 0)
      return editedPrompt;

    let parts: (string | React.ReactNode)[] = [editedPrompt];

    promptData.variables.forEach((variable, varIndex) => {
      const newParts: (string | React.ReactNode)[] = [];

      parts.forEach((part) => {
        if (typeof part !== 'string') {
          newParts.push(part);
          return;
        }

        const currentSelection = variable.options.find((opt) =>
          part.includes(opt)
        );

        if (!currentSelection) {
          newParts.push(part);
          return;
        }

        const subParts = part.split(currentSelection);
        subParts.forEach((subPart, subIndex) => {
          newParts.push(subPart);
          if (subIndex < subParts.length - 1) {
            newParts.push(
              <VariableSelector
                key={`${varIndex}-${subIndex}`}
                phrase={currentSelection}
                options={variable.options}
                onSelect={(val) => handleVariableChange(currentSelection, val)}
              />
            );
          }
        });
      });
      parts = newParts;
    })

    return parts;
  }, [editedPrompt, promptData]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="space-y-6"
    >
      <div className="flex items-center gap-4">
        <div className={DS.utils.divider}></div>
        <span className={DS.text.label}>Optimized Result</span>
        <div className={DS.utils.divider}></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <ScoreCard label="Clarity" score={promptData.scores.clarity} />
          <ScoreCard label="Context" score={promptData.scores.context} />
        </div>

        <div className="lg:col-span-3">
          <div
            className={cn(
              DS.card.base,
              'flex flex-col overflow-hidden h-full w-full'
            )}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50/30">
              <span className={DS.text.metaMuted}>
                {' '}
                {promptData.framework}{' '}
              </span>
              <div className="flex items-center gap-1">
                {isEditing && (
                  <button
                    className={cn(
                      DS.button.base,
                      DS.button.ghost,
                      DS.button.icon
                    )}
                    title="Reset"
                    onClick={onReset}
                  >
                    <Undo2 size={16} />
                  </button>
                )}
                <button
                  className={cn(
                    DS.button.base,
                    DS.button.ghost,
                    DS.button.icon
                  )}
                  title="Copy"
                  onClick={onCopy}
                >
                  <Copy size={16} />
                </button>
                <button
                  className={cn(
                    DS.button.base,
                    isEditing
                      ? 'bg-indigo-100 text-indigo-600'
                      : DS.button.ghost,
                    DS.button.icon
                  )}
                  title="Edit Mode"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <ClipboardEditIcon size={16} />
                </button>
                <button
                  className={cn(
                    DS.button.base,
                    DS.button.ghost,
                    DS.button.icon
                  )}
                  title="Extract"
                  onClick={() => onExtract(editedPrompt)}
                >
                  <FileOutput size={16} />
                </button>
              </div>
            </div>

            <div className="p-6 h-full min-h-[300px] relative">
              {isEditing ? (
                <textarea
                  value={editedPrompt}
                  disabled={!isEditing}
                  onChange={(e) => setEditedPrompt(e.target.value)}
                  placeholder=":)"
                  className={cn(DS.input.base, DS.input.textarea, 'h-full p-6')}
                />
              ) : (
                <div className="font-mono text-sm leading-relaxed text-gray-800 whitespace-pre-wrap">
                  {renderedInteractiveText}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

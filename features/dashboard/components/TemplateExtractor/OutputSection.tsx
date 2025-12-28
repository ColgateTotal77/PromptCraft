'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, ClipboardEditIcon, Undo2, Braces, Info } from 'lucide-react';
import { DS } from '@/lib/design-system';
import { cn } from '@/lib/utils';
import { ExtractedTemplateOutput } from '@/features/dashboard/types/extractorTypes';

interface OutputSectionProps {
  templateData: ExtractedTemplateOutput;
  editedTemplate: string;
  setEditedTemplate: (template: string) => void;
}

export function OutputSection(props: OutputSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const { templateData, editedTemplate, setEditedTemplate } = props;

  const onCopy = async () => {
    await navigator.clipboard.writeText(editedTemplate);
  };

  const onEdit = () => {
    setIsEditing((prev) => !prev);
  };

  const onReset = () => {
    setEditedTemplate(templateData.template);
  };

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
        <span className={DS.text.label}>Extracted Template</span>
        <div className={DS.utils.divider}></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <div className={cn(DS.card.base, 'p-4 space-y-2')}>
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-gray-400 mt-0.5" />
              <div>
                <h3 className={cn(DS.text.h4, 'mb-1')}> Description </h3>
                <p className={DS.text.metaMuted}>{templateData.description}</p>
              </div>
            </div>
          </div>

          <div
            className={cn(DS.card.base, 'flex flex-col gap-2 bg-gray-100 p-4')}
          >
            <div className="flex items-center gap-2">
              <Braces className="w-3 h-3 text-gray-500" />
              <h4 className={cn(DS.text.label, 'text-gray-900')}>
                Variables Found
              </h4>
            </div>

            {templateData.variables.length > 0 ? (
              <ul
                className={cn(
                  DS.text.metaMuted,
                  'text-gray-600 space-y-2 list-none pl-1'
                )}
              >
                {templateData.variables.map((v, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0" />
                    <span className="font-mono bg-white px-1.5 py-0.5 rounded border border-gray-200 text-gray-700">
                      {v.name}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={cn(DS.text.metaMuted, 'italic pl-1')}>
                No variables detected
              </p>
            )}
          </div>
        </div>

        <div className="lg:col-span-3">
          <div
            className={cn(
              DS.card.base,
              'flex flex-col overflow-hidden h-full w-full min-h-[300px]'
            )}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50/30">
              <span className={DS.text.metaMuted}>{templateData.title}</span>
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
                    DS.button.ghost,
                    DS.button.icon,
                    isEditing && 'bg-gray-100 text-gray-900'
                  )}
                  title="Edit"
                  onClick={onEdit}
                >
                  <ClipboardEditIcon size={16} />
                </button>
              </div>
            </div>

            <textarea
              value={editedTemplate}
              disabled={!isEditing}
              onChange={(e) => setEditedTemplate(e.target.value)}
              placeholder="Template output..."
              className={cn(
                DS.input.base,
                DS.input.textarea,
                'h-full p-6 font-mono text-sm leading-relaxed'
              )}
              spellCheck={false}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Copy, Save, FileOutput } from 'lucide-react';
import { ScoreCard } from './ScoreCard';
import { DS } from '@/lib/design-system';
import { cn } from '@/lib/utils';
import { OptimizedPromptOutput } from '@/types/prompt-craft';

interface OutputSectionProps { promptData: OptimizedPromptOutput }

export function OutputSection({ promptData }: OutputSectionProps) {
  return (
    <motion.div
      initial={ { opacity: 0, y: 10 } }
      animate={ { opacity: 1, y: 0 } }
      exit={{ opacity: 0, y: 10 }}
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
              <li>Added CO-STAR structure</li>
              <li>Defined target audience</li>
              <li>Specified output format</li>
            </ul>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className={ cn(DS.card.base, 'flex flex-col overflow-hidden h-full w-full') }>
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50/30">
              <span className={ DS.text.metaMuted }>v1.0 • CO-STAR Framework</span>
              <div className="flex items-center gap-1">
                <button className={ cn(DS.button.base, DS.button.ghost, DS.button.icon) } title="Copy">
                  <Copy size={ 16 }/>
                </button>
                <button className={ cn(DS.button.base, DS.button.ghost, DS.button.icon) } title="Save">
                  <Save size={ 16 }/>
                </button>
                <button className={ cn(DS.button.base, DS.button.ghost, DS.button.icon) } title="Export">
                  <FileOutput size={ 16 }/>
                </button>
              </div>
            </div>
            {/*ToDo replace*/ }
            <div className="flex flex-col gap-4 p-6 font-mono text-sm leading-relaxed text-gray-800 h-full bg-white">
              <p>
                { promptData.optimized_prompt }
              </p>
              {/*<p><span className="text-gray-400 select-none"># CONTEXT #</span><br/>*/}
              {/*  You are an expert Senior Frontend Engineer specializing in React performance optimization.*/}
              {/*</p>*/}
              {/*<p><span className="text-gray-400 select-none"># OBJECTIVE #</span><br/>*/}
              {/*  Write a comprehensive blog post explaining "React.memo" and "useMemo".*/}
              {/*</p>*/}
              {/*<p><span className="text-gray-400 select-none"># STYLE #</span><br/>*/}
              {/*  Technical, authoritative, yet accessible to intermediate developers.*/}
              {/*</p>*/}
              {/*<p><span className="text-gray-400 select-none"># FORMAT #</span><br/>*/}
              {/*  Markdown with code snippets.*/}
              {/*</p>*/}
            </div>

          </div>
        </div>
      </div>
    </motion.div>
  );
}

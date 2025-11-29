'use client';

import React from 'react';
import { Sliders, ChevronDown } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { DS } from '@/lib/design-system';

export function OptimizerSettings() {
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
              className={ cn(DS.utils.focusRing, DS.text.h4, 'w-full bg-gray-50 border border-gray-200 rounded-md px-2 py-1.5') }>
              <option>CO-STAR (Context, Obj...)</option>
              <option>RTF (Role, Task, Format)</option>
              <option>TAG (Task, Action, Goal)</option>
              <option>Standard Improvement</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className={ DS.text.label }>Language</label>
            <div className="flex bg-gray-100 p-0.5 rounded-md">
              <button className={ cn(DS.text.h4, 'flex-1 py-1 bg-white shadow-sm rounded-sm') }>Auto
              </button>
              <button className={ cn(DS.text.muted, 'flex-1 py-1 hover:text-gray-900') }>English</button>
            </div>
          </div>

          <div className="space-y-2">
            <label className={ DS.text.label }>Missing Info</label>
            <select
              className={ cn(DS.utils.focusRing, DS.text.h4, 'w-full bg-gray-50 border border-gray-200 rounded-md px-2 py-1.5') }>
              <option>Add Placeholders like [Data]</option>
              <option>Infer Creatively</option>
              <option>Ask Clarifying Questions</option>
            </select>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

"use client";

import React from "react";
import { Sliders, ChevronDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';

export function OptimizerSettings() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-md hover:bg-gray-50 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-200">
          <Sliders size={14} />
          Configuration
          <ChevronDown size={12} className="text-gray-400" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[280px]">
        <div className="space-y-4">
          <h4 className="font-medium text-sm text-gray-900 pb-2 border-b border-gray-100">
            Optimization Settings
          </h4>

          <div className="space-y-2">
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Framework</label>
            <select className="w-full text-sm bg-gray-50 border border-gray-200 rounded-md px-2 py-1.5 text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900">
              <option>CO-STAR (Context, Obj...)</option>
              <option>RTF (Role, Task, Format)</option>
              <option>TAG (Task, Action, Goal)</option>
              <option>Standard Improvement</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Language</label>
            <div className="flex bg-gray-100 p-0.5 rounded-md">
              <button className="flex-1 text-xs font-medium py-1 bg-white text-gray-900 shadow-sm rounded-sm">Auto</button>
              <button className="flex-1 text-xs font-medium py-1 text-gray-500 hover:text-gray-900">English</button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Missing Info</label>
            <select className="w-full text-sm bg-gray-50 border border-gray-200 rounded-md px-2 py-1.5 text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900">
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

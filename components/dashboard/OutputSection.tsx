"use client";

import React from "react";
import { motion } from "framer-motion";
import { Copy, Save, FileOutput } from "lucide-react";
import { ScoreCard } from "./ScoreCard";

export function OutputSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="space-y-6"
    >
      <div className="flex items-center gap-4">
        <div className="h-px bg-gray-200 flex-1"></div>
        <span className="text-xs font-medium text-gray-400 uppercase tracking-widest">Optimized Result</span>
        <div className="h-px bg-gray-200 flex-1"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <ScoreCard label="Clarity" score={8.5} />
          <ScoreCard label="Context" score={9.0} />

          <div className="bg-gray-100 p-4 rounded-xl border border-gray-200">
            <h4 className="text-xs font-bold text-gray-900 mb-2 uppercase">Changes Made</h4>
            <ul className="text-xs text-gray-600 space-y-2 list-disc pl-4">
              <li>Added CO-STAR structure</li>
              <li>Defined target audience</li>
              <li>Specified output format</li>
            </ul>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden h-full flex flex-col">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50/30">
              <span className="text-xs font-medium text-gray-500">v1.0 • CO-STAR Framework</span>
              <div className="flex items-center gap-1">
                <button className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors" title="Copy">
                  <Copy size={16} />
                </button>
                <button className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors" title="Save to Library">
                  <Save size={16} />
                </button>
                <button className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors" title="Export PDF">
                  <FileOutput size={16} />
                </button>
              </div>
            </div>
            <div className="p-6 font-mono text-sm leading-relaxed text-gray-800 h-full bg-white">
              <p className="mb-4"><span className="text-gray-400 select-none"># CONTEXT #</span><br/>
                You are an expert Senior Frontend Engineer specializing in React performance optimization.
              </p>
              <p className="mb-4"><span className="text-gray-400 select-none"># OBJECTIVE #</span><br/>
                Write a comprehensive blog post explaining "React.memo" and "useMemo".
              </p>
              <p className="mb-4"><span className="text-gray-400 select-none"># STYLE #</span><br/>
                Technical, authoritative, yet accessible to intermediate developers.
              </p>
              <p><span className="text-gray-400 select-none"># FORMAT #</span><br/>
                Markdown with code snippets.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

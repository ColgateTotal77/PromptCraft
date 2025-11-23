"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { OptimizerSettings } from "@/components/dashboard/OptimizerSettings";
import { OutputSection } from "@/components/dashboard/OutputSection";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("optimizer");
  const [inputPrompt, setInputPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasResult, setHasResult] = useState(false);

  const handleImprove = () => {
    if (!inputPrompt.trim()) return;
    setIsGenerating(true);
    setHasResult(false);

    setTimeout(() => {
      setIsGenerating(false);
      setHasResult(true);
    }, 1500);
  };

  return (
    <main className="p-6 md:p-12 max-w-5xl mx-auto w-full">
      <header className="flex justify-between items-start mb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">
            Workspace
          </h1>
          <p className="text-gray-500">Refine your ideas into production-ready prompts.</p>
        </div>
        <button className="text-sm font-medium text-gray-600 hover:text-gray-900 border border-gray-200 bg-white hover:bg-gray-50 px-4 py-2 rounded-lg shadow-sm transition-all">
          Share
        </button>
      </header>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="optimizer">Prompt Optimizer</TabsTrigger>
          <TabsTrigger value="extractor">Template Extractor</TabsTrigger>
        </TabsList>

        <TabsContent value="optimizer" className="space-y-8">

          <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-200 overflow-hidden focus-within:ring-1 focus-within:ring-gray-200 transition-shadow">
            <textarea
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              placeholder="Paste your rough idea here (e.g., 'Write a blog post about React performance')..."
              className="w-full h-40 p-6 text-base text-gray-900 placeholder:text-gray-400 resize-none outline-none bg-transparent font-normal leading-relaxed"
            />

            <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <OptimizerSettings />
                <span className="h-4 w-px bg-gray-200 mx-1"></span>
                <span className="text-xs text-gray-400 font-medium">
                  {inputPrompt.length} chars
                </span>
              </div>

              <button
                onClick={handleImprove}
                disabled={!inputPrompt || isGenerating}
                className={cn(
                  "flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all shadow-sm",
                  !inputPrompt || isGenerating
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gray-900 text-white hover:bg-gray-800 hover:shadow-md"
                )}
              >
                {isGenerating ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Zap size={16} className="fill-current" />
                  </motion.div>
                ) : (
                  <Sparkles size={16} />
                )}
                {isGenerating ? "Optimizing..." : "Improve Prompt"}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {hasResult && <OutputSection />}
          </AnimatePresence>
        </TabsContent>

        <TabsContent value="extractor">
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50">
            <p className="text-gray-400 text-sm">Template Extractor Logic goes here.</p>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}

"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { DS } from "@/lib/design-system";
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
    <main className={DS.layout.mainContent}>
      <header className={DS.layout.sectionHeader}>
        <div className="flex flex-col gap-2">
          <h1 className={DS.text.h1}>Workspace</h1>
          <p className="text-gray-500">Refine your ideas into production-ready prompts.</p>
        </div>
        <button className={cn(DS.button.base, DS.button.secondary)}>
          Share
        </button>
      </header>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="optimizer">Prompt Optimizer</TabsTrigger>
          <TabsTrigger value="extractor">Template Extractor</TabsTrigger>
        </TabsList>

        <TabsContent value="optimizer" className="space-y-8">

          <div className={cn(DS.card.base, DS.input.wrapper, "overflow-hidden")}>
            <textarea
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              placeholder="Paste your rough idea here..."
              className={cn(DS.input.base, DS.input.textarea, "h-40 p-6")}
            />

            <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <OptimizerSettings />
                <span className={DS.utils.dividerVertical}></span>
                <span className={DS.text.muted}>
                  {inputPrompt.length} chars
                </span>
              </div>

              <button
                onClick={handleImprove}
                disabled={!inputPrompt || isGenerating}
                className={cn(
                  DS.button.base,
                  "px-5 py-2.5 shadow-sm",
                  !inputPrompt || isGenerating
                    ? DS.button.loading
                    : cn(DS.button.primary, "hover:shadow-md")
                )}
              >
                {isGenerating ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                    <Zap size={16} className="fill-current" /> {/*Todo Change animation*/}
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
          <div className={cn(DS.card.base, DS.utils.center, "h-64 border-dashed bg-gray-50/50")}>
            <p className="text-gray-400 text-sm">Template Extractor Logic goes here.</p>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}

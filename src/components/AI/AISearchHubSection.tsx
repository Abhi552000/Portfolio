"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Bot, Send, Compass } from "lucide-react";

interface AISearchHubSectionProps {
  onOpenAI: (prompt?: string) => void;
}

export const AISearchHubSection: React.FC<AISearchHubSectionProps> = ({ onOpenAI }) => {
  const [aiPromptInput, setAiPromptInput] = useState("");

  const quickPrompts = [
    "Overview of Abhishek's 4+ years experience",
    "How does his Micro-Frontend architecture work?",
    "Tell me about SrisCart & ChatterBox",
    "What is MoneyMax's dual-portal system?",
    "Why hire Abhishek for Software Developer roles?",
  ];

  return (
    <section id="ai-hub" className="py-24 sm:py-32 px-4 sm:px-8 max-w-5xl mx-auto w-full text-center scroll-mt-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="space-y-8"
      >
        {/* Section Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 font-mono text-xs uppercase tracking-widest">
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span>Interactive AI Intelligence Hub</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Ask Abhishek AI Anything
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto">
            Get instant, tailored answers about Abhishek&apos;s 4+ years of software development experience, architecture patterns, and production accomplishments.
          </p>
        </div>

        {/* AI Search Card */}
        <div className="max-w-2xl mx-auto p-6 sm:p-8 rounded-3xl glass-panel bg-slate-950/90 border border-cyan-500/30 shadow-2xl shadow-cyan-950/40 space-y-4 text-left relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-mono text-cyan-400">
              <Bot className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>Ask Abhishek AI Assistant:</span>
            </div>
            <span className="text-[10px] font-mono text-cyan-300 px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 uppercase tracking-widest">
              AKS Intelligence Engine Active
            </span>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (aiPromptInput.trim()) {
                onOpenAI(aiPromptInput);
                setAiPromptInput("");
              }
            }}
            className="flex items-center gap-2 bg-slate-900/90 p-2.5 rounded-2xl border border-slate-800 focus-within:border-cyan-500 transition-all shadow-inner"
          >
            <input
              type="text"
              value={aiPromptInput}
              onChange={(e) => setAiPromptInput(e.target.value)}
              placeholder="e.g. How does Abhishek set up Webpack 5 Micro-Frontends?"
              className="flex-1 px-4 py-2 bg-transparent text-white text-xs sm:text-sm focus:outline-none placeholder-gray-500"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-cyan-500/25 shrink-0"
            >
              <Send className="w-4 h-4" />
              <span>Ask AI</span>
            </button>
          </form>

          {/* Quick Prompts Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="text-[11px] font-mono text-gray-500 uppercase">Quick Questions:</span>
            {quickPrompts.map((qp, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.06, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onOpenAI(qp)}
                className="px-3 py-1 rounded-full bg-slate-900 hover:bg-cyan-950/80 border border-slate-800 hover:border-cyan-500/40 text-cyan-300 hover:text-cyan-200 text-[11px] font-mono whitespace-nowrap transition-colors cursor-pointer shadow-md"
              >
                {qp}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

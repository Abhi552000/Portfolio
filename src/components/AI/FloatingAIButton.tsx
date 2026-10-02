"use client";

import React from "react";
import { motion } from "framer-motion";
import { Bot, Sparkles } from "lucide-react";

interface FloatingAIButtonProps {
  onOpenAI: () => void;
}

export const FloatingAIButton: React.FC<FloatingAIButtonProps> = ({ onOpenAI }) => {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.5 }}
      whileHover={{ scale: 1.08, y: -4 }}
      whileTap={{ scale: 0.95 }}
      onClick={onOpenAI}
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        left: "auto",
        top: "auto",
        zIndex: 9999,
      }}
      className="!fixed !bottom-6 !right-6 sm:!bottom-8 sm:!right-8 !left-auto !top-auto !z-[9999] flex items-center gap-3 px-5 py-3 rounded-full bg-slate-950/95 border border-cyan-500/60 text-white shadow-2xl shadow-cyan-500/50 backdrop-blur-2xl group hover:border-cyan-400 transition-all cursor-pointer pulse-ring shimmer-effect"
      title="Ask Abhishek AI Assistant"
    >
      <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 via-blue-600 to-indigo-600 flex items-center justify-center text-slate-950 shadow-md shadow-cyan-500/40 group-hover:scale-110 transition-transform shrink-0">
        <Bot className="w-5 h-5 text-slate-950" />
        <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-slate-950"></span>
        </span>
      </div>

      <div className="flex flex-col items-start pr-1">
        <span className="text-xs font-extrabold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-1">
          Ask Abhishek AI
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
        </span>
        <span className="text-[10px] font-mono text-cyan-400 font-bold tracking-wider uppercase">
          AKS Copilot Active
        </span>
      </div>
    </motion.button>
  );
};




"use client";

import React from "react";
import { ArrowUp, Code2 } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-12 px-4 sm:px-8 border-t border-slate-800/80 bg-slate-950/80 relative z-10 text-xs font-mono text-gray-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-white">© {new Date().getFullYear()} {PERSONAL_INFO.name}</span>
          <span>• All rights reserved.</span>
        </div>

        {/* Center */}
        <div className="flex items-center gap-1.5 text-gray-400">
          <Code2 className="w-4 h-4 text-cyan-400" />
          <span>Architected with Next.js 14, TypeScript & Framer Motion</span>
        </div>

        {/* Right - Back to Top */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-slate-800 transition-colors"
        >
          <span>Top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
};

"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Bot, FileText } from "lucide-react";
import { TypewriterText } from "@/components/Animation/AnimatedText";

interface HeroSectionProps {
  onOpenAI: () => void;
  onOpenResume: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenAI,
  onOpenResume,
}) => {
  const rotatingRoles = [
    "Micro-Frontend Architect",
    "Next.js 14 App Router Lead",
    "Nx & Turborepo Monorepos",
    "Senior React Developer",
  ];

  return (
    <section
      id="hero"
      className="relative w-full min-h-[calc(100vh-80px)] pt-28 pb-16 px-4 sm:px-8 flex flex-col justify-center items-center text-center overflow-hidden"
    >
      {/* Background Ambient Lighting Orbs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-500/10 rounded-full blur-[200px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[190px] pointer-events-none" />

      {/* Main Center Container */}
      <div className="max-w-4xl mx-auto w-full flex flex-col items-center space-y-8 sm:space-y-10 my-auto py-4 z-10">
        
        {/* Clean Status Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2.5 px-4.5 py-2 rounded-full glass-panel bg-slate-900/90 border border-cyan-500/30 text-xs font-mono text-cyan-300 shadow-xl shadow-cyan-950/40">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span>Available for Senior & Lead Frontend Roles</span>
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 ml-1 animate-pulse" />
          </div>
        </motion.div>

        {/* Candidate Single-Line Name */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="space-y-4 w-full px-2 overflow-x-auto no-scrollbar"
        >
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-none whitespace-nowrap py-2">
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent text-glow-cyan">
              Abhishek Kumar{" "}
            </span>
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent text-glow-purple">
              Singh
            </span>
          </h1>

          <div className="text-lg sm:text-2xl font-semibold text-gray-300 flex flex-wrap items-center justify-center gap-2 pt-1">
            <span className="text-gray-200">Software Developer</span>
            <span className="text-cyan-500 font-bold">•</span>
            <TypewriterText words={rotatingRoles} />
          </div>
        </motion.div>

        {/* Short Impactful Intro Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="text-base sm:text-xl text-gray-300 max-w-2xl leading-relaxed font-normal px-4"
        >
          Senior Software Developer with <span className="text-cyan-400 font-semibold">4+ years of experience</span> architecting high-performance <span className="text-white font-medium">Micro-Frontend systems (Webpack 5)</span>, <span className="text-white font-medium">Next.js 14+</span> platforms, and enterprise monorepos.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-5 pt-2"
        >
          <motion.button
            whileHover={{ scale: 1.06, boxShadow: "0 0 35px rgba(6, 182, 212, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenAI}
            className="flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-slate-950 font-bold text-sm shadow-xl shadow-cyan-500/30 transition-all duration-300 group cursor-pointer shimmer-effect"
          >
            <Bot className="w-4 h-4 text-slate-950 group-hover:rotate-12 transition-transform" />
            <span>Ask Abhishek AI</span>
            <Sparkles className="w-4 h-4 text-slate-950 group-hover:scale-125 transition-transform" />
          </motion.button>

          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#architecture"
            className="flex items-center gap-2 px-6.5 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-cyan-500/30 text-sm font-mono transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20"
          >
            <span>Explore Architecture</span>
            <ArrowRight className="w-4 h-4" />
          </motion.a>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenResume}
            className="flex items-center gap-2 px-6.5 py-3.5 rounded-2xl glass-panel text-gray-300 hover:text-white border border-slate-700 hover:border-cyan-500/40 text-sm font-medium transition-all duration-300"
          >
            <FileText className="w-4 h-4 text-cyan-400" />
            <span>View Resume</span>
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
};

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
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.35, 0.6, 0.35],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-500/15 rounded-full blur-[200px] pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.25, 0.5, 0.25],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-indigo-500/15 rounded-full blur-[190px] pointer-events-none"
      />

      {/* Floating Decorative Tech Badges (Desktop Viewports) */}
      <motion.div
        animate={{ y: [0, -15, 0], rotate: [0, 3, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="hidden lg:flex absolute top-36 left-12 items-center gap-2 px-3.5 py-1.5 rounded-xl glass-panel border border-cyan-500/30 text-xs font-mono text-cyan-300 shadow-lg shadow-cyan-950/40 pointer-events-none"
      >
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        <span>Module Federation 5</span>
      </motion.div>

      <motion.div
        animate={{ y: [0, 15, 0], rotate: [0, -3, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="hidden lg:flex absolute top-48 right-12 items-center gap-2 px-3.5 py-1.5 rounded-xl glass-panel border border-indigo-500/30 text-xs font-mono text-indigo-300 shadow-lg shadow-indigo-950/40 pointer-events-none"
      >
        <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
        <span>Nx & Turborepo</span>
      </motion.div>

      {/* Main Center Container */}
      <div className="max-w-4xl mx-auto w-full flex flex-col items-center space-y-8 sm:space-y-10 my-auto py-4 z-10">
        
        {/* Clean Status Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.04 }}
          className="cursor-pointer"
        >
          <div className="inline-flex items-center gap-2.5 px-4.5 py-2 rounded-full glass-panel bg-slate-900/90 border border-cyan-500/30 text-xs font-mono text-cyan-300 shadow-xl shadow-cyan-950/40 hover:border-cyan-400/60 transition-colors">
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
          className="space-y-3 sm:space-y-4 w-full px-2 max-w-full overflow-hidden"
        >
          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight leading-tight py-1 flex flex-nowrap justify-center items-center gap-x-2 sm:gap-x-3 whitespace-nowrap overflow-visible">
            <motion.span
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent text-glow-cyan inline-block transition-transform duration-300"
            >
              Abhishek Kumar
            </motion.span>
            <motion.span
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-r from-indigo-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent text-glow-purple inline-block transition-transform duration-300"
            >
              Singh
            </motion.span>
          </h1>

          <div className="text-sm xs:text-base sm:text-2xl font-semibold text-gray-300 flex flex-wrap items-center justify-center gap-2 pt-1">
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
          className="text-sm xs:text-base sm:text-xl text-gray-300 max-w-2xl leading-relaxed font-normal px-2 sm:px-4"
        >
          Senior Software Developer with <span className="text-cyan-400 font-semibold">4+ years of experience</span> architecting high-performance <span className="text-white font-medium">Micro-Frontend systems (Webpack 5)</span>, <span className="text-white font-medium">Next.js 14+</span> platforms, and enterprise monorepos.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="flex flex-row flex-wrap items-center justify-center gap-3 sm:gap-5 pt-2 px-4"
        >
          <motion.button
            whileHover={{ scale: 1.06, boxShadow: "0 0 35px rgba(6, 182, 212, 0.6)" }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenAI}
            className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-slate-950 font-bold text-sm shadow-xl shadow-cyan-500/30 transition-all duration-300 group cursor-pointer shimmer-effect shrink-0"
          >
            <Bot className="w-4 h-4 text-slate-950 group-hover:rotate-12 transition-transform duration-300" />
            <span>Ask Abhishek AI</span>
            <Sparkles className="w-4 h-4 text-slate-950 group-hover:scale-125 transition-transform duration-300" />
          </motion.button>

          <motion.a
            whileHover={{ scale: 1.06, borderColor: "rgba(6, 182, 212, 0.6)" }}
            whileTap={{ scale: 0.95 }}
            href="#architecture"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-cyan-500/30 text-sm font-mono transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 shrink-0 group"
          >
            <span>Explore Architecture</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </motion.a>

          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenResume}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:py-3.5 rounded-2xl glass-panel text-gray-300 hover:text-white border border-slate-700 hover:border-cyan-500/40 text-sm font-medium transition-all duration-300 shrink-0 group"
          >
            <FileText className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span>View Resume</span>
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
};

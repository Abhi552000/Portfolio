"use client";

import React from "react";
import { TypewriterText } from "@/components/Animation/AnimatedText";

interface HeroSectionProps {
  onOpenAI?: () => void;
  onOpenResume?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = () => {
  const rotatingRoles = [
    "Software Developer",
    "ReactJS & Next.js Architecture",
    "Node.js Backend Integrations",
    "Nx & Turborepo Monorepos",
    "Micro-Frontend Systems",
  ];

  return (
    <section
      id="hero"
      className="relative w-full min-h-[calc(100vh-80px)] pt-28 pb-16 px-4 sm:px-8 flex flex-col justify-center items-center text-center overflow-hidden scroll-mt-20"
    >
      {/* Background Ambient Lighting Orbs — Zero-cost CSS Radial Gradients (no GPU blur kernel) */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full pointer-events-none animate-pulse-slow"
        style={{
          background:
            "radial-gradient(circle, rgba(6, 182, 212, 0.16) 0%, rgba(6, 182, 212, 0.05) 45%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-10 right-10 w-[500px] h-[500px] rounded-full pointer-events-none animate-pulse-slow [animation-delay:2s]"
        style={{
          background:
            "radial-gradient(circle, rgba(99, 102, 241, 0.16) 0%, rgba(99, 102, 241, 0.04) 45%, transparent 70%)",
        }}
      />

      {/* Floating Decorative Tech Badges (Desktop only) */}
      <div className="hidden lg:flex absolute top-36 left-12 items-center gap-2 px-3.5 py-1.5 rounded-xl glass-panel border border-cyan-500/30 text-xs font-mono text-cyan-300 shadow-lg shadow-cyan-950/40 pointer-events-none animate-float">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        <span>Module Federation 5</span>
      </div>
      <div className="hidden lg:flex absolute top-48 right-12 items-center gap-2 px-3.5 py-1.5 rounded-xl glass-panel border border-indigo-500/30 text-xs font-mono text-indigo-300 shadow-lg shadow-indigo-950/40 pointer-events-none animate-float-slow [animation-delay:1s]">
        <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
        <span>Nx &amp; Turborepo</span>
      </div>

      {/* Main Center Container */}
      <div className="max-w-4xl mx-auto w-full flex flex-col items-center space-y-8 sm:space-y-10 my-auto py-4 z-10">

        {/* Status Pill — CSS fade-in */}
        <div className="cursor-pointer hero-fade-in" style={{ animationDelay: "0s" }}>
          <div className="inline-flex items-center gap-2.5 px-4.5 py-2 rounded-full glass-panel bg-slate-900/90 border border-cyan-500/30 text-xs font-mono text-cyan-300 shadow-xl shadow-cyan-950/40 hover:border-cyan-400/60 hover:scale-[1.04] transition-all duration-300">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span>Available for Senior Software Developer Roles</span>
          </div>
        </div>

        {/* Candidate Name — Instant LCP */}
        <div className="space-y-3 sm:space-y-4 w-full px-2 max-w-full overflow-hidden hero-fade-in" style={{ animationDelay: "0s" }}>
          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight leading-tight py-1 flex flex-nowrap justify-center items-center gap-x-2 sm:gap-x-3 whitespace-nowrap overflow-visible">
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent text-glow-cyan inline-block hover:scale-[1.02] transition-transform duration-300">
              Abhishek Kumar
            </span>
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent text-glow-purple inline-block hover:scale-[1.02] transition-transform duration-300">
              Singh
            </span>
          </h1>

          <div className="text-base xs:text-lg sm:text-3xl font-semibold text-gray-300 flex items-center justify-center pt-1 min-h-[44px]">
            <TypewriterText words={rotatingRoles} />
          </div>
        </div>

        {/* Intro Description — CSS fade-in */}
        <p
          className="text-base sm:text-xl md:text-2xl text-gray-300 max-w-3xl leading-relaxed font-normal px-2 sm:px-4 hero-fade-in"
          style={{ animationDelay: "0.3s" }}
        >
          Passionate Software Developer with <span className="text-cyan-400 font-semibold">4+ years of experience</span> building scalable web applications using <span className="text-white font-medium">ReactJS</span>, <span className="text-white font-medium">Next.js 14+</span>, <span className="text-white font-medium">Node.js &amp; Express</span>, <span className="text-white font-medium">Webpack 5 Micro-Frontends</span>, and <span className="text-white font-medium">Nx/Turborepo Monorepos</span>. Dedicated to delivering sub-2.0s LCP load speeds, modular architecture, and clean enterprise software systems.
        </p>
      </div>
    </section>
  );
};

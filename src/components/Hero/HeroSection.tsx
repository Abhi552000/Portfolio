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
    "Micro-Frontend Systems (Webpack 5)",
    "Nx & Turborepo Monorepos",
    "Node.js & REST API Integrations",
  ];

  return (
    <section
      id="hero"
      className="relative w-full min-h-[calc(100vh-80px)] pt-28 pb-16 px-4 sm:px-8 flex flex-col justify-center items-center text-center overflow-hidden scroll-mt-20"
    >
      {/* Background Ambient Lighting Orbs — Subtle, Zero-cost CSS Radial Gradients */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(6, 182, 212, 0.12) 0%, rgba(6, 182, 212, 0.03) 45%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-10 right-10 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, rgba(99, 102, 241, 0.03) 45%, transparent 70%)",
        }}
      />

      {/* Main Center Container */}
      <div className="max-w-4xl mx-auto w-full flex flex-col items-center space-y-6 sm:space-y-8 my-auto py-4 z-10">

        {/* Status Pill */}
        <div className="hero-fade-in" style={{ animationDelay: "0s" }}>
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-panel bg-slate-900/90 border border-cyan-500/30 text-xs font-mono text-cyan-300 shadow-xl shadow-cyan-950/40">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Available for Full-Time &amp; Senior Engineering Roles</span>
          </div>
        </div>

        {/* Candidate Name */}
        <div className="space-y-2 sm:space-y-3 w-full px-2 max-w-full overflow-hidden hero-fade-in" style={{ animationDelay: "0s" }}>
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight py-1 flex flex-nowrap justify-center items-center gap-x-2 sm:gap-x-3 whitespace-nowrap overflow-visible">
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent text-glow-cyan inline-block hover:scale-[1.02] transition-transform duration-300">
              Abhishek Kumar
            </span>
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent text-glow-purple inline-block hover:scale-[1.02] transition-transform duration-300">
              Singh
            </span>
          </h1>

          <div className="text-base xs:text-lg sm:text-2xl font-semibold text-gray-300 flex items-center justify-center pt-1 min-h-[40px]">
            <TypewriterText words={rotatingRoles} />
          </div>
        </div>

        {/* Intro Description — Conversational, Credible, and Human */}
        <p
          className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl leading-relaxed font-normal px-2 sm:px-4 hero-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          Hi, I&apos;m Abhishek — a Software Developer with <span className="text-cyan-400 font-semibold">4+ years of experience</span> crafting scalable web applications. I specialize in <span className="text-white font-medium">React</span>, <span className="text-white font-medium">Next.js 14</span>, <span className="text-white font-medium">Node.js</span>, and architecting modular frontend ecosystems with <span className="text-white font-medium">Micro-Frontends</span> and <span className="text-white font-medium">Nx Monorepos</span>. I care deeply about clean code, intuitive UX, and developer velocity.
        </p>
      </div>
    </section>
  );
};

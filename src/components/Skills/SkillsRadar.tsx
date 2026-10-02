"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Code, Layers, Cpu, Server, CheckCircle2, Sparkles } from "lucide-react";
import { SKILL_CATEGORIES } from "@/data/portfolioData";

export const SkillsRadar: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<number>(0);

  const iconsMap: Record<string, React.ReactNode> = {
    Code: <Code className="w-5 h-5 text-cyan-400" />,
    Layers: <Layers className="w-5 h-5 text-indigo-400" />,
    Cpu: <Cpu className="w-5 h-5 text-emerald-400" />,
    Server: <Server className="w-5 h-5 text-purple-400" />,
  };

  return (
    <section id="skills" className="py-24 px-4 sm:px-8 relative z-10">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-400">
            <Cpu className="w-3.5 h-3.5" />
            TECHNICAL DOMAIN MATRIX
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Core Expertise & <span className="text-gradient-cyan">Skill Proficiency</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg">
            A comprehensive matrix of technical skillsets built across 4+ years of building enterprise micro-frontends, monorepos, and high-performance React web platforms.
          </p>
        </div>

        {/* Category Navigation Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {SKILL_CATEGORIES.map((cat, index) => {
            const isActive = activeCategory === index;

            return (
              <button
                key={cat.title}
                onClick={() => setActiveCategory(index)}
                className={`p-5 rounded-2xl border transition-all text-left flex flex-col justify-between ${
                  isActive
                    ? "bg-cyan-950/70 border-cyan-400 shadow-xl shadow-cyan-500/20"
                    : "glass-panel bg-slate-900/60 border-slate-800 hover:border-cyan-500/40"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  {iconsMap[cat.iconName]}
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-300">
                    {cat.skills.length} Competencies
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  {cat.title}
                </h3>
              </button>
            );
          })}
        </div>

        {/* Active Category Skills List */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              {iconsMap[SKILL_CATEGORIES[activeCategory].iconName]}
              <span>{SKILL_CATEGORIES[activeCategory].title} Skills Matrix</span>
            </h3>
            <span className="text-xs font-mono text-cyan-400">
              Verified Production Proficiency
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SKILL_CATEGORIES[activeCategory].skills.map((skill) => (
              <div key={skill.name} className="space-y-2">
                <div className="flex items-center justify-between text-sm font-mono">
                  <span className="text-white font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    {skill.name}
                  </span>
                  <span className="text-xs text-cyan-400 px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30">
                    {skill.tag} • {skill.level}%
                  </span>
                </div>

                {/* Animated Meter Bar */}
                <div className="h-2.5 rounded-full bg-slate-900 border border-slate-800 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

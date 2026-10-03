"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code2, Layers, Cpu, Server, CheckCircle2 } from "lucide-react";
import { SKILL_CATEGORIES } from "@/data/portfolioData";

export const SkillsRadar: React.FC = () => {
  const iconsMap: Record<string, React.ReactNode> = {
    Code: <Code2 className="w-5 h-5 text-cyan-400" />,
    Layers: <Layers className="w-5 h-5 text-indigo-400" />,
    Cpu: <Cpu className="w-5 h-5 text-emerald-400" />,
    Server: <Server className="w-5 h-5 text-purple-400" />,
  };

  const colorMap: Record<string, { border: string; glow: string; text: string; dot: string }> = {
    Code: {
      border: "border-cyan-500/30 hover:border-cyan-400/60",
      glow: "from-cyan-500/10 to-blue-500/5",
      text: "text-cyan-300",
      dot: "bg-cyan-400",
    },
    Layers: {
      border: "border-indigo-500/30 hover:border-indigo-400/60",
      glow: "from-indigo-500/10 to-purple-500/5",
      text: "text-indigo-300",
      dot: "bg-indigo-400",
    },
    Cpu: {
      border: "border-emerald-500/30 hover:border-emerald-400/60",
      glow: "from-emerald-500/10 to-teal-500/5",
      text: "text-emerald-300",
      dot: "bg-emerald-400",
    },
    Server: {
      border: "border-purple-500/30 hover:border-purple-400/60",
      glow: "from-purple-500/10 to-pink-500/5",
      text: "text-purple-300",
      dot: "bg-purple-400",
    },
  };

  return (
    <section id="skills" className="py-24 px-4 sm:px-8 relative z-10 scroll-mt-16">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-xs font-mono text-cyan-300 shadow-md uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Core Technical <span className="text-gradient-cyan">Skillsets & Stack</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg">
            Engineering tools, programming languages, UI frameworks, architecture patterns, and backend engines built across 4+ years of software development.
          </p>
        </div>

        {/* 2x2 Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SKILL_CATEGORIES.map((cat, catIdx) => {
            const styles = colorMap[cat.iconName] || colorMap.Code;

            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: catIdx * 0.1 }}
                whileHover={{ y: -4 }}
                className={`glass-panel p-6 sm:p-8 rounded-3xl border ${styles.border} transition-all duration-300 relative overflow-hidden flex flex-col justify-between space-y-6 shadow-xl`}
              >
                {/* Background Ambient Glow */}
                <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${styles.glow} rounded-full blur-3xl pointer-events-none -z-10`} />

                {/* Card Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 shadow-inner">
                      {iconsMap[cat.iconName]}
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                        {cat.title}
                      </h3>
                      <span className="text-[11px] font-mono text-gray-400">
                        {cat.skills.length} Capabilities
                      </span>
                    </div>
                  </div>
                </div>

                {/* Clean Skill Badges (No Level % or Tag labels) */}
                <div className="flex flex-wrap gap-2.5">
                  {cat.skills.map((skill, skillIdx) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: catIdx * 0.1 + skillIdx * 0.03 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 text-xs sm:text-sm font-medium text-gray-200 hover:text-white shadow-md cursor-default transition-all group"
                    >
                      <span className={`w-2 h-2 rounded-full ${styles.dot} group-hover:scale-125 transition-transform`} />
                      <span>{skill.name}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Verification Note */}
        <div className="p-4 rounded-2xl glass-panel bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left shadow-lg">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
            <span className="text-xs sm:text-sm text-gray-300 font-medium">
              All listed technologies are actively deployed in production applications with clean architectural standards.
            </span>
          </div>
          <span className="text-xs font-mono text-cyan-400 shrink-0 px-3 py-1 rounded-lg bg-cyan-950/60 border border-cyan-500/30">
            Production Verified
          </span>
        </div>
      </div>
    </section>
  );
};

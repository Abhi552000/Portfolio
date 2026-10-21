"use client";

import React from "react";
import { motion } from "framer-motion";
import { User, Compass, Zap, GitBranch, MapPin, GraduationCap, Briefcase, Mail } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";

export const AboutSection: React.FC = () => {
  const principles = [
    {
      icon: Compass,
      title: "Pragmatic Architecture over Hype",
      description:
        "Micro-Frontends and Monorepos shouldn't be used for buzzwords. I apply Webpack 5 Module Federation and Nx workspaces when teams genuinely need independent release cycles, shared design systems, and zero coordination bottlenecks.",
      badge: "Architecture",
      color: "text-cyan-400 border-cyan-500/30 bg-cyan-950/40",
    },
    {
      icon: Zap,
      title: "Performance by Default",
      description:
        "Speed is a feature. I focus on sub-2.0s Largest Contentful Paint (LCP), tree-shaken dynamic imports, and stale-while-revalidate client caching with React Query to ensure web apps remain responsive at scale.",
      badge: "Core Web Vitals",
      color: "text-sky-400 border-sky-500/30 bg-sky-950/40",
    },
    {
      icon: GitBranch,
      title: "High-Standard Collaboration",
      description:
        "Software is a team sport. I champion strict TypeScript types, reusable UI design tokens, clean Git branching workflows, and detailed PR reviews that help engineering teams move fast with confidence.",
      badge: "Engineering Culture",
      color: "text-indigo-400 border-indigo-500/30 bg-indigo-950/40",
    },
  ];

  return (
    <section id="about" className="py-24 px-4 sm:px-8 relative z-10 scroll-mt-20">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-xs font-mono text-cyan-300">
            <User className="w-3.5 h-3.5" />
            <span>ABOUT &amp; PHILOSOPHY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Engineering Craftsmanship &amp; Grounded Solutions
          </h2>
          <p className="text-gray-400 text-base sm:text-lg">
            Who I am, what drives my work, and the architectural principles I bring to product teams.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Personal Story & Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/20 shadow-xl space-y-5">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-slate-950 font-mono text-sm shadow-md shadow-cyan-500/30">
                  AS
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Abhishek Kumar Singh</h3>
                  <p className="text-xs text-cyan-400 font-mono">Software Developer • 4+ Years Experience</p>
                </div>
              </div>

              <div className="space-y-4 text-sm sm:text-base text-gray-300 leading-relaxed font-normal">
                <p>
                  I am a Software Developer based in <span className="text-white font-medium">Kolkata, India</span>, specializing in modern frontend systems, TypeScript, and full-stack web applications.
                </p>
                <p>
                  Over the past <span className="text-cyan-400 font-medium">4+ years at NextZen Minds</span>, I have contributed to production enterprise systems including <span className="text-white font-medium">MoneyMax</span> (Singapore retail POS &amp; pawn platform), <span className="text-white font-medium">EzHealthTrack</span> (telemedicine/EHR), and <span className="text-white font-medium">Swift Security</span> (acquired by Concentric AI).
                </p>
                <p>
                  My focus centers on <span className="text-white font-medium">scalable UI architecture</span> — from decoupling monolithic frontends into independently deployable Webpack 5 Micro-Frontends, to organizing shared component libraries and utilities within high-speed Nx &amp; Turborepo monorepos.
                </p>
              </div>

              {/* Quick Facts Card */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-800/80 text-xs font-mono text-gray-300">
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Kolkata, India (Open to Remote)</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <GraduationCap className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>B.Tech in ECE (8.3 CGPA)</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <Briefcase className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>NextZen Minds (Software Developer)</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <Mail className="w-4 h-4 text-purple-400 shrink-0" />
                  <span className="truncate">{PERSONAL_INFO.email}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Engineering Principles */}
          <div className="lg:col-span-6 space-y-4">
            {principles.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.12 }}
                  className="glass-panel p-6 rounded-3xl border border-slate-800 hover:border-cyan-500/30 transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-cyan-400 group-hover:scale-110 group-hover:border-cyan-500/40 transition-all shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <h4 className="font-bold text-base text-white group-hover:text-cyan-300 transition-colors">
                          {item.title}
                        </h4>
                        <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border ${item.color}`}>
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-normal">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

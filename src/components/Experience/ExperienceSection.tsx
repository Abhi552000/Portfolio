"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  Calendar,
  MapPin,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import { WORK_EXPERIENCES } from "@/data/portfolioData";
import { AnimatedText } from "@/components/Animation/AnimatedText";

export const ExperienceSection: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string>(WORK_EXPERIENCES[0].id);

  return (
    <section id="experience" className="py-24 px-4 sm:px-8 relative z-10">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-400">
            <Briefcase className="w-3.5 h-3.5" />
            CAREER TRAJECTORY
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            <AnimatedText text="Work Experience & Engineering Impact" />
          </h2>
          <p className="text-gray-400 text-base sm:text-lg">
            Over 4+ years of hands-on experience building, architecting, and optimizing high-scale web applications for product teams.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l-2 border-slate-800 ml-4 sm:ml-8 space-y-10">
          {WORK_EXPERIENCES.map((exp, index) => {
            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative pl-6 sm:pl-10 group"
              >
                {/* Timeline Point Node */}
                <div className={`absolute -left-[17px] top-1.5 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                  exp.isCurrent
                    ? "bg-cyan-500 border-cyan-300 text-slate-950 shadow-lg shadow-cyan-500/50 scale-110"
                    : "bg-slate-900 border-slate-700 text-cyan-400 group-hover:border-cyan-400"
                }`}>
                  <Briefcase className="w-3.5 h-3.5" />
                </div>

                {/* Experience Card */}
                <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800/80 hover:border-cyan-500/30 transition-all shadow-xl">
                  {/* Card Header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800/60">
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl sm:text-2xl font-bold text-white">
                          {exp.role}
                        </h3>
                        {exp.isCurrent && (
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-mono uppercase font-bold">
                            Present Role
                          </span>
                        )}
                      </div>
                      <div className="text-cyan-400 font-semibold text-base mt-1">
                        {exp.company}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-gray-400">
                      <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 border border-slate-800">
                        <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 border border-slate-800">
                        <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Summary & Impact Badge */}
                  <div className="py-4 space-y-3">
                    <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                      {exp.summary}
                    </p>

                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
                      <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Key Outcome: {exp.impactMetric}</span>
                    </div>
                  </div>

                  {/* Bullet Achievements List */}
                  <div className="space-y-2 pt-2">
                    {exp.achievements.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-gray-300">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-2 pt-6 border-t border-slate-800/80 mt-4">
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 rounded-lg bg-slate-900 text-xs font-mono text-cyan-300 border border-slate-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

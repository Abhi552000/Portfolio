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
        <div className="relative border-l-2 border-slate-800/80 ml-4 sm:ml-8 space-y-10">
          <div className="absolute left-[-2px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-500 via-blue-500 to-transparent pointer-events-none" />

          {WORK_EXPERIENCES.map((exp, index) => {
            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
                className="relative pl-6 sm:pl-10 group"
              >
                {/* Timeline Point Node */}
                <motion.div
                  whileHover={{ scale: 1.25 }}
                  className={`absolute -left-[17px] top-1.5 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer ${
                    exp.isCurrent
                      ? "bg-cyan-500 border-cyan-300 text-slate-950 shadow-lg shadow-cyan-500/60 scale-110"
                      : "bg-slate-900 border-slate-700 text-cyan-400 group-hover:border-cyan-400 group-hover:bg-cyan-950"
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5" />
                </motion.div>

                {/* Experience Card */}
                <motion.div
                  whileHover={{ y: -4, boxShadow: "0 15px 35px -10px rgba(6, 182, 212, 0.25)" }}
                  className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800/80 hover:border-cyan-500/40 transition-all shadow-xl"
                >
                  {/* Card Header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800/60">
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {exp.role}
                        </h3>
                        {exp.isCurrent && (
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-mono uppercase font-bold animate-pulse">
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

                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono shadow-md">
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
                      <motion.span
                        key={skill}
                        whileHover={{ scale: 1.08, y: -2 }}
                        className="px-3 py-1 rounded-lg bg-slate-900 text-xs font-mono text-cyan-300 border border-slate-800 hover:border-cyan-500/40 cursor-default transition-all"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

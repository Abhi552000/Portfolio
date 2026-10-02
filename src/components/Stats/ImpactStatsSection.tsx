"use client";

import React from "react";
import { motion } from "framer-motion";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { Zap } from "lucide-react";

export const ImpactStatsSection: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 px-4 sm:px-8 max-w-6xl mx-auto w-full text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="space-y-12"
      >
        {/* Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-gray-400 font-mono text-xs uppercase tracking-widest">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>Proven Track Record</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Key Engineering Impact Metrics
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
          {PERSONAL_INFO.stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6, scale: 1.03 }}
              className="p-6 sm:p-8 rounded-3xl glass-panel-interactive flex flex-col items-center text-center transition-all cursor-pointer group"
            >
              <span className={`text-4xl sm:text-5xl font-black bg-gradient-to-r ${stat.accent} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300`}>
                {stat.value}
              </span>
              <span className="text-xs sm:text-sm text-gray-300 font-semibold mt-3 group-hover:text-cyan-300 transition-colors">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

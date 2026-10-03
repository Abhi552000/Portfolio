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
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
              whileHover={{ y: -8, scale: 1.05, boxShadow: "0 15px 40px -10px rgba(6, 182, 212, 0.35)" }}
              whileTap={{ scale: 0.98 }}
              className="p-6 sm:p-8 rounded-3xl glass-panel-interactive flex flex-col items-center text-center transition-all cursor-pointer group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <motion.span
                whileHover={{ scale: 1.15, rotate: 2 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className={`text-4xl sm:text-5xl font-black bg-gradient-to-r ${stat.accent} bg-clip-text text-transparent inline-block`}
              >
                {stat.value}
              </motion.span>
              <span className="text-xs sm:text-sm text-gray-300 font-semibold mt-3 group-hover:text-cyan-300 transition-colors z-10">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

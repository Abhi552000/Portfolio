"use client";

import React from "react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { Zap } from "lucide-react";

export const ImpactStatsSection: React.FC = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) { setVisible(true); return; }
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { rootMargin: "50px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-24 sm:py-32 px-4 sm:px-8 max-w-6xl mx-auto w-full text-center">
      <div
        className="space-y-12"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
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
            <div
              key={stat.label}
              className="p-6 sm:p-8 rounded-3xl glass-panel-interactive flex flex-col items-center text-center cursor-pointer group relative overflow-hidden hover:-translate-y-2 hover:scale-[1.03] hover:shadow-[0_15px_40px_-10px_rgba(6,182,212,0.35)] active:scale-[0.98]"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0) scale(1)" : "translateY(24px) scale(0.92)",
                transition: `opacity 0.5s ease ${idx * 0.1}s, transform 0.5s ease ${idx * 0.1}s`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span
                className={`text-4xl sm:text-5xl font-black bg-gradient-to-r ${stat.accent} bg-clip-text text-transparent inline-block group-hover:scale-110 transition-transform duration-300`}
              >
                {stat.value}
              </span>
              <span className="text-xs sm:text-sm text-gray-300 font-semibold mt-3 group-hover:text-cyan-300 transition-colors z-10">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

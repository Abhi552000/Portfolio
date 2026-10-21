"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Layers,
  Cpu,
  Box,
  Share2,
  ShieldCheck,
  Zap,
  CheckCircle2,
  FolderGit2
} from "lucide-react";

export const ArchitectureSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"mfe" | "monorepo">("mfe");

  return (
    <section id="architecture" className="py-24 px-4 sm:px-8 relative z-10 scroll-mt-20">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-xs font-mono text-cyan-300">
            <Layers className="w-3.5 h-3.5" />
            <span>SYSTEM ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Frontend Architecture &amp; Workspaces
          </h2>
          <p className="text-gray-400 text-base sm:text-lg">
            Practical design patterns I implemented at NextZen Minds to decouple enterprise frontends and streamline multi-app development.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-md gap-2">
            <button
              onClick={() => setActiveTab("mfe")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "mfe"
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md shadow-cyan-500/20 font-bold"
                  : "text-gray-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <Share2 className="w-4 h-4" />
              <span>Micro-Frontends (Webpack 5)</span>
            </button>
            <button
              onClick={() => setActiveTab("monorepo")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "monorepo"
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md shadow-cyan-500/20 font-bold"
                  : "text-gray-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>Nx &amp; Turborepo Monorepo</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Micro-Frontend Architecture */}
        {activeTab === "mfe" && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Overview Card */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/20 shadow-xl space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                    <Box className="w-5 h-5 text-cyan-400" />
                    <span>Webpack 5 Module Federation Architecture</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1">
                    Decoupled a monolithic enterprise web app into independently deployable remotes with runtime orchestration.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 bg-cyan-950/60 px-3.5 py-1.5 rounded-xl border border-cyan-500/30">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Production Deployed</span>
                </div>
              </div>

              {/* 3 Core Architecture Pillars */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                    <Zap className="w-4 h-4 text-cyan-400" />
                    <span>Independent Deployments</span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed font-normal">
                    Each remote module maintains its own Git repository and CI/CD pipeline, deploying updates without requiring a host container rebuild.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
                    <Share2 className="w-4 h-4 text-sky-400" />
                    <span>Shared Singletons</span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed font-normal">
                    Core libraries like React 18, React-DOM, and Redux are shared as singletons across boundaries, avoiding duplicate bundle downloads and state desync.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
                    <ShieldCheck className="w-4 h-4 text-indigo-400" />
                    <span>Fault Isolation</span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed font-normal">
                    Granular React Error Boundaries wrap each remote. If a network issue impacts one module, the rest of the application remains fully operational.
                  </p>
                </div>
              </div>

              {/* System Module Flow */}
              <div className="pt-2">
                <span className="text-xs font-mono text-gray-400 uppercase tracking-wider block mb-3">
                  Architecture Breakdown by Domain:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-xs">Host Container Shell</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">Orchestrator</span>
                    </div>
                    <p className="text-[11px] text-gray-400">Mounts federated remotes dynamically, handles global auth token refresh, and coordinates top-level routing.</p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-xs">Retail POS Module</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-gray-300">Remote App</span>
                    </div>
                    <p className="text-[11px] text-gray-400">In-store pawn and valuation workflows, barcode scanning, cashier registers, and customer receipt generation.</p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-xs">HQ Admin Portal</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-gray-300">Remote App</span>
                    </div>
                    <p className="text-[11px] text-gray-400">Headquarters inventory reconciliation, live gold pricing indices, RBAC permissions, and auditing analytics.</p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-xs">Auth &amp; Session Service</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-gray-300">Remote App</span>
                    </div>
                    <p className="text-[11px] text-gray-400">Cross-app session management, JWT HTTP-only cookie synchronization, and multi-factor authentication.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab 2: Monorepo Architecture */}
        {activeTab === "monorepo" && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Overview Card */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-indigo-500/20 shadow-xl space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                    <FolderGit2 className="w-5 h-5 text-indigo-400" />
                    <span>Nx &amp; Turborepo Monorepo Architecture</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1">
                    Unified multi-application workspace with pnpm workspaces, remote computation caching, and strict boundaries.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-indigo-300 bg-indigo-950/60 px-3.5 py-1.5 rounded-xl border border-indigo-500/30">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>40% Duplication Saved</span>
                </div>
              </div>

              {/* 3 Core Architecture Pillars */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
                    <Box className="w-4 h-4 text-indigo-400" />
                    <span>Shared Design System</span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed font-normal">
                    Isolated <code className="text-cyan-300">@workspace/ui</code> package with reusable atomic React components, cutting feature delivery time by ~30% across teams.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                    <Zap className="w-4 h-4 text-cyan-400" />
                    <span>Computation Caching</span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed font-normal">
                    Turborepo hashes source code inputs and configs. Unchanged packages are restored instantly from cache during CI builds instead of recompiling.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
                    <ShieldCheck className="w-4 h-4 text-purple-400" />
                    <span>Strict Package Boundaries</span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed font-normal">
                    Nx module boundary rules prevent circular dependencies and verify that applications only import through public package API entry points.
                  </p>
                </div>
              </div>

              {/* Monorepo Workspace Package Map */}
              <div className="pt-2">
                <span className="text-xs font-mono text-gray-400 uppercase tracking-wider block mb-3">
                  Workspace Structure &amp; Shared Packages:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-xs">@workspace/ui</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-500/30">Package</span>
                    </div>
                    <p className="text-[11px] text-gray-400">Buttons, modals, form controls, and responsive data tables with unified Tailwind tokens.</p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-xs">@workspace/hooks</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-500/30">Package</span>
                    </div>
                    <p className="text-[11px] text-gray-400">Custom React hooks for session handling, responsive breakpoints, debouncing, and API caching.</p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-xs">@workspace/config</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-500/30">Package</span>
                    </div>
                    <p className="text-[11px] text-gray-400">Shared ESLint rules, TypeScript tsconfig presets, and Prettier code formatting standards.</p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-xs">apps/* Workspaces</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">Apps</span>
                    </div>
                    <p className="text-[11px] text-gray-400">Next.js and React client applications consuming shared internal packages via pnpm workspace symlinks.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

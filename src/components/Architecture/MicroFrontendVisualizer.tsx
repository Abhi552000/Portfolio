"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Layers,
  Cpu,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Play,
  Box,
  Share2,
  Shield,
  Activity,
  Zap,
  Code2
} from "lucide-react";
import { MFE_MODULES_DEMO } from "@/data/portfolioData";

export const MicroFrontendVisualizer: React.FC = () => {
  const [activeRemotes, setActiveRemotes] = useState<string[]>([
    "auth",
    "dashboard",
    "billing",
  ]);
  const [selectedModule, setSelectedModule] = useState<string>("shell");
  const [sharedDepsState, setSharedDepsState] = useState<boolean>(true);
  const [simulatingDeploy, setSimulatingDeploy] = useState<boolean>(false);

  const toggleRemote = (id: string) => {
    if (activeRemotes.includes(id)) {
      setActiveRemotes(activeRemotes.filter((r) => r !== id));
    } else {
      setActiveRemotes([...activeRemotes, id]);
    }
  };

  const runSimulatedDeployment = () => {
    setSimulatingDeploy(true);
    setTimeout(() => {
      setSimulatingDeploy(false);
    }, 1500);
  };

  return (
    <section id="architecture" className="py-20 px-4 sm:px-8 relative z-10">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-400">
            <Layers className="w-3.5 h-3.5" />
            MODULE FEDERATION ARCHITECTURE
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Micro-Frontend <span className="text-gradient-cyan">Live Interactive Sandbox</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg">
            Experience how I architect independent product modules using Webpack 5 Module Federation. Toggle remotes, inspect runtime dependency sharing, and simulate isolated deployments.
          </p>
        </div>

        {/* Interactive Visualizer Panel */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/20 shadow-2xl relative overflow-hidden">
          {/* Top Control Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">
                Module Federation Controls:
              </span>
              <button
                onClick={runSimulatedDeployment}
                disabled={simulatingDeploy}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-cyan-950 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-300 text-xs font-mono transition-all disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${simulatingDeploy ? "animate-spin" : ""}`} />
                <span>{simulatingDeploy ? "Deploying Remote..." : "Simulate Hot Deployment"}</span>
              </button>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono text-gray-400">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={sharedDepsState}
                  onChange={(e) => setSharedDepsState(e.target.checked)}
                  className="rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-0"
                />
                <span>Shared Singleton React & Redux ({sharedDepsState ? "Active" : "Disabled"})</span>
              </label>
            </div>
          </div>

          {/* Core Topology Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-8 items-center">
            {/* Host Container Card */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <div
                onClick={() => setSelectedModule("shell")}
                className={`p-6 rounded-2xl border transition-all cursor-pointer ${
                  selectedModule === "shell"
                    ? "bg-cyan-950/60 border-cyan-400 shadow-xl shadow-cyan-500/20 ring-2 ring-cyan-500/30"
                    : "glass-panel bg-slate-900/60 border-slate-800 hover:border-cyan-500/40"
                }`}
              >
                <div className="flex items-center justify-between pb-3">
                  <div className="flex items-center gap-2">
                    <Box className="w-5 h-5 text-cyan-400" />
                    <h3 className="font-bold text-white text-base">Host Container Shell</h3>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-[10px] font-mono">
                    Port 3000
                  </span>
                </div>
                <p className="text-xs text-gray-400 mb-4">
                  Aggregates federated remote modules dynamically at runtime. Orchestrates auth tokens & routing.
                </p>

                {/* Shared Singleton List */}
                <div className="space-y-1.5 font-mono text-[11px] text-gray-300 pt-3 border-t border-slate-800/80">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Shared React:</span>
                    <span className="text-cyan-400">v18.2.0 (Singleton)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Shared Redux:</span>
                    <span className="text-indigo-400">v2.0+ (Shared Slice)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Federation Bus Link Visualizer */}
            <div className="lg:col-span-1 flex lg:flex-col items-center justify-center py-4 lg:py-0">
              <div className="w-full lg:w-0.5 h-0.5 lg:h-32 bg-gradient-to-r lg:bg-gradient-to-b from-cyan-500 via-blue-500 to-indigo-500 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-900 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                  <Share2 className="w-4 h-4 animate-pulse" />
                </div>
              </div>
            </div>

            {/* Federated Remotes Grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {MFE_MODULES_DEMO.filter((m) => m.id !== "shell").map((module) => {
                const isActive = activeRemotes.includes(module.id);
                const isSelected = selectedModule === module.id;

                return (
                  <motion.div
                    key={module.id}
                    layout
                    onClick={() => setSelectedModule(module.id)}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
                      isActive
                        ? isSelected
                          ? "bg-slate-900 border-cyan-400 shadow-lg shadow-cyan-500/20"
                          : "glass-panel bg-slate-900/80 border-slate-700 hover:border-cyan-500/40"
                        : "opacity-40 bg-slate-950 border-slate-900"
                    }`}
                  >
                    <div className="flex items-center justify-between pb-3">
                      <span className="text-xs font-bold text-white truncate">
                        {module.name}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleRemote(module.id);
                        }}
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          isActive
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                            : "bg-slate-800 text-gray-400 border border-slate-700"
                        }`}
                        title={isActive ? "Disable Remote" : "Mount Remote"}
                      >
                        {isActive ? "ON" : "OFF"}
                      </button>
                    </div>

                    <div className="text-[11px] font-mono text-gray-400 space-y-1">
                      <div>Status: <span className={isActive ? "text-emerald-400" : "text-rose-400"}>{isActive ? "Dynamic Remote" : "Unmounted"}</span></div>
                      <div>Port: {module.port}</div>
                      <div>Bundle: {isActive ? "42 KB (Gzipped)" : "0 KB"}</div>
                    </div>

                    {isActive && (
                      <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-cyan-400 font-mono">
                        <span className="flex items-center gap-1">
                          <Activity className="w-3 h-3 text-emerald-400" />
                          Isolated CI/CD
                        </span>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Module Deep Dive Specs */}
          <div className="mt-6 p-4 sm:p-6 rounded-2xl bg-slate-950/80 border border-slate-800/80 font-mono text-xs text-gray-300">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-cyan-400 font-bold flex items-center gap-2">
                <Code2 className="w-4 h-4" />
                Webpack Module Federation Architecture Specs:
              </span>
              <span className="text-gray-500">Target: ES2022</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              <div>
                <span className="text-gray-500 block mb-1">Inter-Team Autonomy:</span>
                <p className="text-gray-300">Each remote team deploys independently to S3/Cloudfront with zero host rebuild required.</p>
              </div>
              <div>
                <span className="text-gray-500 block mb-1">Shared Singleton Cache:</span>
                <p className="text-gray-300">{sharedDepsState ? "React & Redux instances deduplicated across all remotes." : "Unchecked: Multiple copies loaded."}</p>
              </div>
              <div>
                <span className="text-gray-500 block mb-1">Failure Isolation:</span>
                <p className="text-gray-300">Remote bundle network failures trigger seamless React Error Boundary fallback states.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

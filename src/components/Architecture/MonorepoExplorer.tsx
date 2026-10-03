"use client";

import React, { useState } from "react";
import {
  Cpu,
  Zap,
  Box,
  Layers
} from "lucide-react";
import { MONOREPO_GRAPH_NODES } from "@/data/portfolioData";

export const MonorepoExplorer: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState(MONOREPO_GRAPH_NODES[0].id);
  const [isBuilding, setIsBuilding] = useState(false);
  const [buildLogs, setBuildLogs] = useState<string[]>([]);

  const activeNodeObj = MONOREPO_GRAPH_NODES.find((n) => n.id === selectedNode) || MONOREPO_GRAPH_NODES[0];

  const triggerMonorepoBuild = (forceCache: boolean) => {
    setIsBuilding(true);
    setBuildLogs(["[turbo] Resolving workspaces graph...", "[nx] Auditing packages/ui & packages/hooks..."]);

    setTimeout(() => {
      if (forceCache) {
        setBuildLogs([
          "[turbo] Resolving workspaces graph...",
          ">>> FULL TURBO: 4 tasks cached from Nx remote cache",
          "└─ apps/web-app:build [CACHED] (12ms)",
          "└─ apps/admin-dashboard:build [CACHED] (18ms)",
          "└─ packages/ui:build [CACHED] (8ms)",
          "└─ packages/hooks:build [CACHED] (10ms)",
          "✓ Build completed in 180ms (40% duplication saved)"
        ]);
      } else {
        setBuildLogs([
          "[turbo] Resolving workspaces graph...",
          "└─ packages/config: linting typescript...",
          "└─ packages/ui: compiling tailwind glass tokens...",
          "└─ apps/web-app: bundling next.js 14 app router...",
          "✓ Build completed in 14.8s (Cold Start)"
        ]);
      }
      setIsBuilding(false);
    }, 1200);
  };

  return (
    <section className="py-12 px-4 sm:px-8 relative z-10">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Visualizer Panel Container */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-indigo-500/20 shadow-2xl space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-xs font-mono text-indigo-400 mb-2">
                <Cpu className="w-3.5 h-3.5" />
                NX & TURBOREPO MONOREPO
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                Workspace Dependency Graph & Remote Caching
              </h3>
            </div>

            {/* Build Simulator Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => triggerMonorepoBuild(false)}
                disabled={isBuilding}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-gray-300 border border-slate-700 text-xs font-mono transition-all"
              >
                Run Cold Build (14.8s)
              </button>
              <button
                onClick={() => triggerMonorepoBuild(true)}
                disabled={isBuilding}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-slate-950 font-bold text-xs shadow-lg shadow-indigo-500/20 transition-all hover:scale-105"
              >
                <Zap className="w-3.5 h-3.5 fill-current" />
                <span>Run Turbo Cached Build (180ms)</span>
              </button>
            </div>
          </div>

          {/* Topology Node Selection & Details */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Graph Node Tree */}
            <div className="lg:col-span-6 space-y-3">
              <span className="text-xs font-mono text-gray-400 uppercase tracking-wider block mb-2">
                Click Workspace Package to Inspect:
              </span>
              {MONOREPO_GRAPH_NODES.map((node) => {
                const isSelected = node.id === selectedNode;

                return (
                  <div
                    key={node.id}
                    onClick={() => setSelectedNode(node.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? "bg-indigo-950/60 border-indigo-400 shadow-md shadow-indigo-500/20"
                        : "glass-panel bg-slate-900/60 border-slate-800/80 hover:border-indigo-500/40"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${node.type === "app" ? "bg-cyan-500/20 text-cyan-400" : "bg-purple-500/20 text-purple-400"}`}>
                        {node.type === "app" ? <Box className="w-4 h-4" /> : <Layers className="w-4 h-4" />}
                      </div>
                      <div>
                        <span className="font-mono text-xs font-bold text-white block">
                          {node.label}
                        </span>
                        <span className="text-[11px] text-gray-400">{node.desc}</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-gray-400 uppercase">
                      {node.type}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Build Logs & Details Column */}
            <div className="lg:col-span-6 space-y-4">
              {/* Selected Package Details */}
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-indigo-400 font-bold">
                    Active Workspace Package Specs:
                  </span>
                  <span className="text-[10px] font-mono text-gray-400">Nx Graph Verified</span>
                </div>
                <h4 className="text-lg font-bold text-white font-mono">{activeNodeObj.label}</h4>
                <p className="text-xs text-gray-300">{activeNodeObj.desc}</p>
                <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-mono text-gray-400">
                  <span className="px-2 py-0.5 rounded bg-slate-800">Shared ESLint Config</span>
                  <span className="px-2 py-0.5 rounded bg-slate-800">Shared Tailwind Preset</span>
                  <span className="px-2 py-0.5 rounded bg-slate-800">Zero Duplication</span>
                </div>
              </div>

              {/* Build Terminal Console Output */}
              <div className="terminal-window p-4 font-mono text-xs text-gray-300 space-y-2 min-h-[160px]">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-gray-500 text-[10px]">
                  <span>TURBOREPO TASK EXECUTOR</span>
                  <span>{isBuilding ? "EXECUTING..." : "IDLE"}</span>
                </div>
                {buildLogs.length === 0 ? (
                  <p className="text-gray-500 italic py-4">Click a build button above to simulate task caching pipeline...</p>
                ) : (
                  <div className="space-y-1">
                    {buildLogs.map((log, i) => (
                      <div
                        key={i}
                        className={log.includes("FULL TURBO") ? "text-emerald-400 font-bold" : log.includes("✓") ? "text-cyan-400 font-bold" : "text-gray-300"}
                      >
                        {log}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

"use client";

import React, { useState } from "react";
import {
  Cpu,
  Box,
  Layers
} from "lucide-react";
import { MONOREPO_GRAPH_NODES } from "@/data/portfolioData";

export const MonorepoExplorer: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState(MONOREPO_GRAPH_NODES[0].id);

  const activeNodeObj = MONOREPO_GRAPH_NODES.find((n) => n.id === selectedNode) || MONOREPO_GRAPH_NODES[0];

  return (
    <section className="py-12 px-4 sm:px-8 relative z-10">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Visualizer Panel Container */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-indigo-500/20 shadow-2xl space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-950/80 border border-indigo-500/30 text-xs font-mono text-indigo-400 mb-2">
                <Cpu className="w-3.5 h-3.5" />
                <span>WORKSPACE ARCHITECTURE</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                Nx &amp; Turborepo Monorepo Architecture
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-2xl">
                Unifying shared design tokens, utility hooks, and applications across NextZen Minds to eliminate 40% code duplication.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-gray-400 bg-slate-900/80 px-3.5 py-2 rounded-xl border border-slate-800">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>pnpm Workspaces • Remote Caching</span>
            </div>
          </div>

          {/* Topology Node Selection & Details */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Graph Node Tree */}
            <div className="lg:col-span-5 space-y-3">
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

            {/* Architectural Details Column */}
            <div className="lg:col-span-7 space-y-4">
              {/* Selected Package Details */}
              <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-indigo-400 font-bold flex items-center gap-2">
                    <Box className="w-4 h-4" />
                    Package Specifications:
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-500/30">
                    {activeNodeObj.type.toUpperCase()}
                  </span>
                </div>
                <h4 className="text-xl font-bold text-white font-mono">{activeNodeObj.label}</h4>
                <p className="text-sm text-gray-300 leading-relaxed">{activeNodeObj.desc}</p>
                <div className="pt-3 border-t border-slate-800/80 flex flex-wrap gap-2 text-xs font-mono text-gray-300">
                  <span className="px-3 py-1 rounded-xl bg-slate-800/80 border border-slate-700/60 text-cyan-300">Shared Design Tokens</span>
                  <span className="px-3 py-1 rounded-xl bg-slate-800/80 border border-slate-700/60 text-indigo-300">Strict Type Safety</span>
                  <span className="px-3 py-1 rounded-xl bg-slate-800/80 border border-slate-700/60 text-emerald-300">Remote Cacheable</span>
                </div>
              </div>

              {/* Engineering Case Study Breakdown */}
              <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 font-mono text-xs text-gray-300 space-y-3">
                <span className="text-indigo-400 font-bold block pb-1 border-b border-slate-800">
                  Key Architectural Decisions:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] text-gray-300">
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                    <span className="text-white font-semibold block">Deduplication</span>
                    <p className="text-gray-400">Single source of truth for UI components, custom React hooks, and shared TypeScript interfaces.</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                    <span className="text-white font-semibold block">Computation Caching</span>
                    <p className="text-gray-400">Turborepo hashes file contents and inputs, skipping builds for unchanged packages in CI pipelines.</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                    <span className="text-white font-semibold block">Module Boundaries</span>
                    <p className="text-gray-400">Enforced via lint rules to guarantee apps import through clean package APIs, preventing spaghetti code.</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                    <span className="text-white font-semibold block">pnpm Workspaces</span>
                    <p className="text-gray-400">Strict symlink structure avoids phantom dependencies and prevents version mismatch collisions.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

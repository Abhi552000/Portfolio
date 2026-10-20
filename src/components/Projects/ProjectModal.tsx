"use client";

import React, { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Zap, Cpu, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/Icons/SocialIcons";
import { Project } from "@/data/portfolioData";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  // Lock body scroll and handle Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, handleKeyDown]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center p-2.5 sm:p-6 bg-slate-950/90 backdrop-blur-md overflow-hidden"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="glass-panel bg-slate-950 border border-cyan-500/40 rounded-2xl sm:rounded-3xl w-full max-w-2xl max-h-[70dvh] sm:max-h-[85vh] h-[70dvh] sm:h-auto flex flex-col overflow-hidden shadow-2xl relative"
        >
          {/* Sticky Modal Header */}
          <div className="flex items-center justify-between p-3.5 sm:p-5 bg-slate-900/95 border-b border-slate-800 shrink-0 z-10 relative">
            <div className="flex items-center gap-2 min-w-0 pr-2">
              <span className="px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/40 text-[9px] sm:text-[10px] font-mono uppercase tracking-wider font-bold shrink-0">
                {project.category === "personal" ? "Personal Showcase" : "Enterprise SaaS"}
              </span>
              <h3 className="font-bold text-white text-xs sm:text-base tracking-tight truncate">
                {project.title}
              </h3>
            </div>

            <button
              type="button"
              onClick={onClose}
              onTouchEnd={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onClose();
              }}
              className="relative z-30 p-2 sm:p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-gray-200 hover:text-white border border-slate-700/80 transition-all cursor-pointer touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center shrink-0"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 pointer-events-none" />
            </button>
          </div>

          {/* Scrollable Body Content */}
          <div className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6 space-y-5 text-xs sm:text-sm text-gray-300 scrollbar-thin [-webkit-overflow-scrolling:touch] touch-pan-y">
            {/* Banner Header */}
            <div className={`p-4 sm:p-6 rounded-2xl bg-gradient-to-r ${project.imageBg} border border-slate-700/50 space-y-1.5 relative overflow-hidden`}>
              <span className="px-2.5 py-0.5 rounded-md bg-slate-950/85 border border-cyan-500/30 text-[10px] font-mono text-cyan-300 uppercase tracking-wider inline-block">
                Role: {project.role}
              </span>
              <h3 className="text-lg sm:text-2xl font-extrabold text-white tracking-tight">
                {project.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-200 font-medium leading-normal">
                {project.subtitle}
              </p>
            </div>

            {/* System Overview */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-mono uppercase text-cyan-400 font-bold tracking-wider">
                System Overview
              </h4>
              <p className="leading-relaxed text-gray-200 text-xs sm:text-sm">{project.longDescription}</p>
            </div>

            {/* Architecture Highlights */}
            <div className="space-y-2.5 p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h4 className="text-xs font-mono uppercase text-cyan-400 font-bold tracking-wider flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                Architectural Highlights &amp; Key Engineering
              </h4>
              <ul className="space-y-2">
                {project.architectureHighlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300 leading-normal">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Impact Metrics */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-mono uppercase text-cyan-400 font-bold tracking-wider flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyan-400" />
                Key Deliverable Outcomes
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {project.impactMetrics.map((metric, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/20 text-xs font-mono text-cyan-200"
                  >
                    • {metric}
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack Tags */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <h4 className="text-xs font-mono uppercase text-gray-400 font-bold tracking-wider">
                Technologies &amp; Tools
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-lg bg-slate-900 text-xs font-mono text-gray-300 border border-slate-800"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky Modal Action Footer */}
          <div className="p-3 sm:p-4 bg-slate-900/95 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2.5 shrink-0 z-10">
            <div className="flex items-center gap-2 flex-wrap">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/25 hover:scale-105 active:scale-95 transition-all cursor-pointer touch-manipulation"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Live App</span>
                </a>
              )}

              {project.githubUrl ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 hover:text-white border border-cyan-500/40 hover:border-cyan-400 text-xs font-mono transition-all active:scale-95 cursor-pointer touch-manipulation"
                >
                  <GithubIcon className="w-4 h-4 text-cyan-400" />
                  <span>Source Code</span>
                </a>
              ) : (
                <span className="text-xs font-mono text-gray-500 italic hidden sm:inline">
                  Enterprise Proprietary System
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-gray-200 hover:text-white font-medium text-xs border border-slate-700 transition-all cursor-pointer touch-manipulation ml-auto"
            >
              Close Spec
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Zap, Cpu } from "lucide-react";
import { GithubIcon } from "@/components/Icons/SocialIcons";
import { Project } from "@/data/portfolioData";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [project]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="glass-panel bg-slate-950 border border-cyan-500/35 rounded-2xl sm:rounded-3xl max-w-[96vw] sm:max-w-4xl w-full h-[92vh] sm:h-[840px] flex flex-col overflow-hidden shadow-2xl relative"
        >
          {/* Sticky Modal Header */}
          <div className="flex items-center justify-between p-4 sm:p-5 bg-slate-900/90 border-b border-slate-800 shrink-0">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/40 text-[10px] font-mono uppercase tracking-wider font-bold shrink-0">
                {project.category === "personal" ? "Personal Showcase" : "Enterprise SaaS"}
              </span>
              <h3 className="font-bold text-white text-sm sm:text-base tracking-tight truncate">
                {project.title}
              </h3>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-xl bg-slate-900 border border-slate-800 text-gray-400 hover:text-white hover:bg-slate-800 transition-colors shrink-0"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Body Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 text-xs sm:text-sm text-gray-300 scrollbar-thin">
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
                Architectural Highlights & Key Engineering
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
                Technologies & Tools
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
          <div className="p-3 sm:p-4 bg-slate-900/90 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-cyan-500/30 text-xs font-mono transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>Source Code Repository</span>
              </a>
            ) : (
              <span className="text-xs font-mono text-gray-500 italic">Enterprise Proprietary Repository</span>
            )}

            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 hover:scale-105 transition-transform cursor-pointer"
            >
              Close Spec
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

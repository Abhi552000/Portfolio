"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, CheckCircle2, Zap, Cpu, Code2 } from "lucide-react";
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
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="glass-panel bg-slate-950 border border-cyan-500/30 rounded-2xl sm:rounded-3xl max-w-[95vw] sm:max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative p-4 sm:p-8 space-y-6"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-xl bg-slate-900 border border-slate-800 text-gray-400 hover:text-white hover:bg-slate-800 transition-colors z-20"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Banner Header */}
          <div className={`p-5 sm:p-8 rounded-2xl bg-gradient-to-r ${project.imageBg} border border-slate-700/50 space-y-2 relative overflow-hidden`}>
            <span className="px-3 py-1 rounded-full bg-slate-950/80 border border-cyan-500/30 text-[11px] font-mono text-cyan-300 uppercase tracking-wider inline-block">
              Role: {project.role}
            </span>
            <h3 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              {project.title}
            </h3>
            <p className="text-xs sm:text-base text-gray-200 font-medium">
              {project.subtitle}
            </p>
          </div>

          {/* Body Content */}
          <div className="space-y-6 text-xs sm:text-sm text-gray-300">
            {/* System Overview */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase text-cyan-400 font-bold tracking-wider">
                System Overview
              </h4>
              <p className="leading-relaxed text-gray-200 text-xs sm:text-sm">{project.longDescription}</p>
            </div>

            {/* Architecture Highlights */}
            <div className="space-y-3 p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h4 className="text-xs font-mono uppercase text-cyan-400 font-bold tracking-wider flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                Architectural Highlights & Key Engineering
              </h4>
              <ul className="space-y-2">
                {project.architectureHighlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Impact Metrics */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase text-cyan-400 font-bold tracking-wider flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyan-400" />
                Key Deliverable Outcomes
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
                    className="px-3 py-1 rounded-lg bg-slate-900 text-xs font-mono text-gray-300 border border-slate-800"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
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
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 hover:scale-105 transition-transform"
            >
              Close Spec
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

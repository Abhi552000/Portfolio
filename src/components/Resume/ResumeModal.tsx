"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, FileText } from "lucide-react";
import confetti from "canvas-confetti";
import { PERSONAL_INFO, WORK_EXPERIENCES, PROJECTS } from "@/data/portfolioData";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const handleDownload = () => {
    triggerConfetti();
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="glass-panel bg-slate-950 border border-cyan-500/35 rounded-2xl sm:rounded-3xl max-w-[96vw] sm:max-w-5xl w-full h-[93vh] sm:h-[880px] flex flex-col overflow-hidden shadow-2xl relative text-gray-200"
        >
          {/* Sticky Modal Header */}
          <div className="flex items-center justify-between p-4 sm:p-5 bg-slate-900/90 border-b border-slate-800 shrink-0">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-cyan-400" />
              <span className="font-mono text-xs text-cyan-400 font-bold uppercase tracking-wider">
                CURRICULUM VITAE PREVIEW
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 hover:scale-105 transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download / Print</span>
              </button>
              <button
                onClick={onClose}
                className="p-1.5 sm:p-2 rounded-xl bg-slate-900 border border-slate-800 text-gray-400 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Printable Scrollable Document Sheet */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-8 print:text-black font-sans scrollbar-thin">
            {/* Header */}
            <div className="border-b border-slate-800 pb-6 space-y-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
                {PERSONAL_INFO.name}
              </h1>
              <p className="text-cyan-400 font-semibold text-xs sm:text-sm">
                {PERSONAL_INFO.title}
              </p>
              <p className="text-[11px] sm:text-xs text-gray-400 font-mono flex flex-wrap gap-2">
                <span>{PERSONAL_INFO.location}</span>
                <span>•</span>
                <span>{PERSONAL_INFO.email}</span>
                <span>•</span>
                <span>linkedin.com/in/abhishek-kumar-singh-a0a306169</span>
              </p>
            </div>

            {/* Professional Summary */}
            <div className="space-y-2">
              <h2 className="text-xs font-mono font-bold uppercase text-cyan-400 tracking-widest">
                PROFESSIONAL SUMMARY
              </h2>
              <p className="text-xs text-gray-300 leading-relaxed">
                {PERSONAL_INFO.summary}
              </p>
            </div>

            {/* Technical Skills Matrix */}
            <div className="space-y-2">
              <h2 className="text-xs font-mono font-bold uppercase text-cyan-400 tracking-widest">
                TECHNICAL SKILLS
              </h2>
              <div className="text-xs space-y-1 font-mono text-gray-300">
                <p><strong className="text-white">Core:</strong> JavaScript (ES6+), TypeScript, HTML5, CSS3</p>
                <p><strong className="text-white">Frameworks:</strong> ReactJS, NextJS 14+, Redux Toolkit, Tailwind CSS, Material UI, Ant Design</p>
                <p><strong className="text-white">Architecture:</strong> Micro-Frontend (Module Federation), Monorepo (Nx, Turborepo), Component-Driven Design</p>
                <p><strong className="text-white">Tools & APIs:</strong> Git, GitHub Actions, Postman, JIRA, Socket.IO, Highcharts, Stripe, REST APIs</p>
              </div>
            </div>

            {/* Work Experience */}
            <div className="space-y-4">
              <h2 className="text-xs font-mono font-bold uppercase text-cyan-400 tracking-widest">
                WORK EXPERIENCE
              </h2>
              <div className="space-y-4">
                {WORK_EXPERIENCES.map((exp) => (
                  <div key={exp.id} className="space-y-1.5 text-xs">
                    <div className="flex flex-col sm:flex-row sm:justify-between font-bold text-white gap-1">
                      <span>{exp.role} — {exp.company}</span>
                      <span className="font-mono text-cyan-400">{exp.period} | {exp.location}</span>
                    </div>
                    <ul className="list-disc list-inside text-gray-300 space-y-1 pl-1">
                      {exp.achievements.map((ach, idx) => (
                        <li key={idx}>{ach}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Product & Personal Projects */}
            <div className="space-y-3">
              <h2 className="text-xs font-mono font-bold uppercase text-cyan-400 tracking-widest">
                PRODUCT & PERSONAL PROJECTS
              </h2>
              <div className="space-y-3 text-xs">
                {PROJECTS.map((p) => (
                  <div key={p.id} className="space-y-0.5">
                    <p className="font-bold text-white">
                      {p.title} — <span className="text-cyan-300 font-normal">{p.subtitle}</span>
                      <span className="font-mono text-gray-400 font-normal ml-2 block sm:inline">Stack: {p.techStack.join(", ")}</span>
                    </p>
                    <p className="text-gray-300">{p.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="space-y-2">
              <h2 className="text-xs font-mono font-bold uppercase text-cyan-400 tracking-widest">
                EDUCATION
              </h2>
              <div className="flex flex-col sm:flex-row justify-between text-xs font-mono text-gray-300 gap-1">
                <span>{PERSONAL_INFO.education.degree} — {PERSONAL_INFO.education.institution}</span>
                <span>{PERSONAL_INFO.education.period} | CGPA: {PERSONAL_INFO.education.cgpa}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

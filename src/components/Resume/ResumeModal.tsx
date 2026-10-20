"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, FileText, ExternalLink, FileType } from "lucide-react";
import confetti from "canvas-confetti";
import { PERSONAL_INFO } from "@/data/portfolioData";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 },
    });
  };

  const pdfUrl = PERSONAL_INFO.resumePdf || "/Abhishek-Kumar-Singh-Resume.pdf";
  const docxUrl = PERSONAL_INFO.resumeDocx || "/Abhishek-Kumar-Singh-Resume.docx";

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/90 backdrop-blur-md overflow-hidden"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.2 }}
          className="glass-panel bg-slate-950 border border-cyan-500/35 rounded-2xl sm:rounded-3xl max-w-5xl w-full max-h-[80dvh] sm:max-h-[88vh] h-[80dvh] sm:h-auto flex flex-col overflow-hidden shadow-2xl relative text-gray-200"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 sm:p-4 bg-slate-900/95 border-b border-slate-800 gap-3 shrink-0">
            {/* Title & Format Info */}
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-cyan-950/80 border border-cyan-500/30 text-cyan-400">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-white flex items-center gap-2">
                  <span>{PERSONAL_INFO.name}</span>
                  <span className="hidden sm:inline text-xs font-normal text-cyan-400 font-mono">
                    • Resume / CV
                  </span>
                </h3>
                <p className="text-[11px] text-gray-400 font-mono">
                  Static PDF &amp; Word (.docx) formats
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 flex-wrap justify-end">
              {/* Download PDF */}
              <a
                href={pdfUrl}
                download="Abhishek-Kumar-Singh-Resume.pdf"
                onClick={triggerConfetti}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                title="Download static PDF Resume"
              >
                <Download className="w-3.5 h-3.5" />
                <span>PDF</span>
              </a>

              {/* Download Word (.docx) */}
              <a
                href={docxUrl}
                download="Abhishek-Kumar-Singh-Resume.docx"
                onClick={triggerConfetti}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 font-bold text-xs shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer font-mono"
                title="Download static Word (.docx) Resume"
              >
                <FileType className="w-3.5 h-3.5 text-cyan-400" />
                <span>Word (.docx)</span>
              </a>

              {/* Open in New Tab */}
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-gray-300 hover:text-cyan-400 hover:bg-slate-800 transition-colors"
                title="Open PDF in full new tab"
                aria-label="Open in new tab"
              >
                <ExternalLink className="w-4 h-4" />
              </a>

              {/* Close Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="p-2 sm:p-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 active:scale-95 text-gray-300 hover:text-white border border-slate-700/80 transition-all cursor-pointer touch-manipulation min-w-[38px] min-h-[38px] flex items-center justify-center"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Subheader / Quick Controls */}
          <div className="flex items-center justify-between px-4 py-2 bg-slate-950/90 border-b border-slate-800/80 text-xs font-mono text-gray-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Official Document Verified</span>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-400 underline transition-colors"
              >
                Fullscreen View
              </a>
            </div>
          </div>

          {/* PDF Viewer Body */}
          <div className="flex-1 w-full h-full relative bg-slate-900 overflow-hidden flex flex-col">
            <iframe
              src={`${pdfUrl}#toolbar=1&navpanes=0`}
              className="w-full h-full border-0 bg-slate-900"
              title="Abhishek Kumar Singh Resume PDF"
            />

            {/* Mobile / Fallback banner if PDF cannot render */}
            <noscript>
              <div className="p-8 text-center space-y-4">
                <p className="text-sm text-gray-300">
                  Please download the resume directly using the buttons above.
                </p>
              </div>
            </noscript>
          </div>

          {/* Footer Bar */}
          <div className="p-3 bg-slate-900/95 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-gray-400 shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-white font-medium">Direct Links:</span>
              <a
                href={pdfUrl}
                download="Abhishek-Kumar-Singh-Resume.pdf"
                className="text-cyan-400 hover:underline"
              >
                Abhishek-Kumar-Singh-Resume.pdf
              </a>
              <span>•</span>
              <a
                href={docxUrl}
                download="Abhishek-Kumar-Singh-Resume.docx"
                className="text-cyan-400 hover:underline"
              >
                Abhishek-Kumar-Singh-Resume.docx
              </a>
            </div>
            <div className="text-gray-500">
              {PERSONAL_INFO.email}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

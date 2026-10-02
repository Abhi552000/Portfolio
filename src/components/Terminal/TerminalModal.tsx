"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TerminalIcon, X, Send } from "lucide-react";
import { PERSONAL_INFO, WORK_EXPERIENCES, PROJECTS } from "@/data/portfolioData";

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
}

interface CommandLog {
  cmd: string;
  output: React.ReactNode;
}

export const TerminalModal: React.FC<TerminalModalProps> = ({
  isOpen,
  onClose,
  onOpenResume,
}) => {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<CommandLog[]>([
    {
      cmd: "welcome",
      output: (
        <div className="space-y-1 text-cyan-300">
          <p className="font-bold text-sm">Abhishek Singh Dev CLI [Version 4.2.0]</p>
          <p className="text-gray-400">Type <span className="text-cyan-400 font-bold">help</span> to list available commands or <span className="text-emerald-400 font-bold">sudo hire</span> to view hiring specs.</p>
        </div>
      ),
    },
  ]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCmd = inputVal.trim().toLowerCase();
    if (!cleanCmd) return;

    setCommandHistory((prev) => [...prev, cleanCmd]);
    setHistoryIndex(-1);

    let outputNode: React.ReactNode = null;

    switch (cleanCmd) {
      case "help":
        outputNode = (
          <div className="space-y-1 text-gray-300">
            <p className="text-cyan-400 font-bold mb-1">Available CLI Commands:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs font-mono">
              <div><span className="text-cyan-300">bio / summary</span> - View full developer bio</div>
              <div><span className="text-cyan-300">skills</span> - List core technical skills</div>
              <div><span className="text-cyan-300">experience</span> - View career history & impact</div>
              <div><span className="text-cyan-300">projects</span> - View product & personal projects</div>
              <div><span className="text-cyan-300">mfe</span> - Webpack Module Federation specs</div>
              <div><span className="text-cyan-300">monorepo</span> - Nx & Turborepo architecture</div>
              <div><span className="text-cyan-300">contact</span> - Get direct email & LinkedIn</div>
              <div><span className="text-cyan-300">resume</span> - Open full viewable resume</div>
              <div><span className="text-cyan-300">clear</span> - Clear terminal log history</div>
              <div><span className="text-emerald-400 font-bold">sudo hire</span> - Executive hiring proposal</div>
            </div>
          </div>
        );
        break;

      case "bio":
      case "summary":
        outputNode = (
          <div className="space-y-2 text-gray-200">
            <p className="text-cyan-400 font-bold">{PERSONAL_INFO.name} — {PERSONAL_INFO.title}</p>
            <p className="text-xs leading-relaxed">{PERSONAL_INFO.summary}</p>
            <p className="text-xs text-gray-400">Education: {PERSONAL_INFO.education.degree} ({PERSONAL_INFO.education.cgpa})</p>
          </div>
        );
        break;

      case "skills":
        outputNode = (
          <div className="space-y-2 text-gray-300 text-xs">
            <p className="text-cyan-400 font-bold">Technical Matrix Snapshot:</p>
            <p>• Core: JavaScript (ES6+), TypeScript, HTML5, CSS3, NodeJS</p>
            <p>• Frameworks: ReactJS, NextJS 14+ (App Router), Redux Toolkit, Tailwind CSS, Material UI, Ant Design</p>
            <p>• Architecture: Micro-Frontend (Webpack 5 Module Federation), Monorepo (Nx, Turborepo, pnpm Workspaces)</p>
            <p>• Tools/APIs: Socket.IO, Highcharts, Stripe, REST APIs, Git/GitHub Actions</p>
          </div>
        );
        break;

      case "experience":
        outputNode = (
          <div className="space-y-3 text-xs text-gray-300">
            {WORK_EXPERIENCES.map((exp) => (
              <div key={exp.id} className="border-l-2 border-cyan-500/50 pl-3 space-y-0.5">
                <p className="text-cyan-300 font-bold">{exp.role} @ {exp.company} ({exp.period})</p>
                <p className="text-gray-400">{exp.summary}</p>
                <p className="text-emerald-400">Outcome: {exp.impactMetric}</p>
              </div>
            ))}
          </div>
        );
        break;

      case "projects":
        outputNode = (
          <div className="space-y-2 text-xs text-gray-300">
            <p className="text-cyan-400 font-bold">Showcase Projects:</p>
            {PROJECTS.map((p) => (
              <div key={p.id}>
                <span className="text-cyan-300 font-bold">• {p.title}:</span> {p.subtitle} ({p.techStack.slice(0, 3).join(", ")})
              </div>
            ))}
          </div>
        );
        break;

      case "mfe":
        outputNode = (
          <div className="space-y-1 text-xs text-cyan-200">
            <p className="font-bold text-cyan-400">Webpack 5 Module Federation Architecture:</p>
            <p>• Host Shell app dynamically mounts Remote Auth, Policy Engine, and Billing modules at runtime.</p>
            <p>• Zero inter-team deployment blocking with singletons deduplicated across React & Redux slice trees.</p>
          </div>
        );
        break;

      case "monorepo":
        outputNode = (
          <div className="space-y-1 text-xs text-indigo-200">
            <p className="font-bold text-indigo-400">Nx & Turborepo Monorepo Architecture:</p>
            <p>• Unified packages/ui component design system & packages/hooks across web & admin apps.</p>
            <p>• Reduced code duplication by ~40% with 180ms remote cached build times.</p>
          </div>
        );
        break;

      case "contact":
        outputNode = (
          <div className="space-y-1 text-xs text-gray-300">
            <p className="text-cyan-400 font-bold">Contact Details:</p>
            <p>Email: <a href={`mailto:${PERSONAL_INFO.email}`} className="text-cyan-300 underline">{PERSONAL_INFO.email}</a></p>
            <p>LinkedIn: <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="text-cyan-300 underline">{PERSONAL_INFO.linkedin}</a></p>
            <p>Location: {PERSONAL_INFO.location}</p>
          </div>
        );
        break;

      case "resume":
        onOpenResume();
        outputNode = <p className="text-emerald-400">Opening viewable resume modal...</p>;
        break;

      case "clear":
        setHistory([]);
        setInputVal("");
        return;

      case "sudo hire":
        outputNode = (
          <div className="p-3 rounded bg-emerald-950/60 border border-emerald-500/40 text-xs font-mono text-emerald-300 space-y-1.5">
            <p className="font-bold text-sm">PROPOSAL CONFIRMED: HIRE ABHISHEK KUMAR SINGH</p>
            <p>✔ 4+ Years Senior/Lead React & Next.js Experience Verified.</p>
            <p>✔ Micro-Frontend & Monorepo Optimization Ready.</p>
            <p>✔ Sub-2s LCP Performance & Clean Architecture Guaranteed.</p>
            <p className="text-cyan-300 font-bold mt-2">Direct Contact: abhisheksingh552000@gmail.com</p>
          </div>
        );
        break;

      default:
        outputNode = (
          <p className="text-rose-400 text-xs">
            Command not recognized: &quot;{cleanCmd}&quot;. Type <span className="text-cyan-400 underline">help</span> for available options.
          </p>
        );
    }

    setHistory((prev) => [...prev, { cmd: inputVal, output: outputNode }]);
    setInputVal("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInputVal(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInputVal(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal("");
      }
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="terminal-window max-w-[95vw] sm:max-w-3xl w-full h-[80vh] sm:h-[550px] flex flex-col overflow-hidden shadow-2xl relative rounded-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500 cursor-pointer" onClick={onClose} />
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="ml-2 text-[11px] sm:text-xs font-mono text-cyan-400 flex items-center gap-1.5 font-bold truncate">
                <TerminalIcon className="w-4 h-4 shrink-0" />
                abhisheksingh@developer-terminal:~
              </span>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-white p-1">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Terminal Body Output */}
          <div className="flex-1 p-3 sm:p-4 font-mono text-xs overflow-y-auto space-y-4">
            {history.map((item, idx) => (
              <div key={idx} className="space-y-1">
                {item.cmd !== "welcome" && (
                  <div className="flex items-center gap-2 text-gray-400">
                    <span className="text-cyan-400 font-bold">abhisheksingh@portfolio:~$</span>
                    <span className="text-white font-bold">{item.cmd}</span>
                  </div>
                )}
                <div className="pl-2">{item.output}</div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input Bar */}
          <form onSubmit={handleCommand} className="p-3 bg-slate-900/90 border-t border-slate-800 flex items-center gap-2 font-mono text-xs">
            <span className="text-cyan-400 font-bold shrink-0">abhisheksingh@portfolio:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type command ('help', 'bio', 'projects', 'sudo hire')..."
              className="flex-1 bg-transparent text-white focus:outline-none placeholder-gray-600 min-w-0"
            />
            <button type="submit" className="text-cyan-400 hover:text-cyan-300 p-1 shrink-0">
              <Send className="w-4 h-4" />
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Send, Bot, User, FileText, RefreshCw } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";

interface AIChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
  initialPrompt?: string;
}

interface Message {
  sender: "user" | "ai";
  text: string;
}

export const AIChatModal: React.FC<AIChatModalProps> = ({
  isOpen,
  onClose,
  onOpenResume,
  initialPrompt,
}) => {
  const [inputVal, setInputVal] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "ai",
      text: `Hello! I'm Abhishek Kumar Singh's AI Portfolio Assistant. I can answer questions about his 4+ years of software development experience, Micro-Frontend & Monorepo architectures, or product projects like Swift Security, MoneyMax, PlanMate, ChatterBox, and Sriscart. How can I help you today?`,
    },
  ]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const hasTriggeredInitial = useRef(false);

  const quickPrompts = [
    "Overview of Abhishek's 4+ years experience",
    "How does his Micro-Frontend architecture work?",
    "Tell me about Sriscart & ChatterBox",
    "What is MoneyMax's dual-portal system?",
    "Why hire Abhishek for Senior/Lead roles?",
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 100);

      if (initialPrompt && !hasTriggeredInitial.current) {
        hasTriggeredInitial.current = true;
        handleSend(initialPrompt);
      }
    } else {
      document.body.style.overflow = "unset";
      hasTriggeredInitial.current = false;
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, initialPrompt]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async (promptText?: string) => {
    const textToSend = promptText || inputVal;
    if (!textToSend.trim() || loading) return;

    const newMessages: Message[] = [...messages, { sender: "user", text: textToSend }];
    setMessages(newMessages);
    if (!promptText) setInputVal("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.sender === "user" ? "user" : "model",
            content: m.text,
          })),
        }),
      });

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: data.reply || "I am glad to provide any details about Abhishek's projects and experience!" },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Abhishek Kumar Singh is a Senior Software Developer with 4+ years of experience specializing in ReactJS, NextJS 14+, Webpack 5 Module Federation, and Nx/Turborepo monorepos. Feel free to ask about any specific project!",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="glass-panel bg-slate-950 border border-cyan-500/30 rounded-2xl sm:rounded-3xl max-w-[95vw] sm:max-w-2xl w-full h-[85vh] sm:h-[600px] flex flex-col overflow-hidden shadow-2xl relative"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-5 bg-slate-900/90 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center text-slate-950 shadow-md shadow-cyan-500/30">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm sm:text-base flex items-center gap-1.5">
                  Ask Abhishek AI
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                </h3>
                <span className="text-[10px] font-mono text-cyan-400 block">
                  Powered by AKS Intelligence Engine • Live Portfolio Intelligence
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onOpenResume}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-950 text-cyan-300 border border-cyan-500/30 text-xs font-mono transition-all hover:bg-cyan-900"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Resume</span>
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-gray-400 hover:text-white"
                aria-label="Close assistant"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Chat Messages Log */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-gray-200">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex items-start gap-3 ${
                  m.sender === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                    m.sender === "user"
                      ? "bg-indigo-600 text-white"
                      : "bg-cyan-950 border border-cyan-500/40 text-cyan-400"
                  }`}
                >
                  {m.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div
                  className={`p-3.5 sm:p-4 rounded-2xl max-w-[80%] leading-relaxed ${
                    m.sender === "user"
                      ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md"
                      : "glass-panel bg-slate-900/90 border border-slate-800 text-gray-200"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{m.text}</p>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-3 text-cyan-400 font-mono text-xs py-2">
                <RefreshCw className="w-4 h-4 animate-spin text-cyan-400" />
                <span>AKS Intelligence Engine is analyzing portfolio metrics...</span>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick Prompts Chips */}
          <div className="px-4 py-2 bg-slate-950 border-t border-slate-900 flex items-center gap-2 overflow-x-auto no-scrollbar scrollbar-none">
            <span className="text-[10px] font-mono text-gray-500 shrink-0 uppercase">Quick Questions:</span>
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                className="px-3 py-1 rounded-full bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-800 text-[11px] font-mono whitespace-nowrap transition-colors shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 sm:p-4 bg-slate-900/90 border-t border-slate-800 flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask anything about Abhishek's skills, projects, or architecture..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-500 placeholder-gray-500"
            />
            <button
              type="submit"
              disabled={loading || !inputVal.trim()}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all hover:scale-105 disabled:opacity-50 shrink-0"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Ask AI</span>
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, FileText, Menu, X } from "lucide-react";

interface NavbarProps {
  onOpenAI: () => void;
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAI, onOpenResume }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const navLinks = [
    { name: "Experience", href: "#experience" },
    { name: "Architecture", href: "#architecture" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ];

  // Handle navbar background & scroll spy
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sectionIds = ["hero", "experience", "architecture", "projects", "skills", "contact"];
      const scrollPosition = window.scrollY + 180;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i]);
        if (section) {
          const top = section.offsetTop;
          const height = section.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionIds[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 py-3 transition-all duration-300">
      <nav
        className={`max-w-7xl mx-auto rounded-2xl transition-all duration-300 ${
          scrolled
            ? "glass-panel bg-slate-950/90 backdrop-blur-xl shadow-2xl shadow-cyan-950/30 py-2.5 px-4 sm:px-6 border border-cyan-500/25"
            : "bg-transparent py-3 px-2 sm:px-4"
        } flex items-center justify-between gap-4 w-full overflow-hidden`}
      >
        {/* Brand Logo & Name */}
        <a
          href="#hero"
          className="group flex items-center gap-2.5 text-white tracking-wider shrink-0"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-cyan-500/30 group-hover:scale-105 transition-transform duration-300">
            AKS
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xs sm:text-sm tracking-wide text-gray-100 group-hover:text-cyan-400 transition-colors">
              ABHISHEK KUMAR SINGH
            </span>
            <span className="text-[10px] text-cyan-400 font-mono tracking-wider uppercase font-semibold">
              Senior Software Developer
            </span>
          </div>
        </a>

        {/* Desktop Nav Links (Visible on xl screens 1280px+) */}
        <div className="hidden xl:flex items-center gap-1 bg-slate-900/80 p-1.5 rounded-full border border-slate-800/80 backdrop-blur-md">
          {navLinks.map((link) => {
            const id = link.href.substring(1);
            const isActive = activeSection === id;

            return (
              <a
                key={link.name}
                href={link.href}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-md shadow-cyan-500/20"
                    : "text-gray-400 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </div>

        {/* Action Buttons (Visible on xl screens 1280px+) */}
        <div className="hidden xl:flex items-center gap-2.5 shrink-0">
          <button
            onClick={onOpenAI}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-400 hover:text-cyan-300 border border-cyan-500/40 text-xs font-mono transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 active:scale-95 cursor-pointer"
            title="Ask Abhishek AI Assistant"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ask AI</span>
          </button>

          <button
            onClick={onOpenResume}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shimmer-effect"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
          </button>
        </div>

        {/* Mobile & Medium Tablet Hamburger Toggle (Visible under 1280px) */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="xl:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-gray-300 hover:text-white transition-colors shrink-0"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Drawer Navigation for screens < 1280px */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="xl:hidden max-w-7xl mx-auto mt-2 p-5 rounded-2xl glass-panel bg-slate-950/95 backdrop-blur-2xl border border-cyan-500/30 shadow-2xl flex flex-col gap-3 z-50"
          >
            {navLinks.map((link) => {
              const id = link.href.substring(1);
              const isActive = activeSection === id;

              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-cyan-950 text-cyan-300 border border-cyan-500/40 font-bold"
                      : "text-gray-300 hover:text-cyan-400 hover:bg-slate-900"
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
            <div className="pt-3 border-t border-slate-800/80 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAI();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-cyan-400 border border-cyan-500/30 text-xs font-mono"
              >
                <Sparkles className="w-4 h-4" />
                <span>Ask Abhishek AI Assistant</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 shimmer-effect"
              >
                <FileText className="w-4 h-4" />
                <span>View / Download Resume</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

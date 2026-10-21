"use client";

import React, { useState, useEffect } from "react";
import { FileText, Menu, X } from "lucide-react";

interface NavbarProps {
  onOpenAI?: () => void;
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume }) => {
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

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [mobileMenuOpen]);

  // Handle initial page load if URL already has a hash (e.g. /#projects)
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const targetId = window.location.hash.replace("#", "");
      if (targetId === "hero") return;
      const elem = document.getElementById(targetId);
      if (elem) {
        setTimeout(() => {
          const navOffset = 80;
          const elementPosition = elem.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navOffset;
          window.scrollTo({
            top: Math.max(0, offsetPosition),
            behavior: "smooth",
          });
          setActiveSection(targetId);
          // Clear hash so browser doesn't re-anchor when user scrolls later
          window.history.replaceState(null, "", window.location.pathname);
        }, 150);
      }
    }
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    (e.currentTarget as HTMLElement)?.blur();
    const targetId = href.replace("#", "");
    setMobileMenuOpen(false);
    document.body.style.overflow = "unset";

    if (targetId === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      if (typeof window !== "undefined" && window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname);
      }
      setActiveSection("hero");
      return;
    }

    const elem = document.getElementById(targetId);
    if (elem) {
      const navOffset = 80;
      const elementPosition = elem.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: "smooth",
      });
      // Clear hash so browser scroll restoration never snaps back when scrolling
      if (typeof window !== "undefined" && window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname);
      }
      setActiveSection(targetId);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-3 sm:px-6 py-3">
      <nav
        className={`max-w-7xl mx-auto rounded-2xl border py-2.5 px-4 sm:px-6 transition-[background-color,border-color,box-shadow] duration-300 ${
          scrolled
            ? "bg-slate-950/90 backdrop-blur-xl shadow-2xl shadow-cyan-950/40 border-cyan-500/30"
            : "bg-slate-950/40 backdrop-blur-md shadow-none border-cyan-500/15"
        } flex items-center justify-between gap-4 w-full overflow-hidden`}
      >
        {/* Brand */}
        <a
          href="#hero"
          onClick={(e) => scrollToSection(e, "#hero")}
          className="group flex items-center gap-3 text-white tracking-wider shrink-0"
        >
          <div className="relative px-2.5 h-9 sm:h-10 rounded-xl bg-gradient-to-b from-slate-900/90 to-slate-950/95 border border-cyan-500/30 group-hover:border-cyan-400/70 flex items-center justify-center font-mono text-xs sm:text-sm shadow-md shadow-cyan-950/50 group-hover:shadow-[0_0_16px_rgba(56,189,248,0.35)] group-hover:scale-105 transition-all duration-300">
            {/* Ambient inner glow */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-cyan-500/10 via-transparent to-fuchsia-500/15 pointer-events-none" />

            {/* Code Brackets & Initials aligning with project dual gradient */}
            <span className="text-cyan-400 font-bold">&lt;</span>
            <span className="text-white font-black tracking-tight mx-0.5 group-hover:text-cyan-200 transition-colors">AS</span>
            <span className="text-fuchsia-400 font-bold">/&gt;</span>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xs sm:text-sm tracking-wide text-gray-100 group-hover:text-cyan-400 transition-colors whitespace-nowrap">
              ABHISHEK KUMAR SINGH
            </span>
            <span className="text-[10px] text-cyan-400 font-mono tracking-wider uppercase font-semibold">
              Software Developer
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden xl:flex items-center gap-1 bg-slate-900/80 p-1.5 rounded-full border border-slate-800/80 backdrop-blur-md">
          {navLinks.map((link) => {
            const id = link.href.substring(1);
            const isActive = activeSection === id;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className={`relative px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                  isActive
                    ? "text-slate-950 font-bold bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 shadow-md shadow-cyan-500/25"
                    : "text-gray-400 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </div>

        {/* Desktop Actions */}
        <div className="hidden xl:flex items-center gap-2.5 shrink-0">
          {/* Ask AI button temporarily commented out:
          <button
            onClick={onOpenAI}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-400 hover:text-cyan-300 border border-cyan-500/40 text-xs font-mono transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 active:scale-95 cursor-pointer"
            title="Ask Abhishek AI Assistant"
          >
            <Bot className="w-3.5 h-3.5" />
            <span>Ask AI</span>
          </button>
          */}
          <button
            onClick={onOpenResume}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shimmer-effect"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="xl:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-gray-300 hover:text-white transition-colors shrink-0"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Drawer — CSS transition instead of framer-motion AnimatePresence */}
      <div
        className={`xl:hidden max-w-7xl mx-auto mt-2 p-5 rounded-2xl glass-panel bg-slate-950/95 backdrop-blur-2xl border border-cyan-500/30 shadow-2xl flex flex-col gap-3 z-50 transition-all duration-200 origin-top ${
          mobileMenuOpen
            ? "opacity-100 scale-y-100 pointer-events-auto"
            : "opacity-0 scale-y-0 pointer-events-none h-0 p-0 mt-0 border-0 overflow-hidden"
        }`}
      >
        {navLinks.map((link) => {
          const id = link.href.substring(1);
          const isActive = activeSection === id;
          return (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
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
          {/* Ask AI button temporarily commented out:
          <button
            onClick={() => { setMobileMenuOpen(false); onOpenAI?.(); }}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-cyan-400 border border-cyan-500/30 text-xs font-mono"
          >
            <Bot className="w-4 h-4" />
            <span>Ask Abhishek AI Assistant</span>
          </button>
          */}
          <button
            onClick={() => { setMobileMenuOpen(false); onOpenResume(); }}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 shimmer-effect"
          >
            <FileText className="w-4 h-4" />
            <span>View / Download Resume</span>
          </button>
        </div>
      </div>
    </header>
  );
};

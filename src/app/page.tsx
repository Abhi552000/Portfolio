"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/Navigation/Navbar";
import { HeroSection } from "@/components/Hero/HeroSection";
import { ImpactStatsSection } from "@/components/Stats/ImpactStatsSection";
import { Footer } from "@/components/Footer/Footer";
import { FloatingAIButton } from "@/components/AI/FloatingAIButton";

// ── Canvas background: ssr:false, loads after JS hydration ──────────────────
const CanvasParticles = dynamic(
  () => import("@/components/Background/CanvasParticles").then((m) => m.CanvasParticles),
  { ssr: false }
);

// ── Below-the-fold sections that use framer-motion (code-split to keep FM out of initial bundle) ──
const ExperienceSection = dynamic(
  () => import("@/components/Experience/ExperienceSection").then((m) => m.ExperienceSection),
  {
    loading: () => (
      <div className="py-24 px-4 max-w-6xl mx-auto">
        <div className="h-96 rounded-3xl glass-panel animate-pulse bg-slate-900/40 border border-slate-800 flex items-center justify-center text-xs font-mono text-gray-500">
          Loading Experience Timeline...
        </div>
      </div>
    ),
  }
);

const ProjectsSection = dynamic(
  () => import("@/components/Projects/ProjectsSection").then((m) => m.ProjectsSection),
  {
    loading: () => (
      <div className="py-24 px-4 max-w-7xl mx-auto">
        <div className="h-96 rounded-3xl glass-panel animate-pulse bg-slate-900/40 border border-slate-800 flex items-center justify-center text-xs font-mono text-gray-500">
          Loading Projects...
        </div>
      </div>
    ),
  }
);

// ── Below-the-fold interactive heavy components ──────────────────────────────
const MicroFrontendVisualizer = dynamic(
  () => import("@/components/Architecture/MicroFrontendVisualizer").then((m) => m.MicroFrontendVisualizer),
  {
    loading: () => (
      <div className="py-20 px-4 max-w-7xl mx-auto">
        <div className="h-64 rounded-3xl glass-panel animate-pulse bg-slate-900/40 border border-slate-800 flex items-center justify-center text-xs font-mono text-gray-500">
          Loading Architecture Sandbox...
        </div>
      </div>
    ),
  }
);

const MonorepoExplorer = dynamic(
  () => import("@/components/Architecture/MonorepoExplorer").then((m) => m.MonorepoExplorer),
  {
    loading: () => (
      <div className="py-12 px-4 max-w-7xl mx-auto">
        <div className="h-64 rounded-3xl glass-panel animate-pulse bg-slate-900/40 border border-slate-800 flex items-center justify-center text-xs font-mono text-gray-500">
          Loading Monorepo Explorer...
        </div>
      </div>
    ),
  }
);

const SkillsRadar = dynamic(
  () => import("@/components/Skills/SkillsRadar").then((m) => m.SkillsRadar),
  {
    loading: () => (
      <div className="py-24 px-4 max-w-6xl mx-auto">
        <div className="h-64 rounded-3xl glass-panel animate-pulse bg-slate-900/40 border border-slate-800 flex items-center justify-center text-xs font-mono text-gray-500">
          Loading Skills Matrix...
        </div>
      </div>
    ),
  }
);

const AISearchHubSection = dynamic(
  () => import("@/components/AI/AISearchHubSection").then((m) => m.AISearchHubSection),
  {
    loading: () => (
      <div className="py-24 px-4 max-w-5xl mx-auto">
        <div className="h-48 rounded-3xl glass-panel animate-pulse bg-slate-900/40 border border-slate-800 flex items-center justify-center text-xs font-mono text-gray-500">
          Loading AI Hub...
        </div>
      </div>
    ),
  }
);

const ContactSection = dynamic(
  () => import("@/components/Contact/ContactSection").then((m) => m.ContactSection),
  {
    loading: () => (
      <div className="py-24 px-4 max-w-6xl mx-auto">
        <div className="h-64 rounded-3xl glass-panel animate-pulse bg-slate-900/40 border border-slate-800 flex items-center justify-center text-xs font-mono text-gray-500">
          Loading Contact...
        </div>
      </div>
    ),
  }
);

// ── Modal overlays: only bundled when opened ─────────────────────────────────
const AIChatModal = dynamic(
  () => import("@/components/AI/AIChatModal").then((m) => m.AIChatModal),
  { ssr: false }
);

const ResumeModal = dynamic(
  () => import("@/components/Resume/ResumeModal").then((m) => m.ResumeModal),
  { ssr: false }
);

// ── Lazy Reveal wrapper: renders children only when visible in viewport ───────
function LazyReveal({ children, rootMargin = "200px" }: { children: React.ReactNode; rootMargin?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(() => typeof window !== "undefined" && !("IntersectionObserver" in window));

  useEffect(() => {
    if (visible) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, visible]);

  return <div ref={ref}>{visible ? children : null}</div>;
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function Home() {
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [activePrompt, setActivePrompt] = useState<string | undefined>(undefined);
  // Delay canvas particles until after first paint — removes it from critical path
  const [showCanvas, setShowCanvas] = useState(false);

  useEffect(() => {
    // Defer canvas 400ms: lets React paint the hero first on slow/iOS devices
    const t = setTimeout(() => setShowCanvas(true), 400);
    return () => clearTimeout(t);
  }, []);

  const handleOpenAI = (prompt?: string) => {
    setActivePrompt(prompt);
    setAiChatOpen(true);
  };

  return (
    <main className="min-h-screen relative bg-slate-950 text-gray-100 overflow-x-hidden bg-grid-cyber">
      {/* Canvas particles: deferred 400ms to unblock first paint */}
      {showCanvas && <CanvasParticles />}

      {/* Navigation Header */}
      <Navbar onOpenAI={() => handleOpenAI()} onOpenResume={() => setResumeOpen(true)} />

      {/* 1. Instant Hero — eagerly loaded, zero dynamic imports in critical path */}
      <HeroSection />

      {/* 2. Impact Stats */}
      <ImpactStatsSection />

      {/* 3. Work Experience Timeline */}
      <LazyReveal rootMargin="300px">
        <ExperienceSection />
      </LazyReveal>

      {/* 4–9. Below-the-fold: render when scrolled into view */}
      <LazyReveal>
        <MicroFrontendVisualizer />
      </LazyReveal>

      <LazyReveal>
        <MonorepoExplorer />
      </LazyReveal>

      {/* Projects section */}
      <LazyReveal rootMargin="400px">
        <ProjectsSection />
      </LazyReveal>

      <LazyReveal>
        <SkillsRadar />
      </LazyReveal>

      <LazyReveal>
        <AISearchHubSection onOpenAI={(prompt) => handleOpenAI(prompt)} />
      </LazyReveal>

      <LazyReveal>
        <ContactSection />
      </LazyReveal>

      <Footer />

      {/* Floating AI Button */}
      <FloatingAIButton onOpenAI={() => handleOpenAI()} />

      {/* On-demand modals */}
      {aiChatOpen && (
        <Suspense fallback={null}>
          <AIChatModal
            isOpen={aiChatOpen}
            onClose={() => setAiChatOpen(false)}
            onOpenResume={() => setResumeOpen(true)}
            initialPrompt={activePrompt}
          />
        </Suspense>
      )}

      {resumeOpen && (
        <Suspense fallback={null}>
          <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
        </Suspense>
      )}
    </main>
  );
}

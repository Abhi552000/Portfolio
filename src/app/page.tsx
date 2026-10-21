"use client";

import React, { useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/Navigation/Navbar";
import { HeroSection } from "@/components/Hero/HeroSection";
import { ImpactStatsSection } from "@/components/Stats/ImpactStatsSection";
import { Footer } from "@/components/Footer/Footer";
// import { FloatingAIButton } from "@/components/AI/FloatingAIButton";

// ── Canvas background: ssr:false, loads after JS hydration ──────────────────
const CanvasParticles = dynamic(
  () => import("@/components/Background/CanvasParticles").then((m) => m.CanvasParticles),
  { ssr: false }
);

// ── Below-the-fold sections that use framer-motion (code-split to keep FM out of initial bundle) ──
const AboutSection = dynamic(
  () => import("@/components/About/AboutSection").then((m) => m.AboutSection),
  {
    loading: () => (
      <div className="py-24 px-4 max-w-7xl mx-auto">
        <div className="h-96 rounded-3xl glass-panel animate-pulse bg-slate-900/40 border border-slate-800 flex items-center justify-center text-xs font-mono text-gray-500">
          Loading About &amp; Principles...
        </div>
      </div>
    ),
  }
);

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

/* Temporarily commented out:
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
*/

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
/* Temporarily commented out:
const AIChatModal = dynamic(
  () => import("@/components/AI/AIChatModal").then((m) => m.AIChatModal),
  { ssr: false }
);
*/

const ResumeModal = dynamic(
  () => import("@/components/Resume/ResumeModal").then((m) => m.ResumeModal),
  { ssr: false }
);

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function Home() {
  const [resumeOpen, setResumeOpen] = useState(false);
  // Delay canvas particles until after first paint — removes it from critical path
  const [showCanvas, setShowCanvas] = useState(false);

  useEffect(() => {
    // Defer canvas until after browser idle to keep initial main thread 100% free for FCP/LCP
    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      const id = window.requestIdleCallback(
        () => setShowCanvas(true),
        { timeout: 1200 }
      );
      return () => {
        if ("cancelIdleCallback" in window) {
          window.cancelIdleCallback(id);
        }
      };
    } else {
      const t = setTimeout(() => setShowCanvas(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  return (
    <main className="min-h-screen relative bg-slate-950 text-gray-100 overflow-x-hidden bg-grid-cyber">
      {/* Canvas particles: deferred 400ms to unblock first paint */}
      {showCanvas && <CanvasParticles />}

      {/* Navigation Header */}
      <Navbar onOpenResume={() => setResumeOpen(true)} />

      {/* 1. Instant Hero — eagerly loaded, zero dynamic imports in critical path */}
      <HeroSection onOpenResume={() => setResumeOpen(true)} />

      {/* 2. Impact Stats */}
      <ImpactStatsSection />

      {/* 3. About & Engineering Philosophy */}
      <AboutSection />

      {/* 4. Work Experience Timeline */}
      <ExperienceSection />

      {/* 4–5. Architecture Visualizers */}
      <MicroFrontendVisualizer />
      <MonorepoExplorer />

      {/* 6. Projects Showcase */}
      <ProjectsSection />

      {/* 7. Skills Matrix */}
      <SkillsRadar />

      {/* 8. Contact Form & Connect */}
      <ContactSection />

      <Footer />

      {/* Floating AI Button - temporarily commented out from UI
      <FloatingAIButton onOpenAI={() => handleOpenAI()} />
      */}

      {/* AI Modal - temporarily commented out from UI
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
      */}

      {resumeOpen && (
        <Suspense fallback={null}>
          <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
        </Suspense>
      )}
    </main>
  );
}

"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/Navigation/Navbar";
import { HeroSection } from "@/components/Hero/HeroSection";
import { ImpactStatsSection } from "@/components/Stats/ImpactStatsSection";
import { ExperienceSection } from "@/components/Experience/ExperienceSection";
import { ProjectsSection } from "@/components/Projects/ProjectsSection";
import { Footer } from "@/components/Footer/Footer";
import { FloatingAIButton } from "@/components/AI/FloatingAIButton";

// Dynamic Code-Splitting for Below-the-Fold & Interactive Components
const CanvasParticles = dynamic(
  () => import("@/components/Background/CanvasParticles").then((mod) => mod.CanvasParticles),
  { ssr: false }
);

const MicroFrontendVisualizer = dynamic(
  () => import("@/components/Architecture/MicroFrontendVisualizer").then((mod) => mod.MicroFrontendVisualizer),
  {
    loading: () => (
      <div className="py-20 px-4 max-w-7xl mx-auto">
        <div className="h-64 rounded-3xl glass-panel animate-pulse bg-slate-900/40 border border-slate-800 flex items-center justify-center text-xs font-mono text-gray-500">
          Loading Micro-Frontend Interactive Sandbox...
        </div>
      </div>
    ),
  }
);

const MonorepoExplorer = dynamic(
  () => import("@/components/Architecture/MonorepoExplorer").then((mod) => mod.MonorepoExplorer),
  {
    loading: () => (
      <div className="py-12 px-4 max-w-7xl mx-auto">
        <div className="h-64 rounded-3xl glass-panel animate-pulse bg-slate-900/40 border border-slate-800 flex items-center justify-center text-xs font-mono text-gray-500">
          Loading Workspace Dependency Visualizer...
        </div>
      </div>
    ),
  }
);

const SkillsRadar = dynamic(
  () => import("@/components/Skills/SkillsRadar").then((mod) => mod.SkillsRadar),
  {
    loading: () => (
      <div className="py-24 px-4 max-w-6xl mx-auto">
        <div className="h-64 rounded-3xl glass-panel animate-pulse bg-slate-900/40 border border-slate-800 flex items-center justify-center text-xs font-mono text-gray-500">
          Loading Technical Skill Matrix...
        </div>
      </div>
    ),
  }
);

const AISearchHubSection = dynamic(
  () => import("@/components/AI/AISearchHubSection").then((mod) => mod.AISearchHubSection),
  {
    loading: () => (
      <div className="py-24 px-4 max-w-5xl mx-auto">
        <div className="h-48 rounded-3xl glass-panel animate-pulse bg-slate-900/40 border border-slate-800 flex items-center justify-center text-xs font-mono text-gray-500">
          Loading AI Intelligence Hub...
        </div>
      </div>
    ),
  }
);

const ContactSection = dynamic(
  () => import("@/components/Contact/ContactSection").then((mod) => mod.ContactSection),
  {
    loading: () => (
      <div className="py-24 px-4 max-w-6xl mx-auto">
        <div className="h-64 rounded-3xl glass-panel animate-pulse bg-slate-900/40 border border-slate-800 flex items-center justify-center text-xs font-mono text-gray-500">
          Loading Contact Options...
        </div>
      </div>
    ),
  }
);

const AIChatModal = dynamic(
  () => import("@/components/AI/AIChatModal").then((mod) => mod.AIChatModal),
  { ssr: false }
);

const ResumeModal = dynamic(
  () => import("@/components/Resume/ResumeModal").then((mod) => mod.ResumeModal),
  { ssr: false }
);

export default function Home() {
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [activePrompt, setActivePrompt] = useState<string | undefined>(undefined);

  const handleOpenAI = (prompt?: string) => {
    setActivePrompt(prompt);
    setAiChatOpen(true);
  };

  return (
    <main className="min-h-screen relative bg-slate-950 text-gray-100 overflow-x-hidden bg-grid-cyber">
      {/* Background Interactive Canvas Particles */}
      <CanvasParticles />

      {/* Navigation Header */}
      <Navbar
        onOpenAI={() => handleOpenAI()}
        onOpenResume={() => setResumeOpen(true)}
      />

      {/* 1. Instant Hero Screen (Eagerly loaded for <0.3s FCP) */}
      <HeroSection />

      {/* 2. Key Engineering Impact Metrics */}
      <ImpactStatsSection />

      {/* 3. Work Experience Timeline */}
      <ExperienceSection />

      {/* 4. Code-Split Micro-Frontend Visualizer */}
      <MicroFrontendVisualizer />

      {/* 5. Code-Split Monorepo Explorer */}
      <MonorepoExplorer />

      {/* 6. Projects Showcase */}
      <ProjectsSection />

      {/* 7. Code-Split Skills Matrix */}
      <SkillsRadar />

      {/* 8. Code-Split AI Intelligence Hub */}
      <AISearchHubSection onOpenAI={(prompt) => handleOpenAI(prompt)} />

      {/* 9. Code-Split Contact Form */}
      <ContactSection />

      {/* Footer */}
      <Footer />

      {/* Persistent Bottom-Right Floating AI Assistant Button */}
      <FloatingAIButton onOpenAI={() => handleOpenAI()} />

      {/* On-demand Abhishek AI Modal */}
      {aiChatOpen && (
        <AIChatModal
          isOpen={aiChatOpen}
          onClose={() => setAiChatOpen(false)}
          onOpenResume={() => setResumeOpen(true)}
          initialPrompt={activePrompt}
        />
      )}

      {/* On-demand Resume Viewer Modal */}
      {resumeOpen && (
        <ResumeModal
          isOpen={resumeOpen}
          onClose={() => setResumeOpen(false)}
        />
      )}
    </main>
  );
}

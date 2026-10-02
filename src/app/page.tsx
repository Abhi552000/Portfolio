"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/Navigation/Navbar";
import { HeroSection } from "@/components/Hero/HeroSection";
import { ImpactStatsSection } from "@/components/Stats/ImpactStatsSection";
import { ExperienceSection } from "@/components/Experience/ExperienceSection";
import { ProjectsSection } from "@/components/Projects/ProjectsSection";
import { ContactSection } from "@/components/Contact/ContactSection";
import { Footer } from "@/components/Footer/Footer";
import { FloatingAIButton } from "@/components/AI/FloatingAIButton";

// Dynamic Imports with code splitting for super-fast initial render
const CanvasParticles = dynamic(
  () => import("@/components/Background/CanvasParticles").then((mod) => mod.CanvasParticles),
  { ssr: false }
);

const MicroFrontendVisualizer = dynamic(
  () => import("@/components/Architecture/MicroFrontendVisualizer").then((mod) => mod.MicroFrontendVisualizer),
  { loading: () => <div className="py-16 text-center text-gray-500 font-mono text-xs">Loading Architecture Visualizer...</div> }
);

const MonorepoExplorer = dynamic(
  () => import("@/components/Architecture/MonorepoExplorer").then((mod) => mod.MonorepoExplorer),
  { loading: () => <div className="py-16 text-center text-gray-500 font-mono text-xs">Loading Monorepo Explorer...</div> }
);

const SkillsRadar = dynamic(
  () => import("@/components/Skills/SkillsRadar").then((mod) => mod.SkillsRadar),
  { loading: () => <div className="py-16 text-center text-gray-500 font-mono text-xs">Loading Skills Matrix...</div> }
);

const AISearchHubSection = dynamic(
  () => import("@/components/AI/AISearchHubSection").then((mod) => mod.AISearchHubSection),
  { loading: () => <div className="py-16 text-center text-gray-500 font-mono text-xs">Loading AI Search Hub...</div> }
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
      {/* Background Interactive Particle Canvas */}
      <CanvasParticles />

      {/* Navigation Header */}
      <Navbar
        onOpenAI={() => handleOpenAI()}
        onOpenResume={() => setResumeOpen(true)}
      />

      {/* 1. Full-Page Initial Hero Screen (Pure Candidate Name + Description + CTAs) */}
      <HeroSection
        onOpenAI={(prompt?: string) => handleOpenAI(prompt)}
        onOpenResume={() => setResumeOpen(true)}
      />

      {/* 2. Key Engineering Impact Metrics */}
      <ImpactStatsSection />

      {/* 3. Work Experience Timeline */}
      <ExperienceSection />

      {/* 4. Micro-Frontend Architecture Visualizer */}
      <MicroFrontendVisualizer />

      {/* 5. Nx & Turborepo Monorepo Explorer */}
      <MonorepoExplorer />

      {/* 6. Projects Showcase */}
      <ProjectsSection />

      {/* 7. Skills Matrix */}
      <SkillsRadar />

      {/* 8. Interactive AI Search Hub Section */}
      <AISearchHubSection onOpenAI={(prompt) => handleOpenAI(prompt)} />

      {/* 9. Contact Form */}
      <ContactSection />

      {/* Footer */}
      <Footer />

      {/* Persistent Bottom-Right Floating AI Assistant Widget */}
      <FloatingAIButton onOpenAI={() => handleOpenAI()} />

      {/* Lazy-loaded Abhishek AI Assistant Modal */}
      {aiChatOpen && (
        <AIChatModal
          isOpen={aiChatOpen}
          onClose={() => setAiChatOpen(false)}
          onOpenResume={() => setResumeOpen(true)}
          initialPrompt={activePrompt}
        />
      )}

      {/* Lazy-loaded Resume Viewer/Print Modal */}
      {resumeOpen && (
        <ResumeModal
          isOpen={resumeOpen}
          onClose={() => setResumeOpen(false)}
        />
      )}
    </main>
  );
}


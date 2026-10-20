"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FolderGit2, ArrowUpRight, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/Icons/SocialIcons";
import { PROJECTS, Project } from "@/data/portfolioData";
import { ProjectModal } from "./ProjectModal";
import { AnimatedText } from "@/components/Animation/AnimatedText";

export const ProjectsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<"enterprise" | "personal">("enterprise");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = [
    { id: "enterprise", label: "Enterprise Solutions" },
    { id: "personal", label: "Personal Showcase" },
  ] as const;

  const filteredProjects =
    activeCategory === "enterprise"
      ? PROJECTS.filter((p) => p.category !== "personal")
      : PROJECTS.filter((p) => p.category === "personal");

  return (
    <section id="projects" className="py-24 px-4 sm:px-8 relative z-10">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-400">
            <FolderGit2 className="w-3.5 h-3.5" />
            ENGINEERED PORTFOLIO
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            <AnimatedText text="Featured Projects & Product Systems" />
          </h2>
          <p className="text-gray-400 text-base sm:text-lg">
            Explore product platforms engineered for multi-tenant SaaS, Singapore FinTech pawnbroking, EdTech real-time classrooms, and custom personal applications.
          </p>
        </div>

        {/* Segmented Filter Toggle */}
        <div className="flex justify-center">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-xl gap-1">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative px-5 sm:px-7 py-2.5 rounded-xl text-xs sm:text-sm font-mono transition-colors duration-200 cursor-pointer ${
                    isActive
                      ? "text-slate-950 font-bold"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryPill"
                      className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 rounded-xl shadow-lg shadow-cyan-500/25"
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                onClick={() => setSelectedProject(project)}
                className="glass-panel-interactive p-6 rounded-3xl cursor-pointer flex flex-col justify-between group relative overflow-hidden shimmer-effect"
              >
                {/* Visual Header Banner */}
                <div className={`h-40 rounded-2xl bg-gradient-to-br ${project.imageBg} p-5 border border-slate-800/80 flex flex-col justify-between mb-5 relative overflow-hidden group-hover:border-cyan-500/40 transition-colors`}>
                  <div className="flex items-center justify-between z-10">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-950/85 text-[10px] font-mono text-cyan-300 border border-cyan-500/40 uppercase tracking-wider font-bold">
                      {project.category === "personal" ? "Personal Showcase" : "Enterprise SaaS"}
                    </span>
                    <div className="w-8.5 h-8.5 rounded-full bg-slate-950/90 border border-slate-700 flex items-center justify-center text-gray-300 group-hover:text-cyan-400 group-hover:scale-115 group-hover:border-cyan-500/50 transition-all shadow-md">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="z-10">
                    <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-gray-300 line-clamp-1 font-medium">
                      {project.subtitle}
                    </p>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent opacity-75" />
                </div>

                {/* Description & Metrics */}
                <div className="space-y-4 flex-1 flex flex-col justify-between">
                  <p className="text-xs text-gray-300 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Impact Metric Chips */}
                  <div className="space-y-1.5 pt-2">
                    <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold tracking-wider">
                      Key Engineering Outcomes:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.impactMetrics.slice(0, 2).map((m, i) => (
                        <span key={i} className="px-2.5 py-0.5 rounded-lg bg-slate-900/90 border border-slate-800 text-[10px] font-mono text-gray-200 group-hover:border-cyan-500/30 transition-colors">
                          • {m}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Stack Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-800/80">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 rounded-md bg-cyan-950/40 text-[10px] font-mono text-cyan-300 border border-cyan-500/30 group-hover:bg-cyan-950/70 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="px-2 py-0.5 rounded-md bg-slate-900 text-[10px] font-mono text-gray-400 border border-slate-800">
                        +{project.techStack.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Direct Action Links for Personal Showcase */}
                  {(project.liveUrl || project.githubUrl) && (
                    <div className="flex items-center gap-2 pt-3 border-t border-slate-800/80">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/40 text-cyan-300 hover:text-cyan-200 text-xs font-mono font-medium transition-colors"
                          title="Open Live Application"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Live App</span>
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-gray-300 hover:text-white text-xs font-mono transition-colors"
                          title="View Source Code Repository"
                        >
                          <GithubIcon className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Source Code</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Modal Case Study Viewer */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </section>
  );
};

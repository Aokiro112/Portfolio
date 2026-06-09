"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/lib/projects";
import { X, FileText, Info, Code, ShieldAlert } from "lucide-react";

interface ProjectDetailsModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

type TabType = "general" | "features" | "tech";

export default function ProjectDetailsModal({ project, isOpen, onClose }: ProjectDetailsModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>("general");

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-ink-black/40 backdrop-blur-xs"
          />
          
          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="relative w-full max-w-lg bg-bg-card neo-border rounded-[8px] overflow-hidden neo-shadow-lg z-10 flex flex-col font-sans"
          >
            {/* Window Header */}
            <div className="bg-brand-blue neo-border-thin !border-t-0 !border-l-0 !border-r-0 px-4 py-2 flex items-center justify-between select-none">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-ink-black stroke-[2.5]" />
                <span className="font-bold text-sm md:text-base text-ink-black">
                  {project.title} Properties
                </span>
              </div>
              <button
                onClick={onClose}
                className="w-5 h-5 flex items-center justify-center neo-border-thin bg-bg-card hover:bg-red-500 hover:text-white transition-neo text-ink-black font-bold text-xs shadow-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Properties Tabs */}
            <div className="flex bg-bg-sidebar border-b-2 border-ink-black px-2 pt-2 gap-1 select-none">
              {(["general", "features", "tech"] as TabType[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 font-bold text-xs md:text-sm border-t-2 border-x-2 border-ink-black rounded-t-[4px] -mb-[2px] transition-neo capitalize cursor-pointer
                    ${
                      activeTab === tab
                        ? "bg-bg-card border-b-bg-card translate-y-[2px] z-10"
                        : "bg-bg-sidebar/70 border-b-ink-black hover:bg-bg-card/50"
                    }
                  `}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Modal Body */}
            <div className="p-4 md:p-6 min-h-[200px] flex-grow">
              {activeTab === "general" && (
                <div className="flex flex-col gap-4">
                  <div className="flex items-start gap-4">
                    {/* Retro file icon */}
                    <div className="w-14 h-14 bg-brand-pink neo-border-thin rounded-[6px] flex items-center justify-center shadow-sm flex-shrink-0">
                      <FileText className="w-8 h-8 text-ink-black stroke-[2]" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-xl text-ink-black leading-tight">
                        {project.title}
                      </h3>
                      <p className="text-xs font-mono text-ink-black/70 mt-1 uppercase font-bold">
                        Type: Dynamic Project Documentation
                      </p>
                    </div>
                  </div>

                  <hr className="border-t border-ink-black/20" />

                  <div>
                    <h4 className="font-extrabold text-xs text-ink-black/60 font-mono mb-2 uppercase tracking-wider">
                      Project Overview
                    </h4>
                    <p className="text-sm text-ink-black leading-relaxed font-sans bg-bg-page/35 border border-ink-black/20 p-4 rounded-[6px]">
                      {project.description}
                    </p>
                  </div>

                  {project.url && (
                    <div className="mt-3 flex justify-end">
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 font-bold text-xs md:text-sm bg-brand-pink hover:bg-brand-blue transition-neo neo-border-thin rounded-[4px] shadow-sm text-ink-black select-none cursor-pointer"
                      >
                        Visit Website ↗
                      </a>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "features" && (
                <div>
                  <h4 className="font-extrabold text-sm md:text-base text-ink-black mb-3 font-sans uppercase tracking-wider">
                    Key Highlights & Features
                  </h4>
                  <ul className="flex flex-col gap-2.5">
                    {project.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm">
                        <span className="inline-block w-4 h-4 bg-brand-pink border border-ink-black flex-shrink-0 rounded-[2px] mt-0.5 flex items-center justify-center text-[10px] font-mono font-bold select-none shadow-sm">
                          ✔
                        </span>
                        <span className="text-ink-black font-sans leading-tight">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === "tech" && (
                <div>
                  <h4 className="font-extrabold text-sm md:text-base text-ink-black mb-3 font-sans uppercase tracking-wider">
                    Technologies & Frameworks
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 text-xs font-bold font-mono bg-bg-page border border-ink-black rounded-[4px] shadow-sm text-ink-black select-none hover:bg-brand-blue transition-neo"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Window Footer Actions */}
            <div className="bg-bg-sidebar border-t border-ink-black px-4 py-3 flex justify-end gap-2.5 select-none">
              <button
                onClick={onClose}
                className="px-5 py-1.5 font-bold text-sm bg-bg-card hover:bg-brand-blue transition-neo neo-border-thin rounded-[4px] shadow-sm active:translate-y-[1px] cursor-pointer"
              >
                OK
              </button>
              <button
                onClick={onClose}
                className="px-5 py-1.5 font-bold text-sm bg-bg-card hover:bg-brand-pink transition-neo neo-border-thin rounded-[4px] shadow-sm active:translate-y-[1px] cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

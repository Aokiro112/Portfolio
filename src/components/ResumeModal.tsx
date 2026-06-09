"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Download, Printer, X } from "lucide-react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const email = "aokiro@hikaris.in";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 print:p-0 print:static">
          {/* Backdrop (hidden in print) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-ink-black/40 backdrop-blur-xs print:hidden"
          />
          
          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="relative w-full max-w-3xl bg-bg-card neo-border rounded-[8px] overflow-hidden neo-shadow-lg z-10 flex flex-col font-sans max-h-[85vh] print:max-h-none print:w-full print:neo-border-none print:shadow-none print:static print:h-auto"
          >
            {/* Window Header (hidden in print) */}
            <div className="bg-brand-blue neo-border-thin !border-t-0 !border-l-0 !border-r-0 px-4 py-2.5 flex items-center justify-between select-none print:hidden">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-ink-black stroke-[2.5]" />
                <span className="font-bold text-sm md:text-base text-ink-black">
                  DocViewer - Mayank_Tharwani_Resume.pdf
                </span>
              </div>
              <button
                onClick={onClose}
                className="w-5 h-5 flex items-center justify-center neo-border-thin bg-bg-card hover:bg-red-500 hover:text-white transition-neo text-ink-black font-bold text-xs shadow-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Document Toolbar (hidden in print) */}
            <div className="flex bg-bg-sidebar border-b-2 border-ink-black px-4 py-2 gap-3 select-none items-center justify-between print:hidden">
              <div className="flex gap-2">
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-1.5 px-3 py-1 font-bold text-xs bg-bg-card hover:bg-brand-blue transition-neo neo-border-thin rounded-[4px] shadow-sm cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5 text-ink-black" />
                  Print / Save PDF
                </button>
              </div>
              <div className="text-xs font-mono font-bold text-ink-black/60">
                100% Zoom
              </div>
            </div>

            {/* Document Paper Body */}
            <div className="p-6 md:p-10 overflow-y-auto bg-white flex-grow select-text max-h-[60vh] print:overflow-visible print:max-h-none print:p-0">
              <div className="max-w-2xl mx-auto text-ink-black font-serif text-sm md:text-base leading-relaxed">
                {/* Resume Header */}
                <div className="text-center border-b-2 border-ink-black pb-4 mb-6">
                  <h1 className="font-extrabold text-2xl md:text-3xl tracking-tight font-sans text-ink-black mb-1.5">
                    MAYANK THARWANI
                  </h1>
                  <div className="font-mono text-xs md:text-sm flex flex-wrap justify-center gap-x-4 gap-y-1 text-ink-black/80 font-semibold">
                    <span>Email: <a href={`mailto:${email}`} className="underline hover:text-brand-red">{email}</a></span>
                    <span>•</span>
                    <span>Github: <a href="https://github.com/Aokiro112" target="_blank" rel="noreferrer" className="underline hover:text-brand-red">github.com/Aokiro112</a></span>
                    <span>•</span>
                    <span>Role: Full Stack Developer</span>
                  </div>
                </div>

                {/* Summary Section */}
                <div className="mb-6">
                  <h2 className="font-extrabold text-sm md:text-base font-sans tracking-wider text-ink-black uppercase border-b border-ink-black/20 mb-2">
                    Professional Summary
                  </h2>
                  <p className="font-serif">
                    Highly motivated and versatile Full Stack Developer passionate about building modern web applications, AI-powered developer tools, and innovative digital products. Skilled in full-stack architecture, database design, containerization, and API engineering. Deeply interested in building clean, optimized, and secure codebases.
                  </p>
                </div>

                {/* Tech Skills Section */}
                <div className="mb-6">
                  <h2 className="font-extrabold text-sm md:text-base font-sans tracking-wider text-ink-black uppercase border-b border-ink-black/20 mb-2">
                    Technical Expertise
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 font-sans text-xs md:text-sm">
                    <div>
                      <span className="font-bold">Languages:</span> JavaScript, TypeScript, Python, SQL, HTML/CSS
                    </div>
                    <div>
                      <span className="font-bold">Frontend Frameworks:</span> React, Next.js (App Router), React Native
                    </div>
                    <div>
                      <span className="font-bold">Backend Runtimes:</span> Node.js, Express.js, FastAPI, Django
                    </div>
                    <div>
                      <span className="font-bold">Databases & ORMs:</span> PostgreSQL, MySQL, SQLite, Prisma ORM, Sequelize
                    </div>
                    <div>
                      <span className="font-bold">Developer Tools:</span> Git, Docker, Vite, Electron, Ollama, Jina AI
                    </div>
                    <div>
                      <span className="font-bold">Design Philosophy:</span> Neo-Brutalist layouts, Responsive design, Accessible components
                    </div>
                  </div>
                </div>

                {/* Project Experience Section */}
                <div className="mb-6">
                  <h2 className="font-extrabold text-sm md:text-base font-sans tracking-wider text-ink-black uppercase border-b border-ink-black/20 mb-2">
                    Key Projects
                  </h2>
                  
                  <div className="flex flex-col gap-4">
                    {/* Project 1 */}
                    <div>
                      <div className="flex justify-between items-baseline font-sans">
                        <h3 className="font-extrabold text-sm md:text-base">Hikari — AI Mental Wellness Companion</h3>
                        <span className="text-xs font-mono opacity-80 font-bold">2026</span>
                      </div>
                      <p className="text-xs font-mono text-ink-black/60 italic mb-1.5">React, Vite, Node.js, Express, PostgreSQL, Groq LLaMA 3.3, Jina AI RAG</p>
                      <ul className="list-disc pl-5 flex flex-col gap-1 text-xs md:text-sm">
                        <li>Engineered a 7-layer security shield to safeguard LLM inputs and prevent prompt injections.</li>
                        <li>Implemented dynamic personality adaptation and Retrieval-Augmented Generation (RAG) using Jina AI embeddings for persistent, context-aware memory.</li>
                      </ul>
                    </div>

                    {/* Project 2 */}
                    <div>
                      <div className="flex justify-between items-baseline font-sans">
                        <h3 className="font-extrabold text-sm md:text-base">KAIRO Super App Platform</h3>
                        <span className="text-xs font-mono opacity-80 font-bold">2025</span>
                      </div>
                      <p className="text-xs font-mono text-ink-black/60 italic mb-1.5">React Native, Expo, WebRTC, Socket.IO, Express, MySQL, Prisma, Docker</p>
                      <ul className="list-disc pl-5 flex flex-col gap-1 text-xs md:text-sm">
                        <li>Developed a real-time messaging client with typing indicators, Seen/Delivered receipts, and end-to-end encryption.</li>
                        <li>Integrated peer-to-peer WebRTC video/audio calling with native audio routing and state simulation fallback.</li>
                      </ul>
                    </div>

                    {/* Project 3 */}
                    <div>
                      <div className="flex justify-between items-baseline font-sans">
                        <h3 className="font-extrabold text-sm md:text-base">LocalCoder AI Coding Agent</h3>
                        <span className="text-xs font-mono opacity-80 font-bold">2025</span>
                      </div>
                      <p className="text-xs font-mono text-ink-black/60 italic mb-1.5">Node.js, SQLite, Ollama, Qwen2.5-Coder, Express, React, Zustand</p>
                      <ul className="list-disc pl-5 flex flex-col gap-1 text-xs md:text-sm">
                        <li>Built a 100% offline, local-first coding assistant executing terminal actions, codebase searches (`ripgrep`), and file operations.</li>
                        <li>Designed an interactive safety layer intercepts dangerous commands and requests manual approval.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Education Section */}
                <div>
                  <h2 className="font-extrabold text-sm md:text-base font-sans tracking-wider text-ink-black uppercase border-b border-ink-black/20 mb-2">
                    Education & Training
                  </h2>
                  <div className="flex justify-between items-baseline font-sans">
                    <div>
                      <h3 className="font-extrabold text-sm md:text-base">Computer Science & Software Engineering</h3>
                      <p className="text-xs text-ink-black/70">Focus on Full-Stack Systems, Databases, and AI Architectures</p>
                    </div>
                    <span className="text-xs font-mono opacity-80 font-bold">Self-Guided & Academics</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Window Footer Actions (hidden in print) */}
            <div className="bg-bg-sidebar border-t-2 border-ink-black px-4 py-3 flex justify-end gap-2.5 select-none print:hidden">
              <button
                onClick={onClose}
                className="px-5 py-1.5 font-bold text-sm bg-bg-card hover:bg-brand-blue transition-neo neo-border-thin rounded-[4px] shadow-sm cursor-pointer"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

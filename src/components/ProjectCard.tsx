"use client";

import React from "react";
import { Project } from "@/lib/projects";

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  // Select SVG mockup based on project id
  const renderMockup = () => {
    const isJigglypuff = project.id.includes("jigglypuff");
    const isKairo = project.id.includes("kairo");
    const isHikari = project.id.includes("hikari");
    const isLocalCoder = project.id.includes("localcoder");

    if (isJigglypuff) {
      return (
        <svg viewBox="0 0 200 130" className="w-full h-full">
          {/* Background */}
          <rect width="200" height="130" fill="#121324" />
          {/* Header Bar */}
          <rect width="200" height="15" fill="#1e2030" />
          <circle cx="8" cy="7.5" r="3" fill="#ff5f56" />
          <circle cx="18" cy="7.5" r="3" fill="#ffbd2e" />
          <circle cx="28" cy="7.5" r="3" fill="#27c93f" />
          <text x="100" y="11" fill="#7e84b0" fontSize="8" textAnchor="middle" fontFamily="monospace">Jigglypuff Player</text>
          
          {/* Music Waves / Play Interface */}
          <path d="M 20 70 Q 40 40 60 70 T 100 70 T 140 70 T 180 70" fill="none" stroke="#d25c88" strokeWidth="2" strokeLinecap="round" />
          <path d="M 20 70 Q 40 20 60 70 T 100 70 T 140 70 T 180 70" fill="none" stroke="#1ba0d9" strokeWidth="1.5" strokeOpacity="0.5" strokeLinecap="round" />
          
          {/* Player controls */}
          <circle cx="100" cy="105" r="12" fill="#d25c88" />
          <polygon points="97,100 106,105 97,110" fill="#faf0e6" />
          <circle cx="75" cy="105" r="8" fill="#1ba0d9" />
          <polygon points="77,102 71,105 77,108" fill="#faf0e6" />
          <circle cx="125" cy="105" r="8" fill="#1ba0d9" />
          <polygon points="123,102 129,105 123,108" fill="#faf0e6" />
        </svg>
      );
    }

    if (isKairo) {
      return (
        <svg viewBox="0 0 200 130" className="w-full h-full">
          {/* Background */}
          <rect width="200" height="130" fill="#7a3ebb" />
          {/* Header Bar */}
          <rect width="200" height="15" fill="#582a8f" />
          <circle cx="8" cy="7.5" r="3" fill="#ff5f56" />
          <circle cx="18" cy="7.5" r="3" fill="#ffbd2e" />
          <circle cx="28" cy="7.5" r="3" fill="#27c93f" />
          <text x="100" y="11" fill="#dfc9f7" fontSize="8" textAnchor="middle" fontFamily="monospace">KAIRO Chat</text>
          
          {/* Sidebar */}
          <rect x="5" y="20" width="45" height="105" fill="#582a8f" rx="3" />
          <circle cx="15" cy="30" r="5" fill="#faf0e6" />
          <rect x="24" y="28" width="20" height="4" fill="#faf0e6" rx="1" />
          <circle cx="15" cy="45" r="5" fill="#e3a2ee" />
          <rect x="24" y="43" width="20" height="4" fill="#e3a2ee" rx="1" />
          <circle cx="15" cy="60" r="5" fill="#e3a2ee" />
          
          {/* Chat Bubble 1 */}
          <rect x="60" y="25" width="80" height="25" fill="#faf0e6" rx="5" />
          <rect x="68" y="31" width="64" height="4" fill="#09090a" rx="1" />
          <rect x="68" y="39" width="40" height="4" fill="#09090a" rx="1" />
          
          {/* Chat Bubble 2 (User response) */}
          <rect x="110" y="60" width="80" height="25" fill="#e3a2ee" rx="5" />
          <rect x="118" y="66" width="64" height="4" fill="#09090a" rx="1" />
          <rect x="118" y="74" width="45" height="4" fill="#09090a" rx="1" />

          {/* Input box */}
          <rect x="55" y="105" width="140" height="18" fill="#faf0e6" rx="4" />
          <rect x="62" y="112" width="50" height="4" fill="#8f44e8" rx="1" />
        </svg>
      );
    }

    if (isHikari) {
      return (
        <svg viewBox="0 0 200 130" className="w-full h-full">
          {/* Background */}
          <rect width="200" height="130" fill="#1b2030" />
          {/* Header Bar */}
          <rect width="200" height="15" fill="#11131e" />
          <circle cx="8" cy="7.5" r="3" fill="#ff5f56" />
          <circle cx="18" cy="7.5" r="3" fill="#ffbd2e" />
          <circle cx="28" cy="7.5" r="3" fill="#27c93f" />
          <text x="100" y="11" fill="#717a99" fontSize="8" textAnchor="middle" fontFamily="monospace">Hikari AI</text>
          
          {/* AI Message Bubble */}
          <rect x="15" y="25" width="115" height="35" fill="#1a202c" stroke="#d25c88" strokeWidth="1" rx="6" />
          <rect x="23" y="32" width="99" height="4" fill="#faf0e6" rx="1" />
          <rect x="23" y="40" width="85" height="4" fill="#faf0e6" rx="1" />
          <rect x="23" y="48" width="60" height="4" fill="#faf0e6" rx="1" />

          {/* Brain Graphic */}
          <g transform="translate(152, 60) scale(1.1)">
            {/* Brain Left Hem */}
            <path d="M-8,-15 C-18,-15 -22,-3 -15,5 C-22,12 -12,20 -5,10 C-3,18 7,18 8,10" fill="none" stroke="#e3a2ee" strokeWidth="2" />
            {/* Brain Right Hem */}
            <path d="M8,-15 C18,-15 22,-3 15,5 C22,12 12,20 5,10 C3,18 -7,18 -8,10" fill="none" stroke="#e3a2ee" strokeWidth="2" />
            {/* AI Text inside brain */}
            <text x="0" y="-1" fill="#1ba0d9" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">AI</text>
          </g>

          {/* Bottom user reply */}
          <rect x="15" y="100" width="115" height="20" fill="#1ba0d9" rx="5" />
          <rect x="23" y="108" width="80" height="4" fill="#faf0e6" rx="1" />
        </svg>
      );
    }

    if (isLocalCoder) {
      return (
        <svg viewBox="0 0 200 130" className="w-full h-full">
          {/* Background */}
          <rect width="200" height="130" fill="#1e1e1e" />
          {/* Header Bar */}
          <rect width="200" height="15" fill="#2d2d2d" />
          <circle cx="8" cy="7.5" r="3" fill="#ff5f56" />
          <circle cx="18" cy="7.5" r="3" fill="#ffbd2e" />
          <circle cx="28" cy="7.5" r="3" fill="#27c93f" />
          <text x="100" y="11" fill="#888888" fontSize="8" textAnchor="middle" fontFamily="monospace">LocalCoder Terminal</text>
          
          {/* Code lines */}
          <rect x="15" y="25" width="90" height="4" fill="#6a9955" rx="1" /> {/* green comment */}
          <rect x="15" y="35" width="40" height="4" fill="#569cd6" rx="1" /> {/* blue keyword */}
          <rect x="60" y="35" width="55" height="4" fill="#9cdcfe" rx="1" /> {/* var name */}
          <rect x="15" y="45" width="20" height="4" fill="#c586c0" rx="1" /> {/* control flow */}
          <rect x="40" y="45" width="75" height="4" fill="#4fc1ff" rx="1" />
          <rect x="25" y="55" width="60" height="4" fill="#ce9178" rx="1" /> {/* string */}
          
          {/* Robot Agent Graphic */}
          <g transform="translate(150, 48)">
            {/* Robot Head */}
            <rect x="-20" y="-15" width="40" height="28" fill="#2d2d2d" stroke="#1ba0d9" strokeWidth="2" rx="4" />
            {/* Eyes */}
            <circle cx="-8" cy="-2" r="3" fill="#27c93f" />
            <circle cx="8" cy="-2" r="3" fill="#27c93f" />
            {/* Mouth */}
            <line x1="-8" y1="6" x2="8" y2="6" stroke="#1ba0d9" strokeWidth="2" strokeLinecap="round" />
            {/* Antenna */}
            <line x1="0" y1="-15" x2="0" y2="-22" stroke="#1ba0d9" strokeWidth="2" />
            <circle cx="0" cy="-24" r="3" fill="#d25c88" />
          </g>

          {/* Command Prompt Box */}
          <rect x="10" y="98" width="180" height="24" fill="#2d2d2d" stroke="#09090a" strokeWidth="1" rx="4" />
          <text x="18" y="113" fill="#27c93f" fontSize="10" fontFamily="monospace">&gt; npm run agent:dev</text>
        </svg>
      );
    }

    // Default Fallback Mockup
    return (
      <svg viewBox="0 0 200 130" className="w-full h-full">
        <rect width="200" height="130" fill="#2d3748" />
        <rect width="200" height="15" fill="#1a202c" />
        <circle cx="8" cy="7.5" r="3" fill="#ff5f56" />
        <circle cx="18" cy="7.5" r="3" fill="#ffbd2e" />
        <circle cx="28" cy="7.5" r="3" fill="#27c93f" />
        <text x="100" y="11" fill="#718096" fontSize="8" textAnchor="middle" fontFamily="monospace">Browser</text>
        <path d="M 40 80 L 80 40 L 120 70 L 160 30" fill="none" stroke="#d25c88" strokeWidth="3" />
        <circle cx="160" cy="30" r="5" fill="#1ba0d9" />
      </svg>
    );
  };

  return (
    <div
      onClick={onClick}
      className="flex flex-col bg-bg-card neo-border-thin p-3 rounded-[6px] select-none hover:-translate-y-1.5 hover:shadow-[6px_6px_0px_0px_rgba(9,9,10,1)] transition-neo cursor-pointer w-full"
    >
      {/* Mockup Screen Container */}
      <div className="neo-border-thin rounded-[4px] overflow-hidden aspect-[1.5/1] bg-ink-black flex items-center justify-center">
        {renderMockup()}
      </div>
      
      {/* Project Link Label */}
      <div className="mt-3 text-center">
        <span className="font-extrabold text-sm md:text-base text-brand-red hover:underline block leading-tight font-sans tracking-wide">
          {project.title}
        </span>
      </div>
    </div>
  );
}

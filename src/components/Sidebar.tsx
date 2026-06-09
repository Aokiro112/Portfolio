"use client";

import React from "react";
import Image from "next/image";
import { Home, User, Star, Folder, FileText, Mail } from "lucide-react";

interface SidebarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onResumeClick: () => void;
}

export default function Sidebar({ activeSection, onNavigate, onResumeClick }: SidebarProps) {
  const menuItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "about", label: "About Me", icon: User },
    { id: "skills", label: "Language and Frameworks", icon: Star },
    { id: "projects", label: "Projects", icon: Folder },
    { id: "resume", label: "Resume", icon: FileText, isAction: true },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  return (
    <div className="w-full md:w-72 bg-bg-sidebar flex flex-col items-center p-6 md:border-r-3 border-ink-black flex-shrink-0 border-b-3 md:border-b-0">
      {/* Profile Photo Wrapper */}
      <div className="w-full max-w-[200px] aspect-square neo-border rounded-[8px] bg-bg-card overflow-hidden shadow-sm mb-4">
        <div className="relative w-full h-full">
          <Image
            src="/pfp.png"
            alt="Mayank Tharwani Profile Picture"
            fill
            sizes="(max-width: 768px) 200px, 200px"
            priority
            className="object-cover"
          />
        </div>
      </div>

      {/* Name and Title */}
      <div className="text-center mb-6">
        <h1 className="font-extrabold text-2xl tracking-tight text-ink-black font-sans leading-tight">
          Mayank Tharwani
        </h1>
        <p className="text-sm font-semibold tracking-wider text-ink-black opacity-80 mt-1 uppercase font-mono">
          Full Stack Developer
        </p>
      </div>

      {/* Navigation Menu */}
      <nav className="w-full flex flex-col gap-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => {
                if (item.isAction && item.id === "resume") {
                  onResumeClick();
                } else {
                  onNavigate(item.id);
                }
              }}
              className={`w-full flex items-center gap-4 px-4 py-3 text-left font-bold text-base transition-neo rounded-[6px] border border-transparent select-none cursor-pointer
                ${
                  isActive
                    ? "bg-bg-page dashed-border !border-ink-black shadow-sm"
                    : "hover:bg-bg-page/50 hover:translate-x-1"
                }
              `}
            >
              <Icon className="w-5 h-5 text-ink-black flex-shrink-0" />
              <span className="text-ink-black leading-none">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}

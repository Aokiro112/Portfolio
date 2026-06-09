"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus } from "lucide-react";

interface SectionCardProps {
  id: string;
  title: string;
  headerColor: "pink" | "blue";
  children: React.ReactNode;
}

export default function SectionCard({ id, title, headerColor, children }: SectionCardProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const headerBg = headerColor === "pink" ? "bg-brand-pink" : "bg-brand-blue";

  return (
    <section id={id} className="scroll-mt-6 w-full neo-border rounded-[8px] bg-bg-card overflow-hidden neo-shadow-sm mb-6 flex flex-col">
      {/* Card Header */}
      <div className={`${headerBg} neo-border-thin !border-t-0 !border-l-0 !border-r-0 px-4 py-2 flex items-center justify-between select-none`}>
        <h2 className="font-extrabold text-base md:text-lg text-ink-black font-sans leading-none">
          {title}
        </h2>
        
        {/* Collapse Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-5 h-5 flex items-center justify-center neo-border-thin bg-bg-card hover:bg-ink-black hover:text-white transition-neo text-ink-black font-bold text-xs shadow-sm cursor-pointer"
          aria-label={isCollapsed ? "Expand section" : "Collapse section"}
        >
          {isCollapsed ? <Plus className="w-3.5 h-3.5 stroke-[3]" /> : <Minus className="w-3.5 h-3.5 stroke-[3]" />}
        </button>
      </div>

      {/* Card Content with Framer Motion Animation */}
      <AnimatePresence initial={false}>
        {!isCollapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-4 md:p-6 text-ink-black font-sans text-sm md:text-base leading-relaxed">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

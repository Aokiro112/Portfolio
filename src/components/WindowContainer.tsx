"use client";

import React from "react";

interface WindowContainerProps {
  children: React.ReactNode;
}

export default function WindowContainer({ children }: WindowContainerProps) {
  return (
    <div className="w-full max-w-7xl neo-border rounded-[8px] bg-bg-page overflow-hidden neo-shadow-lg flex flex-col my-4 md:my-8">
      {/* Title Bar */}
      <div className="bg-brand-blue neo-border-thin !border-t-0 !border-l-0 !border-r-0 px-4 py-2.5 flex items-center justify-between select-none">
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg md:text-xl tracking-wide text-ink-black font-sans">
            My Portfolio
          </span>
        </div>
        
        {/* Window controls: Minimize, Maximize, Close */}
        <div className="flex items-center gap-2.5">
          <button className="w-5 h-5 flex items-center justify-center neo-border-thin bg-bg-card hover:bg-brand-pink transition-neo text-ink-black font-mono text-xs font-bold shadow-sm">
            □
          </button>
          <button className="w-5 h-5 flex items-center justify-center neo-border-thin bg-bg-card hover:bg-brand-pink transition-neo text-ink-black font-mono text-xs font-bold shadow-sm">
            _
          </button>
          <button className="w-5 h-5 flex items-center justify-center neo-border-thin bg-bg-card hover:bg-brand-pink transition-neo text-ink-black font-mono text-xs font-bold shadow-sm">
            □
          </button>
          <button className="w-5 h-5 flex items-center justify-center neo-border-thin bg-bg-card hover:bg-red-500 hover:text-white transition-neo text-ink-black font-mono text-xs font-bold shadow-sm">
            ✕
          </button>
        </div>
      </div>
      
      {/* Window Body */}
      <div className="flex flex-col md:flex-row flex-grow min-h-[600px]">
        {children}
      </div>
    </div>
  );
}

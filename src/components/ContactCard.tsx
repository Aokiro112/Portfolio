"use client";

import React, { useState } from "react";
import { Mail, Copy, Check, ExternalLink } from "lucide-react";

export default function ContactCard() {
  const email = "mayanktharwani9@gmail.com";
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  };

  return (
    <div className="w-full bg-bg-card neo-border-thin rounded-[8px] p-4 sm:p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 justify-between hover:shadow-[4px_4px_0px_0px_rgba(9,9,10,1)] transition-neo">
      <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
        {/* Retro Mail Icon box */}
        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-[6px] bg-brand-pink neo-border-thin flex items-center justify-center flex-shrink-0 shadow-sm">
          <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-ink-black stroke-[2.5]" />
        </div>
        <div className="text-left min-w-0">
          <h3 className="font-extrabold text-base sm:text-lg md:text-xl text-ink-black font-sans leading-tight">
            Email Me
          </h3>
          <p className="font-mono text-xs sm:text-sm md:text-base text-ink-black/80 mt-0.5 sm:mt-1 select-all font-medium whitespace-nowrap overflow-x-auto">
            {email}
          </p>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex items-center gap-2.5 sm:gap-3 w-full md:w-auto flex-shrink-0 justify-start md:justify-end">
        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 font-bold text-xs sm:text-sm bg-bg-page hover:bg-brand-blue transition-neo neo-border-thin rounded-[6px] shadow-sm select-none cursor-pointer whitespace-nowrap flex-1 md:flex-initial"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-green-700 stroke-[3]" />
              <span className="text-ink-black">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-ink-black stroke-[2.5]" />
              <span className="text-ink-black">Copy Email</span>
            </>
          )}
        </button>

        {/* Mailto Button */}
        <a
          href={`mailto:${email}`}
          className="flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 font-bold text-xs sm:text-sm bg-brand-pink hover:bg-brand-blue hover:translate-x-0.5 hover:translate-y-0.5 transition-neo neo-border-thin rounded-[6px] shadow-sm select-none cursor-pointer text-ink-black whitespace-nowrap flex-1 md:flex-initial"
        >
          <span>Send Message</span>
          <ExternalLink className="w-4 h-4 text-ink-black stroke-[2.5]" />
        </a>
      </div>
    </div>
  );
}

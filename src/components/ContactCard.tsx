"use client";

import React, { useState } from "react";
import { Mail, Copy, Check, ExternalLink } from "lucide-react";

export default function ContactCard() {
  const email = "aokiro@hikaris.in";
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
    <div className="w-full max-w-2xl mx-auto bg-bg-card neo-border-thin rounded-[8px] p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 justify-between hover:shadow-[4px_4px_0px_0px_rgba(9,9,10,1)] transition-neo">
      <div className="flex items-center gap-4">
        {/* Retro Mail Icon box */}
        <div className="w-12 h-12 rounded-[6px] bg-brand-pink neo-border-thin flex items-center justify-center flex-shrink-0 shadow-sm">
          <Mail className="w-6 h-6 text-ink-black stroke-[2.5]" />
        </div>
        <div className="text-left">
          <h3 className="font-extrabold text-lg md:text-xl text-ink-black font-sans leading-tight">
            Email Me
          </h3>
          <p className="font-mono text-sm md:text-base text-ink-black opacity-80 mt-1 select-all break-all">
            {email}
          </p>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-center md:justify-end">
        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="flex items-center justify-center gap-2 px-4 py-2.5 font-bold text-sm bg-bg-page hover:bg-brand-blue transition-neo neo-border-thin rounded-[6px] shadow-sm select-none cursor-pointer flex-1 md:flex-initial"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-ink-black stroke-[3]" />
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
          className="flex items-center justify-center gap-2 px-4 py-2.5 font-bold text-sm bg-brand-pink hover:bg-brand-blue hover:translate-x-0.5 hover:translate-y-0.5 transition-neo neo-border-thin rounded-[6px] shadow-sm select-none cursor-pointer text-ink-black flex-1 md:flex-initial"
        >
          <span>Send Message</span>
          <ExternalLink className="w-4 h-4 text-ink-black stroke-[2.5]" />
        </a>
      </div>
    </div>
  );
}

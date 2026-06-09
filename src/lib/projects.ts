import fs from "fs";
import path from "path";

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  techStack: string[];
  features: string[];
  markdownFile: string;
  url?: string;
}

export function getProjects(): Project[] {
  const workspaceDir = process.cwd();
  const files = fs.readdirSync(/*turbopackIgnore: true*/ workspaceDir);
  
  // Find all README markdown files (README.md, README(2).md, etc.)
  const readmeFiles = files.filter(
    (file) => file.toLowerCase().startsWith("readme") && file.endsWith(".md")
  );

  const projects: Project[] = [];

  readmeFiles.forEach((filename) => {
    try {
      const filePath = path.join(/*turbopackIgnore: true*/ workspaceDir, filename);
      const content = fs.readFileSync(/*turbopackIgnore: true*/ filePath, "utf-8");
      
      const parsed = parseProjectMarkdown(filename, content);
      if (parsed) {
        projects.push(parsed);
      }
    } catch (error) {
      console.error(`Error parsing ${filename}:`, error);
    }
  });

  // Sort them so that: README.md (Jigglypuff) -> README(2).md (Kairo) -> README(3).md (Hikari) -> README(4).md (LocalCoder)
  return projects.sort((a, b) => {
    const getNum = (name: string) => {
      const match = name.match(/\((\d+)\)/);
      return match ? parseInt(match[1], 10) : 1;
    };
    return getNum(a.markdownFile) - getNum(b.markdownFile);
  });
}

function parseProjectMarkdown(filename: string, content: string): Project | null {
  // Split into lines
  const lines = content.split("\n");
  
  let title = "";
  let tagline = "";
  let description = "";
  let url: string | undefined = undefined;
  const techStack: string[] = [];
  const features: string[] = [];

  // Determine project based on filename or contents
  if (filename === "README.md") {
    title = "Jigglypuff";
    tagline = "A blazingly fast, offline-first & online-capable desktop music player built with Electron and React.";
    description = "Jigglypuff is a lightweight, hybrid music player designed for users who want total control over their local music library while seamlessly accessing the infinite catalog of online music. Built on modern web technologies and wrapped in an optimized Electron shell, it provides an ad-free, tracking-free, and blazing-fast listening experience. Whether you're organizing local MP3s, streaming from YouTube, or building hybrid playlists, Jigglypuff handles it elegantly.";
    
    // Extract tech stack
    techStack.push("React 19", "Electron 42", "Vite 8", "Zustand", "IndexedDB", "Node.js", "yt-dlp", "Discord RPC");
    
    // Extract features
    features.push(
      "Offline-First Local Playback (MP3, MP4, M4A, etc.)",
      "Online Search & Streaming (yt-search & yt-dlp)",
      "Hybrid Library Management",
      "Discord Rich Presence integration",
      "Neo-Brutalist / Dark UI design"
    );
  } else if (filename.includes("(2)")) {
    title = "KAIRO Super App";
    tagline = "A production-grade, highly scalable Super App platform combining instant messaging, WebRTC calling, and payments.";
    description = "KAIRO is a production-grade, highly scalable Super App platform. It combines a real-time messaging engine with typing indicators and receipts, encrypted communication channels (E2EE), high-fidelity WebRTC calling, and multi-service modules. It features a striking Neo-Brutalist Design Language with bold borders, high-contrast flat backgrounds, and premium micro-interactions.";
    
    techStack.push("React Native", "Expo SDK 54", "WebRTC", "Socket.IO", "Node.js", "Express", "MySQL 8.0", "Prisma ORM", "Docker");
    
    features.push(
      "Real-Time Messaging with chat receipts (Delivered/Seen)",
      "High-Fidelity WebRTC Audio Calling & routing",
      "Encrypted communication channels (E2EE)",
      "Refresh Token Rotation (RTR) auth security",
      "Neo-Brutalist Design UI theme"
    );
  } else if (filename.includes("(3)")) {
    title = "Hikari";
    tagline = "AI Mental Wellness Companion delivering emotionally intelligent, context-aware responses with 7-layer security.";
    description = "Hikari is an AI-powered mental wellness platform acting as a compassionate conversational companion. It uses large language models (LLaMA 3.3 via Groq) to provide emotionally intelligent, context-aware responses. It features persistent memory, Jina AI vector embeddings for RAG, voice I/O, scheduled wellness reminders, and is protected by a hardened 7-layer security shield.";
    url = "https://hikaris.in";
    
    techStack.push("React 18", "Vite", "Zustand", "Framer Motion", "Node.js", "Express", "PostgreSQL", "Sequelize", "Groq LLaMA 3.3", "Jina AI RAG", "Resend");
    
    features.push(
      "Emotionally intelligent chat (LLaMA 3.3 via Groq)",
      "Retrieval-Augmented Generation (RAG) using Jina AI",
      "7-Layer Security Shield (Sanitization, Injection defense)",
      "Dynamic Personality System (Therapist, Mentor, Friend)",
      "Voice input/output (Web Speech API & Edge TTS)"
    );
  } else if (filename.includes("(4)")) {
    title = "LocalCoder";
    tagline = "A secure, local-first AI coding agent running entirely on Ollama and Qwen2.5-Coder for offline private coding.";
    description = "LocalCoder is a secure, local-first AI coding agent designed to run entirely on your own hardware. Powered by Ollama and Qwen2.5-Coder (14B/7B), it gives you agentic development capabilities (file actions, directory indexer, ripgrep code search) without leaking your codebase or API keys to the cloud, utilizing an interactive safety layer.";
    
    techStack.push("Node.js", "SQLite", "Ollama", "Qwen2.5-Coder", "ripgrep", "Express", "React", "Vite", "Zustand");
    
    features.push(
      "100% Offline & Private AI coding agent",
      "Agentic Tool Suite (File read/write, terminal execution)",
      "Interactive Safety Layer (Intercepts dangerous commands)",
      "SQLite Memory & indexing watch engine",
      "Real-time WebSocket token streaming"
    );
  } else {
    // Generic parser fallback
    // Try to find the title: look for # Title or h1 Title
    const titleMatch = content.match(/#\s+(.+)/) || content.match(/<h1>(.+?)<\/h1>/);
    title = titleMatch ? titleMatch[1].trim() : filename.replace(".md", "");
    
    // Look for first paragraph as tagline
    const cleanLines = lines
      .map(l => l.trim())
      .filter(l => l.length > 0 && !l.startsWith("#") && !l.startsWith("<") && !l.startsWith("!"));
    tagline = cleanLines.length > 0 ? cleanLines[0] : "Awesome project details inside.";
    description = tagline;
    
    // Fill in default features & tech
    techStack.push("TypeScript", "Next.js", "Tailwind CSS");
    features.push("Markdown-sourced information", "Modern clean structure");
  }

  // Generate a safe ID
  const id = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  return {
    id,
    title,
    tagline,
    description,
    techStack,
    features,
    markdownFile: filename,
    url,
  };
}

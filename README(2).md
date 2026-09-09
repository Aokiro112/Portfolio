# 🛡️ Kairo AI — Autonomous Cybersecurity Workstation

> **Live Deployment:** [https://kairo.bond](https://kairo.bond)

Welcome to **Kairo AI**, an autonomous AI-powered cybersecurity workstation that combines real-time ReAct penetration testing, passive reconnaissance, and AST-driven static code security auditing to identify and remediate vulnerabilities before adversaries exploit them.

---

## 🏗️ Architecture & Technology Stack

Kairo AI is built with a modular, highly secure, and resilient micro-architecture designed for automated security analysis, intelligent vulnerability triage, and automated patch recommendations:

### 📱 Frontend (Web Client)
* **Framework**: Next.js 15 & React 19 (App Router)
* **Language**: TypeScript
* **Styling**: Tailwind CSS with custom cyber/dark telemetry themes
* **Motion & Interactions**: Framer Motion
* **Icons & Visuals**: Lucide React

### ⚙️ Backend (API & Orchestration Engine)
* **Runtime**: Node.js
* **Framework**: Express.js with TypeScript
* **Streaming Protocol**: Server-Sent Events (SSE) for real-time thought-streaming, log streaming, and live scan telemetry
* **Security Layer**: 
  * Helmet security headers & CORS policy controls
  * API Rate Limiting via `express-rate-limit`
  * JSON Web Tokens (JWT) authentication guards

### 🗄️ Database & ORM
* **ORM**: Prisma ORM
* **Database**: SQLite (optimized for rapid local audits and low-overhead persistent records)

### 🧠 AI & Agent Architecture
* **Agent Core**: ReAct (Reasoning + Action) Agent Loop for iterative threat discovery and exploit verification
* **Language Models**: Llama 3.3 70B & GPT-OSS 120B
* **Orchestration**: Custom Multi-Key Load Balancing Pool with automatic failover and rate-limit mitigation
* **Code Intelligence**: Custom Static AST (Abstract Syntax Tree) & SAST Engine for zero-false-positive syntax analysis

### 🛠️ Security & Diagnostic Tools
* **Nmap**: Network mapping, port state enumeration, and service version detection
* **Nuclei**: Fast, template-based vulnerability scanning
* **Subfinder**: Passive DNS enumeration and target asset discovery
* **Wafw00f**: Web Application Firewall (WAF) detection and bypass profiling
* **Docker**: Isolated sandboxing for running security tools and payload verification

---

## ⚡ Key Capabilities

1. **Autonomous Penetration Testing (ReAct Loop)**: 
   Deploys an autonomous reasoning-action cycle where the agent hypothesizes attack vectors, executes diagnostic scans, observes responses, and verifies vulnerabilities dynamically.

2. **Passive & Active Reconnaissance**: 
   Automates target footprinting using Subfinder, Nmap, and Wafw00f without raising aggressive defensive alarms.

3. **AST-Driven Static Application Security Testing (SAST)**: 
   Parses source code into Abstract Syntax Trees to detect code smells, injection sinks, insecure deserialization, and hardcoded secrets with line-level accuracy.

4. **Multi-Key Load Balancing Pool**: 
   Distributes reasoning requests across key pools to sustain long-running audits without encountering API throttling.

5. **Live Telemetry & Diagnostics**: 
   Delivers scan updates and real-time agent thoughts directly to the frontend workstation over Server-Sent Events (SSE).

---

## 🚀 Quick Start & Deployment

### Prerequisites
* **Node.js** v20+
* **Docker** (for containerized tool environments)
* **API Keys** for Llama 3.3 / GPT-OSS inference

Visit the workstation at [https://kairo.bond](https://kairo.bond) or `http://localhost:3000`.

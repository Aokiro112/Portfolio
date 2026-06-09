"use client";

import React, { useState, useEffect, useRef } from "react";
import Sidebar from "./Sidebar";
import WindowContainer from "./WindowContainer";
import SectionCard from "./SectionCard";
import ProjectCard from "./ProjectCard";
import ContactCard from "./ContactCard";
import ProjectDetailsModal from "./ProjectDetailsModal";
import ResumeModal from "./ResumeModal";
import { Project } from "@/lib/projects";
import { Code, Server, Database, Layers, CheckSquare } from "lucide-react";

interface PortfolioShellProps {
  projects: Project[];
}

export default function PortfolioShell({ projects }: PortfolioShellProps) {
  const [activeSection, setActiveSection] = useState("home");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  // References for scroll navigation
  const sectionRefs = {
    home: useRef<HTMLDivElement>(null),
    about: useRef<HTMLDivElement>(null),
    skills: useRef<HTMLDivElement>(null),
    projects: useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null),
  };

  // Scroll to a specific section smoothly
  const handleNavigate = (sectionId: string) => {
    const ref = sectionRefs[sectionId as keyof typeof sectionRefs];
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(sectionId);
    }
  };

  // Set up Intersection Observer to track active section while scrolling
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px", // Trigger when section occupies the upper-middle of viewport
      threshold: 0.1,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const openProjectDetails = (project: Project) => {
    setSelectedProject(project);
    setIsProjectModalOpen(true);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-3 md:p-6 bg-bg-page print:bg-white print:p-0">
      <WindowContainer>
        {/* Left Sidebar */}
        <Sidebar
          activeSection={activeSection}
          onNavigate={handleNavigate}
          onResumeClick={() => setIsResumeModalOpen(true)}
        />

        {/* Right Scrollable Panel */}
        <div className="flex-1 p-4 md:p-6 overflow-y-auto max-h-[85vh] md:max-h-[750px] scroll-smooth print:overflow-visible print:max-h-none">
          {/* Welcome Card */}
          <div id="home" ref={sectionRefs.home} className="scroll-mt-6">
            <SectionCard id="home-card" title="Welcome" headerColor="pink">
              <div className="space-y-4">
                <p className="text-lg md:text-xl font-medium leading-relaxed">
                  Hey, I'm <span className="text-brand-pink font-extrabold">Mayank Tharwani</span>.
                </p>
                <p className="text-base md:text-lg">
                  A <span className="text-brand-blue font-extrabold">Full Stack Developer</span> passionate about building modern web applications, AI-powered tools, and innovative digital experiences. I enjoy turning ideas into products that are fast, scalable, and beautifully designed.
                </p>
                <p className="text-sm md:text-base opacity-95">
                  Currently building projects, learning new technologies, and creating solutions that make an impact.
                </p>
              </div>
            </SectionCard>
          </div>

          {/* About Me Card */}
          <div id="about" ref={sectionRefs.about} className="scroll-mt-6">
            <SectionCard id="about-card" title="About Me" headerColor="blue">
              <div className="space-y-4 text-sm md:text-base">
                <p>
                  Hi, I'm <span className="font-bold">Mayank Tharwani</span>, a passionate developer and technology enthusiast with a strong interest in building innovative software solutions. I enjoy working across the full stack, turning ideas into real-world applications that are both functional and visually appealing.
                </p>
                <p>
                  My primary tech stack includes <span className="font-semibold text-brand-red">JavaScript</span>, <span className="font-semibold text-brand-red">Python</span>, <span className="font-semibold text-brand-red">React</span>, <span className="font-semibold text-brand-red">Next.js</span>, <span className="font-semibold text-brand-red">Node.js</span>, <span className="font-semibold text-brand-red">Express.js</span>, <span className="font-semibold text-brand-red">FastAPI</span>, <span className="font-semibold text-brand-red">Django</span>, <span className="font-semibold text-brand-red">PostgreSQL</span>, and <span className="font-semibold text-brand-red">MySQL</span>. I love exploring new technologies, designing modern user experiences, and solving complex problems through code.
                </p>
                <p>
                  I'm currently focused on building ambitious projects ranging from AI-powered applications and developer tools to large-scale platform ideas. Whether it's creating intelligent systems, experimenting with cybersecurity, or crafting polished user interfaces, I'm always looking for opportunities to learn, build, and push my skills further.
                </p>
                <p>
                  When I'm not coding, you'll usually find me researching emerging technologies, refining project ideas, or working on the next big thing. Let's build something amazing together.
                </p>
              </div>
            </SectionCard>
          </div>

          {/* Language and Frameworks Card */}
          <div id="skills" ref={sectionRefs.skills} className="scroll-mt-6">
            <SectionCard id="skills-card" title="Language and Frameworks" headerColor="pink">
              <div className="flex flex-col neo-border-thin rounded-[6px] overflow-hidden bg-bg-card font-sans">
                {/* Row 1: Languages, Runtime, Frontend */}
                <div className="grid grid-cols-1 md:grid-cols-3 border-b-2 border-ink-black/20 md:border-b-0">
                  {/* Languages Column */}
                  <div className="p-4 flex flex-col gap-3 border-b-2 md:border-b-0 md:border-r-2 border-ink-black/20">
                    <h3 className="font-extrabold text-sm md:text-base text-ink-black flex items-center gap-2 mb-1">
                      <Code className="w-4 h-4 text-brand-pink" />
                      Languages
                    </h3>
                    <div className="flex flex-col gap-2.5">
                      {["JavaScript", "Python"].map((skill) => (
                        <div key={skill} className="flex items-center gap-2.5">
                          <span className="w-5 h-5 flex items-center justify-center bg-brand-blue border border-ink-black rounded-[4px] text-xs font-mono font-bold text-ink-black select-none shadow-sm">
                            ✔
                          </span>
                          <span className="text-sm font-bold text-ink-black/95">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Runtime Column */}
                  <div className="p-4 flex flex-col gap-3 border-b-2 md:border-b-0 md:border-r-2 border-ink-black/20">
                    <h3 className="font-extrabold text-sm md:text-base text-ink-black flex items-center gap-2 mb-1">
                      <Layers className="w-4 h-4 text-brand-blue" />
                      Runtime
                    </h3>
                    <div className="flex flex-col gap-2.5">
                      {["Node.js"].map((skill) => (
                        <div key={skill} className="flex items-center gap-2.5">
                          <span className="w-5 h-5 flex items-center justify-center bg-brand-blue border border-ink-black rounded-[4px] text-xs font-mono font-bold text-ink-black select-none shadow-sm">
                            ✔
                          </span>
                          <span className="text-sm font-bold text-ink-black/95">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Frontend Column */}
                  <div className="p-4 flex flex-col gap-3">
                    <h3 className="font-extrabold text-sm md:text-base text-ink-black flex items-center gap-2 mb-1">
                      <Code className="w-4 h-4 text-brand-pink" />
                      Frontend
                    </h3>
                    <div className="flex flex-col gap-2.5">
                      {["React.js", "Next.js", "React Native"].map((skill) => (
                        <div key={skill} className="flex items-center gap-2.5">
                          <span className="w-5 h-5 flex items-center justify-center bg-brand-blue border border-ink-black rounded-[4px] text-xs font-mono font-bold text-ink-black select-none shadow-sm">
                            ✔
                          </span>
                          <span className="text-sm font-bold text-ink-black/95">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Horizontal Dashed Divider */}
                <div className="border-t-2 border-dashed border-ink-black/20 w-full hidden md:block"></div>

                {/* Row 2: Backend, Databases */}
                <div className="grid grid-cols-1 md:grid-cols-2">
                  {/* Backend Column */}
                  <div className="p-4 flex flex-col gap-3 border-b-2 md:border-b-0 md:border-r-2 border-ink-black/20">
                    <h3 className="font-extrabold text-sm md:text-base text-ink-black flex items-center gap-2 mb-1">
                      <Server className="w-4 h-4 text-brand-blue" />
                      Backend
                    </h3>
                    <div className="flex flex-col gap-2.5">
                      {["Express.js", "FastAPI", "Django"].map((skill) => (
                        <div key={skill} className="flex items-center gap-2.5">
                          <span className="w-5 h-5 flex items-center justify-center bg-brand-blue border border-ink-black rounded-[4px] text-xs font-mono font-bold text-ink-black select-none shadow-sm">
                            ✔
                          </span>
                          <span className="text-sm font-bold text-ink-black/95">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Databases Column */}
                  <div className="p-4 flex flex-col gap-3">
                    <h3 className="font-extrabold text-sm md:text-base text-ink-black flex items-center gap-2 mb-1">
                      <Database className="w-4 h-4 text-brand-pink" />
                      Databases
                    </h3>
                    <div className="flex flex-col gap-2.5">
                      {["PostgreSQL", "MySQL", "SQLite"].map((skill) => (
                        <div key={skill} className="flex items-center gap-2.5">
                          <span className="w-5 h-5 flex items-center justify-center bg-brand-blue border border-ink-black rounded-[4px] text-xs font-mono font-bold text-ink-black select-none shadow-sm">
                            ✔
                          </span>
                          <span className="text-sm font-bold text-ink-black/95">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </SectionCard>
          </div>

          {/* Projects Card */}
          <div id="projects" ref={sectionRefs.projects} className="scroll-mt-6">
            <SectionCard id="projects-card" title="Projects" headerColor="blue">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {projects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onClick={() => openProjectDetails(project)}
                  />
                ))}
              </div>
            </SectionCard>
          </div>

          {/* Contact Card */}
          <div id="contact" ref={sectionRefs.contact} className="scroll-mt-6">
            <SectionCard id="contact-card" title="Contact" headerColor="pink">
              <ContactCard />
            </SectionCard>
          </div>
        </div>
      </WindowContainer>

      {/* Retro Property Modals */}
      <ProjectDetailsModal
        project={selectedProject}
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
      />

      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />
    </div>
  );
}

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
import { Code, Server, Database, Layers, Calendar, MapPin } from "lucide-react";

interface PortfolioShellProps {
  projects: Project[];
}

export default function PortfolioShell({ projects }: PortfolioShellProps) {
  const [activeSection, setActiveSection] = useState("home");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  // References for scroll navigation
  const homeRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // Scroll to a specific section smoothly
  const handleNavigate = (sectionId: string) => {
    const refs: Record<string, React.RefObject<HTMLDivElement | null>> = {
      home: homeRef,
      about: aboutRef,
      experience: experienceRef,
      skills: skillsRef,
      projects: projectsRef,
      contact: contactRef,
    };
    const targetRef = refs[sectionId];
    if (targetRef && targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
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
    const allRefs = [homeRef, aboutRef, experienceRef, skillsRef, projectsRef, contactRef];

    allRefs.forEach((ref) => {
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
          <div id="home" ref={homeRef} className="scroll-mt-6">
            <SectionCard id="home-card" title="Welcome" headerColor="pink">
              <div className="space-y-4">
                <p className="text-lg md:text-xl font-medium leading-relaxed">
                  Hey, I&apos;m <span className="text-brand-pink font-extrabold">Mayank Tharwani</span>.
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
          <div id="about" ref={aboutRef} className="scroll-mt-6">
            <SectionCard id="about-card" title="About Me" headerColor="blue">
              <div className="space-y-4 text-sm md:text-base">
                <p>
                  Hi, I&apos;m <span className="font-bold">Mayank Tharwani</span>, a passionate developer and technology enthusiast with a strong interest in building innovative software solutions. I enjoy working across the full stack, turning ideas into real-world applications that are both functional and visually appealing.
                </p>
                <p>
                  My primary tech stack includes <span className="font-semibold text-brand-red">JavaScript</span>, <span className="font-semibold text-brand-red">Python</span>, <span className="font-semibold text-brand-red">Rust</span>, <span className="font-semibold text-brand-red">React</span>, <span className="font-semibold text-brand-red">Next.js</span>, <span className="font-semibold text-brand-red">Node.js</span>, <span className="font-semibold text-brand-red">Express.js</span>, <span className="font-semibold text-brand-red">FastAPI</span>, <span className="font-semibold text-brand-red">Django</span>, <span className="font-semibold text-brand-red">PostgreSQL</span>, and <span className="font-semibold text-brand-red">MySQL</span>. I love exploring new technologies, designing modern user experiences, and solving complex problems through code.
                </p>
                <p>
                  I&apos;m currently focused on building ambitious projects ranging from AI-powered applications and developer tools to large-scale platform ideas. Whether it&apos;s creating intelligent systems, experimenting with cybersecurity, or crafting polished user interfaces, I&apos;m always looking for opportunities to learn, build, and push my skills further.
                </p>
                <p>
                  When I&apos;m not coding, you&apos;ll usually find me researching emerging technologies, refining project ideas, or working on the next big thing. Let&apos;s build something amazing together.
                </p>
              </div>
            </SectionCard>
          </div>

          {/* Experience Card */}
          <div id="experience" ref={experienceRef} className="scroll-mt-6">
            <SectionCard id="experience-card" title="Experience" headerColor="pink">
              <div className="flex flex-col gap-4 font-sans">
                {[
                  {
                    role: "Chief Technology Officer",
                    company: "Kritix AI",
                    type: "Full-time",
                    period: "Oct 2026 - Present · 2 mos",
                    location: "Jaipur, Rajasthan, India · Remote",
                    badge: "Present",
                    skills: "Technology Leadership and Technology Management",
                    accent: "bg-brand-pink",
                  },
                  {
                    role: "Founder",
                    company: "Kairo",
                    type: "Full-time",
                    period: "Sep 2026 - Present · 3 mos",
                    location: "Jaipur, Rajasthan, India · On-site",
                    badge: "Present",
                    skills: "Back-End Web Development, Business Ownership and +6 skills",
                    accent: "bg-brand-blue",
                  },
                  {
                    role: "Intern",
                    company: "Nityasha AI",
                    type: "Internship",
                    period: "Jun 2026 - Sep 2026 · 4 mos",
                    location: "India · Remote",
                    skills: "JavaScript Libraries",
                    accent: "bg-brand-red text-bg-card",
                  },
                  {
                    role: "Intern",
                    company: "Project Banao",
                    type: "Part-time",
                    period: "Apr 2026 - May 2026 · 2 mos",
                    location: "India · Remote",
                    description:
                      "Worked as an intern on existing projects, contributed to the development of new projects, and resolved bugs and technical issues.",
                    accent: "bg-brand-blue",
                  },
                ].map((exp, index) => (
                  <div
                    key={index}
                    className="p-4 md:p-4.5 bg-bg-card neo-border-thin rounded-[6px] shadow-xs flex flex-col sm:flex-row sm:items-start gap-3.5 transition-neo hover:translate-x-0.5"
                  >
                    {/* Monogram Badge */}
                    <div
                      className={`w-10 h-10 rounded-[6px] neo-border-thin ${exp.accent} flex items-center justify-center font-extrabold font-mono text-base flex-shrink-0 text-ink-black shadow-xs select-none`}
                    >
                      {exp.company.charAt(0)}
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col gap-1">
                      <div className="flex flex-wrap items-center justify-between gap-1.5">
                        <div>
                          <h3 className="font-extrabold text-base md:text-lg text-ink-black leading-tight">
                            {exp.role}
                          </h3>
                          <p className="text-xs md:text-sm font-bold text-ink-black/85 font-mono">
                            {exp.company} <span className="text-ink-black/40">·</span> {exp.type}
                          </p>
                        </div>
                        {exp.badge && (
                          <span className="px-2 py-0.5 text-xs font-mono font-bold bg-emerald-200 text-emerald-950 border border-ink-black rounded-[4px] shadow-xs select-none">
                            {exp.badge}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1 text-xs font-mono text-ink-black/75 mt-0.5">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-brand-pink" />
                          {exp.period}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-brand-blue" />
                          {exp.location}
                        </span>
                      </div>

                      {exp.description && (
                        <p className="text-xs md:text-sm text-ink-black/90 font-sans mt-1.5 leading-relaxed bg-bg-page/40 p-2.5 rounded-[4px] border border-ink-black/15">
                          {exp.description}
                        </p>
                      )}

                      {exp.skills && (
                        <div className="flex items-center gap-1.5 text-xs font-bold text-ink-black/95 mt-1">
                          <span className="text-brand-pink text-xs select-none">💎</span>
                          <span className="font-sans">{exp.skills}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>

          {/* Language and Frameworks Card */}
          <div id="skills" ref={skillsRef} className="scroll-mt-6">
            <SectionCard id="skills-card" title="Language and Frameworks" headerColor="blue">
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
                      {["JavaScript", "Python", "Rust"].map((skill) => (
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
          <div id="projects" ref={projectsRef} className="scroll-mt-6">
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
          <div id="contact" ref={contactRef} className="scroll-mt-6">
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

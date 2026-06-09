import { getProjects } from "@/lib/projects";
import PortfolioShell from "@/components/PortfolioShell";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mayank Tharwani - Full Stack Developer",
  description: "Portfolio of Mayank Tharwani, a Full Stack Developer building modern web applications, AI-powered tools, and innovative digital experiences.",
  openGraph: {
    title: "Mayank Tharwani - Full Stack Developer",
    description: "Portfolio of Mayank Tharwani, a Full Stack Developer building modern web applications, AI-powered tools, and innovative digital experiences.",
    url: "https://hikaris.in",
    siteName: "Mayank Tharwani Portfolio",
    images: [
      {
        url: "/pfp.png",
        width: 800,
        height: 800,
        alt: "Mayank Tharwani",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function Home() {
  // Read all README files from root workspace directory dynamically on server
  const projects = getProjects();

  return <PortfolioShell projects={projects} />;
}

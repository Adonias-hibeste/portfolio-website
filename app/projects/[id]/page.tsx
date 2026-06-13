import { getProjectById, getMergedProjects } from "@/lib/data/projects";
import { notFound } from "next/navigation";
import ProjectDetailClient from "./ProjectDetailClient";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const project = await getProjectById(params.id);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} | Adonias Hibeste Portfolio`,
    description: project.description.slice(0, 150) + "...",
    openGraph: {
      title: project.title,
      description: project.description.slice(0, 150) + "...",
      images: [project.imageUrl],
    },
  };
}

export default async function ProjectPage({ params }: { params: { id: string } }) {
  const project = await getProjectById(params.id);

  if (!project) {
    notFound();
  }

  return <ProjectDetailClient project={project} />;
}

import { prisma } from "@/lib/prisma";
import { Github, Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

async function getProjects() {
    try {
        const projects = await prisma.project.findMany({
            orderBy: { order: "asc" },
        });
        return projects;
    } catch (error) {
        console.error("Failed to fetch projects:", error);
        return [];
    }
}

export default async function ProjectsPage() {
    const projects = await getProjects();

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-background text-foreground">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white uppercase tracking-widest">
                        All <span className="text-primary">Projects</span>
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        A complete collection of my mobile applications and web projects.
                    </p>
                </div>

                {projects.length === 0 ? (
                    <div className="text-center py-20 border border-dashed border-white/10 rounded-lg bg-card/20">
                        <p className="text-gray-400">
                            Projects are being added. Check back soon!
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project: any) => (
                            <div
                                key={project.id}
                                className="group bg-card/50 rounded-xl overflow-hidden border border-white/5 shadow-sm hover:shadow-[0_0_20px_rgba(204,255,0,0.1)] hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="relative h-48 overflow-hidden">
                                    {project.imageUrl ? (
                                        <Image
                                            src={project.imageUrl}
                                            alt={project.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">
                                            No Image
                                        </div>
                                    )}
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-primary transition-colors">{project.title}</h3>
                                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {project.technologies.map((tech: string) => (
                                            <span
                                                key={tech}
                                                className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-4 mt-auto">
                                        {project.liveLink && (
                                            <a
                                                href={project.liveLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center text-sm font-medium text-gray-300 hover:text-primary transition-colors"
                                            >
                                                <Globe className="w-4 h-4 mr-2" />
                                                Live Demo
                                            </a>
                                        )}
                                        {project.repoLink && (
                                            <a
                                                href={project.repoLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center text-sm font-medium text-gray-300 hover:text-primary transition-colors"
                                            >
                                                <Github className="w-4 h-4 mr-2" />
                                                Code
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

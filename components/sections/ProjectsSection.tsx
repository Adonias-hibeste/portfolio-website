"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ClientProjectShowcase, CLIENT_PROJECTS, ProjectData } from "@/components/ClientProjectShowcase";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ProjectsSectionProps {
    projects?: any[];
}

export function ProjectsSection({ projects = [] }: ProjectsSectionProps) {
    // Process passion projects
    const ENTERPRISE_KEYWORDS = ['doulado', 'sefere', 'hababond', 'hababbond', 'hababondlite', 'hababbondlite'];
    const BANNED_PROJECTS = ['secure vpn', 'vpn', 'fare', 'documind']; // From user request "remove the apps starting from secure vpn until fare which are put at last"
    
    const passionProjects = projects.filter((p: any) => {
        const titleLower = p.title.toLowerCase();
        const isEnterprise = ENTERPRISE_KEYWORDS.some(kw => titleLower.includes(kw));
        const isBanned = BANNED_PROJECTS.some(kw => titleLower.includes(kw));
        return !isEnterprise && !isBanned;
    });

    const mappedPassionProjects: ProjectData[] = passionProjects.map(p => {
        const category = p.title.toLowerCase().includes('app') || 
            p.technologies.includes('Flutter') || 
            p.technologies.includes('React Native') ||
            p.technologies.includes('SwiftUI') ||
            p.technologies.includes('Swift') ? "mobile" : "web";
            
        return {
            id: p.id,
            title: p.title,
            type: "Passion Project",
            category: category as "mobile" | "web",
            tagline: p.description.split('.')[0] + '.',
            desc: p.description,
            stack: p.technologies,
            imageUrl: p.imageUrl,
            screenshots: p.screenshots?.map((src: string) => ({ src, label: "Screenshot" })) || [],
            liveLink: p.liveLink,
            repoLink: p.repoLink || p.githubLink,
            isEnterprise: false
        };
    });

    const allProjects = [...CLIENT_PROJECTS, ...mappedPassionProjects];

    return (
        <section id="projects" className="py-32 relative bg-background border-y border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <ScrollReveal>
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 mb-6">
                                <span className="text-secondary text-sm font-mono tracking-wider uppercase">Selected Work</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-space font-bold text-white mb-6">
                                Enterprise <span className="text-primary italic">&</span> Passion.
                            </h2>
                            <p className="text-gray-400 max-w-xl text-lg">
                                Real-world applications built for scale, alongside personal passion projects exploring new paradigms.
                            </p>
                        </div>
                        <Link 
                            href="/projects"
                            className="group flex items-center gap-2 text-primary font-mono text-sm hover:text-white transition-colors"
                        >
                            VIEW FULL ARCHIVE
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </ScrollReveal>

                {/* Main Showcase containing both enterprise and mapped passion projects */}
                <div className="mt-12">
                    <ClientProjectShowcase showFilters={true} projects={allProjects} />
                </div>
            </div>
        </section>
    );
}

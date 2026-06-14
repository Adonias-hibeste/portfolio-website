"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ClientProjectShowcase, ProjectData } from "@/components/ClientProjectShowcase";
import Link from "next/link";
import { ArrowRight, Lock } from "lucide-react";

interface ProjectsSectionProps {
    projects?: any[];
}

export function ProjectsSection({ projects = [] }: ProjectsSectionProps) {
    const mappedProjects: ProjectData[] = projects.map(p => {
        const techList = (p.technologies || []).map((t: string) => t.toLowerCase());
        const isMobile = p.title.toLowerCase().includes('app') ||
            techList.some((t: string) => 
                t.includes('flutter') || 
                t.includes('react native') || 
                t.includes('swift') || 
                t.includes('kotlin') || 
                t.includes('compose') || 
                t.includes('android') || 
                t.includes('ios')
            );
        const category = isMobile ? "mobile" : "web";
            
        return {
            id: p.id,
            title: p.title,
            type: p.isEnterprise ? "Enterprise Client" : "Passion Project",
            category: category as "mobile" | "web",
            tagline: p.description.split('.')[0] + '.',
            desc: p.description,
            stack: p.technologies || [],
            imageUrl: p.imageUrl,
            screenshots: p.screenshots?.map((src: string) => ({ src, label: "Screenshot" })) || [],
            liveLink: p.liveLink,
            repoLink: p.repoLink || p.githubLink,
            isEnterprise: p.isEnterprise
        };
    });

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
                    </div>
                </ScrollReveal>

                {/* NDA Explanation Banner */}
                <div className="mt-8 mb-10 max-w-4xl">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-start gap-4">
                        <div className="p-2 rounded-full bg-amber-500/10 text-amber-500 shrink-0 mt-0.5 border border-amber-500/20">
                            <Lock className="w-4 h-4" />
                        </div>
                        <div>
                            <h4 className="text-white font-space font-medium text-sm mb-1">Enterprise Client Work & NDA</h4>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Source code for enterprise projects is protected under Non-Disclosure Agreements. The case studies below focus on high-level architecture, technical problem-solving, and the business impact delivered.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Showcase containing both enterprise and mapped passion projects */}
                <div className="mt-8">
                    <ClientProjectShowcase showFilters={true} projects={mappedProjects} />
                </div>
            </div>
        </section>
    );
}

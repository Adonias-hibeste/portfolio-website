"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, Shield, Cpu, Globe, Activity, Map } from "lucide-react";

interface Project {
    id: string;
    title: string;
    description: string;
    technologies: string[];
    role?: string;
    problem?: string;
    outcome?: string;
    features?: string[];
    architecture?: string;
    imageUrl?: string | null;
    screenshots?: string[];
    isEnterprise?: boolean;
}

interface FeaturedSectionProps {
    projects: Project[];
}

export function FeaturedSection({ projects }: FeaturedSectionProps) {
    // Filter and order the flagship projects
    const featuredProjects = projects.filter(p => {
        const t = p.title.toLowerCase();
        return p.id === "doulado" || p.id === "bite" || p.id === "velo-wallet" || 
               p.id === "sefere-social" || p.id === "gymflow" || p.id === "fare" ||
               t.includes("doulado") || t.includes("bite") || t.includes("velo") ||
               t.includes("sefere") || t.includes("gymflow") || t.includes("fare");
    });

    const getOrder = (p: Project) => {
        const t = p.title.toLowerCase();
        if (p.id === "doulado" || t.includes("doulado")) return 1;
        if (p.id === "bite" || t.includes("bite")) return 2;
        if (p.id === "sefere-social" || t.includes("sefere")) return 3;
        if (p.id === "velo-wallet" || t.includes("velo")) return 4;
        if (p.id === "gymflow" || t.includes("gymflow")) return 5;
        if (p.id === "fare" || t.includes("fare")) return 6;
        return 7;
    };

    const sortedFeatured = [...featuredProjects].sort((a, b) => getOrder(a) - getOrder(b));

    const getProjectBadge = (title: string) => {
        const t = title.toLowerCase();
        if (t.includes("doulado")) {
            return {
                text: "Enterprise Case Study",
                icon: <Shield className="w-4 h-4 text-primary" />,
                tagline: "High-level practice management platform for professional health practitioners."
            };
        }
        if (t.includes("bite")) {
            return {
                text: "Systems & Fleet Orchestration",
                icon: <Cpu className="w-4 h-4 text-primary" />,
                tagline: "4-App simulated ecosystem with AI routing and dynamic user roles."
            };
        }
        if (t.includes("sefere")) {
            return {
                text: "Global Scale Social Network",
                icon: <Globe className="w-4 h-4 text-primary" />,
                tagline: "Culturally-tailored social networking platform featuring ML face verification."
            };
        }
        if (t.includes("gymflow")) {
            return {
                text: "AI Physiological Simulator",
                icon: <Activity className="w-4 h-4 text-primary" />,
                tagline: "Personalized AI fitness coach with real-time telemetry simulation."
            };
        }
        if (t.includes("fare")) {
            return {
                text: "Real-Time Fleet Maps",
                icon: <Map className="w-4 h-4 text-primary" />,
                tagline: "Premium ride-hailing platform featuring dynamic OpenStreetMap routing."
            };
        }
        return {
            text: "AI Integration & Finance",
            icon: <Star className="w-4 h-4 text-primary" />,
            tagline: "Multi-currency digital wallet with Gemini AI spending advisor."
        };
    };

    if (sortedFeatured.length === 0) return null;

    return (
        <section id="featured" className="py-32 relative bg-card/20 border-b border-white/5 overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="mb-24 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
                        <span className="text-primary text-xs font-mono tracking-wider uppercase font-semibold">Flagship Work</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-space font-bold text-white mb-6">
                        Featured <span className="text-primary italic">Projects.</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl text-lg leading-relaxed">
                        A curated selection of production-grade platforms demonstrating enterprise scalability, multi-app systems orchestration, and advanced AI integration.
                    </p>
                </div>

                {/* Case Studies List */}
                <div className="space-y-32">
                    {sortedFeatured.map((project, idx) => {
                        const isEven = idx % 2 === 0;
                        const badgeInfo = getProjectBadge(project.title);
                        const displayTitle = project.title.split("—")[0].trim();

                        return (
                            <div 
                                key={project.id} 
                                className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center"
                            >
                                {/* Visual Area (5 columns) */}
                                <div className={`lg:col-span-5 flex justify-center w-full ${!isEven ? 'lg:order-last' : ''}`}>
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        transition={{ duration: 0.6 }}
                                        className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-[9/19] flex items-center justify-center"
                                    >
                                        {/* Glow behind device */}
                                        <div className="absolute inset-0 bg-primary/10 rounded-[3rem] blur-3xl pointer-events-none -z-10 scale-90" />
                                        
                                        {/* Direct image inside rounded-2xl container with glow-shadow */}
                                        <div className="relative w-full h-full overflow-hidden rounded-[2.2rem] border border-white/10 bg-gray-900 shadow-[0_30px_70px_rgba(0,0,0,0.6)] hover:scale-[1.03] transition-transform duration-300">
                                            {project.imageUrl && (
                                                <Image 
                                                    src={project.imageUrl} 
                                                    alt={project.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                            )}
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Content Area (7 columns) */}
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.6, delay: 0.1 }}
                                    className="lg:col-span-7 flex flex-col justify-center text-left"
                                >
                                    {/* Project Category Tag */}
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 self-start">
                                        {badgeInfo.icon}
                                        <span className="text-gray-300 text-xs font-mono tracking-wider font-medium">{badgeInfo.text}</span>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-3xl md:text-5xl font-space font-bold text-white mb-4">
                                        {displayTitle}
                                    </h3>

                                    {/* Description Tagline */}
                                    <p className="text-lg text-primary font-space font-medium mb-6">
                                        {badgeInfo.tagline}
                                    </p>

                                    {/* Case Study Details */}
                                    <div className="space-y-6 mb-8">
                                        {project.role && (
                                            <div>
                                                <span className="text-xs uppercase font-mono tracking-wider text-primary/80 font-bold block mb-1">My Role</span>
                                                <span className="text-white text-lg font-semibold">{project.role}</span>
                                            </div>
                                        )}
                                        {project.problem && (
                                            <div>
                                                <span className="text-xs uppercase font-mono tracking-wider text-gray-500 font-bold block mb-1">The Problem</span>
                                                <p className="text-gray-400 font-sans leading-relaxed text-sm">{project.problem}</p>
                                            </div>
                                        )}
                                        {project.outcome && (
                                            <div>
                                                <span className="text-xs uppercase font-mono tracking-wider text-gray-500 font-bold block mb-1">The Outcome</span>
                                                <p className="text-gray-300 font-sans leading-relaxed text-sm font-medium">{project.outcome}</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Tech Badges */}
                                    <div className="flex flex-wrap gap-2 mb-10">
                                        {project.technologies.slice(0, 6).map(tech => (
                                            <span 
                                                key={tech} 
                                                className="px-3 py-1 rounded-md text-xs font-mono bg-white/5 border border-white/10 text-gray-300"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                        {project.technologies.length > 6 && (
                                            <span className="px-3 py-1 rounded-md text-xs font-mono bg-white/5 border border-white/10 text-gray-500">
                                                +{project.technologies.length - 6} more
                                            </span>
                                        )}
                                    </div>

                                    {/* CTAs */}
                                    <div className="flex items-center gap-6">
                                        <Link
                                            href={`/projects/${project.id}`}
                                            className="group inline-flex items-center gap-2 text-sm uppercase tracking-widest font-bold text-white hover:text-primary transition-colors duration-300"
                                        >
                                            View Case Study
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </motion.div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

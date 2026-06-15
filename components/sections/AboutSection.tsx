"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ScrollReveal";
import Image from "next/image";
import { Star, ShieldCheck, Trophy, Sparkles } from "lucide-react";

const stats = [
    {
        value: "5+ Years",
        label: "Mobile Engineering",
        icon: <Sparkles className="w-5 h-5 text-primary" />
    },
    {
        value: "25+ Apps",
        label: "Shipped to Production",
        icon: <Trophy className="w-5 h-5 text-primary" />
    },
    {
        value: "5.0 ★",
        label: "Upwork Client Rating",
        icon: <Star className="w-5 h-5 text-amber-400" />
    },
    {
        value: "100%",
        label: "Client Satisfaction",
        icon: <ShieldCheck className="w-5 h-5 text-primary" />
    }
];

const technologies = [
    { name: "Flutter", role: "Cross-platform development" },
    { name: "React Native", role: "Multi-stack mobile platforms" },
    { name: "Swift / iOS", role: "Native Apple ecosystems" },
    { name: "Kotlin / Android", role: "Native Google ecosystems" },
    { name: "Firebase Suite", role: "Scalable backend services" },
    { name: "Next.js / Web", role: "Admin portals & web platforms" }
];

export function AboutSection() {
    return (
        <section id="about" className="py-32 relative bg-card/40 border-y border-white/5 overflow-hidden">
            {/* Background ambient glow */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-12 gap-16 items-center">
                    
                    {/* Left: Large Profile Image Card */}
                    <div className="lg:col-span-5 flex justify-center">
                        <ScrollReveal>
                            <div className="relative group">
                                {/* Ambient glow behind the image */}
                                <div className="absolute inset-0 bg-primary/20 rounded-[3rem] blur-3xl group-hover:bg-primary/30 transition-all duration-500 -z-10" />
                                
                                {/* Image container card */}
                                <div className="relative w-[260px] h-[370px] sm:w-[360px] sm:h-[500px] md:w-[380px] md:h-[530px] rounded-[3rem] sm:rounded-[3.5rem] overflow-hidden border border-white/10 bg-background/50 backdrop-blur-md p-3 sm:p-4 shadow-[0_30px_60px_rgba(0,0,0,0.8)] transition-all duration-500 group-hover:-translate-y-2 group-hover:border-primary/30">
                                    <div className="relative w-full h-full rounded-[2.3rem] sm:rounded-[2.7rem] overflow-hidden">
                                        <Image
                                            src="/profile.jpg"
                                            alt="Adonias"
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            priority
                                        />
                                    </div>
                                </div>
                                
                                {/* Status badge overlay */}
                                <div className="absolute -bottom-3 -right-3 bg-card border border-white/10 rounded-2xl px-4 py-2.5 flex items-center gap-2 shadow-2xl">
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                                    <span className="text-[10px] text-white font-mono tracking-wider uppercase font-semibold">Available for contracts</span>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* Right: Bio, Pillars, Stats & Tech */}
                    <div className="lg:col-span-7 space-y-10">
                        <ScrollReveal>
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
                                <span className="text-primary text-xs font-mono tracking-wider uppercase font-semibold">About Me</span>
                            </div>
                            
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-space font-bold text-white mb-6 leading-tight">
                                Bridging the gap between <span className="text-primary italic">premium design</span> and <span className="text-white italic">robust engineering.</span>
                            </h2>
                            
                            <div className="space-y-6 text-base text-gray-400 leading-relaxed font-sans">
                                <p className="text-lg text-white font-medium">
                                    I build high-performance mobile and web applications that combine premium user experiences with clean, scalable architecture.
                                </p>
                                <p>
                                    Based in Addis Ababa, I partner with startup founders and engineering teams globally to ship fluid, production-ready applications. My expertise spans native and cross-platform mobile frameworks, backed by robust server-side and Generative AI integrations.
                                </p>
                                
                                {/* 4 Pillars Grid */}
                                <div className="grid sm:grid-cols-2 gap-6 pt-6 border-t border-white/5">
                                    <div className="flex gap-3.5">
                                        <div className="w-6 h-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-xs font-mono font-bold mt-0.5 flex-shrink-0">1</div>
                                        <div>
                                            <h4 className="text-white font-semibold text-sm">Pixel-Perfect Logic</h4>
                                            <p className="text-xs text-gray-500 mt-1 leading-relaxed">Fluid animations, custom layouts, and highly optimized UI transitions.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3.5">
                                        <div className="w-6 h-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-xs font-mono font-bold mt-0.5 flex-shrink-0">2</div>
                                        <div>
                                            <h4 className="text-white font-semibold text-sm">Clean Architecture</h4>
                                            <p className="text-xs text-gray-500 mt-1 leading-relaxed">Robust state management, modular codebases, and testable design patterns.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3.5">
                                        <div className="w-6 h-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-xs font-mono font-bold mt-0.5 flex-shrink-0">3</div>
                                        <div>
                                            <h4 className="text-white font-semibold text-sm">End-to-End Ownership</h4>
                                            <p className="text-xs text-gray-500 mt-1 leading-relaxed">From design specs and UX flows to App Store, Play Store, and cloud deployment.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3.5">
                                        <div className="w-6 h-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-xs font-mono font-bold mt-0.5 flex-shrink-0">4</div>
                                        <div>
                                            <h4 className="text-white font-semibold text-sm">Intelligent Features</h4>
                                            <p className="text-xs text-gray-500 mt-1 leading-relaxed">On-device ML models, vector databases, and cloud-based LLM integrations.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* Stats Row */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/5">
                            {stats.map((stat, idx) => (
                                <ScrollReveal key={idx} delay={idx * 0.05}>
                                    <div className="p-5 rounded-2xl bg-background border border-white/5 hover:border-primary/25 transition-all duration-300 group hover:shadow-[0_10px_30px_rgba(0,168,150,0.08)]">
                                        <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-3 group-hover:bg-primary/10 transition-colors">
                                            {stat.icon}
                                        </div>
                                        <h3 className="text-xl sm:text-2xl font-space font-bold text-white mb-0.5">
                                            {stat.value}
                                        </h3>
                                        <p className="text-[10px] text-gray-500 font-mono tracking-wider uppercase">
                                            {stat.label}
                                        </p>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>

                        {/* Tech Stack strip */}
                        <ScrollReveal delay={0.1}>
                            <div className="p-6 rounded-2xl bg-background border border-white/5">
                                <h4 className="text-white font-space font-bold mb-4 uppercase tracking-wider text-xs text-primary">Core Technology Stack</h4>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    {technologies.map((tech) => (
                                        <div key={tech.name} className="flex flex-col">
                                            <span className="text-sm font-semibold text-white font-space">{tech.name}</span>
                                            <span className="text-[10px] text-gray-500 font-mono mt-0.5 leading-tight">{tech.role}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>

                </div>
            </div>
        </section>
    );
}

"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ScrollReveal";

const processSteps = [
    {
        num: "01",
        title: "Discovery & Arch",
        desc: "Deep dive into business requirements, defining the tech stack, data models, and system architecture before writing a single line of code."
    },
    {
        num: "02",
        title: "UI/UX & Prototyping",
        desc: "Wireframing and designing pixel-perfect interfaces in Figma, ensuring intuitive user flows and aligning with brand identity."
    },
    {
        num: "03",
        title: "Core Engineering",
        desc: "Building the robust foundation—integrating state management, APIs, offline-sync, and native modules using clean architecture."
    },
    {
        num: "04",
        title: "QA & Polish",
        desc: "Rigorous performance profiling, fixing memory leaks, refining animations to 60fps, and testing across real devices."
    },
    {
        num: "05",
        title: "Deployment & Scale",
        desc: "Publishing to App Store & Google Play, configuring CI/CD pipelines, and monitoring analytics for post-launch iteration."
    }
];

export function ProcessSection() {
    return (
        <section id="process" className="py-32 relative bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <ScrollReveal>
                    <div className="mb-20">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
                            <span className="text-primary text-sm font-mono tracking-wider uppercase">How I Work</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-space font-bold text-white mb-6">
                            The Blueprint.
                        </h2>
                        <p className="text-gray-400 max-w-xl text-lg">
                            A systematic, end-to-end approach to mobile development that guarantees quality, speed, and scalability.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="relative">
                    {/* Horizontal connecting line for desktop */}
                    <div className="hidden lg:block absolute top-[4.5rem] left-0 w-full h-[1px] bg-white/10" />

                    <div className="grid lg:grid-cols-5 gap-8 lg:gap-4 relative">
                        {processSteps.map((step, idx) => (
                            <ScrollReveal key={step.num} delay={idx * 0.1}>
                                <div className="relative group">
                                    {/* Number / Node */}
                                    <div className="w-16 h-16 rounded-2xl bg-card border border-white/10 flex items-center justify-center font-mono text-xl font-bold text-gray-500 mb-8 group-hover:bg-primary group-hover:text-background group-hover:border-primary transition-all duration-300 relative z-10 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                                        {step.num}
                                    </div>
                                    
                                    {/* Content */}
                                    <h3 className="text-xl font-bold text-white font-space mb-4 group-hover:text-primary transition-colors">
                                        {step.title}
                                    </h3>
                                    <p className="text-sm text-gray-400 leading-relaxed font-sans">
                                        {step.desc}
                                    </p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

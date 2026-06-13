"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ScrollReveal";

const skillCategories = [
    {
        title: "Mobile Architecture",
        skills: [
            { name: "Flutter", level: 95 },
            { name: "React Native", level: 90 },
            { name: "Swift / iOS", level: 85 },
            { name: "Kotlin", level: 80 }
        ]
    },
    {
        title: "State & Performance",
        skills: [
            { name: "BLoC / Riverpod", level: 95 },
            { name: "Redux / Zustand", level: 90 },
            { name: "Performance Profiling", level: 90 },
            { name: "Offline-First Sync", level: 85 }
        ]
    },
    {
        title: "Backend & Web",
        skills: [
            { name: "Next.js / React", level: 85 },
            { name: "Node.js / Express", level: 80 },
            { name: "Firebase / Supabase", level: 90 },
            { name: "PostgreSQL", level: 80 }
        ]
    }
];

export function SkillsSection() {
    return (
        <section id="skills" className="py-32 relative bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <ScrollReveal>
                    <div className="text-center mb-20">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
                            <span className="text-primary text-sm font-mono tracking-wider uppercase">Tech Stack</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-space font-bold text-white mb-6">
                            Tools of the Trade.
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                            I specialize in cross-platform and native mobile development, backed by robust web and cloud technologies.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="grid md:grid-cols-3 gap-8">
                    {skillCategories.map((category, idx) => (
                        <ScrollReveal key={category.title} delay={idx * 0.1}>
                            <div className="p-8 rounded-3xl bg-card border border-white/5 hover:border-primary/30 transition-colors duration-500">
                                <h3 className="text-xl font-bold text-white font-space mb-8">{category.title}</h3>
                                <div className="space-y-6">
                                    {category.skills.map((skill) => (
                                        <div key={skill.name}>
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="font-mono text-sm text-gray-300">{skill.name}</span>
                                                <span className="font-mono text-xs text-primary">{skill.level}%</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-background rounded-full overflow-hidden">
                                                <motion.div 
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${skill.level}%` }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                                                    className="h-full bg-primary rounded-full"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

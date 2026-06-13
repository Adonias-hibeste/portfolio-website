"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Code, Smartphone, Database, Layers } from "lucide-react";

const timelineEvents = [
    {
        year: "2022",
        title: "The Beginning",
        description: "Started mobile development focusing on Flutter and custom UI design.",
        icon: Smartphone
    },
    {
        year: "2023",
        title: "Cross-Platform Scaling",
        description: "Expanded into React Native and built complex enterprise apps.",
        icon: Layers
    },
    {
        year: "2024",
        title: "Native & Backend",
        description: "Mastered Swift for native iOS and integrated scalable backends.",
        icon: Database
    },
    {
        year: "2025+",
        title: "Senior Architecture",
        description: "Leading mobile strategies, optimizing performance, and building world-class tech foundations.",
        icon: Code
    }
];

export function AboutSection() {
    return (
        <section id="about" className="py-32 relative bg-card/50 border-y border-white/5 overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16">
                    {/* Story Side */}
                    <div>
                        <ScrollReveal>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
                                <span className="text-primary text-sm font-mono tracking-wider uppercase">My Journey</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-space font-bold text-white mb-8 leading-tight">
                                Bridging the gap between <span className="text-secondary italic">design</span> and <span className="text-primary italic">engineering</span>.
                            </h2>
                            
                            <div className="space-y-6 text-lg text-gray-400 font-sans leading-relaxed">
                                <p>
                                    As a Senior Mobile Developer based in Addis Ababa, I don't just write code — I build holistic mobile experiences. My approach stems from a deep appreciation for both the pixel-perfect details of UI/UX design and the robust architecture required for high-performance apps.
                                </p>
                                <p>
                                    Whether it's migrating a sluggish legacy app to a blazing-fast Flutter architecture or building a native iOS experience in Swift from the ground up, I own the entire product lifecycle. 
                                </p>
                                <div className="p-6 rounded-2xl bg-background border border-white/10 mt-8">
                                    <h3 className="text-white font-bold mb-4 font-space text-xl">The Philosophy</h3>
                                    <ul className="space-y-3 font-mono text-sm text-gray-400">
                                        <li className="flex gap-3"><span className="text-primary">01.</span> User-centric design always comes first.</li>
                                        <li className="flex gap-3"><span className="text-primary">02.</span> Architecture must scale with the business.</li>
                                        <li className="flex gap-3"><span className="text-primary">03.</span> Performance is a feature, not an afterthought.</li>
                                    </ul>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* Timeline Side */}
                    <div className="relative">
                        {/* Vertical line */}
                        <div className="absolute left-[27px] top-4 bottom-4 w-[2px] bg-white/10" />
                        
                        <div className="space-y-12">
                            {timelineEvents.map((event, index) => (
                                <ScrollReveal key={event.year} delay={index * 0.1}>
                                    <div className="relative flex gap-8 group">
                                        <div className="relative z-10 flex items-center justify-center w-14 h-14 rounded-full bg-background border-2 border-white/10 group-hover:border-primary transition-colors duration-300 flex-shrink-0">
                                            <event.icon className="w-6 h-6 text-gray-400 group-hover:text-primary transition-colors duration-300" />
                                        </div>
                                        <div className="pt-3">
                                            <div className="flex items-center gap-4 mb-2">
                                                <h3 className="text-xl font-bold text-white font-space">{event.title}</h3>
                                                <span className="text-sm font-mono text-secondary px-2 py-0.5 rounded bg-secondary/10">{event.year}</span>
                                            </div>
                                            <p className="text-gray-400 font-sans leading-relaxed">
                                                {event.description}
                                            </p>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

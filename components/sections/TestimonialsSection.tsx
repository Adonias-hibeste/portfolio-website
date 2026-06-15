"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Star, BadgeCheck } from "lucide-react";

const testimonials = [
    {
        project: "Dating App Development",
        image: "/testimonials/testimonial_1.png",
        rating: 5,
        date: "Mar – Apr 2026",
        width: 1024,
        height: 330,
    },
    {
        project: "Delivery App",
        image: "/testimonials/testimonial_2.png",
        rating: 5,
        date: "Dec 2025",
        width: 1024,
        height: 325,
    },
    {
        project: "Social Media App Developer",
        image: "/testimonials/testimonial_3.png",
        rating: 5,
        date: "Jan – Feb 2026",
        width: 1024,
        height: 330,
    },
    {
        project: "Flutter Migration — Testimonial",
        image: "/testimonials/testimonial_4.png",
        rating: 5,
        date: "Apr 2026",
        width: 1024,
        height: 229,
    },
    {
        project: "Senior Mobile App Developer",
        image: "/testimonials/testimonial_5.png",
        rating: 5,
        date: "Nov – Dec 2025",
        width: 1024,
        height: 283,
    }
];

export function TestimonialsSection() {
    return (
        <section id="testimonials" className="py-32 relative bg-card/30 border-b border-white/5 overflow-hidden">
            {/* Background ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-primary/5 blur-[120px] rounded-[100%] pointer-events-none" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
                            <Star className="w-4 h-4 text-primary fill-primary" />
                            <span className="text-primary text-xs font-mono tracking-wider uppercase font-semibold">Verified Feedback</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-space font-bold text-white mb-6">
                            Proven <span className="text-primary italic">Results.</span>
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
                            Real, unedited screenshots of client feedback and five-star reviews from Upwork contracts.
                        </p>
                    </div>
                </ScrollReveal>

                {/* Testimonial Feed — Full-width, readable screenshots */}
                <div className="flex flex-col gap-8">
                    {testimonials.map((testimonial, idx) => (
                        <ScrollReveal key={idx} delay={idx * 0.08}>
                            <motion.div 
                                whileHover={{ y: -4 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                className="group rounded-2xl bg-background border border-white/5 hover:border-primary/20 overflow-hidden transition-all duration-300 hover:shadow-[0_20px_60px_-15px_rgba(0,168,150,0.15)]"
                            >
                                {/* Metadata Header */}
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-5 sm:px-6 py-4 border-b border-white/5">
                                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                                        <div className="flex items-center gap-1">
                                            <BadgeCheck className="w-4 h-4 text-primary shrink-0" />
                                            <span className="text-white text-sm font-semibold font-space">Verified Upwork Review</span>
                                        </div>
                                        <span className="hidden sm:inline text-gray-600 text-xs">·</span>
                                        <span className="text-xs text-gray-500 font-mono line-clamp-1">{testimonial.project}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="flex gap-0.5">
                                            {[...Array(testimonial.rating)].map((_, i) => (
                                                <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                                            ))}
                                        </div>
                                        <span className="text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded font-mono whitespace-nowrap">
                                            {testimonial.date}
                                        </span>
                                    </div>
                                </div>

                                {/* Full Screenshot — natural aspect ratio, no cropping */}
                                <div className="relative w-full bg-neutral-950">
                                    <Image
                                        src={testimonial.image}
                                        alt={`Upwork Review - ${testimonial.project}`}
                                        width={testimonial.width}
                                        height={testimonial.height}
                                        className="w-full h-auto object-contain"
                                        quality={95}
                                    />
                                </div>
                            </motion.div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Star } from "lucide-react";

const testimonials = [
    {
        client: "Hawi K.",
        role: "Verified Client",
        project: "Flutter Migration",
        text: "Working with Adonias was a game-changer for our mobile strategy. We needed a Senior Architect who could handle a complex Flutter migration without sacrificing performance, and he delivered beyond expectations. His deep knowledge of state management and performance profiling turned a sluggish app into a blazing-fast experience.",
        rating: 5,
        date: "Apr 2026"
    },
    {
        client: "Upwork Client",
        role: "Startup Founder",
        project: "Dating App Development",
        text: "Adonias is an exceptional developer with a deep understanding of mobile architecture. He doesn't just write code; he builds scalable, high-quality solutions. His attention to detail and ability to navigate complex technical challenges made him an invaluable asset to our project. I highly recommend him for any high-level development needs.",
        rating: 5,
        date: "Apr 2026"
    },
    {
        client: "Upwork Client",
        role: "Product Owner",
        project: "Social Media App",
        text: "Adonias is a fantastic mobile developer! Building a social media app has many moving parts, but he handled everything, from user authentication to the activity feed, with ease. He was great at explaining technical hurdles and always found a solution. A true professional who meets deadlines and exceeds expectations!",
        rating: 5,
        date: "Feb 2026"
    },
    {
        client: "Upwork Client",
        role: "Business Owner",
        project: "Delivery App",
        text: "Adonias helped me create an amazing app and website! He was so professional, and wants to make his clients happy! I was amazed with his level of expertise, punctuality and attention to detail. I highly recommend him if you want a quality work with an affordable price!",
        rating: 5,
        date: "Dec 2025"
    },
    {
        client: "Upwork Client",
        role: "Project Manager",
        project: "Senior Mobile App Developer",
        text: "Adonias communicated clearly and completed every task with professionalism. I appreciated his commitment to quality and would be glad to work with him again.",
        rating: 5,
        date: "Dec 2025"
    }
];

export function TestimonialsSection() {
    return (
        <section className="py-32 relative bg-card/30 border-b border-white/5 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-secondary/10 blur-[120px] rounded-[100%] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <ScrollReveal>
                    <div className="text-center mb-20">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 mb-6">
                            <span className="text-secondary text-sm font-mono tracking-wider uppercase">Client Success</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-space font-bold text-white mb-6">
                            Proven <span className="text-secondary italic">Results.</span>
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                            Real feedback from verified clients on Upwork and independent contracts.
                        </p>
                    </div>
                </ScrollReveal>

                {/* Horizontal scrolling or grid. Let's do a masonry-like grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map((testimonial, idx) => (
                        <ScrollReveal key={idx} delay={idx * 0.1}>
                            <div className="p-8 rounded-3xl bg-background border border-white/5 hover:border-primary/20 transition-all duration-300 h-full flex flex-col group hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(0,168,150,0.15)]">
                                <div className="flex gap-1 mb-6">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                                    ))}
                                </div>
                                
                                <p className="text-gray-300 text-lg leading-relaxed flex-1 font-sans italic">
                                    "{testimonial.text}"
                                </p>
                                
                                <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                                    <div>
                                        <p className="text-white font-bold font-space">{testimonial.client}</p>
                                        <p className="text-sm text-gray-500 font-mono">{testimonial.project}</p>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded font-mono">
                                            {testimonial.date}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

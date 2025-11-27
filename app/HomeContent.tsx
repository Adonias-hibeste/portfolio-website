"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Github, Linkedin, Mail, Phone, Download, Code, Send } from "lucide-react";
import { motion } from "framer-motion";
import { getIconComponent } from "@/lib/iconMap";

interface HomeContentProps {
    projects: any[];
    skills: any[];
}

export default function HomeContent({ projects, skills }: HomeContentProps) {
    // Fallback skills if none provided
    if (skills.length === 0) {
        skills = [
            { id: 1, name: "Flutter", icon: "Flutter", order: 0 },
            { id: 2, name: "React Native", icon: "React Native", order: 1 },
            { id: 3, name: "iOS Development", icon: "iOS", order: 2 },
        ];
    }

    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
                {/* Background Glows */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] -z-10" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[128px] -z-10" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        {/* Left Side - Text Content */}
                        <motion.div
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-left order-2 md:order-1"
                        >
                            <h2 className="text-xl md:text-2xl font-medium text-gray-300 mb-4">
                                I&apos;m <span className="text-primary font-bold italic">Adonias Hibeste</span>
                            </h2>
                            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white leading-tight">
                                Senior Mobile<br />Architect
                            </h1>
                            <p className="text-lg text-gray-400 mb-8 max-w-lg">
                                Transforming complex business requirements into elegant, high-performance mobile applications with Flutter & React Native.
                            </p>

                            <div className="flex flex-col sm:flex-row items-start gap-4">
                                <Link
                                    href="#projects"
                                    className="px-8 py-3 rounded-full bg-primary text-black font-bold hover:bg-primary/90 transition-all duration-300 shadow-[0_0_20px_rgba(204,255,0,0.4)] hover:shadow-[0_0_30px_rgba(204,255,0,0.6)] uppercase tracking-wider"
                                >
                                    View My Work
                                </Link>
                                <Link
                                    href="#contact"
                                    className="px-8 py-3 rounded-full bg-transparent border-2 border-primary text-primary font-bold hover:bg-primary hover:text-black transition-all duration-300 uppercase tracking-wider"
                                >
                                    Let&apos;s Talk
                                </Link>
                            </div>
                        </motion.div>

                        {/* Right Side - Image with Floating Elements */}
                        <motion.div
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="relative order-1 md:order-2"
                        >
                            {/* Floating Client Review Card - Top Left */}
                            <motion.div
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1, duration: 0.8 }}
                                className="absolute -top-4 -left-4 md:-left-12 bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-[0_0_30px_rgba(0,0,0,0.5)] max-w-[200px] z-10"
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="flex gap-0.5">
                                        {[...Array(5)].map((_, i) => (
                                            <span key={i} className="text-primary text-sm">★</span>
                                        ))}
                                    </div>
                                    <span className="text-primary font-bold text-sm">5.0</span>
                                </div>
                                <p className="text-xs text-gray-300 leading-relaxed">
                                    &quot;Outstanding Mobile Developer. Highly Exceeded All Expectations. Highly Recommended!&quot;
                                </p>
                                <p className="text-[10px] text-gray-500 mt-2">Client Review From Upwork</p>
                            </motion.div>

                            {/* Floating Expertise Card - Top Right */}
                            <motion.div
                                initial={{ opacity: 0, y: -30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.2, duration: 0.8 }}
                                className="absolute -top-4 -right-4 md:-right-12 bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-md border border-primary/30 rounded-2xl p-4 shadow-[0_0_30px_rgba(204,255,0,0.2)] z-10"
                            >
                                <h4 className="text-primary font-bold text-sm mb-3 uppercase tracking-wider">My Expertise</h4>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between gap-4">
                                        <span className="text-xs text-gray-300">Flutter</span>
                                        <div className="flex items-center gap-2">
                                            <div className="w-16 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                                                <div className="h-full bg-primary rounded-full" style={{ width: '93%' }}></div>
                                            </div>
                                            <span className="text-[10px] text-primary font-bold">93%</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between gap-4">
                                        <span className="text-xs text-gray-300">React Native</span>
                                        <div className="flex items-center gap-2">
                                            <div className="w-16 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                                                <div className="h-full bg-blue-400 rounded-full" style={{ width: '90%' }}></div>
                                            </div>
                                            <span className="text-[10px] text-blue-400 font-bold">90%</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between gap-4">
                                        <span className="text-xs text-gray-300">Swift/iOS</span>
                                        <div className="flex items-center gap-2">
                                            <div className="w-16 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                                                <div className="h-full bg-purple-400 rounded-full" style={{ width: '88%' }}></div>
                                            </div>
                                            <span className="text-[10px] text-purple-400 font-bold">88%</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Floating Projects Button - Bottom Center */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.4, duration: 0.8 }}
                                className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-10"
                            >
                                <Link
                                    href="#projects"
                                    className="block px-6 py-3 rounded-full bg-primary text-black font-bold shadow-[0_0_30px_rgba(204,255,0,0.5)] hover:shadow-[0_0_40px_rgba(204,255,0,0.7)] transition-all duration-300 uppercase tracking-wider text-sm"
                                >
                                    My Projects
                                </Link>
                            </motion.div>

                            {/* Profile Photo */}
                            <div className="relative w-full max-w-md mx-auto aspect-[3/4] rounded-3xl overflow-hidden border-4 border-primary/30 shadow-[0_0_60px_rgba(204,255,0,0.4)]">
                                <Image
                                    src="/profile.jpg"
                                    alt="Adonias Hibeste - Senior Mobile Architect"
                                    fill
                                    className="object-cover"
                                    style={{ objectPosition: '50% 35%' }}
                                    priority
                                    quality={95}
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Who Am I Section */}
            <section id="about" className="py-24 relative">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-primary uppercase tracking-widest text-center">Who Am I ?</h2>

                        <div className="space-y-8 text-lg text-gray-300 leading-relaxed">
                            {/* Introduction Card */}
                            <div className="bg-gradient-to-br from-card/50 to-card/30 p-8 rounded-2xl border border-white/10 backdrop-blur-sm hover:border-primary/30 transition-all duration-300">
                                <p className="text-xl font-semibold text-white mb-4">
                                    Building Mobile Excellence from Concept to Launch
                                </p>
                                <p>
                                    As a Senior Mobile Architect, I transform complex business requirements into elegant, high-performance mobile applications. With deep expertise in <span className="text-primary font-semibold">Flutter</span> and <span className="text-primary font-semibold">React Native</span>, I deliver full-cycle iOS and Android solutions that don&apos;t just meet expectations—they exceed them.
                                </p>
                            </div>

                            {/* Philosophy Card */}
                            <div className="bg-gradient-to-br from-card/50 to-card/30 p-8 rounded-2xl border border-white/10 backdrop-blur-sm hover:border-primary/30 transition-all duration-300">
                                <p className="text-primary font-bold mb-3 flex items-center gap-2">
                                    <span className="text-2xl">💡</span>
                                    My Approach
                                </p>
                                <p>
                                    I believe great mobile apps are born from the intersection of technical excellence and user-centric design. From wireframing custom UI/UX to architecting scalable backends, I own the entire product lifecycle. This holistic approach ensures every line of code serves both the business goals and the end user&apos;s needs.
                                </p>
                            </div>

                            {/* Expertise Cards */}
                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 rounded-xl border border-primary/20 backdrop-blur-sm hover:shadow-[0_0_30px_rgba(204,255,0,0.2)] transition-all duration-300">
                                    <div className="text-3xl mb-3">⚙️</div>
                                    <h3 className="text-primary font-bold mb-2 text-base">Architecture & Performance</h3>
                                    <p className="text-sm text-gray-400">
                                        Expert in state management (BLoC, Riverpod, Redux, MobX), performance profiling, and building scalable architectures that ensure blazing-fast user experiences.
                                    </p>
                                </div>

                                <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 p-6 rounded-xl border border-blue-500/20 backdrop-blur-sm hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] transition-all duration-300">
                                    <div className="text-3xl mb-3">✨</div>
                                    <h3 className="text-blue-400 font-bold mb-2 text-base">Pixel-Perfect UI/UX</h3>
                                    <p className="text-sm text-gray-400">
                                        Translating complex wireframes and custom designs into flawless, responsive mobile interfaces that users love. Every pixel matters.
                                    </p>
                                </div>

                                <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 p-6 rounded-xl border border-purple-500/20 backdrop-blur-sm hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] transition-all duration-300">
                                    <div className="text-3xl mb-3">🔗</div>
                                    <h3 className="text-purple-400 font-bold mb-2 text-base">Complex Integrations</h3>
                                    <p className="text-sm text-gray-400">
                                        Proven track record in e-commerce (payment gateways, checkout flows), real-time systems (chat, live location), and health apps (HealthKit, Google Fit).
                                    </p>
                                </div>
                            </div>

                            {/* Specializations */}
                            <div className="bg-gradient-to-br from-card/50 to-card/30 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
                                <p className="text-primary font-bold mb-4 flex items-center gap-2">
                                    <span className="text-2xl">🎯</span>
                                    What Sets Me Apart
                                </p>
                                <ul className="space-y-3 text-gray-300">
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary mt-1">▸</span>
                                        <span><strong className="text-white">End-to-End Ownership:</strong> From initial wireframes to production deployment, I manage the complete development lifecycle with precision.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary mt-1">▸</span>
                                        <span><strong className="text-white">Business-Driven Solutions:</strong> Every technical decision is aligned with your business objectives and user needs.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary mt-1">▸</span>
                                        <span><strong className="text-white">Specialized Expertise:</strong> Deep experience in health & wellness apps, e-commerce platforms, and real-time communication systems.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary mt-1">▸</span>
                                        <span><strong className="text-white">Quality at Speed:</strong> Delivering polished, high-performing applications quickly without compromising on code quality or user experience.</span>
                                    </li>
                                </ul>
                            </div>

                            {/* CTA */}
                            <div className="text-center pt-4">
                                <p className="text-xl text-gray-300 mb-6">
                                    Ready to transform your mobile app vision into reality?
                                </p>
                                <Link
                                    href="#projects"
                                    className="inline-block px-8 py-3 rounded-full bg-primary text-black font-bold hover:bg-primary/90 transition-all duration-300 shadow-[0_0_20px_rgba(204,255,0,0.3)] hover:shadow-[0_0_30px_rgba(204,255,0,0.5)]"
                                >
                                    VIEW MY WORK
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Skills Section */}
            <section id="skills" className="py-24 bg-black/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        transition={{ duration: 0.5 }}
                        className="text-center"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary uppercase tracking-widest">My Tech Stack</h2>
                        <p className="text-gray-400 mb-16 max-w-2xl mx-auto">The tools and technologies I use to build world-class mobile applications</p>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                            {skills.map((skill, index) => {
                                const IconComponent = getIconComponent(skill.icon);
                                return (
                                    <motion.div
                                        key={skill.id || skill.name}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.05 }}
                                        className="group relative bg-gradient-to-br from-card/60 to-card/40 border border-white/10 p-6 rounded-2xl flex flex-col items-center justify-center gap-4 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(204,255,0,0.15)] transition-all duration-300 cursor-pointer"
                                    >
                                        {/* App Icon Style Background */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

                                        {/* Icon */}
                                        <div className="relative w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                            {IconComponent ? (
                                                <IconComponent className="w-7 h-7 text-primary group-hover:text-primary transition-colors" />
                                            ) : (
                                                <Code className="w-7 h-7 text-primary group-hover:text-primary transition-colors" />
                                            )}
                                        </div>

                                        {/* Skill Name */}
                                        <span className="relative text-sm font-semibold text-gray-300 group-hover:text-white text-center leading-tight transition-colors">
                                            {skill.name}
                                        </span>

                                        {/* Subtle Badge */}
                                        <div className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Experience Stats */}
                        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="bg-gradient-to-br from-primary/10 to-primary/5 p-8 rounded-2xl border border-primary/20 backdrop-blur-sm"
                            >
                                <div className="text-5xl font-bold text-primary mb-2">4+</div>
                                <div className="text-lg text-gray-300">Years Experience</div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                                className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 p-8 rounded-2xl border border-blue-500/20 backdrop-blur-sm"
                            >
                                <div className="text-5xl font-bold text-blue-400 mb-2">15+</div>
                                <div className="text-lg text-gray-300">Technologies</div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 }}
                                className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 p-8 rounded-2xl border border-purple-500/20 backdrop-blur-sm"
                            >
                                <div className="text-5xl font-bold text-purple-400 mb-2">100%</div>
                                <div className="text-lg text-gray-300">Client Satisfaction</div>
                            </motion.div>
                        </div>

                        {/* CV Download */}
                        <div className="mt-16">
                            <Link
                                href="/cv"
                                className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-gradient-to-r from-primary to-primary/80 text-black font-bold hover:shadow-[0_0_40px_rgba(204,255,0,0.4)] transition-all duration-300 text-lg uppercase tracking-wider"
                            >
                                <Download className="w-5 h-5" />
                                Download My CV
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-widest leading-tight">
                            The Works <br />
                            <span className="text-primary">Closest To My Heart</span>
                        </h2>
                    </motion.div>

                    {projects.length === 0 ? (
                        <div className="text-center py-20 border border-dashed border-white/10 rounded-2xl bg-card/20">
                            <p className="text-gray-400">Projects are being added. Check back soon!</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {projects.map((project: any) => (
                                <div key={project.id} className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-muted">
                                    {project.imageUrl ? (
                                        <Image
                                            src={project.imageUrl}
                                            alt={project.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-card">
                                            <span className="text-muted-foreground">No Image</span>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                        <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                                        <p className="text-sm text-gray-300 line-clamp-2 mb-4">{project.description}</p>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {project.technologies.slice(0, 3).map((t: string) => (
                                                <span key={t} className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">{t}</span>
                                            ))}
                                        </div>
                                        {project.githubLink && (
                                            <a
                                                href={project.githubLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <Github className="w-4 h-4" />
                                                View on GitHub
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="mt-12 text-center">
                        <Link
                            href="/projects"
                            className="px-8 py-3 rounded-full bg-primary text-black font-bold hover:bg-primary/90 transition-all duration-300"
                        >
                            SHOW ALL PROJECTS
                        </Link>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-24 bg-white text-black relative">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 uppercase tracking-widest">Let&apos;s Have A Chat</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Have a project in mind or just want to say hi? I&apos;m always open to discussing new projects, creative ideas or opportunities to be part of your visions.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-start">
                        {/* Contact Info */}
                        <div className="space-y-8">
                            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 shadow-lg">
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <span className="w-2 h-8 bg-primary rounded-full"></span>
                                    Connect With Me
                                </h3>

                                <div className="flex flex-wrap gap-6 justify-center sm:justify-start">
                                    <motion.a
                                        href="https://t.me/Adoni_2112"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white to-gray-50 border border-gray-200 flex items-center justify-center shadow-lg hover:shadow-blue-400/30 hover:border-blue-400 transition-all duration-300 group relative overflow-hidden"
                                        aria-label="Telegram"
                                    >
                                        <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        <Send className="w-7 h-7 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
                                    </motion.a>

                                    <motion.a
                                        href="mailto:adoniassahilehibeste12@gmail.com"
                                        whileHover={{ scale: 1.1, rotate: -5 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white to-gray-50 border border-gray-200 flex items-center justify-center shadow-lg hover:shadow-red-400/30 hover:border-red-400 transition-all duration-300 group relative overflow-hidden"
                                        aria-label="Email"
                                    >
                                        <div className="absolute inset-0 bg-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        <Mail className="w-7 h-7 text-gray-400 group-hover:text-red-500 transition-colors duration-300" />
                                    </motion.a>

                                    <motion.a
                                        href="https://www.linkedin.com/in/adonias-hibeste"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white to-gray-50 border border-gray-200 flex items-center justify-center shadow-lg hover:shadow-blue-700/30 hover:border-blue-700 transition-all duration-300 group relative overflow-hidden"
                                        aria-label="LinkedIn"
                                    >
                                        <div className="absolute inset-0 bg-blue-700/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        <Linkedin className="w-7 h-7 text-gray-400 group-hover:text-blue-700 transition-colors duration-300" />
                                    </motion.a>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-gray-900 p-8 rounded-3xl shadow-2xl text-white">
                            <h3 className="text-xl font-bold mb-6 text-white">Send Me a Message</h3>
                            <form className="space-y-6">
                                <input type="text" placeholder="YOUR NAME" className="w-full bg-gray-800 border-none rounded-xl px-6 py-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-primary transition-all" />
                                <input type="email" placeholder="EMAIL ADDRESS" className="w-full bg-gray-800 border-none rounded-xl px-6 py-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-primary transition-all" />
                                <textarea placeholder="HOW CAN I HELP YOU?" rows={4} className="w-full bg-gray-800 border-none rounded-xl px-6 py-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-primary resize-none transition-all"></textarea>

                                <button type="submit" className="w-full py-4 rounded-xl bg-primary text-black font-bold hover:bg-primary/90 transition-all duration-300 uppercase tracking-widest text-lg shadow-[0_0_20px_rgba(204,255,0,0.3)] hover:shadow-[0_0_30px_rgba(204,255,0,0.5)]">
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

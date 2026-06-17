"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Star, ShieldCheck, Sparkles } from "lucide-react";
import Image from "next/image";

export function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center justify-center pt-28 pb-20 overflow-hidden bg-background">
            {/* Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
            
            {/* Ambient Glows */}
            <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10 opacity-60" />
            <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] -z-10 opacity-40" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                <div className="grid lg:grid-cols-12 gap-16 items-center">
                    
                    {/* Left Column: Text & CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="lg:col-span-7 text-left flex flex-col justify-center"
                    >
                        {/* Tagline Badge */}
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-8 self-start hover:bg-primary/25 transition-all duration-300">
                            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                            <span className="text-primary text-xs font-mono tracking-wider uppercase font-semibold">Full-Stack Mobile & AI Engineer</span>
                        </div>
                        
                        {/* Catchy Headline */}
                        <h1 className="text-4xl sm:text-5xl md:text-7xl font-space font-bold tracking-tight mb-6 text-white leading-[1.1]">
                            I engineer apps <br />
                            across <span className="text-primary italic relative">every</span> platform.
                        </h1>
                        
                        {/* Sub-headline */}
                        <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-xl font-sans leading-relaxed">
                            Specializing in high-performance <span className="text-white font-medium">Flutter</span>, <span className="text-white font-medium">React Native</span>, <span className="text-white font-medium">Swift</span>, <span className="text-white font-medium">Kotlin</span>, and <span className="text-white font-medium">Web</span> platforms. Deeply integrating <span className="text-white font-medium">Generative AI</span> to deliver premium user experiences and bulletproof backend integrations.
                        </p>

                        {/* Social Proof Stats Grid */}
                        <div className="grid grid-cols-3 gap-6 py-6 border-y border-white/5 mb-10 max-w-xl">
                            <div>
                                <div className="text-2xl sm:text-3xl font-space font-bold text-white flex items-center gap-1">
                                    5.0<Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                                </div>
                                <div className="text-xs text-gray-500 font-mono mt-1">UPWORK RATING</div>
                            </div>
                            <div>
                                <div className="text-2xl sm:text-3xl font-space font-bold text-white">25+</div>
                                <div className="text-xs text-gray-500 font-mono mt-1">APPS SHIPPED</div>
                            </div>
                            <div>
                                <div className="text-2xl sm:text-3xl font-space font-bold text-white flex items-center gap-1.5">
                                    100%<ShieldCheck className="w-5 h-5 text-primary" />
                                </div>
                                <div className="text-xs text-gray-500 font-mono mt-1">SATISFACTION</div>
                            </div>
                        </div>

                        {/* Call to Actions */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1 sm:flex-none">
                                <Link
                                    href="#projects"
                                    className="group flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary text-background font-bold text-sm uppercase tracking-widest hover:bg-primary/90 transition-all duration-300 shadow-[0_0_20px_rgba(0,168,150,0.25)] hover:shadow-[0_0_30px_rgba(0,168,150,0.45)]"
                                >
                                    View My Work
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </motion.div>
                            
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1 sm:flex-none">
                                <Link
                                    href="#contact"
                                    className="flex items-center justify-center px-8 py-4 rounded-full bg-transparent border border-white/10 hover:border-white/20 text-white font-bold text-sm uppercase tracking-widest hover:bg-white/5 transition-all duration-300"
                                >
                                    Let's Talk
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Right Column: Three Phones Fully Visible Side-by-Side */}
                    <div className="lg:col-span-5 relative h-[520px] sm:h-[620px] w-full flex items-center justify-center">
                        {/* Ambient background glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/8 rounded-full blur-[120px] pointer-events-none" />

                        <div className="flex items-end justify-center gap-2 sm:gap-6 w-full [perspective:1200px]">
                            {/* Velo — Left, tilted, slightly lower */}
                            <motion.div
                                initial={{ opacity: 0, y: 60, rotateY: 20 }}
                                animate={{ opacity: 1, y: 0, rotateY: 8 }}
                                transition={{ duration: 0.9, ease: "easeOut", delay: 0 }}
                                className="flex flex-col items-center gap-3 [transform-style:preserve-3d]"
                            >
                                <Link href="/projects/velo-wallet" className="group block">
                                    <motion.div
                                        animate={{ y: [-6, 6, -6] }}
                                        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                                        whileHover={{ 
                                            scale: 1.06, rotateY: 0, y: -10,
                                            boxShadow: "0 30px 60px rgba(0, 168, 150, 0.35)"
                                        }}
                                        className="relative w-[95px] sm:w-[155px] aspect-[9/19.5] overflow-hidden rounded-[1.2rem] sm:rounded-[1.8rem] border border-white/10 hover:border-emerald-500/30 bg-gray-900 shadow-[0_20px_50px_rgba(0,0,0,0.5)] cursor-pointer transition-all duration-300 mb-4"
                                    >
                                        <div className="absolute -inset-8 bg-emerald-500/15 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                        <div className="relative w-full h-full">
                                            <Image 
                                                src="/projects/velo/velo_dashboard_dark.png" 
                                                alt="Velo Digital Wallet"
                                                fill
                                                className="object-cover"
                                                priority
                                            />
                                        </div>
                                    </motion.div>
                                </Link>
                                <div className="text-center">
                                    <p className="text-white text-xs font-space font-bold tracking-wide">Velo</p>
                                    <p className="text-[10px] text-gray-500 font-mono">Digital Wallet</p>
                                </div>
                            </motion.div>

                            {/* Doulado — Center, larger, elevated */}
                            <motion.div
                                initial={{ opacity: 0, y: 80, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
                                className="flex flex-col items-center gap-3 -mt-10 [transform-style:preserve-3d]"
                            >
                                <Link href="/projects/doulado" className="group block">
                                    <motion.div
                                        animate={{ y: [-10, 10, -10] }}
                                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                                        whileHover={{ 
                                            scale: 1.06, y: -14,
                                            boxShadow: "0 35px 70px rgba(59, 130, 246, 0.45)"
                                        }}
                                        className="relative w-[115px] sm:w-[175px] aspect-[9/19.5] overflow-hidden rounded-[1.4rem] sm:rounded-[2rem] border-2 border-white/15 hover:border-blue-500/40 bg-gray-900 shadow-[0_25px_60px_rgba(0,168,150,0.2)] cursor-pointer transition-all duration-300"
                                    >
                                        <div className="absolute -inset-8 bg-blue-500/15 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                        <div className="relative w-full h-full">
                                            <Image 
                                                src="/projects/doulado/doulado_dashboard.jpg" 
                                                alt="Doulado Dashboard"
                                                fill
                                                className="object-cover"
                                                priority
                                            />
                                        </div>
                                    </motion.div>
                                </Link>
                                <div className="text-center">
                                    <p className="text-white text-xs font-space font-bold tracking-wide">Doulado</p>
                                    <p className="text-[10px] text-gray-500 font-mono">Practice Management</p>
                                </div>
                            </motion.div>

                            {/* Bite — Right, tilted opposite, slightly lower */}
                            <motion.div
                                initial={{ opacity: 0, y: 60, rotateY: -20 }}
                                animate={{ opacity: 1, y: 0, rotateY: -8 }}
                                transition={{ duration: 0.9, ease: "easeOut", delay: 0.3 }}
                                className="flex flex-col items-center gap-3 [transform-style:preserve-3d]"
                            >
                                <Link href="/projects/bite" className="group block">
                                    <motion.div
                                        animate={{ y: [-5, 8, -5] }}
                                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                        whileHover={{ 
                                            scale: 1.06, rotateY: 0, y: -10,
                                            boxShadow: "0 30px 60px rgba(245, 158, 11, 0.35)"
                                        }}
                                        className="relative w-[95px] sm:w-[155px] aspect-[9/19.5] overflow-hidden rounded-[1.2rem] sm:rounded-[1.8rem] border border-white/10 hover:border-amber-500/30 bg-gray-900 shadow-[0_20px_50px_rgba(0,0,0,0.5)] cursor-pointer transition-all duration-300 mb-4"
                                    >
                                        <div className="absolute -inset-8 bg-amber-500/15 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                        <div className="relative w-full h-full">
                                            <Image 
                                                src="/projects/bite/bite_eats_home.png" 
                                                alt="Bite Food Delivery"
                                                fill
                                                className="object-cover"
                                                priority
                                            />
                                        </div>
                                    </motion.div>
                                </Link>
                                <div className="text-center">
                                    <p className="text-white text-xs font-space font-bold tracking-wide">Bite</p>
                                    <p className="text-[10px] text-gray-500 font-mono">Food Delivery</p>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

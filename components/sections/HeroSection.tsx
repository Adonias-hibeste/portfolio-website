"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Code2, Smartphone, Terminal } from "lucide-react";
import { TypewriterText } from "@/components/TypewriterText";

export function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-background">
            {/* Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
            
            {/* Ambient Glows */}
            <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] bg-primary/10 rounded-full blur-[120px] -z-10 opacity-40" />
            <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] bg-secondary/10 rounded-full blur-[100px] -z-10 opacity-30" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
                    
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-left"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 mb-6">
                            <span className="text-secondary text-sm font-mono tracking-wider uppercase">Senior Mobile Architect</span>
                        </div>
                        
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-space font-bold tracking-tighter mb-6 text-white leading-[1.1]">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Building</span> <br />
                            <span className="text-primary inline-block">
                                <TypewriterText
                                    sequence={[
                                        'World-Class',
                                        2000,
                                        'High-Performance',
                                        2000,
                                        'Native-Feel',
                                        2000,
                                    ]}
                                    className="text-primary"
                                />
                            </span>
                            <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Mobile Apps.</span>
                        </h1>
                        
                        <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-lg font-sans leading-relaxed">
                            I engineer scalable, beautifully animated applications in <span className="text-white font-medium">Flutter</span>, <span className="text-white font-medium">React Native</span>, and <span className="text-white font-medium">Swift</span>. From enterprise systems to consumer products.
                        </p>

                        <div className="flex flex-col sm:flex-row items-start gap-4">
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <Link
                                    href="#projects"
                                    className="group flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary text-background font-bold text-sm uppercase tracking-widest hover:bg-primary/90 transition-all duration-300 shadow-[0_0_20px_rgba(0,168,150,0.3)] hover:shadow-[0_0_30px_rgba(0,168,150,0.5)]"
                                >
                                    View My Work
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </motion.div>
                            
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <Link
                                    href="#contact"
                                    className="flex items-center justify-center px-8 py-4 rounded-full bg-transparent border-2 border-white/10 text-white font-bold text-sm uppercase tracking-widest hover:bg-white/5 hover:border-white/20 transition-all duration-300"
                                >
                                    Let's Talk
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Visual/Mockup Content */}
                    <div className="relative lg:h-[600px] w-full flex items-center justify-center perspective-1000">
                        {/* Floating Tech Badges */}
                        <motion.div 
                            animate={{ y: [-10, 10, -10], rotate: [-2, 2, -2] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-10 left-10 p-4 rounded-2xl bg-card border border-white/10 backdrop-blur-md shadow-2xl z-20 flex items-center gap-3"
                        >
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                <Smartphone size={20} />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-white">Flutter & Swift</p>
                                <p className="text-xs text-gray-400 font-mono">Native Performance</p>
                            </div>
                        </motion.div>

                        <motion.div 
                            animate={{ y: [10, -10, 10], rotate: [2, -2, 2] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute bottom-20 right-0 p-4 rounded-2xl bg-card border border-white/10 backdrop-blur-md shadow-2xl z-20 flex items-center gap-3"
                        >
                            <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                                <Code2 size={20} />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-white">Clean Arch</p>
                                <p className="text-xs text-gray-400 font-mono">Scalable Systems</p>
                            </div>
                        </motion.div>

                        {/* Central Visual (Abstract shapes/Mockup placeholder) */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
                            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="relative w-full max-w-[400px] aspect-[4/5] rounded-[2.5rem] bg-gradient-to-br from-card to-background border border-white/10 shadow-[0_0_60px_rgba(0,168,150,0.15)] overflow-hidden flex flex-col"
                        >
                            <div className="h-12 border-b border-white/5 flex items-center px-6 gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                <div className="w-3 h-3 rounded-full bg-green-500/50" />
                            </div>
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="flex items-center gap-2 text-primary mb-6">
                                    <Terminal size={20} />
                                    <span className="font-mono text-sm">~/projects/mobile</span>
                                </div>
                                <div className="space-y-4 font-mono text-sm text-gray-400">
                                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}><span className="text-secondary">const</span> developer = new <span className="text-primary">Adonias</span>();</motion.p>
                                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>developer.compile();</motion.p>
                                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.0 }} className="text-green-400">✓ Build successful in 0.8s</motion.p>
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }} className="w-full h-[1px] bg-white/10 my-4" />
                                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.0 }} className="text-white">Deploying to App Store...</motion.p>
                                    <motion.div 
                                        initial={{ width: 0 }} 
                                        animate={{ width: "100%" }} 
                                        transition={{ delay: 3.5, duration: 1 }}
                                        className="h-1 bg-primary rounded-full mt-2"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}

"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";

const navItems = [
    { name: "Work", href: "/#projects" },
    { name: "About", href: "/#about" },
    { name: "Testimonials", href: "/#testimonials" },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeTab, setActiveTab] = useState("");
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-[60]"
                style={{ scaleX }}
            />
            
            <nav className={`fixed top-4 md:top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-5xl z-50 transition-all duration-500 rounded-full ${scrolled ? 'bg-background/70 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.6)] py-3' : 'bg-background/40 backdrop-blur-lg border border-white/5 py-4'}`}>
                <div className="px-4 sm:px-6">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <Link href="/" className="font-space text-xl md:text-2xl font-bold tracking-tighter text-white flex items-center gap-1 group">
                                Adonias<span className="text-primary transition-transform duration-300 group-hover:scale-125">.</span>
                            </Link>
                        </div>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center space-x-1 absolute left-1/2 -translate-x-1/2">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onMouseEnter={() => setActiveTab(item.name)}
                                    onMouseLeave={() => setActiveTab("")}
                                    className="relative px-4 py-2 rounded-full font-mono text-xs uppercase tracking-widest text-gray-300 hover:text-white transition-colors duration-300"
                                >
                                    {activeTab === item.name && (
                                        <motion.div
                                            layoutId="nav-pill"
                                            className="absolute inset-0 bg-white/10 rounded-full"
                                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                        />
                                    )}
                                    <span className="relative z-10">{item.name}</span>
                                </Link>
                            ))}
                        </div>

                        {/* Availability Badge (Desktop) */}
                        <div className="hidden md:flex items-center">
                            <Link href="/#contact">
                                <div className="group flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 hover:border-primary/60 hover:bg-primary/20 transition-all duration-300 shadow-[0_0_15px_rgba(0,168,150,0.15)] hover:shadow-[0_0_25px_rgba(0,168,150,0.3)] cursor-pointer">
                                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(0,168,150,0.8)]" />
                                    <span className="text-xs font-mono text-primary group-hover:text-white transition-colors">Available for new projects</span>
                                </div>
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/5 focus:outline-none transition-colors"
                            >
                                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="md:hidden fixed top-24 left-1/2 -translate-x-1/2 w-[95%] z-40 bg-background/80 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
                    >
                        <div className="px-6 py-8 flex flex-col space-y-6">
                            {/* Mobile Availability */}
                            <Link href="/#contact" onClick={() => setIsOpen(false)}>
                                <div className="flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-primary/10 border border-primary/30 shadow-[0_0_15px_rgba(0,168,150,0.15)]">
                                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(0,168,150,0.8)]" />
                                    <span className="text-xs font-mono text-primary">Available for work</span>
                                </div>
                            </Link>

                            <div className="flex flex-col space-y-4 text-center mt-4">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="text-lg font-space font-medium text-gray-300 hover:text-primary transition-colors py-2"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

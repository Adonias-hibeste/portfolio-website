"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";

const navItems = [
    { name: "Services", href: "/#services" },
    { name: "Work", href: "/#projects" },
    { name: "Process", href: "/#process" },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
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
            <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <Link href="/" className="font-space text-2xl font-bold tracking-tighter text-white flex items-center gap-1 group">
                                Adonias<span className="text-primary transition-transform duration-300 group-hover:scale-125">.</span>
                            </Link>
                        </div>

                        {/* Availability Badge (Desktop) */}
                        <div className="hidden lg:flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            <span className="text-xs font-mono text-primary/90">Available for new projects</span>
                        </div>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center space-x-8">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="font-mono text-xs text-gray-400 hover:text-white transition-colors duration-300 uppercase tracking-widest relative group"
                                >
                                    {item.name}
                                    <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                            ))}
                            <Link
                                href="/#contact"
                                className="px-6 py-2.5 rounded-full bg-primary text-background font-bold text-sm hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all duration-300"
                            >
                                Let's Talk
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/5 focus:outline-none transition-colors"
                            >
                                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                            className="md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-xl border-b border-white/5"
                        >
                            <div className="px-4 py-6 flex flex-col space-y-6">
                                {/* Mobile Availability */}
                                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 self-start">
                                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                    <span className="text-xs font-mono text-primary/90">Available for work</span>
                                </div>

                                <div className="flex flex-col space-y-4">
                                    {navItems.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className="text-lg font-space font-medium text-gray-300 hover:text-primary transition-colors"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                                <Link
                                    href="/#contact"
                                    className="w-full text-center px-6 py-4 rounded-full bg-primary text-background font-bold hover:bg-primary/90 transition-colors mt-4"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Start a Project
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </>
    );
}

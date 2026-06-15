import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-background border-t border-white/5 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Full-width CTA Banner */}
                <div className="border-b border-white/5 pb-16 mb-16 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
                    <div>
                        <h3 className="text-2xl md:text-3xl font-space font-bold text-white mb-3">
                            Ready to build something extraordinary?
                        </h3>
                        <p className="text-gray-400 max-w-lg font-sans text-base">
                            Let's talk about engineering a premium, high-performance application for your business.
                        </p>
                    </div>
                    <Link
                        href="#contact"
                        className="group flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-primary text-background font-bold text-sm uppercase tracking-widest hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_20px_rgba(0,168,150,0.2)]"
                    >
                        Start a Project
                    </Link>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div>
                        <Link href="/" className="font-space text-2xl font-bold tracking-tighter text-white flex items-center gap-1">
                            Adonias<span className="text-primary">.</span>
                        </Link>
                        <p className="text-sm text-gray-500 font-mono mt-2">
                            Addis Ababa, Ethiopia · {new Date().getFullYear()}
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 mt-4 md:mt-0">
                        <Link href="#about" className="text-sm font-mono text-gray-400 hover:text-white transition-colors">
                            About
                        </Link>
                        <Link href="#projects" className="text-sm font-mono text-gray-400 hover:text-white transition-colors">
                            Work
                        </Link>
                        <a href="https://github.com/Adonias-hibeste" target="_blank" rel="noreferrer" className="text-sm font-mono text-gray-400 hover:text-white transition-colors flex items-center gap-1">
                            GitHub <ArrowUpRight className="w-3 h-3" />
                        </a>
                        <a href="https://www.linkedin.com/in/adonias-hibeste" target="_blank" rel="noreferrer" className="text-sm font-mono text-gray-400 hover:text-white transition-colors flex items-center gap-1">
                            LinkedIn <ArrowUpRight className="w-3 h-3" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

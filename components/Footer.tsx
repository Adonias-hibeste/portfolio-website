import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-background border-t border-white/5 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div>
                        <Link href="/" className="font-space text-2xl font-bold tracking-tighter text-white flex items-center gap-1">
                            Adonias<span className="text-primary">.</span>
                        </Link>
                        <p className="text-sm text-gray-500 font-mono mt-2">
                            Addis Ababa, Ethiopia · {new Date().getFullYear()}
                        </p>
                    </div>

                    <div className="flex gap-8">
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

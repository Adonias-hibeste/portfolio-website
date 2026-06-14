"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  ArrowRight,
  Layers,
  Smartphone,
  Globe,
} from "lucide-react";
import { useRouter } from "next/navigation";
/* ─────────────────────────────────────────────
   Project Data Interface
   ───────────────────────────────────────────── */
export interface ProjectData {
  id: string;
  title: string;
  type: string;
  category?: "mobile" | "web";
  tagline: string;
  desc: string;
  features?: string[];
  stack: string[];
  architecture?: string;
  screenshots?: { src: string; label: string }[];
  imageUrl?: string;
  liveLink?: string;
  repoLink?: string;
  githubLink?: string;
  isEnterprise?: boolean;
  order?: number;
}

/* ─────────────────────────────────────────────
   Main Exported Component
   ───────────────────────────────────────────── */
type Category = "all" | "mobile" | "web" | "flutter" | "react-native" | "swift" | "kotlin";

interface ProjectShowcaseProps {
  projects?: ProjectData[];
  showFilters?: boolean;
}

export function ClientProjectShowcase({ projects = [], showFilters = true }: ProjectShowcaseProps) {
  const [filter, setFilter] = useState<Category>("all");
  const router = useRouter();

  const filtered =
    filter === "all"
      ? projects
      : filter === "flutter"
      ? projects.filter((p) => p.stack.some(s => s.toLowerCase().includes("flutter")))
      : filter === "react-native"
      ? projects.filter((p) => p.stack.some(s => s.toLowerCase().includes("react native")))
      : filter === "swift"
      ? projects.filter((p) => p.stack.some(s => s.toLowerCase().includes("swift")))
      : filter === "kotlin"
      ? projects.filter((p) => p.stack.some(s => s.toLowerCase().includes("kotlin") || s.toLowerCase().includes("jetpack compose")))
      : projects.filter((p) => p.category === filter);

  const filters: { key: Category; label: string; icon: React.ReactNode }[] = [
    { key: "all", label: "All", icon: <Layers className="w-4 h-4" /> },
    { key: "flutter", label: "Flutter", icon: <Smartphone className="w-4 h-4" /> },
    { key: "react-native", label: "React Native", icon: <Smartphone className="w-4 h-4" /> },
    { key: "swift", label: "Swift / iOS", icon: <Smartphone className="w-4 h-4" /> },
    { key: "kotlin", label: "Kotlin / Android", icon: <Smartphone className="w-4 h-4" /> },
    { key: "web", label: "Web", icon: <Globe className="w-4 h-4" /> },
  ];

  return (
    <>
      {/* Filters */}
      {showFilters && (
        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          {filters.map(({ key, label, icon }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
                filter === key
                  ? "bg-primary text-background shadow-[0_0_20px_rgba(0,168,150,0.4)]"
                  : "bg-card border border-white/10 text-gray-400 hover:text-white hover:border-white/20"
              }`}
            >
              {icon}
              {label}
            </button>
          ))}
        </div>
      )}

      {/* Project Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.article
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => router.push(`/projects/${project.id}`)}
              className="group flex flex-col h-full cursor-pointer rounded-[2rem] overflow-hidden bg-card border border-white/5 hover:border-white/20 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,168,150,0.15)] relative"
            >
              {/* Preview */}
              <div className="relative overflow-hidden bg-background aspect-[4/3] w-full flex items-center justify-center">
                {(project.screenshots?.[0]?.src || project.imageUrl) ? (
                  project.category === "mobile" ? (
                    <div className="absolute inset-0 flex items-center justify-center p-3 bg-gradient-to-b from-card/30 to-background/50">
                      <div className="relative aspect-[9/18.5] h-full rounded-[1.75rem] ring-4 ring-white/10 overflow-hidden bg-background shadow-2xl transition-transform duration-700 group-hover:scale-[1.03]">
                        <Image
                          src={project.screenshots?.[0]?.src || project.imageUrl || ""}
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  ) : (
                    <Image
                      src={project.screenshots?.[0]?.src || project.imageUrl || ""}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-600 bg-background">
                    No Preview
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-100 pointer-events-none" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-primary/5 transition-colors duration-300 flex items-center justify-center backdrop-blur-[1px] opacity-0 group-hover:opacity-100">
                  <span className="px-6 py-3 rounded-full bg-primary text-background font-bold text-sm flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    View Case Study <ArrowRight className="w-4 h-4" />
                  </span>
                </div>

                {/* Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className={`text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-background/85 backdrop-blur-md border ${
                    project.isEnterprise 
                      ? "border-amber-500/30 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.15)]" 
                      : "border-primary/20 text-primary"
                  }`}>
                    {project.isEnterprise ? "Enterprise" : "Passion"}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-6 flex-1 flex flex-col bg-card">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-[2px] text-secondary">
                    {project.category === 'mobile' ? 'Mobile App' : 'Web App'}
                  </span>
                  {project.isEnterprise && (
                    <span className="text-[10px] text-amber-500/80 font-mono flex items-center gap-1 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                      <Lock className="w-3 h-3" /> Proprietary Code / NDA
                    </span>
                  )}
                </div>
                <h3 className="text-2xl font-bold font-space text-white mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-400 font-sans leading-relaxed mb-6 line-clamp-2">
                  {project.tagline || project.desc}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.stack.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="text-[11px] font-mono px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                    >
                      {t}
                    </span>
                  ))}
                  {project.stack.length > 3 && (
                    <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-white/5 text-gray-400 border border-white/10">
                      +{project.stack.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}

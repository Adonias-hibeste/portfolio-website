"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Lock, Sparkles, Globe, Github, Cpu, Layers, CheckCircle2, ArrowLeft } from "lucide-react";
import { ProjectData } from "@/components/ClientProjectShowcase";

/* ─────────────────────────────────────────────
   Lightbox
   ───────────────────────────────────────────── */
function Lightbox({
  screenshots,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  screenshots: { src: string; label: string }[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
        window.removeEventListener("keydown", handler);
        document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      <div className="relative max-w-[90vw] max-h-[85vh]" onClick={(e) => e.stopPropagation()}>
        <Image
          src={screenshots[index].src}
          alt={screenshots[index].label}
          width={1200}
          height={800}
          className="max-h-[85vh] w-auto object-contain rounded-xl"
        />
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm font-medium">
        {screenshots[index].label} · {index + 1} / {screenshots.length}
      </div>
    </motion.div>
  );
}

export default function ProjectDetailClient({ project }: { project: any }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Normalize project data similarly to ClientProjectShowcase map
  const p: ProjectData = {
      id: project.id,
      title: project.title,
      type: project.isEnterprise ? "Enterprise" : "Open Source",
      category: project.title.toLowerCase().includes('app') || 
               project.technologies.some((t: string) => {
                 const low = t.toLowerCase();
                 return low.includes('flutter') || 
                        low.includes('react native') || 
                        low.includes('swift') || 
                        low.includes('kotlin') || 
                        low.includes('compose') || 
                        low.includes('android') || 
                        low.includes('ios');
               }) ? "mobile" : "web",
      tagline: project.description.split('.')[0] + '.',
      desc: project.description,
      stack: project.technologies,
      features: project.features || [],
      architecture: project.architecture,
      imageUrl: project.imageUrl,
      screenshots: (project.screenshots && project.screenshots.length > 0) 
        ? project.screenshots.map((src: string) => ({ src, label: "Screenshot" }))
        : (project.imageUrl ? [{ src: project.imageUrl, label: "Main Preview" }] : []),
      liveLink: project.liveLink,
      repoLink: project.repoLink || project.githubLink,
      isEnterprise: project.isEnterprise
  };

  const screenshots = p.screenshots || [];
  const isMobile = p.category === "mobile";

  const lightboxPrev = useCallback(() => {
    if (screenshots.length === 0) return;
    setActiveIndex((i) => (i - 1 + screenshots.length) % screenshots.length);
  }, [screenshots.length]);

  const lightboxNext = useCallback(() => {
    if (screenshots.length === 0) return;
    setActiveIndex((i) => (i + 1) % screenshots.length);
  }, [screenshots.length]);

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* ── Navigation ── */}
      <div className="fixed top-0 inset-x-0 z-50 h-20 bg-background/80 backdrop-blur-md border-b border-white/5 flex items-center px-4 md:px-8 transition-all duration-300">
        <div className="max-w-6xl mx-auto w-full flex justify-between items-center">
            <Link href="/#projects" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="font-space font-medium">Back to Projects</span>
            </Link>
            <Link href="/#contact" className="px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-background transition-all">
                Let's Talk
            </Link>
        </div>
      </div>

      {/* ── Hero Section ── */}
      <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-center gap-3 mb-6"
            >
                <span className="text-xs font-bold uppercase tracking-[3px] text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                    {p.type}
                </span>
                <span className="text-xs font-bold uppercase tracking-[3px] text-gray-400 border border-white/10 px-3 py-1 rounded-full">
                    {p.category === "mobile" ? "Mobile Application" : "Web Platform"}
                </span>
            </motion.div>
            
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight font-space"
            >
                {p.title}
            </motion.h1>
            
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto"
            >
                {p.tagline}
            </motion.p>
        </div>
      </div>

      {/* ── Main Gallery Hero ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <motion.div 
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative overflow-hidden rounded-[2rem] bg-card border border-white/5 shadow-2xl"
            style={{ height: isMobile ? "500px" : "600px" }}
        >
            <div className="absolute inset-0 opacity-30 pointer-events-none"
                style={{
                  background: "radial-gradient(circle at 50% 50%, var(--primary) 0%, transparent 70%)"
                }}
            />
            
            {isMobile ? (
                <div className="flex items-center justify-center gap-6 h-full px-8 pt-10">
                  {screenshots.slice(0, 3).map((s, i) => (
                    <div
                      key={i}
                      onClick={() => { setActiveIndex(i); setLightboxOpen(true); }}
                      className={`relative cursor-zoom-in flex-shrink-0 rounded-[24px] overflow-hidden border border-white/10 shadow-2xl transition-all duration-500 hover:-translate-y-4 hover:border-primary/40 hover:shadow-[0_20px_40px_rgba(0,168,150,0.2)] ${i === 1 ? "scale-110 z-10 border-primary/30" : "scale-95 opacity-80 z-0"}`}
                      style={{ width: "200px", height: "420px" }}
                    >
                      <Image src={s.src} alt={s.label} fill className="object-cover" />
                    </div>
                  ))}
                </div>
            ) : (
                <div
                  className="relative w-full h-full cursor-zoom-in group p-10"
                  onClick={() => { setActiveIndex(0); setLightboxOpen(true); }}
                >
                    <div className="relative w-full h-full rounded-xl overflow-hidden border border-white/10 shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]">
                        <Image
                            src={screenshots[0].src}
                            alt={screenshots[0].label}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="absolute inset-0 pointer-events-none bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <span className="px-5 py-3 bg-background/80 backdrop-blur-md rounded-full text-white text-sm font-medium border border-white/10 shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                            Click to expand gallery
                        </span>
                    </div>
                </div>
            )}
        </motion.div>
      </div>

      {/* ── Detail Content Grid ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-[2fr_1fr] gap-12 lg:gap-20">
              
              {/* Left Column: Story & Features */}
              <div className="space-y-12">
                  {project.role && (
                      <section className="p-6 rounded-2xl bg-card border border-white/5">
                          <h4 className="text-xs uppercase font-mono tracking-wider text-primary font-bold mb-2">My Engineering Role</h4>
                          <p className="text-white text-lg font-medium">{project.role}</p>
                      </section>
                  )}

                  {project.problem && (
                      <section>
                          <h3 className="text-2xl font-bold text-white mb-4 font-space uppercase tracking-widest">The Problem</h3>
                          <p className="text-gray-400 leading-relaxed text-lg whitespace-pre-wrap">
                              {project.problem}
                          </p>
                      </section>
                  )}

                  <section>
                      <h3 className="text-2xl font-bold text-white mb-4 font-space uppercase tracking-widest">The Solution</h3>
                      <p className="text-gray-400 leading-relaxed text-lg whitespace-pre-wrap">
                          {p.desc}
                      </p>
                  </section>

                  {project.outcome && (
                      <section className="p-6 rounded-2xl bg-primary/5 border border-primary/20">
                          <h3 className="text-2xl font-bold text-white mb-4 font-space uppercase tracking-widest">The Outcome</h3>
                          <p className="text-gray-300 leading-relaxed text-lg whitespace-pre-wrap font-medium">
                              {project.outcome}
                          </p>
                      </section>
                  )}

                  {p.features && p.features.length > 0 && (
                      <section>
                          <h3 className="text-2xl font-bold text-white mb-6 font-space uppercase tracking-widest">Key Features</h3>
                          <div className="space-y-4">
                              {p.features.map((f, i) => {
                                  const [title, ...rest] = f.split(":");
                                  const body = rest.join(":").trim();
                                  return (
                                      <div key={i} className="flex gap-4 p-5 rounded-2xl bg-card border border-white/5 transition-all hover:border-primary/20">
                                          <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                                              <CheckCircle2 className="w-5 h-5 text-primary" />
                                          </div>
                                          <div>
                                              {body ? (
                                                  <>
                                                      <h4 className="text-white font-bold mb-1">{title}</h4>
                                                      <p className="text-gray-400 text-sm leading-relaxed">{body}</p>
                                                  </>
                                              ) : (
                                                  <p className="text-gray-300 leading-relaxed">{f}</p>
                                              )}
                                          </div>
                                      </div>
                                  );
                              })}
                          </div>
                      </section>
                  )}
              </div>

              {/* Right Column: Meta & Tech Stack */}
              <div className="space-y-10">
                  <div className="p-8 rounded-[2rem] bg-card border border-white/5 sticky top-28">
                      <h3 className="text-sm font-bold text-white mb-6 font-space uppercase tracking-widest text-primary">Tech Stack</h3>
                      <div className="flex flex-wrap gap-2 mb-10">
                          {p.stack.map(tech => (
                              <span key={tech} className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-background border border-white/10 shadow-sm">
                                  {tech}
                              </span>
                          ))}
                      </div>

                      {p.architecture && (
                          <div className="mb-10">
                              <h3 className="text-sm font-bold text-white mb-4 font-space uppercase tracking-widest text-primary">Architecture</h3>
                              <p className="font-mono text-sm text-gray-400 leading-relaxed p-4 bg-background rounded-xl border border-white/5">
                                  {p.architecture}
                              </p>
                          </div>
                      )}

                      <div className="space-y-4 border-t border-white/5 pt-8">
                          {p.liveLink && (
                              <a href={p.liveLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full px-5 py-3.5 rounded-xl text-background font-bold text-sm uppercase tracking-wider bg-primary transition-all hover:opacity-90 shadow-[0_0_20px_rgba(0,168,150,0.2)] hover:shadow-[0_0_30px_rgba(0,168,150,0.4)]">
                                  <Globe className="w-4 h-4" /> Live Application
                              </a>
                          )}
                          {p.repoLink && !p.isEnterprise && (
                              <a href={p.repoLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full px-5 py-3.5 rounded-xl text-white font-bold text-sm uppercase tracking-wider bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                                  <Github className="w-4 h-4" /> Source Code
                              </a>
                          )}
                          {p.isEnterprise && (
                              <div className="flex items-center justify-center gap-2 text-gray-500 text-xs mt-4">
                                  <Lock className="w-3 h-3" />
                                  <span>Proprietary Enterprise Software</span>
                              </div>
                          )}
                      </div>
                  </div>
              </div>

          </div>
      </div>

      {/* ── Extended Gallery ── */}
      {screenshots.length > 1 && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
              <h3 className="text-2xl font-bold text-white mb-10 font-space uppercase tracking-widest text-center">Full Gallery</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {screenshots.map((s, i) => (
                      <div 
                          key={i} 
                          onClick={() => { setActiveIndex(i); setLightboxOpen(true); }}
                          className={`relative cursor-zoom-in rounded-2xl overflow-hidden border border-white/5 bg-card transition-all duration-300 hover:scale-105 hover:z-10 hover:border-primary/30 ${isMobile ? 'aspect-[1/2]' : 'aspect-video'}`}
                      >
                          <Image src={s.src} alt={s.label} fill className="object-cover opacity-80 hover:opacity-100 transition-opacity" />
                      </div>
                  ))}
              </div>
          </div>
      )}

      {/* ── Footer CTA ── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-32 text-center">
          <div className="p-12 rounded-[3rem] bg-gradient-to-b from-card to-background border border-white/5 relative overflow-hidden">
              <div className="absolute inset-0 opacity-20 bg-[url('/noise.png')] mix-blend-overlay pointer-events-none" />
              <Sparkles className="w-10 h-10 text-primary mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-space">Ready to build something extraordinary?</h2>
              <p className="text-gray-400 mb-8 max-w-xl mx-auto">Let's discuss how we can engineer a premium, high-performance application for your business.</p>
              <Link href="/#contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-background font-bold text-sm uppercase tracking-wider bg-primary transition-all hover:scale-105 shadow-[0_0_30px_rgba(0,168,150,0.3)]">
                  Contact Me Today <ArrowLeft className="w-4 h-4 rotate-180" />
              </Link>
          </div>
      </div>

      <AnimatePresence>
        {lightboxOpen && screenshots.length > 0 && (
          <Lightbox
            screenshots={screenshots}
            index={activeIndex}
            onClose={() => setLightboxOpen(false)}
            onPrev={lightboxPrev}
            onNext={lightboxNext}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

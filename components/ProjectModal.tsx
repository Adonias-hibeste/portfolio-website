"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Lock, Sparkles, Globe, Github } from "lucide-react";
import { ProjectData } from "./ClientProjectShowcase";

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
    return () => window.removeEventListener("keydown", handler);
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

/* ─────────────────────────────────────────────
   Project Modal (Case Study Detail)
   ───────────────────────────────────────────── */
export function ProjectModal({
  project,
  onClose,
}: {
  project: ProjectData;
  onClose: () => void;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  
  const screenshots = project.screenshots || (project.imageUrl ? [{ src: project.imageUrl, label: "Main Preview" }] : []);
  const isMobile = project.category === "mobile";

  const lightboxPrev = useCallback(() => {
    if (screenshots.length === 0) return;
    setActiveIndex((i) => (i - 1 + screenshots.length) % screenshots.length);
  }, [screenshots.length]);

  const lightboxNext = useCallback(() => {
    if (screenshots.length === 0) return;
    setActiveIndex((i) => (i + 1) % screenshots.length);
  }, [screenshots.length]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !lightboxOpen) onClose();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose, lightboxOpen]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-[#0c0c10] border border-white/10 rounded-3xl"
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all z-10"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          <div className="p-8 md:p-12">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-semibold uppercase tracking-[3px] text-primary">
                  {project.type}
                </span>
                <span className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 font-medium">
                  {project.category === "mobile" ? "Mobile App" : "Web Platform"}
                </span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
                {project.title}
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed max-w-3xl">
                {project.desc}
              </p>
            </div>

            {/* Screenshot Gallery */}
            {screenshots.length > 0 && (
              <div className="mb-10">
                <div
                  className={`relative overflow-hidden rounded-2xl bg-[#111118] border border-white/5 mb-4 cursor-pointer group ${
                    isMobile ? "max-w-[300px] mx-auto" : ""
                  }`}
                  onClick={() => setLightboxOpen(true)}
                >
                  <div className={`relative ${isMobile ? "aspect-[9/19]" : "aspect-video"}`}>
                    <Image
                      src={screenshots[activeIndex].src}
                      alt={screenshots[activeIndex].label}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-medium">
                      Click to expand
                    </span>
                  </div>
                </div>

                {/* Thumbnails */}
                {screenshots.length > 1 && (
                  <div className={`flex gap-2 overflow-x-auto pb-2 ${isMobile ? "justify-center" : ""}`}>
                    {screenshots.map((s, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveIndex(i)}
                        className={`flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                          i === activeIndex
                            ? "border-primary shadow-[0_0_12px_rgba(204,255,0,0.3)]"
                            : "border-transparent opacity-50 hover:opacity-80"
                        } ${isMobile ? "w-14 h-24" : "w-20 h-14"}`}
                      >
                        <div className="relative w-full h-full">
                          <Image src={s.src} alt={s.label} fill className="object-cover" />
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Details Grid */}
            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-[3px] text-gray-500 mb-5">
                  Highlights
                </h4>
                <div className="space-y-3">
                  {(project.features && project.features.length > 0) ? project.features.map((f, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="text-primary mt-0.5 text-sm">✦</span>
                      <span className="text-gray-300 text-sm leading-relaxed">{f}</span>
                    </div>
                  )) : (
                    <p className="text-gray-500 text-sm">Full feature list coming soon.</p>
                  )}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-[3px] text-gray-500 mb-5">
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.stack.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm font-medium text-white"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <h4 className="text-xs font-bold uppercase tracking-[3px] text-gray-500 mb-4">
                  Architecture
                </h4>
                <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-sm text-gray-300 font-mono">{project.architecture || "Modern Scalable Architecture"}</p>
                </div>
              </div>
            </div>

            {/* CTA & Links */}
            <div className="border-t border-white/10 pt-8 flex flex-col items-center gap-6">
              <div className="flex flex-wrap justify-center gap-4">
                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all text-sm font-bold uppercase tracking-wider"
                  >
                    <Globe className="w-4 h-4" /> Live Demo
                  </a>
                )}
                {(project.githubLink || project.repoLink) && (
                  <a
                    href={project.githubLink || project.repoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all text-sm font-bold uppercase tracking-wider"
                  >
                    <Github className="w-4 h-4" /> View Code
                  </a>
                )}
              </div>

              <a
                href="#contact"
                onClick={onClose}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-black font-bold hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(204,255,0,0.3)] hover:shadow-[0_0_30px_rgba(204,255,0,0.5)] text-sm uppercase tracking-wider"
              >
                <Sparkles className="w-4 h-4" />
                Start a Project Like This
              </a>
              {project.isEnterprise && (
                <div className="flex items-center justify-center gap-2 text-gray-500 text-xs">
                  <Lock className="w-3.5 h-3.5" />
                  <span>
                    Built under NDA · Architecture details available during consultation
                  </span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Lightbox */}
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
    </>
  );
}

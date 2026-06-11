"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Lock, Sparkles, Globe, Github, Cpu, Layers, CheckCircle2 } from "lucide-react";
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
   Project Modal (Premium Case Study)
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
  const [activeTab, setActiveTab] = useState<"overview" | "tech">("overview");

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
        className="fixed inset-0 z-[80] bg-black/85 backdrop-blur-lg flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.96 }}
          transition={{ type: "spring", damping: 28, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-3xl"
          style={{ background: "linear-gradient(145deg, #0f0f14 0%, #0a0a0d 100%)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all z-10"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          {/* ── Hero Screenshot Strip ── */}
          {screenshots.length > 0 && (
            <div
              className={`relative overflow-hidden rounded-t-3xl ${isMobile ? "bg-[#080810]" : "bg-[#0a0a12]"}`}
              style={{ height: isMobile ? "340px" : "320px" }}
            >
              {/* Subtle gradient mesh background */}
              <div className="absolute inset-0 opacity-30"
                style={{
                  background: "radial-gradient(ellipse at 20% 50%, rgba(204,255,0,0.06) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(100,180,255,0.04) 0%, transparent 60%)"
                }}
              />

              {isMobile ? (
                /* Mobile: show up to 3 phone frames side by side */
                <div className="flex items-center justify-center gap-4 h-full px-8 pt-6">
                  {screenshots.slice(0, 3).map((s, i) => (
                    <div
                      key={i}
                      onClick={() => { setActiveIndex(i); setLightboxOpen(true); }}
                      className={`relative cursor-zoom-in flex-shrink-0 rounded-[20px] overflow-hidden border border-white/10 shadow-2xl transition-all duration-300 hover:scale-105 hover:border-primary/40 ${i === 1 ? "scale-105 border-primary/30 shadow-[0_0_30px_rgba(204,255,0,0.12)]" : "scale-95 opacity-80"}`}
                      style={{ width: "110px", height: "240px" }}
                    >
                      <Image src={s.src} alt={s.label} fill className="object-cover" />
                    </div>
                  ))}
                  {screenshots.length > 3 && (
                    <div
                      onClick={() => { setActiveIndex(3); setLightboxOpen(true); }}
                      className="relative cursor-zoom-in flex-shrink-0 rounded-[20px] overflow-hidden border border-white/10 opacity-60 hover:opacity-90 transition-all hover:scale-105"
                      style={{ width: "90px", height: "200px" }}
                    >
                      <Image src={screenshots[3].src} alt={screenshots[3].label} fill className="object-cover" />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-white font-bold text-sm">+{screenshots.length - 3}</span>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Web: full-width screenshot */
                <div
                  className="relative w-full h-full cursor-zoom-in group"
                  onClick={() => setLightboxOpen(true)}
                >
                  <Image
                    src={screenshots[activeIndex].src}
                    alt={screenshots[activeIndex].label}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-medium">
                      Click to expand
                    </span>
                  </div>
                </div>
              )}

              {/* Gradient fade at bottom */}
              <div className="absolute bottom-0 inset-x-0 h-20 pointer-events-none"
                style={{ background: "linear-gradient(to top, #0f0f14, transparent)" }}
              />

              {/* Badge */}
              <div className="absolute top-5 left-5">
                <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full backdrop-blur-md border border-white/10 text-primary"
                  style={{ background: "rgba(0,0,0,0.6)" }}
                >
                  {project.isEnterprise ? "🔒 Enterprise" : "⚡ Open Source"}
                </span>
              </div>
            </div>
          )}

          {/* ── Thumbnail Row (mobile only when > 1 screenshot) ── */}
          {isMobile && screenshots.length > 1 && (
            <div className="flex gap-2.5 overflow-x-auto px-8 py-3 justify-center">
              {screenshots.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                    i === activeIndex
                      ? "border-primary shadow-[0_0_12px_rgba(204,255,0,0.3)] scale-105"
                      : "border-transparent opacity-40 hover:opacity-70"
                  }`}
                  style={{ width: "44px", height: "80px" }}
                >
                  <div className="relative w-full h-full">
                    <Image src={s.src} alt={s.label} fill className="object-cover" />
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* ── Main Content ── */}
          <div className="px-8 md:px-12 pb-12 pt-6">

            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[10px] font-bold uppercase tracking-[3px] text-primary/80">
                  {project.type}
                </span>
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">
                  {project.category === "mobile" ? "Mobile Application" : "Web Platform"}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                {project.title}
              </h2>
              <p className="text-gray-400 text-base leading-relaxed max-w-3xl">
                {project.desc}
              </p>
            </div>

            {/* ── Tab Bar ── */}
            <div className="flex gap-1 mb-8 p-1 rounded-xl bg-white/5 border border-white/8 w-fit">
              {(["overview", "tech"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2 rounded-lg text-sm font-semibold uppercase tracking-wider transition-all duration-200 ${
                    activeTab === tab
                      ? "bg-primary text-black shadow-[0_0_16px_rgba(204,255,0,0.2)]"
                      : "text-gray-500 hover:text-white"
                  }`}
                >
                  {tab === "overview" ? "Features" : "Tech Stack"}
                </button>
              ))}
            </div>

            {/* ── Tab Content ── */}
            <AnimatePresence mode="wait">
              {activeTab === "overview" ? (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {(project.features && project.features.length > 0) ? (
                    <div className="grid md:grid-cols-2 gap-4">
                      {project.features.map((f, i) => {
                        const [title, ...rest] = f.split(":");
                        const body = rest.join(":").trim();
                        return (
                          <div
                            key={i}
                            className="flex gap-4 p-4 rounded-2xl border border-white/5 transition-all hover:border-primary/20 hover:bg-white/2"
                            style={{ background: "rgba(255,255,255,0.02)" }}
                          >
                            <div className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center mt-0.5"
                              style={{ background: "rgba(204,255,0,0.08)", border: "1px solid rgba(204,255,0,0.15)" }}
                            >
                              <CheckCircle2 className="w-4 h-4 text-primary" />
                            </div>
                            <div>
                              {body ? (
                                <>
                                  <p className="text-white font-semibold text-sm mb-1">{title}</p>
                                  <p className="text-gray-500 text-sm leading-relaxed">{body}</p>
                                </>
                              ) : (
                                <p className="text-gray-300 text-sm leading-relaxed">{f}</p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-gray-600 text-sm">Feature details coming soon.</p>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="tech"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-8"
                >
                  {/* Stack Tags */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Layers className="w-4 h-4 text-primary" />
                      <h4 className="text-xs font-bold uppercase tracking-[3px] text-gray-400">Dependencies & Libraries</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1.5 rounded-lg text-sm font-medium text-white transition-all hover:border-primary/30"
                          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Architecture */}
                  {project.architecture && (
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <Cpu className="w-4 h-4 text-primary" />
                        <h4 className="text-xs font-bold uppercase tracking-[3px] text-gray-400">Architecture Pattern</h4>
                      </div>
                      <div className="px-5 py-4 rounded-2xl font-mono text-sm text-gray-300 leading-relaxed"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                      >
                        {project.architecture}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── CTA Row ── */}
            <div className="border-t border-white/8 pt-8 mt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap gap-3">
                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-bold uppercase tracking-wider transition-all hover:bg-white/10"
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}
                  >
                    <Globe className="w-4 h-4" /> Live Demo
                  </a>
                )}
                {(project.githubLink || project.repoLink) && (
                  <a
                    href={project.githubLink || project.repoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-bold uppercase tracking-wider transition-all hover:bg-white/10"
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}
                  >
                    <Github className="w-4 h-4" /> View Code
                  </a>
                )}
              </div>

              <a
                href="/#contact"
                onClick={onClose}
                className="flex items-center gap-2 px-7 py-3 rounded-full text-black font-bold text-sm uppercase tracking-wider transition-all hover:opacity-90"
                style={{
                  background: "linear-gradient(135deg, #ccff00, #a8d400)",
                  boxShadow: "0 0 24px rgba(204,255,0,0.3)"
                }}
              >
                <Sparkles className="w-4 h-4" />
                Build Something Like This
              </a>
            </div>

            {project.isEnterprise && (
              <div className="flex items-center justify-center gap-2 text-gray-600 text-xs mt-4">
                <Lock className="w-3.5 h-3.5" />
                <span>Built under NDA · Architecture details available during consultation</span>
              </div>
            )}
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

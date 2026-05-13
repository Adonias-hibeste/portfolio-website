"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Lock,
  Sparkles,
  ArrowRight,
  Layers,
  Smartphone,
  Globe,
} from "lucide-react";

/* ─────────────────────────────────────────────
   Client Project Data
   ───────────────────────────────────────────── */
interface ClientProject {
  id: string;
  title: string;
  type: string;
  category: "mobile" | "web";
  tagline: string;
  desc: string;
  features: string[];
  stack: string[];
  architecture: string;
  screenshots: { src: string; label: string }[];
}

const CLIENT_PROJECTS: ClientProject[] = [
  {
    id: "doulado",
    title: "Doulado",
    type: "Enterprise Client",
    category: "mobile",
    tagline: "Practice management for professional doulas",
    desc: "Enterprise-grade mobile application for professional doulas and birth workers. Manages clients, scheduling, billing/invoicing, telehealth sessions, real-time chat, clinical notes with rich text, file management, and push notifications. Built with Flutter + Riverpod + Dio with a custom REST API backend.",
    features: [
      "11 feature modules",
      "SSE real-time messaging",
      "Freezed type-safe models",
      "Telehealth WebRTC bridge",
      "Rich-text clinical notes with Quill",
      "Billing & invoicing system",
    ],
    stack: ["Flutter", "Riverpod", "Dio", "Freezed", "SSE", "Flutter Quill"],
    architecture: "Feature-first modular · 11 modules",
    screenshots: [
      { src: "/projects/doulado/dashboard.png", label: "Dashboard" },
      { src: "/projects/doulado/client_profile.png", label: "Client Profile" },
      { src: "/projects/doulado/chat.png", label: "Real-time Chat" },
      { src: "/projects/doulado/settings.png", label: "Settings" },
    ],
  },
  {
    id: "sefere-social",
    title: "Sefere Social",
    type: "Enterprise Client",
    category: "mobile",
    tagline: "Social network for the Habeshan diaspora",
    desc: "Culturally-tailored social networking platform for the Ethiopian and Habeshan diaspora. Features people discovery, events, services, real-time chat, camera with ML face detection, location-based discovery, and push notifications. Built with Flutter + Firebase + Clean Architecture.",
    features: [
      "Clean Architecture with DDD",
      "Google ML Kit face verification",
      "Firebase full suite integration",
      "Multi-language support",
      "Location-based community discovery",
    ],
    stack: ["Flutter", "Firebase Suite", "Provider", "RxDart", "Google ML Kit"],
    architecture: "Clean Architecture · Data → Domain → Presentation",
    screenshots: [
      { src: "/projects/sefere-social/swipe.png", label: "Connect" },
      { src: "/projects/sefere-social/events.png", label: "Events" },
      { src: "/projects/sefere-social/services.png", label: "Services" },
      { src: "/projects/sefere-social/network.png", label: "Network" },
      { src: "/projects/sefere-social/chat.png", label: "Chat" },
    ],
  },
  {
    id: "hababondlite",
    title: "HababBondlite Dating App",
    type: "Enterprise Client",
    category: "mobile",
    tagline: "Premium dating app for the Ethiopian community",
    desc: "Feature-rich dating app with swipe-to-match, WebRTC video calling, Google Maps discovery, ML face verification, in-app purchases, multi-auth (Google/Facebook/Apple), and push notifications with CallKit.",
    features: [
      "WebRTC real-time video calls",
      "70+ dependencies enterprise app",
      "Google Maps + Geolocator discovery",
      "In-app purchase monetization",
      "CallKit incoming call integration",
    ],
    stack: ["Flutter", "Firebase", "BLoC 9", "WebRTC", "Google Maps", "ML Kit"],
    architecture: "Feature-module · BLoC + Provider hybrid",
    screenshots: [
      { src: "/projects/hababondlite/swipe_card.png", label: "Swipe" },
      { src: "/projects/hababondlite/matches.png", label: "Matches" },
      { src: "/projects/hababondlite/account.png", label: "Account" },
      { src: "/projects/hababondlite/filters.png", label: "Filters" },
    ],
  },
  {
    id: "hababond-social",
    title: "Hababond Social",
    type: "Enterprise Client",
    category: "mobile",
    tagline: "Full-featured social media & marketplace",
    desc: "Full-featured social media app for the Ethiopian community with social feed, marketplace, real-time messaging, user search, profile management, and push notifications. Modern UI with Google Fonts and custom SVG assets.",
    features: [
      "9 feature modules",
      "Marketplace integration",
      "Modern UI with SVG assets",
      "Feature-first architecture",
      "Dark mode experience",
    ],
    stack: ["Flutter", "Google Fonts", "Flutter SVG"],
    architecture: "Feature-first modular · 9 modules",
    screenshots: [
      { src: "/projects/hababond-social/splash.png", label: "Splash" },
      { src: "/projects/hababond-social/login.png", label: "Login" },
      { src: "/projects/hababond-social/feed.png", label: "Feed" },
      { src: "/projects/hababond-social/messages.png", label: "Messages" },
      { src: "/projects/hababond-social/profile.png", label: "Profile" },
      { src: "/projects/hababond-social/settings.png", label: "Settings" },
      { src: "/projects/hababond-social/marketplace.png", label: "Marketplace" },
      { src: "/projects/hababond-social/product_detail.png", label: "Product" },
      { src: "/projects/hababond-social/item_chat.png", label: "Item Chat" },
    ],
  },
  {
    id: "sefere-web",
    title: "Sefere Web Portal",
    type: "Enterprise Client",
    category: "web",
    tagline: "Multi-role community management platform",
    desc: "Multi-role web portal for the Sefere platform with admin, organizer, professional, and advertiser dashboards. Role-based Firebase Auth, Firestore analytics, Cloud Functions, i18n support, and Vercel deployment.",
    features: [
      "Multi-role dashboard system",
      "Comprehensive Firestore security rules",
      "Firebase Cloud Functions",
      "Bilingual support (EN + AM)",
      "Vercel deployment",
    ],
    stack: ["Next.js 16", "React 19", "Firebase", "TailwindCSS 4", "Framer Motion"],
    architecture: "Next.js App Router · Firebase backend",
    screenshots: [
      { src: "/projects/sefere-web/hero_en.png", label: "Landing (EN)" },
      { src: "/projects/sefere-web/hero_am.png", label: "Landing (AM)" },
      { src: "/projects/sefere-web/discover.png", label: "Discover" },
      { src: "/projects/sefere-web/features.png", label: "Features" },
      { src: "/projects/sefere-web/portal_selection.png", label: "Portals" },
    ],
  },
  {
    id: "sefere-theme-studio",
    title: "Sefere Theme Studio",
    type: "Enterprise Client",
    category: "web",
    tagline: "Visual WYSIWYG theme editor & design system",
    desc: "Visual WYSIWYG theme editor for the Sefere platform. Allows real-time customization of colors, typography, spacing, and component styles with live preview. Exports production-ready theme tokens for mobile and web apps.",
    features: [
      "63KB ThemeEditor component",
      "Real-time WYSIWYG preview",
      "Next.js 16 + React 19 cutting-edge stack",
      "Theme export & import",
    ],
    stack: ["Next.js 16", "React 19", "TypeScript 5", "TailwindCSS 4", "Framer Motion 12"],
    architecture: "Next.js App Router · React Context state",
    screenshots: [
      { src: "/projects/sefere-theme-studio/colors.png", label: "Colors" },
      { src: "/projects/sefere-theme-studio/typography.png", label: "Typography" },
      { src: "/projects/sefere-theme-studio/layout.png", label: "Layout" },
      { src: "/projects/sefere-theme-studio/motion.png", label: "Motion" },
      { src: "/projects/sefere-theme-studio/presets.png", label: "Presets" },
    ],
  },
];

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
      className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl flex items-center justify-center"
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
function ProjectModal({
  project,
  onClose,
}: {
  project: ClientProject;
  onClose: () => void;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const isMobile = project.category === "mobile";

  const lightboxPrev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + project.screenshots.length) % project.screenshots.length);
  }, [project.screenshots.length]);

  const lightboxNext = useCallback(() => {
    setActiveIndex((i) => (i + 1) % project.screenshots.length);
  }, [project.screenshots.length]);

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
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
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
            <div className="mb-10">
              <div
                className={`relative overflow-hidden rounded-2xl bg-[#111118] border border-white/5 mb-4 cursor-pointer group ${
                  isMobile ? "max-w-[300px] mx-auto" : ""
                }`}
                onClick={() => setLightboxOpen(true)}
              >
                <div className={`relative ${isMobile ? "aspect-[9/19]" : "aspect-video"}`}>
                  <Image
                    src={project.screenshots[activeIndex].src}
                    alt={project.screenshots[activeIndex].label}
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
              <div className={`flex gap-2 overflow-x-auto pb-2 ${isMobile ? "justify-center" : ""}`}>
                {project.screenshots.map((s, i) => (
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
            </div>

            {/* Details Grid */}
            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-[3px] text-gray-500 mb-5">
                  Highlights
                </h4>
                <div className="space-y-3">
                  {project.features.map((f, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="text-primary mt-0.5 text-sm">✦</span>
                      <span className="text-gray-300 text-sm leading-relaxed">{f}</span>
                    </div>
                  ))}
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
                  <p className="text-sm text-gray-300 font-mono">{project.architecture}</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="border-t border-white/10 pt-8 text-center">
              <a
                href="#contact"
                onClick={onClose}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-black font-bold hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(204,255,0,0.3)] hover:shadow-[0_0_30px_rgba(204,255,0,0.5)] text-sm uppercase tracking-wider"
              >
                <Sparkles className="w-4 h-4" />
                Start a Project Like This
              </a>
              <div className="flex items-center justify-center gap-2 mt-4 text-gray-500 text-xs">
                <Lock className="w-3.5 h-3.5" />
                <span>
                  Built under NDA · Architecture details available during consultation
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <Lightbox
            screenshots={project.screenshots}
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

/* ─────────────────────────────────────────────
   Main Exported Component
   ───────────────────────────────────────────── */
type Category = "all" | "mobile" | "web";

export function ClientProjectShowcase() {
  const [filter, setFilter] = useState<Category>("all");
  const [selectedProject, setSelectedProject] = useState<ClientProject | null>(null);

  const filtered =
    filter === "all"
      ? CLIENT_PROJECTS
      : CLIENT_PROJECTS.filter((p) => p.category === filter);

  const filters: { key: Category; label: string; icon: React.ReactNode }[] = [
    { key: "all", label: "All", icon: <Layers className="w-4 h-4" /> },
    { key: "mobile", label: "Mobile Apps", icon: <Smartphone className="w-4 h-4" /> },
    { key: "web", label: "Web Platforms", icon: <Globe className="w-4 h-4" /> },
  ];

  return (
    <>
      {/* Filters */}
      <div className="flex justify-center gap-3 mb-10 flex-wrap">
        {filters.map(({ key, label, icon }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
              filter === key
                ? "bg-primary text-black shadow-[0_0_16px_rgba(204,255,0,0.3)]"
                : "bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/20"
            }`}
          >
            {icon}
            {label}
          </button>
        ))}
      </div>

      {/* Project Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.article
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 20, stiffness: 200 }}
              onClick={() => setSelectedProject(project)}
              className={`group cursor-pointer rounded-2xl overflow-hidden bg-gradient-to-br from-[#111118] to-[#0c0c10] border border-white/5 hover:border-primary/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] ${
                project.category === "web" ? "lg:col-span-2" : ""
              }`}
            >
              {/* Preview */}
              <div
                className={`relative overflow-hidden bg-[#0a0a0e] ${
                  project.category === "web" ? "h-72" : "h-64"
                }`}
              >
                <Image
                  src={project.screenshots[0].src}
                  alt={project.title}
                  fill
                  className={`transition-transform duration-700 group-hover:scale-105 ${
                    project.category === "mobile" ? "object-contain" : "object-cover"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111118] via-transparent to-transparent opacity-80" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                  <span className="px-5 py-2.5 rounded-full bg-primary text-black font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2">
                    View Case Study <ArrowRight className="w-4 h-4" />
                  </span>
                </div>

                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-primary">
                    Enterprise
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-semibold uppercase tracking-[2px] text-primary/80">
                    {project.type}
                  </span>
                  <span className="text-[10px] text-gray-500 flex items-center gap-1">
                    <Lock className="w-3 h-3" /> NDA
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-4 line-clamp-2">
                  {project.tagline}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="text-[11px] px-2.5 py-1 rounded-full bg-primary/10 text-primary/90 border border-primary/15 font-medium"
                    >
                      {t}
                    </span>
                  ))}
                  {project.stack.length > 4 && (
                    <span className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 text-gray-500 border border-white/5 font-medium">
                      +{project.stack.length - 4}
                    </span>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

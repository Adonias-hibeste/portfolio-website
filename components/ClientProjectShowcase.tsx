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
import { ProjectModal } from "./ProjectModal";

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
}

export const CLIENT_PROJECTS: ProjectData[] = [
  {
    id: "doulado",
    title: "Doulado",
    type: "Enterprise Client",
    category: "mobile",
    isEnterprise: true,
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
    isEnterprise: true,
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
    isEnterprise: true,
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
    isEnterprise: true,
    tagline: "Full-featured social media & marketplace",
    desc: "Full-featured social media app with social feed, marketplace, real-time messaging, user search, profile management, and push notifications. Modern UI with Google Fonts and custom SVG assets. Built for a global audience.",
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
    isEnterprise: true,
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
    isEnterprise: true,
    tagline: "Visual theme editor & design system",
    desc: "Visual theme editor for the Sefere platform. Allows real-time customization of colors, typography, spacing, and component styles with live preview. Exports production-ready theme tokens for mobile and web apps.",
    features: [
      "63KB ThemeEditor component",
      "Real-time preview",
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
   Main Exported Component
   ───────────────────────────────────────────── */
type Category = "all" | "mobile" | "web";

interface ProjectShowcaseProps {
  projects?: ProjectData[];
  showFilters?: boolean;
}

export function ClientProjectShowcase({ projects = CLIENT_PROJECTS, showFilters = true }: ProjectShowcaseProps) {
  const [filter, setFilter] = useState<Category>("all");
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  const filtered =
    filter === "all"
      ? projects
      : projects.filter((p) => p.category === filter);

  const filters: { key: Category; label: string; icon: React.ReactNode }[] = [
    { key: "all", label: "All", icon: <Layers className="w-4 h-4" /> },
    { key: "mobile", label: "Mobile Apps", icon: <Smartphone className="w-4 h-4" /> },
    { key: "web", label: "Web Platforms", icon: <Globe className="w-4 h-4" /> },
  ];

  return (
    <>
      {/* Filters */}
      {showFilters && (
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
      )}

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
                {(project.screenshots?.[0]?.src || project.imageUrl) ? (
                  <Image
                    src={project.screenshots?.[0]?.src || project.imageUrl || ""}
                    alt={project.title}
                    fill
                    className={`transition-transform duration-700 group-hover:scale-105 ${
                      project.category === "mobile" ? "object-contain" : "object-cover"
                    }`}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-600 bg-muted/20">
                    No Preview
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#111118] via-transparent to-transparent opacity-80" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                  <span className="px-5 py-2.5 rounded-full bg-primary text-black font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2">
                    View Case Study <ArrowRight className="w-4 h-4" />
                  </span>
                </div>

                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-primary">
                    {project.isEnterprise ? "Enterprise" : "Open Source"}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-semibold uppercase tracking-[2px] text-primary/80">
                    {project.type}
                  </span>
                  {project.isEnterprise && (
                    <span className="text-[10px] text-gray-500 flex items-center gap-1">
                      <Lock className="w-3 h-3" /> NDA
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-4 line-clamp-2">
                  {project.tagline || project.desc}
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

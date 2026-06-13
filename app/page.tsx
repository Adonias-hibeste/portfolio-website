import { prisma } from "@/lib/prisma";
import HomeContent from "./HomeContent";

export const dynamic = "force-dynamic";

export default async function Home() {
  let projects: any[] = [];
  let skills: any[] = [];

  const showcaseProjects = [
    {
      id: "fare",
      title: "Fare",
      description: "A Pro-Max tier ride-hailing application featuring a real interactive OpenStreetMap integration via flutter_map, realistic simulated driver movement, dynamic pricing AI insights, and a highly polished dark-themed user profile with a digital wallet interface.",
      technologies: ["Flutter 3.x", "Dart", "flutter_map", "flutter_animate", "latlong2"],
      repoLink: "https://github.com/Adonias-hibeste/fare-app",
      imageUrl: "/projects/fare/fare_discover.png",
      screenshots: [
        "/projects/fare/fare_discover.png",
        "/projects/fare/fare_activity.png",
        "/projects/fare/fare_profile.png"
      ],
      order: -2
    },
    {
      id: "ambient",
      title: "Ambient",
      description: "A Pro-Max tier Smart Home IoT and Automation dashboard application built with native Android and Kotlin. Features advanced Glassmorphism UI, interactive compose canvas components, custom thermostats, micro-animations and energy monitoring layout.",
      imageUrl: "/projects/ambient/ambient_dashboard_ui.png",
      technologies: ["Kotlin", "Jetpack Compose", "Android", "Coroutines Flow"],
      githubUrl: "https://github.com/Adonias-hibeste/ambient-smart-home"
    },
    {
      id: "candle",
      title: "Candle",
      description: "A highly sophisticated, Pro-Max tier cryptocurrency portfolio tracker and AI advisor application built with native Android and Kotlin. Designed to compete with top exchanges on visual aesthetics, featuring micro-animations, true glassmorphism, glowing borders, and a high-density data layout. Integrated AI Advisor provides personalized portfolio rebalancing suggestions.",
      technologies: ["Kotlin", "Jetpack Compose", "Material 3", "Coroutines Flow", "Android SDK"],
      repoLink: "https://github.com/Adonias-hibeste/candle-crypto",
      imageUrl: "/projects/candle/dashboard.png",
      screenshots: [
        "/projects/candle/dashboard.png",
        "/projects/candle/markets.png",
        "/projects/candle/asset_detail.png",
        "/projects/candle/ai_advisor.png",
        "/projects/candle/profile.png"
      ],
      order: 0
    },
    {
      id: "vpn-app",
      title: "Secure VPN",
      description: "A premium, high-performance VPN application featuring a minimalist dark-theme UI, one-tap secure connectivity, and real-time speed monitoring. Built with Flutter and Riverpod.",
      technologies: ["Flutter", "Riverpod", "Lucide Icons", "Secure VPN"],
      repoLink: "https://github.com/Adonias-hibeste/Vpn-app",
      imageUrl: "/projects/vpn.png",
      screenshots: ["/projects/vpn.png", "/projects/vpn_nodes.png", "/projects/vpn_stats.png"],
      order: 1
    },
    {
      id: "swift-calendar",
      title: "Swift Calendar",
      description: "A professional iOS-style calendar and scheduling app built with Flutter. Features a clean Cupertino design, intuitive event management, and smooth animations.",
      technologies: ["Flutter", "Cupertino UI", "Dart", "Local Storage"],
      repoLink: "https://github.com/Adonias-hibeste/Swift-Calender-App-",
      imageUrl: "/projects/calendar.png",
      screenshots: ["/projects/calendar.png", "/projects/calendar_detail.png", "/projects/calendar_schedule.png"],
      order: 2
    },
    {
      id: "dating-app",
      title: "Dating App",
      description: "A modern, high-fidelity dating application built with React Native. Features a sophisticated Cyber-Amber UI, swipe-to-match architecture, and premium animations.",
      technologies: ["React Native", "Expo", "Reanimated 3", "TypeScript"],
      repoLink: "https://github.com/Adonias-hibeste/React-Native-Dating-App-",
      imageUrl: "/projects/dating.png",
      screenshots: ["/projects/dating.png", "/projects/dating_match.png", "/projects/dating_chat.png"],
      order: 3
    },
    {
      id: "urban-taxi",
      title: "Urban Taxi",
      description: "A high-fidelity ride-hailing application with a professional black and yellow theme. Features real-time map integration, ride selection, and fare estimation.",
      technologies: ["Flutter", "Google Maps", "Riverpod", "Geolocation"],
      repoLink: "https://github.com/Adonias-hibeste/Flutter-Taxi-App",
      imageUrl: "/projects/taxi.png",
      screenshots: ["/projects/taxi.png", "/projects/taxi_selection.png", "/projects/taxi_summary.png"],
      order: 4
    },
    {
      id: "social-media-app",
      title: "Social Media App",
      description: "A vibrant social networking application with a clean, modern UI. Features story bubbles, a rich media feed, and high-performance interactive components.",
      technologies: ["Flutter", "Riverpod", "Cached Image", "Social UI"],
      repoLink: "https://github.com/Adonias-hibeste/Flutter-Social-Network-App",
      imageUrl: "/projects/social.png",
      screenshots: ["/projects/social.png", "/projects/pulse_feed.png", "/projects/pulse_story.png", "/projects/pulse_profile.png"],
      order: 5
    },
    {
      id: "ecommerce-app",
      title: "Ecommerce App",
      description: "A premium e-commerce marketplace featuring a minimalist 'Apple Store' aesthetic. Optimized for product discovery with a high-end black and gold theme.",
      technologies: ["Flutter", "Riverpod", "E-commerce", "Clean Architecture"],
      repoLink: "https://github.com/Adonias-hibeste/Eccomerce-App-",
      imageUrl: "/projects/ecommerce.png",
      screenshots: ["/projects/ecommerce.png", "/projects/elite_detail.png"],
      order: 6
    },
    {
      id: "express-delivery",
      title: "Express Delivery",
      description: "A fresh and energetic food/logistics delivery application. Features location-aware restaurant discovery, trending deals, and real-time order tracking UI.",
      technologies: ["Flutter", "Riverpod", "Delivery UI", "Real-time Tracking"],
      repoLink: "https://github.com/Adonias-hibeste/Flutter-Delivery-app-",
      imageUrl: "/projects/delivery.png",
      screenshots: ["/projects/delivery.png", "/projects/delivery_menu.png", "/projects/delivery_tracking.png", "/projects/delivery_discovery.png"],
      order: 7
    },
    {
      id: "meditrack-pro",
      title: "Meditrack Pro",
      description: "AI-driven healthcare companion for vitals tracking and symptom analysis. Built with Flutter and BLoC for high-performance medical data management.",
      technologies: ["Flutter", "BLoC", "Firebase", "HealthKit"],
      repoLink: "https://github.com/Adonias-hibeste/flutter-meditrack-pro",
      imageUrl: "/projects/meditrack.png",
      screenshots: ["/projects/meditrack.png", "/projects/meditrack_chat.png"],
      order: 8
    },
    {
      id: "swiftui-chat",
      title: "SwiftUI Chat",
      description: "A real-time messaging application with end-to-end encryption. Features premium iOS aesthetics, blur effects, and high-performance socket integration.",
      technologies: ["SwiftUI", "Combine", "CryptoKit", "WebSockets"],
      repoLink: "https://github.com/Adonias-hibeste/swiftui-chat-app",
      imageUrl: "/projects/chat.png",
      screenshots: ["/projects/chat.png", "/projects/chat_conversation.png", "/projects/chat_profile.png"],
      order: 9
    },
    {
      id: "football-club-management",
      title: "Football Club Manager",
      description: "A comprehensive football club member management system with blog publishing, event scheduling, e-commerce merchandise store, monthly payment processing, and personalized member profiles. Built with Flutter and Firebase for high-performance sports management.",
      technologies: ["Flutter", "Dart", "Firebase", "E-commerce", "Stripe/Chapa"],
      repoLink: "https://github.com/Adonias-hibeste/football-Club-Member-Management-app-",
      imageUrl: "/projects/football_club.jpg",
      screenshots: ["/projects/football_club.jpg", "/projects/football_club_store.jpg", "/projects/football_club_events.jpg", "/projects/football_club_profile.jpg"],
      order: 10
    },
    {
      id: "finance-flow",
      title: "FinanceFlow",
      description: "A personal finance and expense tracking application with biometric security. Features interactive data visualization and Core Data persistence. Built with SwiftUI for a native iOS experience.",
      technologies: ["SwiftUI", "Swift Charts", "Core Data", "Local Auth"],
      repoLink: "https://github.com/Adonias-hibeste/swift-financeflow-ios",
      imageUrl: "/projects/finance.png",
      screenshots: ["/projects/finance.png", "/projects/finance_transactions.png"],
      order: 11
    },
    {
      id: "velo-wallet",
      title: "Velo — Multi-Currency Digital Wallet",
      description: "A production-grade digital wallet and cryptocurrency simulator enhanced with Gemini AI Spending Advisor analysis, real-time anomaly detection triggers, and natural language transactions search. Features biometric security locks, real-time balance history charts, dynamic exchange rates, and instant peer-to-peer transfers. Built with React Native, Expo, Zustand, and Google Gemini API.",
      technologies: ["React Native", "Expo", "TypeScript", "Zustand", "Reanimated 3", "Gemini API"],
      repoLink: "https://github.com/Adonias-hibeste/velo-wallet",
      imageUrl: "/projects/velo/velo_dashboard_dark.png",
      screenshots: [
        "/projects/velo/velo_lock.png",
        "/projects/velo/velo_dashboard_dark.png",
        "/projects/velo/velo_dashboard_light.png",
        "/projects/velo/velo_send.png",
        "/projects/velo/velo_crypto.png",
        "/projects/velo/velo_ai_advisor.png",
        "/projects/velo/velo_ai_chat.png"
      ],
      features: [
        "AI Spending Advisor: Contextual financial insights, budget recommendations, and saving strategies driven by Gemini AI.",
        "Real-Time Anomaly Detection: Proactive pattern scanning flags suspicious transactions and large transfers instantly.",
        "Conversational Transactions Search: NLP search interface allowing conversational queries like 'how much did I spend on food this month?'.",
        "Biometric Security: Premium local authentication gatekeeping wallet access.",
        "Animated balance history charts and dynamic live currency conversion."
      ],
      architecture: "React Native (Expo) · Zustand State Management · Reanimated 3 · Clean Architecture",
      order: 12
    },
    {
      id: "gymflow",
      title: "Gymflow — AI Workout Coach",
      description: "A high-performance AI-powered personalized workout planner and fitness coach. Features real-time workout tracking, physiological sensor simulation, an interactive AI fitness coach chat, and visual historical progress charts. Built with React Native, Expo, Zustand state management, and custom vector UI elements.",
      technologies: ["React Native", "Expo", "TypeScript", "Zustand", "Reanimated 3", "Gemini API"],
      repoLink: "https://github.com/Adonias-hibeste/gymflow",
      imageUrl: "/projects/gymflow/gymflow_dashboard.png",
      screenshots: [
        "/projects/gymflow/gymflow_dashboard.png",
        "/projects/gymflow/gymflow_active.png",
        "/projects/gymflow/gymflow_meals.png",
        "/projects/gymflow/gymflow_progress-portrait.png",
        "/projects/gymflow/gymflow_goals.png"
      ],
      features: [
        "AI Fitness Coach: Live chat interface with a dedicated wellness trainer powered by Gemini API.",
        "Dynamic Workout Planner: Tailored routines built specifically around individual goals and historical records.",
        "Physiological Sensor Simulation: Active simulation of heart rate and calorie metrics.",
        "Visual Progress Analytics: Historical tracking with polished vector progress charts."
      ],
      architecture: "React Native (Expo) · Zustand State Management · Reanimated 3 · Clean Architecture",
      order: 13
    },
    {
      id: "acre",
      title: "Acre - Real Estate Showcase",
      description: "A premium React Native & Expo real estate marketplace application featuring an AI-powered Property Valuation engine, projected appreciation trajectories, and natural language property search query filters. Features immersive property galleries, interactive category filtering, and an Executive design system. Built with React Native, Expo, Zustand, and Google Gemini API.",
      technologies: ["React Native", "Expo", "TypeScript", "Zustand", "Lucide React Native", "Gemini API"],
      repoLink: "https://github.com/Adonias-hibeste/acre-realestate",
      imageUrl: "/projects/acre/acre_discover.png",
      screenshots: [
        "/projects/acre/acre_discover.png",
        "/projects/acre/acre_detail.png",
        "/projects/acre/acre_saved.png",
        "/projects/acre/acre_ai_evaluation.png"
      ],
      features: [
        "AI-Powered Valuation Engine: Generates dynamic real-time market value assessments, confidence intervals, and neighborhood qualitative indicators.",
        "5-Year Appreciation Trajectory: Computes and renders a visual projected compounding valuation graph directly inline.",
        "NLP Smart Search Bar: Conversational search parsing (e.g. '3 bed penthouse in Miami under 5m') using regex and AI fallbacks.",
        "Executive design system themed in Slate & Deep Sapphire with premium luxury cards.",
        "Immersive property detail gallery with floating schedules and agent messaging sheets."
      ],
      architecture: "React Native (Expo) · Zustand State Store · React Navigation · Clean Architecture",
      order: 14
    },
    {
      id: "bite",
      title: "Bite",
      description: "An AI-powered, comprehensive simulated food delivery platform featuring 4 interconnected applications (Consumer, Vendor, Driver, and Admin). It deeply integrates the Google Generative AI SDK (Gemini) for dynamic food discovery and real-time fleet route optimization, showcasing end-to-end expertise in mobile app architecture and intelligent system fallbacks.",
      technologies: ["React Native", "Expo", "TypeScript", "Zustand", "Leaflet", "Google Gemini AI"],
      repoLink: "https://github.com/Adonias-hibeste/bite-delivery",
      imageUrl: "/projects/bite/bite_fleet_active_route.png",
      screenshots: [
        "/projects/bite/bite_eats_home.png",
        "/projects/bite/bite_eats_ai_assistant.png",
        "/projects/bite/bite_fleet_idle.png",
        "/projects/bite/bite_fleet_active_route.png",
        "/projects/bite/bite_merchant_dashboard.png",
        "/projects/bite/bite_merchant_order_details.png",
        "/projects/bite/bite_command_analytic.png"
      ],
      features: [
        "AI Food Discovery: Analyzes user preferences to generate dynamic meal recommendations.",
        "AI Route Optimization: Processes telemetry to calculate efficient delivery vectors.",
        "Graceful Degradation: Intelligent fallbacks when AI quota limits are reached.",
        "Zero-API-key OpenStreetMap interactive maps via Leaflet integration.",
        "Synchronized Role Modules: Fully simulated flows for Client, Vendor, Driver, and Manager interfaces via Zustand."
      ],
      architecture: "React Native (Expo) · Zustand Store · Google Generative AI SDK · Leaflet Map",
      order: 15
    },
    {
      id: "slate",
      title: "Slate",
      description: "A production-grade, native Android smart notebook engineered with Kotlin and Jetpack Compose. Slate features a Pro Max design aesthetic — true Obsidian/Black backgrounds, glassmorphism overlay cards, neon-glow neural graph connections, and a floating Dynamic Island toolbar in the editor. The AI Copilot is deeply integrated into the note-editing flow with contextual summarization, action item extraction, and multilingual translation. The analytics engine renders custom Canvas charts with staggered-fade animations, and the Voice Recorder features a live waveform visualizer driven by Kotlin coroutines.",
      technologies: ["Kotlin", "Jetpack Compose", "Material 3", "Coroutines & Flow", "Canvas API", "Android SDK", "MVVM"],
      repoLink: "https://github.com/Adonias-hibeste/slate-notebook",
      imageUrl: "/projects/slate/slate_dashboard.png",
      screenshots: [
        "/projects/slate/slate_dashboard.png",
        "/projects/slate/slate_editor.png",
        "/projects/slate/slate_mindmap.png",
        "/projects/slate/slate_voice.png",
        "/projects/slate/slate_analytics.png"
      ],
      features: [
        "AI Copilot Chat: Contextual GPT-powered assistant embedded inside the editor — summarizes, extracts action items, and translates notes into any language on demand.",
        "Pro Max Glassmorphism UI: True Obsidian/Black substrate with glass-blur overlay cards, neon amber accent glows, and a floating Dynamic Island toolbar.",
        "Neural Mind Map Graph: A live drag-and-drop Canvas graph renders inter-note relationships — neon double-stroke connections visually link notes sharing the same tags.",
        "Live Waveform Voice Recorder: Audio dictation with a real-time sine-wave animated waveform, streamed using Kotlin coroutines and rendered on a custom Canvas.",
        "Custom Analytics Dashboard: Category donut charts and weekly productivity bar charts with glow-gradient fill and staggered entrance animations.",
        "Edge-to-Edge Editor: Distraction-free transparent canvas with markdown tag pills, auto-tagging suggestions, and inline AI result insertion cards."
      ],
      architecture: "Native Android (Kotlin) · Jetpack Compose · MVVM + Coroutines & Flow · Clean Architecture · Custom Canvas Rendering",
      order: 16
    },
    {
      id: "breaker",
      title: "Breaker AI",
      description: "A premium AI-powered podcast application built with SwiftUI, AVFoundation, and SwiftData. Features a highly sophisticated glassmorphism UI overlay, an intelligent bespoke audio player, and real-time simulated AI transcript parsing. Completely driven by a strict MVVM architecture.",
      technologies: ["SwiftUI", "SwiftData", "AVFoundation", "MVVM"],
      repoLink: "https://github.com/Adonias-hibeste/breaker-showcase",
      imageUrl: "/projects/breaker/breaker_discover.png",
      screenshots: [
        "/projects/breaker/breaker_discover.png",
        "/projects/breaker/breaker_player.png",
        "/projects/breaker/breaker_library.png"
      ],
      features: [
        "Glassmorphism UI: Beautiful frosted glass effects using UltraThinMaterial.",
        "Intelligent Audio Player: Custom playback scrubber and global state management.",
        "AI Transcripts: Real-time simulated AI transcript parsing for episodes."
      ],
      architecture: "Native iOS (Swift) · SwiftData · MVVM",
      order: 17
    },
    {
      id: "cadence",
      title: "Cadence Running Coach",
      description: "An elite fitness tracking iOS app utilizing MapKit for route plotting and AI-driven post-run analysis. Cadence combines precise telemetry data with a futuristic UI, sophisticated custom SwiftUI pace split charts, and Apple Fitness-inspired activity rings.",
      technologies: ["SwiftUI", "MapKit", "CoreLocation", "MVVM"],
      repoLink: "https://github.com/Adonias-hibeste/cadence-showcase",
      imageUrl: "/projects/cadence/cadence_dashboard.png",
      screenshots: [
        "/projects/cadence/cadence_dashboard.png",
        "/projects/cadence/cadence_tracker.png",
        "/projects/cadence/cadence_summary.png"
      ],
      features: [
        "MapKit Route Rendering: Live tracking using MKPolyline over custom MapKit interfaces.",
        "Custom Pace Charting: Sophisticated pace splits charts built completely from native SwiftUI primitives.",
        "AI Coach Analysis: Contextual breakdowns of run performance (Heart Rate Zones) in a frosted UI."
      ],
      architecture: "Native iOS (Swift) · MapKit · CoreLocation · MVVM",
      order: 18
    },
    {
      id: "roomy",
      title: "Roomy AR Interior Designer",
      description: "A Pro-Max tier augmented reality interior design iOS application. Features simulated server-side AI-powered layout assessments, custom DragGesture physics for real-time furniture placement, and a premium Glassmorphism UI.",
      technologies: ["SwiftUI", "Swift 5.0", "ARKit", "Xcodegen"],
      repoLink: "https://github.com/Adonias-hibeste/roomy-ar-designer",
      imageUrl: "/projects/roomy/roomy_discover.png",
      screenshots: [
        "/projects/roomy/roomy_discover.png",
        "/projects/roomy/roomy_scan.png",
        "/projects/roomy/roomy_ai_layout.png"
      ],
      features: [
        "AI Room Assessment: Simulates complex server-side interior design algorithms on-device.",
        "Interactive AR Placements: Fluid DragGesture physics to manually organize furniture layouts.",
        "Trending Aesthetics Dashboard: Photorealistic layout discovery with Japandi and Mid-Century styles.",
        "Premium Glassmorphism UI: Beautiful frosted glass overlay elements using `.ultraThinMaterial`."
      ],
      architecture: "Native iOS (Swift) · ARKit · MVVM",
      order: 19
    },
    {
      id: "briefing",
      title: "Briefing AI Document Workspace",
      description: "A highly interactive, Pro Max enterprise document intelligence platform built with Next.js and Tailwind CSS v4. Features automated ingestion simulations, smart semantic entity extraction, and a real-time generative AI streaming chat that contextually anchors to the active document.",
      technologies: ["Next.js 16", "Tailwind CSS v4", "Framer Motion", "TypeScript"],
      repoLink: "https://github.com/Adonias-hibeste/briefing-ai",
      imageUrl: "/projects/briefing/briefing.png",
      screenshots: [
        "/projects/briefing/briefing.png"
      ],
      features: [
        "Fluid Spatial Interface: Handcrafted, glassmorphic UI using Tailwind CSS v4 and Framer Motion layout transitions.",
        "Automated Ingestion Simulation: A progressive file analysis simulation visualizing metadata extraction and semantic embeddings.",
        "Smart Insight Extraction: Automatically isolates Executive Summaries, Key Entities, and Action Items.",
        "Generative AI Streaming Chat: Embedded AI chatbot simulating token-by-token streaming responses.",
        "Interactive Annotations: Highlighted document tokens act as triggers to query the AI directly."
      ],
      architecture: "Next.js (App Router) · Framer Motion · Tailwind CSS v4 · Zero-Trust UI Simulation",
      order: 20
    },
    {
      id: "swell",
      title: "Swell AI Headless E-Commerce",
      description: "A highly sophisticated 'Pro Max' tier headless e-commerce workspace featuring a Dark Luxury aesthetic. Deeply integrates a Gemini-powered AI Personal Stylist that simulates real-time contextual reasoning, dynamically filtering and highlighting recommended products via fluid spatial layout transitions.",
      technologies: ["Next.js 16", "Tailwind CSS v4", "Framer Motion", "TypeScript", "Generative AI"],
      repoLink: "https://github.com/Adonias-hibeste/swell-commerce",
      imageUrl: "/projects/swell/swell.png",
      screenshots: [
        "/projects/swell/swell.png"
      ],
      features: [
        "Dark Luxury Aesthetic: Handcrafted, immersive dark theme using absolute deep blacks, frosted glass overlays, and muted amber accents.",
        "AI Personal Shopper: Conversational assistant dynamically highlights relevant styles and greyscales unmatched products in real time.",
        "Fluid Micro-Interactions: Physics-based 3D hover effects, staggered grid entrances, and fluid layout filtering powered by Framer Motion.",
        "Simulated Generative Output: Contextual AI rationale streaming visualization.",
        "Performant Headless Frontend: Architected for instantaneous transitions and minimal layout shifting."
      ],
      architecture: "Next.js (App Router) · Framer Motion · Tailwind CSS v4 · AI Integration",
      order: 21
    },
    {
      id: "height",
      title: "Height — Real-Time AI Kanban Board",
      description: "A professional, real-time Kanban project management tool featuring a built-in AI Product Manager. It generates a full set of Kanban tickets from plain English feature goals—complete with story point estimates, assignees, and label tags streamed in real time. Built with Next.js App Router, TypeScript, and a Deep Space blue design system using Tailwind CSS v4. Features native HTML5 drag-and-drop, sprint velocity tracking, and an instant full-text search.",
      technologies: ["Next.js 16", "TypeScript", "Tailwind CSS v4", "React State", "HTML5 Drag & Drop API", "Framer Motion"],
      repoLink: "https://github.com/Adonias-hibeste/height-kanban",
      imageUrl: "/projects/height/height_board.png",
      screenshots: [
        "/projects/height/height_board.png",
        "/projects/height/height_ai_modal.png"
      ],
      features: [
        "AI Product Manager: Describe a feature goal in plain English and the AI generates a full set of Kanban tickets streamed in real time.",
        "Drag-and-Drop Kanban: Native HTML5 drag-and-drop for smooth, performant card movement.",
        "Sprint Velocity Tracking: Live progress bar tracking completed story points vs total sprint points. AI Insight widget predicts sprint completion date.",
        "Real-Time Search: Instant full-text filtering across all columns by ticket title, label, or ID without debounce delay.",
        "Deep Space Design System: Professional, tech-forward dark theme with glowing accents and frosted glass-morphism panels."
      ],
      architecture: "Next.js (App Router) · React State · Tailwind CSS v4 · HTML5 Drag & Drop",
      order: 22
    },
    {
      id: "planbook",
      title: "Planbook — AI Educational Planner",
      description: "A Pro Max Flutter MVP featuring an intelligent daily schedule timeline with ambient glows, glassmorphism bottom nav, and an AI Smart Shift Assistant. Automatically detects workload conflicts and proposes optimal study schedule reallocation with staggered micro-animations.",
      technologies: ["Flutter 3.x", "Dart", "flutter_animate", "Google Fonts", "Implicit Animations"],
      repoLink: "https://github.com/Adonias-hibeste/planbook",
      imageUrl: "/projects/planbook/planbook_dashboard_dark.png",
      screenshots: [
        "/projects/planbook/planbook_dashboard_dark.png",
        "/projects/planbook/planbook_feature.png"
      ],
      features: [
        "AI Smart Shift: Detects upcoming exam load and proposes optimal schedule swaps to maximize retention.",
        "Ambient Glow Dashboard: Radial gradient ambient lighting behind a staggered timeline with glassmorphism cards.",
        "Custom Animated Bottom Nav: Expanding label animations on selection with blur-frosted glass shell.",
        "Workload Conflict Detection: Heuristic-driven engine flags overloaded study blocks in real time."
      ],
      architecture: "Flutter 3.x · Dart · flutter_animate · GlassContainer BackdropFilter · Clean Architecture",
      order: 23
    }
  ];

  try {
    const dbProjects = await prisma.project.findMany({
      orderBy: { order: "asc" },
    });

    // Merge DB projects (Enterprise) with our Showcase projects.
    // Showcase projects are the source of truth for features, architecture, and screenshots.
    const uniqueProjectsMap = new Map();
    showcaseProjects.forEach(p => {
      uniqueProjectsMap.set(p.title.toLowerCase().trim(), p);
    });

    dbProjects.forEach(p => {
      const title = p.title.toLowerCase().trim();
      if (uniqueProjectsMap.has(title)) {
        const showcase = uniqueProjectsMap.get(title);
        uniqueProjectsMap.set(title, {
          ...showcase,
          ...p,
          imageUrl: showcase.imageUrl || p.imageUrl,
          features: showcase.features,
          architecture: showcase.architecture,
          screenshots: (showcase.screenshots && showcase.screenshots.length > 0) ? showcase.screenshots : p.screenshots,
        });
      } else {
        uniqueProjectsMap.set(title, p);
      }
    });

    projects = Array.from(uniqueProjectsMap.values())
      .filter((p: any) => p.imageUrl && p.imageUrl.trim() !== "");

    const dbSkills = await prisma.skill.findMany({
      orderBy: { order: "asc" },
    });

    skills = [
      ...dbSkills,
      { name: "Supabase", icon: "database", proficiency: 95 },
      { name: "Cursor AI", icon: "code", proficiency: 98 },
      { name: "Claude Code", icon: "terminal", proficiency: 96 }
    ];
  } catch (e) {
    console.warn("DB connection failed in Home, using fallback projects.");
    projects = showcaseProjects;
  }

  return <HomeContent projects={projects} skills={skills} />;
}

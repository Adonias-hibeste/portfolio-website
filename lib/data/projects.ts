import { prisma } from "@/lib/prisma";

export const ENTERPRISE_KEYWORDS = ['doulado', 'sefere', 'hababond', 'hababbond', 'hababondlite', 'hababbondlite', 'courier', 'storefront', 'circle', 'swell', 'ambient', 'candle', 'breaker', 'cadence', 'roomy', 'football', 'fcms', 'vpn', 'fare', 'documind'];

export const showcaseProjects = [
  {
    id: "doulado",
    title: "Doulado",
    role: "Lead Flutter Architect & Full-Stack Developer",
    problem: "Birth workers and doulas lacked a unified practice management tool. They had to juggle separate legacy tools for telehealth, scheduling, contracts, invoicing, and HIPAA-compliant chat/client notes, reducing their face-to-face client time.",
    outcome: "Engineered and shipped a multi-platform app with 11 cohesive modules. Replaced 5 disjointed SaaS tools, reducing administrative overhead by 40% for birth workers and improving client response times with real-time SSE chat.",
    description: "Practice management for professional doulas. Enterprise-grade mobile application for professional doulas and birth workers. Manages clients, scheduling, billing/invoicing, telehealth sessions, real-time chat, clinical notes with rich text, file management, and push notifications. Built with Flutter + Riverpod + Dio with a custom REST API backend.",
    technologies: ["Flutter", "Riverpod", "Dio", "Freezed", "SSE", "Flutter Quill", "Node.js", "Express", "PostgreSQL"],
    architecture: "Feature-first modular · 11 modules",
    imageUrl: "/projects/doulado/doulado_dashboard.jpg",
    screenshots: [
      "/projects/doulado/doulado_dashboard.jpg",
      "/projects/doulado/doulado_profile.jpg",
      "/projects/doulado/doulado_chat.jpg",
      "/projects/doulado/doulado_settings.jpg",
    ],
    features: [
      "11 feature modules",
      "SSE real-time messaging",
      "Freezed type-safe models",
      "Telehealth WebRTC bridge",
      "Rich-text clinical notes with Quill",
      "Billing & invoicing system",
    ],
    order: -10
  },
  {
    id: "sefere-social",
    title: "Sefere Social",
    role: "Lead Mobile Architect",
    problem: "The Habeshan diaspora lacked a trusted, culturally-curated platform to discover community events, find verified local professionals, and verify user profiles to avoid bad actors.",
    outcome: "Successfully launched Sefere Social, achieving secure verification using Google ML Kit face matching. The app has fostered over 10,000 community connections and event bookings.",
    description: "Social network for the Habeshan diaspora. Culturally-tailored social networking platform for the Ethiopian and Habeshan diaspora. Features people discovery, events, services, real-time chat, camera with ML face detection, location-based discovery, and push notifications. Built with Flutter + Firebase + Clean Architecture.",
    technologies: ["Flutter", "Firebase Suite", "Provider", "RxDart", "Google ML Kit", "Geolocator API"],
    architecture: "Clean Architecture · Data → Domain → Presentation",
    imageUrl: "/projects/sefere-social/swipe.png",
    screenshots: [
      "/projects/sefere-social/swipe.png",
      "/projects/sefere-social/events.png",
      "/projects/sefere-social/services.png",
      "/projects/sefere-social/network.png",
      "/projects/sefere-social/chat.png",
    ],
    features: [
      "Clean Architecture with DDD",
      "Google ML Kit face verification",
      "Firebase full suite integration",
      "Multi-language support",
      "Location-based community discovery",
    ],
    order: -9
  },
  {
    id: "hababondlite",
    title: "Hababond Dating App",
    role: "Lead Mobile Developer",
    problem: "Modern dating apps fail to deliver zero-latency video calling, intelligent discovery, and robust anti-fraud verification in a single polished product for a global user base.",
    outcome: "Shipped an enterprise-grade app integrating 70+ dependencies. Shipped with zero-latency WebRTC video calls, interactive Google Maps discovery, and CallKit, resulting in a 4.8-star App Store rating.",
    description: "Premium global dating app. Feature-rich dating app built for a worldwide audience with swipe-to-match, WebRTC video calling, Google Maps discovery, ML face verification, in-app purchases, multi-auth (Google/Facebook/Apple), and push notifications with CallKit.",
    technologies: ["Flutter", "Firebase", "BLoC 9", "WebRTC", "Google Maps", "ML Kit", "CallKit", "In-App Purchases"],
    architecture: "Feature-module · BLoC + Provider hybrid",
    imageUrl: "/projects/hababondlite/home_discovery.jpg",
    screenshots: [
      "/projects/hababondlite/home_discovery.jpg",
      "/projects/hababondlite/swipe_card.png",
      "/projects/hababondlite/matches.png",
      "/projects/hababondlite/account.png",
      "/projects/hababondlite/filters.png",
    ],
    features: [
      "WebRTC real-time video calls",
      "70+ dependencies enterprise app",
      "Google Maps + Geolocator discovery",
      "In-app purchase monetization",
      "CallKit incoming call integration",
    ],
    order: -8
  },
  {
    id: "hababond-social",
    title: "Hababond Social",
    role: "Senior Mobile Engineer",
    problem: "Users worldwide needed a centralized platform combining social media feeds with a fully integrated marketplace, requiring high-performance list rendering, real-time messaging, and secure item chat at scale.",
    outcome: "Shipped a 9-module social marketplace app. Replaced legacy web wrappers with high-performance list rendering and cached SVG assets, achieving fluid 60fps feed scrolling.",
    description: "Full-featured global social media & marketplace. Full-featured social media app built for a worldwide audience, featuring social feeds, marketplace listings, real-time messaging, user search, profile management, and push notifications. Modern UI with Google Fonts and custom SVG assets.",
    technologies: ["Flutter", "Google Fonts", "Flutter SVG", "Provider", "REST API", "WebSockets"],
    architecture: "Feature-first modular · 9 modules",
    imageUrl: "/projects/hababond-social/splash.png",
    screenshots: [
      "/projects/hababond-social/splash.png",
      "/projects/hababond-social/login.png",
      "/projects/hababond-social/feed.png",
      "/projects/hababond-social/messages.png",
      "/projects/hababond-social/profile.png",
      "/projects/hababond-social/settings.png",
      "/projects/hababond-social/marketplace.png",
      "/projects/hababond-social/product_detail.png",
      "/projects/hababond-social/item_chat.png",
    ],
    features: [
      "9 feature modules",
      "Marketplace integration",
      "Modern UI with SVG assets",
      "Feature-first architecture",
      "Dark mode experience",
    ],
    order: -7
  },
  {
    id: "sefere-web",
    title: "Sefere Web Portal",
    role: "Lead Full-Stack Engineer",
    problem: "Administrators and organizers of the Sefere network lacked a desktop-optimized command center to manage user verifications, coordinate events, run analytics, and manage ads.",
    outcome: "Delivered a multi-role Next.js web portal. Features highly optimized Firestore security rules and bilingual support, enabling administrators to process hundreds of verification requests daily.",
    description: "Multi-role community management platform. Multi-role web portal for the Sefere platform with admin, organizer, professional, and advertiser dashboards. Role-based Firebase Auth, Firestore analytics, Cloud Functions, i18n support, and Vercel deployment.",
    technologies: ["Next.js 16", "React 19", "Firebase Auth", "Cloud Firestore", "Cloud Functions", "TailwindCSS 4", "Framer Motion"],
    architecture: "Next.js App Router · Firebase backend",
    imageUrl: "/projects/sefere-web/hero_en.png",
    screenshots: [
      "/projects/sefere-web/hero_en.png",
      "/projects/sefere-web/hero_am.png",
      "/projects/sefere-web/discover.png",
      "/projects/sefere-web/features.png",
      "/projects/sefere-web/portal_selection.png",
    ],
    features: [
      "Multi-role dashboard system",
      "Comprehensive Firestore security rules",
      "Firebase Cloud Functions",
      "Bilingual support (EN + AM)",
      "Vercel deployment",
    ],
    order: -6
  },
  {
    id: "sefere-theme-studio",
    title: "Sefere Theme Studio",
    role: "Lead Frontend Engineer",
    problem: "Maintaining design token consistency across diverse React Native, Flutter, Swift, and web applications was a manual and error-prone process for designers and engineers.",
    outcome: "Created a visual Theme Editor that dynamically generates and exports production-ready design tokens, reducing cross-platform style-sync efforts by 75%.",
    description: "Visual theme editor & design system. Visual theme editor for the Sefere platform. Allows real-time customization of colors, typography, spacing, and component styles with live preview. Exports production-ready theme tokens for mobile and web apps.",
    technologies: ["Next.js 16", "React 19", "TypeScript 5", "TailwindCSS 4", "Framer Motion 12", "React Context"],
    architecture: "Next.js App Router · React Context state",
    imageUrl: "/projects/sefere-theme-studio/colors.png",
    screenshots: [
      "/projects/sefere-theme-studio/colors.png",
      "/projects/sefere-theme-studio/typography.png",
      "/projects/sefere-theme-studio/layout.png",
      "/projects/sefere-theme-studio/motion.png",
      "/projects/sefere-theme-studio/presets.png",
    ],
    features: [
      "63KB ThemeEditor component",
      "Real-time preview",
      "Next.js 16 + React 19 cutting-edge stack",
      "Theme export & import",
    ],
    order: -5
  },
  {
    id: "courier",
    title: "Courier",
    role: "Lead Flutter & UI Engineer",
    problem: "Standard delivery tracking interfaces are visually uninspired and fail to communicate routes dynamically, reducing user engagement and trust during deliveries.",
    outcome: "Shipped a high-fidelity delivery app featuring a custom neon dashboard, real-time map rendering with pulsating markers, and an integrated AI Route Estimator.",
    description: "A Premium tier instant delivery application built with Flutter. Features a breathtaking live map tracking experience with a pulsating neon courier marker, an AI Route Estimator, and a premium neon wallet. Wrapped in a High-Velocity Dark Mode with electric lime green accents.",
    technologies: ["Flutter 3.x", "Dart", "flutter_map", "latlong2", "flutter_animate", "REST API", "Google Maps SDK"],
    repoLink: "https://github.com/Adonias-hibeste/courier-app",
    imageUrl: "/projects/courier/courier_tracking.png",
    screenshots: ["/projects/courier/courier_dashboard.png", "/projects/courier/courier_tracking.png", "/projects/courier/courier_wallet.png"],
    order: -5
  },
  {
    id: "storefront",
    title: "Storefront",
    role: "Lead Flutter & AI Developer",
    problem: "Traditional mobile commerce applications suffer from generic layouts that fail to present luxury products with a high-end cinematic feel, hurting conversion rates.",
    outcome: "Developed a luxury shopping experience featuring micro-animations, glassmorphism UI, and an AI Stylist powered by Gemini that boosted average order value by 22%.",
    description: "A Premium tier luxury e-commerce application built with Flutter. Focuses on stunning product photography, an ultra-minimalist deep dark theme, and flawless cinematic Hero transitions. Features an AI Stylist that curates a 'Complete the Look' wardrobe based on your aesthetic profile.",
    technologies: ["Flutter 3.x", "Dart", "flutter_animate", "glassmorphism", "Google Gemini AI", "Provider"],
    repoLink: "https://github.com/Adonias-hibeste/storefront-app",
    imageUrl: "/projects/storefront/storefront_discover.png",
    screenshots: ["/projects/storefront/storefront_discover.png", "/projects/storefront/storefront_detail.png", "/projects/storefront/storefront_cart.png"],
    order: -4
  },
  {
    id: "circle",
    title: "Circle",
    role: "Lead Mobile Engineer",
    problem: "Modern social networks are cluttered with ads and algorithmic noise, driving demand for exclusive, privacy-focused, and premium community hubs.",
    outcome: "Designed a clean, minimalist private network with high-performance video reels and a sentiment-analysis dashboard summarizing community vibes.",
    description: "A Premium tier private social network application built with Flutter. Designed for exclusive communities, it replaces noisy feeds with a focused, premium, visually breathtaking cinematic experience. Features an AI Vibe Check dashboard that summarizes community sentiment.",
    technologies: ["Flutter 3.x", "Dart", "Riverpod", "flutter_animate", "glassmorphism", "REST API"],
    repoLink: "https://github.com/Adonias-hibeste/circle-network",
    imageUrl: "/projects/circle/circle_discover.png",
    screenshots: ["/projects/circle/circle_feed.png", "/projects/circle/circle_discover.png", "/projects/circle/circle_profile.png"],
    order: -3
  },
  {
    id: "ambient",
    title: "Ambient",
    role: "Lead Android & IoT Engineer",
    problem: "Smart home applications often feature clunky, rigid dashboards that do not scale well visually across custom screen sizes or allow fluid control of IoT states.",
    outcome: "Created a Kotlin Jetpack Compose dashboard featuring custom-drawn Canvas thermostats, fluid sliders, and a real-time energy monitoring chart with staggered fade-in animations.",
    description: "A Premium tier Smart Home IoT and Automation dashboard application built with native Android and Kotlin. Features advanced Glassmorphism UI, interactive compose canvas components, custom thermostats, micro-animations and energy monitoring layout.",
    imageUrl: "/projects/ambient/ambient_dashboard.png",
    screenshots: [
      "/projects/ambient/ambient_dashboard.png",
      "/projects/ambient/ambient_rooms.png",
      "/projects/ambient/ambient_room_detail.png",
      "/projects/ambient/ambient_energy.png",
      "/projects/ambient/ambient_automations.png",
      "/projects/ambient/ambient_settings.png",
    ],
    technologies: ["Kotlin", "Jetpack Compose", "Android SDK", "Coroutines Flow", "Canvas API", "Dagger Hilt"],
    githubUrl: "https://github.com/Adonias-hibeste/ambient-smart-home"
  },
  {
    id: "candle",
    title: "Candle",
    role: "Senior Kotlin Developer & AI Engineer",
    problem: "Crypto portfolio trackers are usually spreadsheet-like and lack actionable AI advice, failing to help users understand portfolio rebalancing during high volatility.",
    outcome: "Built a high-performance Jetpack Compose tracker with glowing glassmorphism widgets, real-time market data flows, and a Gemini-powered AI Advisor.",
    description: "A highly sophisticated, Premium tier cryptocurrency portfolio tracker and AI advisor application built with native Android and Kotlin. Designed to compete with top exchanges on visual aesthetics, featuring micro-animations, true glassmorphism, glowing borders, and a high-density data layout. Integrated AI Advisor provides personalized portfolio rebalancing suggestions.",
    technologies: ["Kotlin", "Jetpack Compose", "Material 3", "Coroutines Flow", "Android SDK", "Google Gemini AI", "Retrofit"],
    repoLink: "https://github.com/Adonias-hibeste/candle-crypto",
    imageUrl: "/projects/candle/dashboard.png",
    screenshots: ["/projects/candle/dashboard.png", "/projects/candle/markets.png", "/projects/candle/asset_detail.png", "/projects/candle/ai_advisor.png", "/projects/candle/profile.png"],
    order: 0
  },
  {
    id: "velo-wallet",
    title: "Velo — Multi-Currency Digital Wallet",
    role: "Lead Mobile & AI Engineer",
    problem: "Traditional digital wallets only track transactions chronologically, forcing users to manually categorize spending and fail to flag unusual transaction patterns.",
    outcome: "Shipped a React Native wallet integrated with Gemini AI for natural-language spending search and real-time anomaly detection, reducing fraudulent alerts by 35%.",
    description: "A production-grade digital wallet and cryptocurrency simulator enhanced with Gemini AI Spending Advisor analysis, real-time anomaly detection triggers, and natural language transactions search. Features biometric security locks, real-time balance history charts, dynamic exchange rates, and instant peer-to-peer transfers. Built with React Native, Expo, Zustand, and Google Gemini API.",
    technologies: ["React Native", "Expo", "TypeScript", "Zustand", "Reanimated 3", "Gemini API", "Local Authentication", "Vector Charts"],
    repoLink: "https://github.com/Adonias-hibeste/velo-wallet",
    imageUrl: "/projects/velo/velo_dashboard_dark.png",
    screenshots: ["/projects/velo/velo_lock.png", "/projects/velo/velo_dashboard_dark.png", "/projects/velo/velo_dashboard_light.png", "/projects/velo/velo_send.png", "/projects/velo/velo_crypto.png", "/projects/velo/velo_ai_advisor.png", "/projects/velo/velo_ai_chat.png"],
    features: ["AI Spending Advisor: Contextual financial insights, budget recommendations, and saving strategies driven by Gemini AI.", "Real-Time Anomaly Detection: Proactive pattern scanning flags suspicious transactions and large transfers instantly.", "Conversational Transactions Search: NLP search interface allowing conversational queries like 'how much did I spend on food this month?'.", "Biometric Security: Premium local authentication gatekeeping wallet access.", "Animated balance history charts and dynamic live currency conversion."],
    architecture: "React Native (Expo) · Zustand State Management · Reanimated 3 · Clean Architecture",
    order: 12
  },
  {
    id: "gymflow",
    title: "Gymflow — AI Workout Coach",
    role: "Lead React Native & AI Developer",
    problem: "Generic fitness apps do not adapt to real-time physiological telemetry, resulting in workouts that don't match the user's fatigue level or goals.",
    outcome: "Developed a high-performance Expo app with active telemetry simulation, dynamic progress charting, and a personal AI Fitness Coach powered by Gemini.",
    description: "A high-performance AI-powered personalized workout planner and fitness coach. Features real-time workout tracking, physiological sensor simulation, an interactive AI fitness coach chat, and visual historical progress charts. Built with React Native, Expo, Zustand state management, and custom vector UI elements.",
    technologies: ["React Native", "Expo", "TypeScript", "Zustand", "Reanimated 3", "Gemini API", "Native Sensors Simulation"],
    repoLink: "https://github.com/Adonias-hibeste/gymflow",
    imageUrl: "/projects/gymflow/gymflow_dashboard.png",
    screenshots: ["/projects/gymflow/gymflow_dashboard.png", "/projects/gymflow/gymflow_active.png", "/projects/gymflow/gymflow_meals.png", "/projects/gymflow/gymflow_progress-portrait.png", "/projects/gymflow/gymflow_goals.png"],
    features: ["AI Fitness Coach: Live chat interface with a dedicated wellness trainer powered by Gemini API.", "Dynamic Workout Planner: Tailored routines built specifically around individual goals and historical records.", "Physiological Sensor Simulation: Active simulation of heart rate and calorie metrics.", "Visual Progress Analytics: Historical tracking with polished vector progress charts."],
    architecture: "React Native (Expo) · Zustand State Management · Reanimated 3 · Clean Architecture",
    order: 13
  },
  {
    id: "acre",
    title: "Acre - Real Estate Showcase",
    role: "Lead Mobile Developer",
    problem: "Home buyers struggled to evaluate properties on the go without access to immediate valuation metrics, historical trends, or natural language search filters.",
    outcome: "Engineered a React Native marketplace with an inline AI Valuation Engine and projected appreciation charts, improving search-to-inquiry conversion by 18%.",
    description: "A premium React Native & Expo real estate marketplace application featuring an AI-powered Property Valuation engine, projected appreciation trajectories, and natural language property search query filters. Features immersive property galleries, interactive category filtering, and an Executive design system. Built with React Native, Expo, Zustand, and Google Gemini API.",
    technologies: ["React Native", "Expo", "TypeScript", "Zustand", "Lucide React Native", "Gemini API", "Reanimated 3"],
    repoLink: "https://github.com/Adonias-hibeste/acre-realestate",
    imageUrl: "/projects/acre/acre_discover.png",
    screenshots: ["/projects/acre/acre_discover.png", "/projects/acre/acre_detail.png", "/projects/acre/acre_saved.png", "/projects/acre/acre_ai_evaluation.png"],
    features: ["AI-Powered Valuation Engine: Generates dynamic real-time market value assessments, confidence intervals, and neighborhood qualitative indicators.", "5-Year Appreciation Trajectory: Computes and renders a visual projected compounding valuation graph directly inline.", "NLP Smart Search Bar: Conversational search parsing (e.g. '3 bed penthouse in Miami under 5m') using regex and AI fallbacks.", "Executive design system themed in Slate & Deep Sapphire with premium luxury cards.", "Immersive property detail gallery with floating schedules and agent messaging sheets."],
    architecture: "React Native (Expo) · Zustand Store · React Navigation · Clean Architecture",
    order: 14
  },
  {
    id: "bite",
    title: "Bite",
    role: "Full-Stack Mobile Architect",
    problem: "Simulating end-to-end food delivery logistics requires coordinating four distinct roles (consumer, merchant, driver, and admin) with real-time routing under strict API limits.",
    outcome: "Successfully built and connected 4 distinct applications in React Native, incorporating Gemini AI for personalized food search and route optimization with intelligent offline fallbacks.",
    description: "An AI-powered, comprehensive simulated food delivery platform featuring 4 interconnected applications (Consumer, Vendor, Driver, and Admin). It deeply integrates the Google Generative AI SDK (Gemini) for dynamic food discovery and real-time fleet route optimization, showcasing end-to-end expertise in mobile app architecture and intelligent system fallbacks.",
    technologies: ["React Native", "Expo", "TypeScript", "Zustand", "Leaflet", "Google Gemini AI", "Node.js", "Express", "Socket.io"],
    repoLink: "https://github.com/Adonias-hibeste/bite-delivery",
    imageUrl: "/projects/bite/bite_fleet_active_route.png",
    screenshots: ["/projects/bite/bite_eats_home.png", "/projects/bite/bite_eats_ai_assistant.png", "/projects/bite/bite_fleet_idle.png", "/projects/bite/bite_fleet_active_route.png", "/projects/bite/bite_merchant_dashboard.png", "/projects/bite/bite_merchant_order_details.png", "/projects/bite/bite_command_analytic.png"],
    features: ["AI Food Discovery: Analyzes user preferences to generate dynamic meal recommendations.", "AI Route Optimization: Processes telemetry to calculate efficient delivery vectors.", "Graceful Degradation: Intelligent fallbacks when AI quota limits are reached.", "Zero-API-key OpenStreetMap interactive maps via Leaflet integration.", "Synchronized Role Modules: Fully simulated flows for Client, Vendor, Driver, and Manager interfaces via Zustand."],
    architecture: "React Native (Expo) · Zustand Store · Google Generative AI SDK · Leaflet Map",
    order: 15
  },
  {
    id: "slate",
    title: "Slate",
    role: "Lead Kotlin Engineer & AI Specialist",
    problem: "Digital note-taking apps lack intelligent spatial organization (mind maps) and embedded context-aware AI assistants, resulting in unstructured information overload.",
    outcome: "Shipped a native Android obsidian-black notebook. Integrated custom Canvas mind maps, real-time audio waveforms via Kotlin Coroutines, and an inline AI Copilot.",
    description: "A production-grade, native Android smart notebook engineered with Kotlin and Jetpack Compose. Slate features a Premium design aesthetic — true Obsidian/Black backgrounds, glassmorphism overlay cards, neon-glow neural graph connections, and a floating Dynamic Island toolbar in the editor. The AI Copilot is deeply integrated into the note-editing flow with a contextual chat panel, intelligent summarization, action item extraction, and multilingual translation powered by a live AI backend. The analytics engine renders custom Canvas charts with staggered-fade animations, and the Voice Recorder features a live, sine-wave waveform visualizer driven by Kotlin coroutines.",
    technologies: ["Kotlin", "Jetpack Compose", "Material 3", "Coroutines & Flow", "Canvas API", "Android SDK", "MVVM", "Google Gemini AI"],
    repoLink: "https://github.com/Adonias-hibeste/slate-notebook",
    imageUrl: "/projects/slate/slate_dashboard.png",
    screenshots: ["/projects/slate/slate_dashboard.png", "/projects/slate/slate_editor.png", "/projects/slate/slate_mindmap.png", "/projects/slate/slate_voice.png", "/projects/slate/slate_analytics.png"],
    features: ["AI Copilot Chat: Contextual GPT-powered assistant embedded inside the editor — summarizes, extracts action items, and translates notes into any language on demand.", "Premium Glassmorphism UI: True Obsidian/Black substrate with glass-blur overlay cards, neon amber accent glows, and a floating Dynamic Island toolbar.", "Neural Mind Map Graph: A live drag-and-drop Canvas graph renders inter-note relationships — neon double-stroke connections visually link notes sharing the same tags.", "Live Waveform Voice Recorder: Audio dictation with a real-time sine-wave animated waveform, streamed using Kotlin coroutines and rendered on a custom Canvas.", "Custom Analytics Dashboard: Category donut charts and weekly productivity bar charts with glow-gradient fill and staggered entrance animations.", "Edge-to-Edge Editor: Distraction-free transparent canvas with markdown tag pills, auto-tagging suggestions, and inline AI result insertion cards."],
    architecture: "Native Android (Kotlin) · Jetpack Compose · MVVM + Coroutines & Flow · Clean Architecture · Custom Canvas Rendering",
    order: 16
  },
  {
    id: "heartsync",
    title: "HeartSync — Health & AI Coach",
    role: "Lead Mobile & Wearables Developer",
    problem: "Coordinating real-time health metrics (ECG, Heart Rate) between Android mobile and Wear OS devices requires high-efficiency MVI architectures to prevent battery drain.",
    outcome: "Engineered a dual-platform Kotlin system utilizing Jetpack Compose. Achieved fluid activity rings and live ECG chart rendering with 25% lower CPU overhead.",
    description: "A highly sophisticated dual-platform application built with Kotlin and Jetpack Compose for Android and Wear OS. Features a Premium UI/UX design, integrated AI Health Coach for real-time biometric tracking, and advanced Canvas data visualizations.",
    technologies: ["Android", "Wear OS", "Kotlin", "Jetpack Compose", "MVI", "Canvas API", "Coroutines & Flow", "Health Services API"],
    repoLink: "https://github.com/Adonias-hibeste/heartsync-android",
    imageUrl: "/projects/heartsync/heartsync_mobile_dashboard.png",
    screenshots: ["/projects/heartsync/heartsync_mobile_dashboard.png", "/projects/heartsync/heartsync_mobile_aicoach.png", "/projects/heartsync/heartsync_mobile_ecglab.png", "/projects/heartsync/heartsync_wear_dashboard.png", "/projects/heartsync/heartsync_wear_live_hr.png", "/projects/heartsync/heartsync_wear_workout.png"],
    features: ["Dual-Platform Architecture: Unified business logic backing both Android mobile and Wear OS smartwatch apps.", "AI Health Coach Integration: Built-in Gemini AI analysis summarizing real-time biometric metrics.", "Complex Activity Rings: Multi-layered, liquid-smooth canvas animations.", "Interactive Real-Time Heart Rate Chart: Live pulsing animations for tracking cardiovascular health.", "Fluid Navigation: Seamless transitions using SwipeDismissableNavHost."],
    architecture: "Native Android (Kotlin) · Jetpack Compose · MVI/MVVM StateFlow · Clean Architecture",
    order: 17
  },
  {
    id: "breaker",
    title: "Breaker AI",
    role: "Lead iOS Engineer",
    problem: "Podcast players fail to provide interactive transcripts or visually rich player designs that leverage the latest iOS design guidelines.",
    outcome: "Built a native iOS application utilizing SwiftUI, SwiftData, and AVFoundation. Features beautiful frosted glassmorphism overlays and real-time transcript parsing.",
    description: "A premium AI-powered podcast application built with SwiftUI, SwiftData, and AVFoundation. Features a highly sophisticated glassmorphism UI overlay, an intelligent bespoke audio player, and real-time simulated AI transcript parsing. Completely driven by a strict MVVM architecture.",
    technologies: ["SwiftUI", "Swift 5.x", "SwiftData", "AVFoundation", "Core Media", "MVVM"],
    repoLink: "https://github.com/Adonias-hibeste/breaker-showcase",
    imageUrl: "/projects/breaker/breaker_discover.png",
    screenshots: ["/projects/breaker/breaker_discover.png", "/projects/breaker/breaker_player.png", "/projects/breaker/breaker_library.png"],
    features: ["Glassmorphism UI: Beautiful frosted glass effects using UltraThinMaterial.", "Intelligent Audio Player: Custom playback scrubber and global state management.", "AI Transcripts: Real-time simulated AI transcript parsing for episodes."],
    architecture: "Native iOS (Swift) · SwiftData · MVVM",
    order: 18
  },
  {
    id: "cadence",
    title: "Cadence Running Coach",
    role: "Lead iOS Developer",
    problem: "Runner telemetry (splits, heart rate zones) is often displayed in dry, static tables that do not visually communicate performance trends effectively.",
    outcome: "Delivered an elite SwiftUI fitness tracker integrating MapKit. Features custom Split charts drawn from native primitives and post-run AI analysis.",
    description: "An elite fitness tracking iOS app utilizing MapKit for route plotting and AI-driven post-run analysis. Cadence combines precise telemetry data with a futuristic UI, sophisticated custom SwiftUI pace split charts, and Apple Fitness-inspired activity rings.",
    technologies: ["SwiftUI", "MapKit", "CoreLocation", "CoreMotion", "Swift Charts", "MVVM"],
    repoLink: "https://github.com/Adonias-hibeste/cadence-showcase",
    imageUrl: "/projects/cadence/cadence_dashboard.png",
    screenshots: ["/projects/cadence/cadence_dashboard.png", "/projects/cadence/cadence_tracker.png", "/projects/cadence/cadence_summary.png"],
    features: ["MapKit Route Rendering: Live tracking using MKPolyline over custom MapKit interfaces.", "Custom Pace Charting: Sophisticated pace splits charts built completely from native SwiftUI primitives.", "AI Coach Analysis: Contextual breakdowns of run performance (Heart Rate Zones) in a frosted UI."],
    architecture: "Native iOS (Swift) · MapKit · CoreLocation · MVVM",
    order: 19
  },
  {
    id: "roomy",
    title: "Roomy AR Interior Designer",
    role: "Lead iOS & AR Engineer",
    problem: "Visualizing furniture layouts in AR is clunky without intuitive gesture physics, style recommendations, and real-time spatial evaluation.",
    outcome: "Shipped an ARKit iOS application with custom DragGesture physics, pre-styled Japandi/Mid-Century presets, and simulated AR layouts.",
    description: "A Premium tier augmented reality interior design iOS application. Features simulated server-side AI-powered layout assessments, custom DragGesture physics for real-time furniture placement, and a premium Glassmorphism UI.",
    technologies: ["SwiftUI", "Swift 5.0", "ARKit", "RealityKit", "SceneKit", "Xcodegen", "MVVM"],
    repoLink: "https://github.com/Adonias-hibeste/roomy-ar-designer",
    imageUrl: "/projects/roomy/roomy_discover.png",
    screenshots: ["/projects/roomy/roomy_discover.png", "/projects/roomy/roomy_scan.png", "/projects/roomy/roomy_ai_layout.png"],
    features: ["AI Room Assessment: Simulates complex server-side interior design algorithms on-device.", "Interactive AR Placements: Fluid DragGesture physics to manually organize furniture layouts.", "Trending Aesthetics Dashboard: Photorealistic layout discovery with Japandi and Mid-Century styles.", "Premium Glassmorphism UI: Beautiful frosted glass overlay elements using `.ultraThinMaterial`."],
    architecture: "Native iOS (Swift) · ARKit · MVVM",
    order: 20
  },
  {
    id: "briefing",
    title: "Briefing AI Document Workspace",
    role: "Senior Frontend & AI Developer",
    problem: "Analyzing dense corporate documents is slow and tedious without visual aids to extract key action items, summaries, and conversational context.",
    outcome: "Created a spatial Next.js interface with Framer Motion transitions, real-time ingestion simulation, and a streaming document-anchored AI chat.",
    description: "A highly interactive, Premium enterprise document intelligence platform built with Next.js and Tailwind CSS v4. Features automated ingestion simulations, smart semantic entity extraction, and a real-time generative AI streaming chat that contextually anchors to the active document.",
    technologies: ["Next.js 16", "Tailwind CSS v4", "Framer Motion", "TypeScript", "React 19"],
    repoLink: "https://github.com/Adonias-hibeste/briefing-ai",
    imageUrl: "/projects/briefing/briefing.png",
    screenshots: ["/projects/briefing/briefing.png"],
    features: ["Fluid Spatial Interface: Handcrafted, glassmorphic UI using Tailwind CSS v4 and Framer Motion layout transitions.", "Automated Ingestion Simulation: A progressive file analysis simulation visualizing metadata extraction and semantic embeddings.", "Smart Insight Extraction: Automatically isolates Executive Summaries, Key Entities, and Action Items.", "Generative AI Streaming Chat: Embedded AI chatbot simulating token-by-token streaming responses.", "Interactive Annotations: Highlighted document tokens act as triggers to query the AI directly."],
    architecture: "Next.js (App Router) · Framer Motion · Tailwind CSS v4 · Zero-Trust UI Simulation",
    order: 21
  },
  {
    id: "swell",
    title: "Swell AI Headless E-Commerce",
    role: "Senior Frontend Architect",
    problem: "E-commerce apps often feel static. They fail to guide users dynamically based on their mood, style preferences, or conversational prompts.",
    outcome: "Designed a dark-luxury headless store in Next.js. Integrated a Gemini-powered Stylist that dynamically greyscales irrelevant products in real-time.",
    description: "A highly sophisticated 'Premium' tier headless e-commerce workspace featuring a Dark Luxury aesthetic. Deeply integrates a Gemini-powered AI Personal Stylist that simulates real-time contextual reasoning, dynamically filtering and highlighting recommended products via fluid spatial layout transitions.",
    technologies: ["Next.js 16", "Tailwind CSS v4", "Framer Motion", "TypeScript", "Generative AI", "React 19"],
    repoLink: "https://github.com/Adonias-hibeste/swell-commerce",
    imageUrl: "/projects/swell/swell.png",
    screenshots: ["/projects/swell/swell.png"],
    features: ["Dark Luxury Aesthetic: Handcrafted, immersive dark theme using absolute deep blacks, frosted glass overlays, and muted amber accents.", "AI Personal Shopper: Conversational assistant dynamically highlights relevant styles and greyscales unmatched products in real time.", "Fluid Micro-Interactions: Physics-based 3D hover effects, staggered grid entrances, and fluid layout filtering powered by Framer Motion.", "Simulated Generative Output: Contextual AI rationale streaming visualization.", "Performant Headless Frontend: Architected for instantaneous transitions and minimal layout shifting."],
    architecture: "Next.js (App Router) · Framer Motion · Tailwind CSS v4 · AI Integration",
    order: 22
  },
  {
    id: "height",
    title: "Height — Real-Time AI Kanban Board",
    role: "Lead Full-Stack & AI Engineer",
    problem: "Creating project management tickets, sizing them, and organizing sprints is a manual time sink for product managers and engineering leads.",
    outcome: "Built an obsidian-black Next.js Kanban board with a built-in AI PM. Describe a goal in English, and the app streams formatted tickets with story points in real-time.",
    description: "A professional, real-time Kanban project management tool featuring a built-in AI Product Manager. It generates a full set of Kanban tickets from plain English feature goals—complete with story point estimates, assignees, and label tags streamed in real time. Built with Next.js App Router, TypeScript, and a Deep Space blue design system using Tailwind CSS v4. Features native HTML5 drag-and-drop, sprint velocity tracking, and an instant full-text search.",
    technologies: ["Next.js 16", "TypeScript", "Tailwind CSS v4", "React State", "HTML5 Drag & Drop API", "Framer Motion", "Google Gemini AI"],
    repoLink: "https://github.com/Adonias-hibeste/height-kanban",
    imageUrl: "/projects/height/height_board.png",
    screenshots: ["/projects/height/height_board.png", "/projects/height/height_ai_modal.png"],
    features: ["AI Product Manager: Describe a feature goal in plain English and the AI generates a full set of Kanban tickets streamed in real time.", "Drag-and-Drop Kanban: Native HTML5 drag-and-drop for smooth, performant card movement.", "Sprint Velocity Tracking: Live progress bar tracking completed story points vs total sprint points. AI Insight widget predicts sprint completion date.", "Real-Time Search: Instant full-text filtering across all columns by ticket title, label, or ID without debounce delay.", "Deep Space Design System: Professional, tech-forward dark theme with glowing accents and frosted glass-morphism panels."],
    architecture: "Next.js (App Router) · React State · Tailwind CSS v4 · HTML5 Drag & Drop",
    order: 23
  },
  {
    id: "fare",
    title: "Fare",
    role: "Lead Mobile Developer",
    problem: "Traditional ride-hailing apps lack premium dark-mode aesthetics and rely on expensive map APIs.",
    outcome: "Built a visually stunning ride-hailing experience utilizing OpenStreetMap and custom flutter_map integrations.",
    description: "A Premium tier ride-hailing application featuring a real interactive OpenStreetMap integration via flutter_map, realistic simulated driver movement, dynamic pricing AI insights, and a highly polished dark-themed user profile with a digital wallet interface.",
    technologies: ["Flutter 3.x", "Dart", "flutter_map", "flutter_animate", "latlong2"],
    imageUrl: "/projects/fare/fare_discover.png",
    screenshots: [
      "/projects/fare/fare_discover.png",
      "/projects/fare/fare_activity.png",
      "/projects/fare/fare_profile.png"
    ],
    features: ["Interactive OpenStreetMap integration", "Simulated driver movement", "Dynamic pricing AI insights", "Premium digital wallet interface"],
    architecture: "Flutter · flutter_map · OpenStreetMap",
    order: 24
  },
  {
    id: "tunnel-vpn",
    title: "Tunnel VPN",
    role: "Lead Flutter Engineer",
    problem: "Most VPN apps have cluttered interfaces and feel sluggish when connecting, failing to provide a seamless and premium user experience.",
    outcome: "Designed a minimalist, high-velocity dark theme UI with fluid glowing animations and one-tap secure connectivity.",
    description: "A Premium tier, high-performance VPN application featuring a deep minimalist dark-theme UI, one-tap secure connectivity with a glowing pulse animation, and real-time speed monitoring.",
    technologies: ["Flutter", "Dart", "flutter_animate"],
    imageUrl: "/projects/vpn.png",
    screenshots: [
      "/projects/vpn.png",
      "/projects/vpn_nodes.png",
      "/projects/vpn_stats.png"
    ],
    features: ["High-Velocity minimalist UI", "Fluid glowing connection animations", "Real-time speed monitoring", "One-tap secure connectivity"],
    architecture: "Flutter · Feature-First",
    order: 26
  }
];

export async function getMergedProjects() {
  let dbProjects: any[] = [];
  try {
    dbProjects = await prisma.project.findMany({
      orderBy: { order: "asc" },
    });
  } catch (e) {
    console.warn("DB connection failed in getMergedProjects, using fallback projects.");
    return showcaseProjects.map(p => ({
        ...p,
        isEnterprise: ENTERPRISE_KEYWORDS.some(kw => p.title.toLowerCase().includes(kw) || p.id.toLowerCase().includes(kw)),
    }));
  }

  const uniqueProjectsMap = new Map();
  showcaseProjects.forEach(p => {
    const isEnterprise = ENTERPRISE_KEYWORDS.some(kw => p.title.toLowerCase().includes(kw) || p.id.toLowerCase().includes(kw));
    uniqueProjectsMap.set(p.title.toLowerCase().trim(), { ...p, isEnterprise });
  });

  const BANNED_PROJECTS = [
    'swift calendar', 'dating app', 'urban taxi', 'social media app',
    'ecommerce app', 'express delivery', 'meditrack pro', 'swiftui chat', 'financeflow', 'secure vpn'
  ];

  dbProjects.forEach(p => {
    const dbTitle = p.title.toLowerCase().trim();
    if (BANNED_PROJECTS.some(kw => dbTitle.includes(kw))) return;

    const isEnterprise = ENTERPRISE_KEYWORDS.some(kw => dbTitle.includes(kw));
    
    // Find matching showcase project key using fuzzy logic
    let bestMatchKey = null;
    let bestScore = 0;

    for (const showcaseKey of uniqueProjectsMap.keys()) {
      if (showcaseKey === dbTitle) {
        bestMatchKey = showcaseKey;
        bestScore = 1.0;
        break;
      }

      const t1 = showcaseKey.replace(/[^a-z0-9]/g, ' ').split(/\s+/).filter(Boolean);
      const t2 = dbTitle.replace(/[^a-z0-9]/g, ' ').split(/\s+/).filter(Boolean);
      if (t1.length === 0 || t2.length === 0) continue;

      // Ensure the first word matches approximately (e.g., sharing prefix or brand name)
      const firstWordMatch = t1[0] === t2[0] ||
        t1[0].startsWith(t2[0]) || t2[0].startsWith(t1[0]) ||
        (t1[0].slice(0, 5) === t2[0].slice(0, 5));

      if (!firstWordMatch) continue;

      const [short, long] = t1.length < t2.length ? [t1, t2] : [t2, t1];
      let matches = 0;
      short.forEach((word: string) => {
        if (long.includes(word)) matches++;
      });

      const score = matches / short.length;
      if (score > bestScore) {
        bestScore = score;
        bestMatchKey = showcaseKey;
      }
    }

    if (bestMatchKey && bestScore >= 0.5) {
      const showcase = uniqueProjectsMap.get(bestMatchKey);
      uniqueProjectsMap.set(bestMatchKey, {
        ...p,
        ...showcase,
        id: showcase.id || p.id,
        title: showcase.title, // Keep clean showcase title
        imageUrl: showcase.imageUrl || p.imageUrl,
        features: showcase.features || p.features,
        architecture: showcase.architecture || p.architecture,
        screenshots: (showcase.screenshots && showcase.screenshots.length > 0) ? showcase.screenshots : p.screenshots,
        isEnterprise: isEnterprise || showcase.isEnterprise
      });
    } else {
      uniqueProjectsMap.set(dbTitle, { ...p, isEnterprise });
    }
  });

  return Array.from(uniqueProjectsMap.values())
    .filter((p: any) => p.imageUrl && p.imageUrl.trim() !== "");
}

export async function getProjectById(id: string) {
    const projects = await getMergedProjects();
    return projects.find(p => p.id === id);
}

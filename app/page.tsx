import { prisma } from "@/lib/prisma";
import HomeContent from "./HomeContent";

export const dynamic = "force-dynamic";

export default async function Home() {
  let projects: any[] = [];
  let skills: any[] = [];

  const showcaseProjects = [
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
      title: "Bite Ecosystem",
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
      title: "Slate — AI Smart Notebook",
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
        // Showcase is the source of truth — only pull in DB fields that showcase doesn't define
        uniqueProjectsMap.set(title, {
          ...(p as any),  // DB base (order, liveLink, etc.)
          ...showcase,    // Showcase ALWAYS wins for everything it has
          description: showcase.description || p.description,
          features: showcase.features && showcase.features.length > 0 ? showcase.features : [],
          architecture: showcase.architecture || "",
          imageUrl: showcase.imageUrl || p.imageUrl,
          screenshots: (showcase.screenshots && showcase.screenshots.length > 0) ? showcase.screenshots : (p.screenshots || []),
          technologies: (showcase.technologies && showcase.technologies.length > 0) ? showcase.technologies : p.technologies,
        });
      } else {
        uniqueProjectsMap.set(title, p);
      }
    });

    projects = Array.from(uniqueProjectsMap.values());

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

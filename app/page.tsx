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
      description: "A production-grade digital wallet and cryptocurrency simulator. Features biometric security locks, real-time balance history charts, dynamic exchange rates, instant peer-to-peer transfers, and a simulated trading engine. Built with React Native, Expo, Zustand state management, and custom animated UI components.",
      technologies: ["React Native", "Expo", "TypeScript", "Zustand", "Reanimated 3"],
      repoLink: "https://github.com/Adonias-hibeste/velo-wallet",
      imageUrl: "/projects/velo/velo_dashboard_dark.png",
      screenshots: [
        "/projects/velo/velo_lock.png",
        "/projects/velo/velo_dashboard_dark.png",
        "/projects/velo/velo_dashboard_light.png",
        "/projects/velo/velo_send.png",
        "/projects/velo/velo_crypto.png"
      ],
      order: 12
    },
    {
      id: "gymflow",
      title: "Gymflow — AI Workout Coach",
      description: "A high-performance AI-powered personalized workout planner and fitness coach. Features real-time workout tracking, physiological sensor simulation, an interactive AI fitness coach chat, and visual historical progress charts. Built with React Native, Expo, Zustand state management, and custom vector UI elements.",
      technologies: ["React Native", "Expo", "TypeScript", "Zustand", "Reanimated 3", "Gemini API"],
      repoLink: "https://github.com/Adonias-hibeste/gymflow",
      imageUrl: "/projects/gymflow/dashboard.png",
      screenshots: [
        "/projects/gymflow/dashboard.png",
        "/projects/gymflow/workout.png",
        "/projects/gymflow/coach.png",
        "/projects/gymflow/history.png"
      ],
      order: 13
    },
    {
      id: "acre",
      title: "Acre - Real Estate Showcase",
      description: "A premium React Native & Expo real estate marketplace application showcasing enterprise-grade property browsing, search, and discovery capabilities. Features immersive property galleries, interactive category filtering, and a professional Executive Slate & Sapphire design language.",
      technologies: ["React Native", "Expo", "TypeScript", "Zustand", "Lucide React Native"],
      repoLink: "https://github.com/Adonias-hibeste/acre-realestate",
      imageUrl: "/projects/acre/acre_discover.png",
      screenshots: [
        "/projects/acre/acre_discover.png",
        "/projects/acre/acre_detail.png",
        "/projects/acre/acre_saved.png"
      ],
      order: 14
    }
  ];

  try {
    const dbProjects = await prisma.project.findMany({
      orderBy: { order: "asc" },
    });

    // Merge DB projects (Enterprise) with our Showcase projects
    const combinedProjects = [...dbProjects, ...showcaseProjects];
    const uniqueProjectsMap = new Map();
    combinedProjects.forEach(p => {
      const title = p.title.toLowerCase().trim();
      if (!uniqueProjectsMap.has(title)) {
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

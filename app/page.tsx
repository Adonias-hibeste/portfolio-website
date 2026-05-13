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
      order: 1
    },
    {
      id: "swift-calendar",
      title: "Swift Calendar",
      description: "A professional iOS-style calendar and scheduling app built with Flutter. Features a clean Cupertino design, intuitive event management, and smooth animations.",
      technologies: ["Flutter", "Cupertino UI", "Dart", "Local Storage"],
      repoLink: "https://github.com/Adonias-hibeste/Swift-Calender-App-",
      imageUrl: "/projects/calendar.png",
      order: 2
    },
    {
      id: "dating-app",
      title: "Dating App",
      description: "A modern, high-fidelity dating application built with React Native. Features a sophisticated Cyber-Amber UI, swipe-to-match architecture, and premium animations.",
      technologies: ["React Native", "Expo", "Reanimated 3", "TypeScript"],
      repoLink: "https://github.com/Adonias-hibeste/React-Native-Dating-App-",
      imageUrl: "/projects/dating.png",
      order: 3
    },
    {
      id: "urban-taxi",
      title: "Urban Taxi",
      description: "A high-fidelity ride-hailing application with a professional black and yellow theme. Features real-time map integration, ride selection, and fare estimation.",
      technologies: ["Flutter", "Google Maps", "Riverpod", "Geolocation"],
      repoLink: "https://github.com/Adonias-hibeste/Flutter-Taxi-App",
      imageUrl: "/projects/taxi.png",
      order: 4
    },
    {
      id: "social-media-app",
      title: "Social Media App",
      description: "A vibrant social networking application with a clean, modern UI. Features story bubbles, a rich media feed, and high-performance interactive components.",
      technologies: ["Flutter", "Riverpod", "Cached Image", "Social UI"],
      repoLink: "https://github.com/Adonias-hibeste/Flutter-Social-Network-App",
      imageUrl: "/projects/social.png",
      order: 5
    },
    {
      id: "ecommerce-app",
      title: "Ecommerce App",
      description: "A premium e-commerce marketplace featuring a minimalist 'Apple Store' aesthetic. Optimized for product discovery with a high-end black and gold theme.",
      technologies: ["Flutter", "Riverpod", "E-commerce", "Clean Architecture"],
      repoLink: "https://github.com/Adonias-hibeste/Eccomerce-App-",
      imageUrl: "/projects/ecommerce.png",
      order: 6
    },
    {
      id: "express-delivery",
      title: "Express Delivery",
      description: "A fresh and energetic food/logistics delivery application. Features location-aware restaurant discovery, trending deals, and real-time order tracking UI.",
      technologies: ["Flutter", "Riverpod", "Delivery UI", "Real-time Tracking"],
      repoLink: "https://github.com/Adonias-hibeste/Flutter-Delivery-app-",
      imageUrl: "/projects/delivery.png",
      order: 7
    },
    {
      id: "meditrack-pro",
      title: "Meditrack Pro",
      description: "AI-driven healthcare companion for vitals tracking and symptom analysis. Built with Flutter and BLoC for high-performance medical data management.",
      technologies: ["Flutter", "BLoC", "Firebase", "HealthKit"],
      repoLink: "https://github.com/Adonias-hibeste/flutter-meditrack-pro",
      imageUrl: "/projects/meditrack.png",
      order: 8
    },
    {
      id: "swiftui-chat",
      title: "SwiftUI Chat",
      description: "A real-time messaging application with end-to-end encryption. Features premium iOS aesthetics, blur effects, and high-performance socket integration.",
      technologies: ["SwiftUI", "Combine", "CryptoKit", "WebSockets"],
      repoLink: "https://github.com/Adonias-hibeste/swiftui-chat-app",
      imageUrl: "/projects/chat.png",
      order: 9
    },
    {
      id: "finance-flow",
      title: "FinanceFlow",
      description: "A personal finance and expense tracking application with biometric security. Features interactive data visualization and Core Data persistence.",
      technologies: ["SwiftUI", "Swift Charts", "Core Data", "Local Auth"],
      repoLink: "https://github.com/Adonias-hibeste/swift-financeflow-ios",
      imageUrl: "/projects/finance.png",
      order: 10
    }
  ];

  try {
    const dbProjects = await prisma.project.findMany({
      orderBy: { order: "asc" },
    });

    // Merge DB projects (Enterprise) with our Showcase projects
    projects = [...dbProjects, ...showcaseProjects];

    skills = await prisma.skill.findMany({
      orderBy: { order: "asc" },
    });
  } catch (e) {
    console.warn("DB connection failed in Home, using fallback projects.");
    projects = showcaseProjects;
  }

  return <HomeContent projects={projects} skills={skills} />;
}

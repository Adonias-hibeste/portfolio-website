import { prisma } from "@/lib/prisma";
import { ClientProjectShowcase, ProjectData } from "@/components/ClientProjectShowcase";

export const dynamic = "force-dynamic";

async function getProjects() {
    try {
        const projects = await prisma.project.findMany({
            orderBy: { order: "asc" },
        });
        return projects;
    } catch (error) {
        console.error("Failed to fetch projects:", error);
        return [];
    }
}

export default async function ProjectsPage() {
    const dbProjects = await getProjects();
    
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
            title: "Bite — Multivendor Delivery Suite",
            description: "An enterprise-grade multivendor food delivery platform showcase application. Features synchronized role-based modules for Client, Vendor, Driver, and Manager portals, integrated with simulated GPS telemetry, real-time status transitions, and robust BI dashboards. Built with a premium beU-inspired neon green and charcoal theme.",
            technologies: ["React Native", "Expo", "TypeScript", "Zustand", "Lucide React Native"],
            repoLink: "https://github.com/Adonias-hibeste/bite-delivery",
            imageUrl: "/projects/bite/bite_client.png",
            screenshots: [
                "/projects/bite/bite_roles.png",
                "/projects/bite/bite_client.png",
                "/projects/bite/bite_vendor.png",
                "/projects/bite/bite_driver.png",
                "/projects/bite/bite_manager.png"
            ],
            features: [
                "Synchronized Role Modules: Fully simulated flows for Client, Vendor, Driver, and Manager interfaces.",
                "Real-Time Telemetry & Tracking: Simulated GPS delivery progress and driver assignment maps.",
                "Live Status Transitions: Order states (Preparing, Dispatched, Delivered) synchronized in real-time.",
                "Robust BI Dashboard: In-app managers' analytics interface showing performance charts."
            ],
            architecture: "React Native (Expo) · Zustand Store · Reanimated 3 · Clean Architecture",
            order: 15
        },
        {
            id: "slate",
            title: "Slate — AI Smart Notebook",
            description: "A native Android smart notebook with AI copilot chat, interactive mind map graph, voice recorder with live waveform visualizer, and custom Canvas analytics charts. Built with Kotlin and Jetpack Compose.",
            technologies: ["Kotlin", "Jetpack Compose", "Material 3", "Coroutines", "Canvas API", "Android SDK"],
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
                "AI Copilot Chat: Contextual smart note assistant integrated directly inside the text editor.",
                "Interactive Mind Map Graph: Renders an active node network linking notes visually using custom Canvas math.",
                "Live Waveform Voice Recorder: Record audio notes with real-time waveform visualization.",
                "Canvas Analytics: Rich custom charts detailing note-taking velocity and category distributions."
            ],
            architecture: "Native Android (Kotlin) · Jetpack Compose · Coroutines & Flow · Clean Architecture",
            order: 16
        }
    ];

    const ENTERPRISE_KEYWORDS = ['doulado', 'sefere', 'hababond', 'hababbond', 'hababondlite', 'hababbondlite'];
    
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
                features: showcase.features,
                architecture: showcase.architecture,
                screenshots: (showcase.screenshots && showcase.screenshots.length > 0) ? showcase.screenshots : p.screenshots,
            });
        } else {
            uniqueProjectsMap.set(title, p);
        }
    });
    
    const uniqueProjects = Array.from(uniqueProjectsMap.values());

    const filteredProjects: ProjectData[] = uniqueProjects
        .filter((p: any) => {
            const titleLower = p.title.toLowerCase();
            return !ENTERPRISE_KEYWORDS.some(kw => titleLower.includes(kw));
        })
        .map((p: any) => {
            // Map screenshots to the format expected by the UI
            const screenshots = p.screenshots && p.screenshots.length > 0 
                ? p.screenshots.map((src: string) => ({ src, label: "Screenshot" }))
                : [];

            return {
                id: p.id,
                title: p.title,
                type: "Open Source",
                category: p.title.toLowerCase().includes('app') || 
                         p.technologies.includes('Flutter') || 
                         p.technologies.includes('React Native') ||
                         p.technologies.includes('SwiftUI') ||
                         p.technologies.includes('Swift') ||
                         p.technologies.includes('Kotlin') ||
                         p.technologies.includes('Jetpack Compose') ? "mobile" : "web",
                tagline: p.description.split('.')[0] + '.',
                desc: p.description.length < 50 ? `${p.description}. A high-performance solution built with professional standards and modern best practices.` : p.description,
                stack: p.technologies,
                features: p.features,
                architecture: p.architecture,
                imageUrl: p.imageUrl,
                screenshots: screenshots,
                liveLink: p.liveLink,
                repoLink: p.repoLink || p.githubLink,
                isEnterprise: false
            };
        });

    // Implement alternating sort: Flutter -> React Native -> Swift -> Repeat
    const flutterProjects = filteredProjects.filter(p => p.stack.some(s => s.toLowerCase().includes('flutter')));
    const rnProjects = filteredProjects.filter(p => p.stack.some(s => s.toLowerCase().includes('react native')));
    const swiftProjects = filteredProjects.filter(p => p.stack.some(s => s.toLowerCase().includes('swift')));
    const otherProjects = filteredProjects.filter(p => !flutterProjects.includes(p) && !rnProjects.includes(p) && !swiftProjects.includes(p));

    const sortedProjects: ProjectData[] = [];
    const maxLength = Math.max(flutterProjects.length, rnProjects.length, swiftProjects.length, otherProjects.length);

    for (let i = 0; i < maxLength; i++) {
        if (flutterProjects[i]) sortedProjects.push(flutterProjects[i]);
        if (rnProjects[i]) sortedProjects.push(rnProjects[i]);
        if (swiftProjects[i]) sortedProjects.push(swiftProjects[i]);
        if (otherProjects[i]) sortedProjects.push(otherProjects[i]);
    }

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-background text-foreground">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white uppercase tracking-widest">
                        All <span className="text-primary">Projects</span>
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        A complete collection of enterprise client work, mobile applications, and web projects.
                    </p>
                </div>

                {/* Enterprise Client Projects — Case Study Grid (Top) */}
                <div className="mb-20">
                    <h2 className="text-2xl font-bold text-white uppercase tracking-widest mb-2 text-center">
                        Enterprise Client <span className="text-primary">Work</span>
                    </h2>
                    <p className="text-gray-500 text-sm text-center mb-10">
                        Production apps built for real clients — click any project to view the full case study
                    </p>
                    <ClientProjectShowcase />
                </div>

                {/* Alternating Showcase Grid */}
                <div>
                    <h2 className="text-2xl font-bold text-white uppercase tracking-widest mb-2 text-center">
                        Open Source & <span className="text-primary">Showcase</span>
                    </h2>
                    <p className="text-gray-500 text-sm text-center mb-10">
                        Public projects and technical demonstrations — organized by expertise (Flutter, React Native, Swift)
                    </p>
                    <ClientProjectShowcase projects={sortedProjects} showFilters={true} />
                </div>
            </div>
        </div>
    );
}

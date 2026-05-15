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
        }
    ];

    const ENTERPRISE_KEYWORDS = ['doulado', 'sefere', 'hababond', 'hababbond', 'hababondlite', 'hababbondlite'];
    
    const combinedProjects = [...dbProjects, ...showcaseProjects];

    const filteredProjects: ProjectData[] = combinedProjects
        .filter((p: any) => {
            const titleLower = p.title.toLowerCase();
            return !ENTERPRISE_KEYWORDS.some(kw => titleLower.includes(kw));
        })
        .map((p: any) => {
            // Generate intelligent highlights (features) if missing
            const features = [
                `Built with ${p.technologies.slice(0, 3).join(', ')}`,
                "Responsive and high-performance architecture",
                "Clean code and modular design patterns"
            ];

            if (p.technologies.includes('Flutter') || p.technologies.includes('SwiftUI') || p.technologies.includes('Swift')) {
                features.push("Cross-platform mobile delivery");
                features.push("Smooth 60fps animations & UI");
            } else if (p.technologies.includes('React') || p.technologies.includes('Next.js')) {
                features.push("Modern React hooks and state management");
                features.push("SEO optimized and fast loading");
            }

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
                         p.technologies.includes('Swift') ? "mobile" : "web",
                tagline: p.description.split('.')[0] + '.',
                desc: p.description.length < 50 ? `${p.description}. A high-performance solution built with professional standards and modern best practices.` : p.description,
                stack: p.technologies,
                features: features,
                imageUrl: p.imageUrl,
                screenshots: screenshots,
                liveLink: p.liveLink,
                repoLink: p.repoLink || p.githubLink,
                isEnterprise: false
            };
        });

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

                {/* DB Projects Grid (Below) — Now with Case Studies */}
                {filteredProjects.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-bold text-white uppercase tracking-widest mb-2 text-center">
                            Open Source & <span className="text-primary">Showcase</span>
                        </h2>
                        <p className="text-gray-500 text-sm text-center mb-10">
                            Public projects and technical demonstrations — now featuring full case studies
                        </p>
                        <ClientProjectShowcase projects={filteredProjects} showFilters={false} />
                    </div>
                )}
            </div>
        </div>
    );
}

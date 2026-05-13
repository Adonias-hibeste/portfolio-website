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
    
    const ENTERPRISE_KEYWORDS = ['doulado', 'sefere', 'hababond', 'hababbond', 'hababondlite', 'hababbondlite'];
    
    const filteredProjects: ProjectData[] = dbProjects
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

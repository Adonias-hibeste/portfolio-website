import { prisma } from "@/lib/prisma";
import { ClientProjectShowcase, ProjectData } from "@/components/ClientProjectShowcase";
import { getMergedProjects, ENTERPRISE_KEYWORDS } from "@/lib/data/projects";

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
    
    // uniqueProjects logic is now handled in getMergedProjects
    let uniqueProjects = await getMergedProjects();

    const filteredProjects: ProjectData[] = uniqueProjects
        .filter((p: any) => p.imageUrl && p.imageUrl.trim() !== "")
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
                         p.technologies.some((t: string) => t.toLowerCase().includes('flutter')) || 
                         p.technologies.some((t: string) => t.toLowerCase().includes('react native')) ||
                         p.technologies.some((t: string) => t.toLowerCase().includes('swiftui')) ||
                         p.technologies.some((t: string) => t.toLowerCase().includes('swift')) ||
                         p.technologies.some((t: string) => t.toLowerCase().includes('kotlin')) ||
                         p.technologies.some((t: string) => t.toLowerCase().includes('jetpack compose')) ? "mobile" : "web",
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

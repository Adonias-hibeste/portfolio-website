import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { CVTemplate } from "@/components/CVTemplate";
import { prisma } from "@/lib/prisma";

// Force dynamic rendering since we use request.url
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    try {
        // Check if this is a download request
        const { searchParams } = new URL(request.url);
        const isDownload = searchParams.get('download') === 'true';

        // Fetch portfolio data from database
        const [skills, projects, experiences, educations, profile] = await Promise.all([
            prisma.skill.findMany({
                orderBy: { order: "asc" },
            }),
            prisma.project.findMany({
                orderBy: { order: "asc" },
                take: 5, // Top 5 projects
            }),
            prisma.experience.findMany({
                orderBy: { startDate: "desc" },
            }),
            prisma.education.findMany({
                orderBy: { startDate: "desc" },
            }),
            prisma.profile.findFirst(),
        ]);

        // Prepare CV data
        const origin = new URL(request.url).origin;
        let avatarUrl = profile?.avatarUrl;

        // Handle relative URLs for avatar
        if (avatarUrl && avatarUrl.startsWith('/')) {
            avatarUrl = `${origin}${avatarUrl}`;
        }

        // Validate URL format
        try {
            if (avatarUrl) {
                new URL(avatarUrl);
            }
        } catch (e) {
            console.warn("Invalid avatar URL, falling back to initials:", avatarUrl);
            avatarUrl = null;
        }

        const cvData = {
            name: (profile as any)?.name || "Adonias Hibeste",
            title: (profile as any)?.title || "Senior Mobile Architect",
            email: (profile as any)?.email || "Adoniashibestegithub@gmail.com",
            phone: (profile as any)?.phone || "+251 XXX XXX XXX",
            location: (profile as any)?.location || "Addis Ababa, Ethiopia",
            summary: (profile as any)?.cvSummary || (profile as any)?.bio || "",
            avatarUrl: avatarUrl,
            website: (profile as any)?.website,
            github: (profile as any)?.github,
            linkedin: (profile as any)?.linkedin,
            telegram: (profile as any)?.telegram,
            skills: skills.map((skill: any) => ({ name: skill.name })),
            projects: projects.map((project: any) => ({
                title: project.title,
                description: project.description,
                technologies: project.technologies,
                liveLink: project.liveLink || undefined,
                githubLink: project.githubLink || undefined,
            })),
            experiences: experiences.map((exp: any) => ({
                position: exp.position,
                company: exp.company,
                location: exp.location || undefined,
                startDate: exp.startDate.toISOString(),
                endDate: exp.endDate?.toISOString(),
                current: exp.current,
                description: exp.description,
            })),
            educations: educations.map((edu: any) => ({
                institution: edu.institution,
                degree: edu.degree,
                field: edu.field,
                location: edu.location || undefined,
                startDate: edu.startDate.toISOString(),
                endDate: edu.endDate?.toISOString(),
                current: edu.current,
                description: edu.description || undefined,
            })),
        };

        console.log("Generating CV with data:", JSON.stringify(cvData, null, 2));

        // Generate PDF
        const pdfBuffer = await renderToBuffer(<CVTemplate data={cvData} />);

        console.log("PDF generated, size:", pdfBuffer.length);

        // Return PDF with appropriate headers
        return new NextResponse(pdfBuffer as any, {
            headers: {
                "Content-Type": "application/pdf",
                "Content-Length": pdfBuffer.length.toString(),
                "Content-Disposition": isDownload
                    ? `attachment; filename="Adonias_Hibeste_CV.pdf"`
                    : "inline",
            },
        });
    } catch (error) {
        console.error("CV generation error:", error);
        return NextResponse.json(
            { error: "Failed to generate CV" },
            { status: 500 }
        );
    }
}

import { prisma } from "@/lib/prisma";
import CVPreviewClient from "./CVPreviewClient";

// Force dynamic rendering to avoid build-time database connection issues
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function CVPage() {
    try {
        const [skills, projects, experiences, educations, profile] = await Promise.all([
            prisma.skill.findMany({
                orderBy: { order: "asc" },
            }),
            prisma.project.findMany({
                orderBy: { order: "asc" },
                take: 5,
            }),
            prisma.experience.findMany({
                orderBy: { startDate: "desc" },
            }),
            prisma.education.findMany({
                orderBy: { startDate: "desc" },
            }),
            prisma.profile.findFirst(),
        ]);

        return <CVPreviewClient experiences={experiences} educations={educations} profile={profile} skills={skills} projects={projects} />;
    } catch (error) {
        console.error("Error loading CV data:", error);
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Unable to load CV</h1>
                    <p className="text-gray-600">Please try again later.</p>
                </div>
            </div>
        );
    }
}

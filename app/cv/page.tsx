import { prisma } from "@/lib/prisma";
import CVPreviewClient from "./CVPreviewClient";

export default async function CVPage() {
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
}

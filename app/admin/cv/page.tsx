import { getExperiences, getEducations, getProfile, getCVProjects } from "@/lib/data";
import { prisma } from "@/lib/prisma";
import { AdminCVClient } from "./AdminCVClient";

export const dynamic = "force-dynamic";

export default async function AdminCVPage() {
    const [experiences, educations, profile, skills, cvProjects] = await Promise.all([
        getExperiences(),
        getEducations(),
        getProfile(),
        prisma.skill.findMany({ orderBy: { order: "asc" } }),
        getCVProjects(),
    ]);

    return <AdminCVClient experiences={experiences} educations={educations} profile={profile} skills={skills} cvProjects={cvProjects} />;
}


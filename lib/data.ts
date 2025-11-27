import { prisma } from "@/lib/prisma";

export async function getExperiences() {
    try {
        const experiences = await prisma.experience.findMany({
            orderBy: { startDate: "desc" },
        });
        return experiences;
    } catch (error) {
        console.error("Failed to fetch experiences:", error);
        return [];
    }
}

export async function getEducations() {
    try {
        const educations = await prisma.education.findMany({
            orderBy: { startDate: "desc" },
        });
        return educations;
    } catch (error) {
        console.error("Failed to fetch educations:", error);
        return [];
    }
}

export async function getProfile() {
    try {
        const profile = await prisma.profile.findFirst();
        return profile;
    } catch (error) {
        console.error("Failed to fetch profile:", error);
        return null;
    }
}

export async function getCVProjects() {
    try {
        const cvProjects = await prisma.cVProject.findMany({
            orderBy: { order: "asc" },
        });
        return cvProjects;
    } catch (error) {
        console.error("Failed to fetch CV projects:", error);
        return [];
    }
}

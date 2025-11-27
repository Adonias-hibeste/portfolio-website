"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { signOut } from "@/auth";

export async function signOutAction() {
    await signOut();
}

export async function authenticate(
    prevState: string | undefined,
    formData: FormData
) {
    try {
        await signIn("credentials", formData);
    } catch (error) {
        console.error("LOGIN ERROR:", error); // Log to Vercel console

        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return "Invalid credentials.";
                default:
                    return `Error: ${error.type}`;
            }
        }

        // If it's a Next.js redirect (success), re-throw it
        if ((error as any)?.digest?.startsWith("NEXT_REDIRECT") || (error as any)?.message === "NEXT_REDIRECT") {
            throw error;
        }

        // Otherwise, return the actual system error message
        return `System Error: ${(error as Error).message}`;
    }
}

// Project Actions
export async function createProject(data: any) {
    await prisma.project.create({
        data,
    });
    revalidatePath("/projects");
    revalidatePath("/admin/projects");
    revalidatePath("/");
}

export async function updateProject(id: string, data: any) {
    await prisma.project.update({
        where: { id },
        data,
    });
    revalidatePath("/projects");
    revalidatePath("/admin/projects");
    revalidatePath("/");
}

export async function deleteProject(id: string) {
    await prisma.project.delete({
        where: { id },
    });
    revalidatePath("/projects");
    revalidatePath("/admin/projects");
    revalidatePath("/");
}

// Skills Actions
export async function createSkill(data: { name: string; icon: string; order?: number }) {
    await prisma.skill.create({
        data: {
            name: data.name,
            icon: data.icon,
            order: data.order || 0,
        },
    });
    revalidatePath("/");
    revalidatePath("/admin/skills");
}

export async function updateSkill(id: number, data: { name: string; icon: string; order?: number }) {
    await prisma.skill.update({
        where: { id },
        data: {
            name: data.name,
            icon: data.icon,
            order: data.order,
        },
    });
    revalidatePath("/");
    revalidatePath("/admin/skills");
}

export async function deleteSkill(id: number) {
    await prisma.skill.delete({
        where: { id },
    });
    revalidatePath("/");
    revalidatePath("/admin/skills");
}

export async function reorderSkills(skillIds: number[]) {
    // Update order for each skill
    await Promise.all(
        skillIds.map((id, index) =>
            prisma.skill.update({
                where: { id },
                data: { order: index },
            })
        )
    );
    revalidatePath("/admin/skills");
}

// Experience Actions
export async function createExperience(data: any) {
    await prisma.experience.create({
        data: {
            ...data,
            startDate: new Date(data.startDate),
            endDate: data.endDate ? new Date(data.endDate) : null,
        },
    });
    revalidatePath("/admin/cv");
}

export async function updateExperience(id: string, data: any) {
    await prisma.experience.update({
        where: { id },
        data: {
            ...data,
            startDate: new Date(data.startDate),
            endDate: data.endDate ? new Date(data.endDate) : null,
        },
    });
    revalidatePath("/admin/cv");
}

export async function deleteExperience(id: string) {
    await prisma.experience.delete({
        where: { id },
    });
    revalidatePath("/admin/cv");
}

// Education Actions
export async function createEducation(data: any) {
    await prisma.education.create({
        data: {
            ...data,
            startDate: new Date(data.startDate),
            endDate: data.endDate ? new Date(data.endDate) : null,
        },
    });
    revalidatePath("/admin/cv");
}

export async function updateEducation(id: string, data: any) {
    await prisma.education.update({
        where: { id },
        data: {
            ...data,
            startDate: new Date(data.startDate),
            endDate: data.endDate ? new Date(data.endDate) : null,
        },
    });
    revalidatePath("/admin/cv");
}

export async function deleteEducation(id: string) {
    await prisma.education.delete({
        where: { id },
    });
    revalidatePath("/admin/cv");
}

// Profile Actions
export async function updateProfile(data: any) {
    // Check if profile exists, if not create one
    const profile = await prisma.profile.findFirst();

    if (profile) {
        await prisma.profile.update({
            where: { id: profile.id },
            data: data,
        });
    } else {
        await prisma.profile.create({
            data: {
                ...data,
                email: data.email || "placeholder@email.com", // Ensure required fields
                name: data.name || "Your Name",
                title: data.title || "Your Title",
            },
        });
    }
    revalidatePath("/admin/cv");
}

// CV Project Actions
export async function createCVProject(data: any) {
    await prisma.cVProject.create({
        data,
    });
    revalidatePath("/admin/cv");
}

export async function updateCVProject(id: string, data: any) {
    await prisma.cVProject.update({
        where: { id },
        data,
    });
    revalidatePath("/admin/cv");
}

export async function deleteCVProject(id: string) {
    await prisma.cVProject.delete({
        where: { id },
    });
    revalidatePath("/admin/cv");
}

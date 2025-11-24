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
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return "Invalid credentials.";
                default:
                    return `Error: ${error.type}`;
            }
        }
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
    revalidatePath("/");
    revalidatePath("/admin/skills");
}

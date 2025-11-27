import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        // Select the best connection string
        const connectionString =
            process.env.POSTGRES_PRISMA_URL ||
            process.env.POSTGRES_URL ||
            process.env.POSTGRES_URL_NON_POOLING ||
            process.env.DATABASE_URL;

        if (!connectionString) {
            throw new Error("No valid connection string found");
        }

        const prisma = new PrismaClient({
            datasources: {
                db: {
                    url: connectionString,
                },
            },
        });

        // Update or Create Profile
        // Since email is not unique in schema, we find first or create
        const existingProfile = await prisma.profile.findFirst();

        let profile;
        if (existingProfile) {
            profile = await prisma.profile.update({
                where: { id: existingProfile.id },
                data: {
                    name: "Adonias Hibeste",
                    title: "Full Stack Developer",
                    bio: "Passionate developer building amazing web applications.",
                    email: "adoniassahilehibeste12@gmail.com",
                    telegram: "@Adoni_2112",
                    linkedin: "https://www.linkedin.com/in/adonias-hibeste",
                    github: "https://github.com/Adonias-hibeste", // Assuming this from repo URL
                },
            });
        } else {
            profile = await prisma.profile.create({
                data: {
                    name: "Adonias Hibeste",
                    title: "Full Stack Developer",
                    bio: "Passionate developer building amazing web applications.",
                    email: "adoniassahilehibeste12@gmail.com",
                    telegram: "@Adoni_2112",
                    linkedin: "https://www.linkedin.com/in/adonias-hibeste",
                    github: "https://github.com/Adonias-hibeste",
                },
            });
        }

        await prisma.$disconnect();

        return NextResponse.json({
            success: true,
            message: "Profile updated successfully to Adonias Hibeste",
            profile
        });

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}

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
        const profile = await prisma.profile.upsert({
            where: { email: "adoniashibestegithub@gmail.com" },
            update: {
                name: "Adonias Hibeste",
                title: "Full Stack Developer",
                bio: "Passionate developer building amazing web applications.",
                email: "adoniashibestegithub@gmail.com",
            },
            create: {
                name: "Adonias Hibeste",
                title: "Full Stack Developer",
                bio: "Passionate developer building amazing web applications.",
                email: "adoniashibestegithub@gmail.com",
            },
        });

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

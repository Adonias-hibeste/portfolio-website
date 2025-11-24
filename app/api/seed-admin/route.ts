import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

export const dynamic = 'force-dynamic';

export async function GET() {
    const debugInfo: any = {
        envVarsFound: []
    };

    try {
        // 1. Debug: Find available connection strings
        const potentialVars = [
            "DATABASE_URL",
            "DIRECT_URL",
            "POSTGRES_URL",
            "POSTGRES_PRISMA_URL",
            "POSTGRES_URL_NON_POOLING",
            "PRISMA_DATABASE_URL"
        ];

        potentialVars.forEach(key => {
            if (process.env[key]) {
                debugInfo.envVarsFound.push(key);
                // Store the value to try connecting with it (masking it for logs)
                debugInfo[key] = process.env[key]?.substring(0, 10) + "...";
            }
        });

        // 2. Select the best connection string
        // Prefer POSTGRES_URL (Standard) or POSTGRES_URL_NON_POOLING for direct connection
        const connectionString =
            process.env.POSTGRES_URL ||
            process.env.POSTGRES_URL_NON_POOLING ||
            process.env.DATABASE_URL;

        if (!connectionString) {
            throw new Error("No valid connection string found in environment variables. Found: " + debugInfo.envVarsFound.join(", "));
        }

        // 3. Initialize Prisma explicitly with this URL
        const prisma = new PrismaClient({
            datasources: {
                db: {
                    url: connectionString,
                },
            },
        });

        // 4. Perform the Seed
        const email = "adoniashibestegithub@gmail.com";
        const password = "Adoni@#23";
        const name = "Adonias Hibeste";

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.upsert({
            where: { email },
            update: {
                password: hashedPassword,
                name,
            },
            create: {
                email,
                password: hashedPassword,
                name,
            },
        });

        await prisma.$disconnect();

        return NextResponse.json({
            success: true,
            message: "Admin user created successfully using explicit connection",
            usedConnection: connectionString.substring(0, 15) + "...",
            user: { id: user.id, email: user.email },
            debugInfo
        });

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error: error.message,
            stack: error.stack,
            debugInfo
        }, { status: 500 });
    }
}

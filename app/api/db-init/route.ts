import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export const dynamic = 'force-dynamic';

export async function GET() {
    // 1. Debug Environment
    const envDebug = {
        DATABASE_URL: process.env.DATABASE_URL ? "Exists (starts with " + process.env.DATABASE_URL.substring(0, 15) + "...)" : "MISSING",
        DIRECT_URL: process.env.DIRECT_URL ? "Exists" : "MISSING",
        NODE_ENV: process.env.NODE_ENV,
    };

    // 2. Try to connect explicitly
    const prisma = new PrismaClient();

    try {
        await prisma.$connect();
    } catch (e: any) {
        return NextResponse.json({
            success: false,
            step: "Connection Test",
            error: e.message,
            envDebug
        }, { status: 500 });
    }

    // 3. Run Migrations
    try {
        const queries = [
            `CREATE TABLE IF NOT EXISTS "Profile" ( "id" TEXT NOT NULL, "name" TEXT NOT NULL, "title" TEXT NOT NULL, "bio" TEXT, "email" TEXT NOT NULL, "phone" TEXT, "location" TEXT, "github" TEXT, "linkedin" TEXT, "telegram" TEXT, "avatarUrl" TEXT, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL, CONSTRAINT "Profile_pkey" PRIMARY KEY ("id") );`,
            `CREATE TABLE IF NOT EXISTS "Project" ( "id" TEXT NOT NULL, "title" TEXT NOT NULL, "description" TEXT NOT NULL, "imageUrl" TEXT, "technologies" TEXT[], "liveLink" TEXT, "repoLink" TEXT, "githubLink" TEXT, "views" INTEGER NOT NULL DEFAULT 0, "order" INTEGER NOT NULL DEFAULT 0, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL, CONSTRAINT "Project_pkey" PRIMARY KEY ("id") );`,
            `CREATE TABLE IF NOT EXISTS "Skill" ( "id" SERIAL NOT NULL, "name" TEXT NOT NULL, "icon" TEXT NOT NULL, "order" INTEGER NOT NULL DEFAULT 0, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL, CONSTRAINT "Skill_pkey" PRIMARY KEY ("id") );`,
            `CREATE TABLE IF NOT EXISTS "PageView" ( "id" TEXT NOT NULL, "path" TEXT NOT NULL, "userAgent" TEXT, "referrer" TEXT, "country" TEXT, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "PageView_pkey" PRIMARY KEY ("id") );`,
            `CREATE TABLE IF NOT EXISTS "Visitor" ( "id" TEXT NOT NULL, "sessionId" TEXT NOT NULL, "firstVisit" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "lastVisit" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "pageViews" INTEGER NOT NULL DEFAULT 1, "country" TEXT, "userAgent" TEXT, CONSTRAINT "Visitor_pkey" PRIMARY KEY ("id") );`,
            `CREATE TABLE IF NOT EXISTS "User" ( "id" TEXT NOT NULL, "name" TEXT, "email" TEXT NOT NULL, "password" TEXT NOT NULL, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL, CONSTRAINT "User_pkey" PRIMARY KEY ("id") );`,
            `CREATE INDEX IF NOT EXISTS "PageView_path_idx" ON "PageView"("path");`,
            `CREATE INDEX IF NOT EXISTS "PageView_createdAt_idx" ON "PageView"("createdAt");`,
            `CREATE UNIQUE INDEX IF NOT EXISTS "Visitor_sessionId_key" ON "Visitor"("sessionId");`,
            `CREATE INDEX IF NOT EXISTS "Visitor_sessionId_idx" ON "Visitor"("sessionId");`,
            `CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email");`
        ];

        const results = [];
        for (const query of queries) {
            try {
                await prisma.$executeRawUnsafe(query);
                results.push({ status: "success", query: query.substring(0, 30) + "..." });
            } catch (e: any) {
                results.push({ status: "error", error: e.message, query: query.substring(0, 30) + "..." });
            }
        }

        return NextResponse.json({
            success: true,
            message: "Database initialized successfully",
            envDebug,
            results
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message, envDebug }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

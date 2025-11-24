import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const queries = [
            // Profile
            `CREATE TABLE IF NOT EXISTS "Profile" (
        "id" TEXT NOT NULL,
        "name" TEXT NOT NULL,
        "title" TEXT NOT NULL,
        "bio" TEXT,
        "email" TEXT NOT NULL,
        "phone" TEXT,
        "location" TEXT,
        "github" TEXT,
        "linkedin" TEXT,
        "telegram" TEXT,
        "avatarUrl" TEXT,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
      );`,

            // Project
            `CREATE TABLE IF NOT EXISTS "Project" (
        "id" TEXT NOT NULL,
        "title" TEXT NOT NULL,
        "description" TEXT NOT NULL,
        "imageUrl" TEXT,
        "technologies" TEXT[],
        "liveLink" TEXT,
        "repoLink" TEXT,
        "githubLink" TEXT,
        "views" INTEGER NOT NULL DEFAULT 0,
        "order" INTEGER NOT NULL DEFAULT 0,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
      );`,

            // Skill
            `CREATE TABLE IF NOT EXISTS "Skill" (
        "id" SERIAL NOT NULL,
        "name" TEXT NOT NULL,
        "icon" TEXT NOT NULL,
        "order" INTEGER NOT NULL DEFAULT 0,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
      );`,

            // PageView
            `CREATE TABLE IF NOT EXISTS "PageView" (
        "id" TEXT NOT NULL,
        "path" TEXT NOT NULL,
        "userAgent" TEXT,
        "referrer" TEXT,
        "country" TEXT,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "PageView_pkey" PRIMARY KEY ("id")
      );`,

            // Visitor
            `CREATE TABLE IF NOT EXISTS "Visitor" (
        "id" TEXT NOT NULL,
        "sessionId" TEXT NOT NULL,
        "firstVisit" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "lastVisit" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "pageViews" INTEGER NOT NULL DEFAULT 1,
        "country" TEXT,
        "userAgent" TEXT,
        CONSTRAINT "Visitor_pkey" PRIMARY KEY ("id")
      );`,

            // User
            `CREATE TABLE IF NOT EXISTS "User" (
        "id" TEXT NOT NULL,
        "name" TEXT,
        "email" TEXT NOT NULL,
        "password" TEXT NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "User_pkey" PRIMARY KEY ("id")
      );`,

            // Indexes
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
                results.push({ status: "success", query: query.substring(0, 50) + "..." });
            } catch (e: any) {
                results.push({ status: "error", error: e.message, query: query.substring(0, 50) + "..." });
            }
        }

        return NextResponse.json({
            success: true,
            message: "Database initialization attempted",
            results
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

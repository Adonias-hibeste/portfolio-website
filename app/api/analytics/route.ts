import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { path, sessionId, userAgent, referrer } = body;

        if (!path || !sessionId) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Record page view
        await prisma.pageView.create({
            data: {
                path,
                userAgent: userAgent || null,
                referrer: referrer || null,
            },
        });

        // Update or create visitor
        const existingVisitor = await prisma.visitor.findUnique({
            where: { sessionId },
        });

        if (existingVisitor) {
            await prisma.visitor.update({
                where: { sessionId },
                data: {
                    lastVisit: new Date(),
                    pageViews: { increment: 1 },
                },
            });
        } else {
            await prisma.visitor.create({
                data: {
                    sessionId,
                    userAgent: userAgent || null,
                },
            });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Analytics tracking error:", error);
        return NextResponse.json(
            { error: "Failed to track analytics" },
            { status: 500 }
        );
    }
}

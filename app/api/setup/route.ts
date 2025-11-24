import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
    try {
        // Check if any users exist
        const userCount = await prisma.user.count();

        if (userCount > 0) {
            return NextResponse.json(
                { error: "Admin user already exists. This endpoint is disabled." },
                { status: 403 }
            );
        }

        const body = await request.json();
        const { email, password, name } = body;

        // Validate input
        if (!email || !password || password.length < 6) {
            return NextResponse.json(
                { error: "Email and password (min 6 characters) are required" },
                { status: 400 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create admin user
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name: name || "Admin",
            },
        });

        return NextResponse.json({
            success: true,
            message: "Admin user created successfully",
            user: {
                email: user.email,
                name: user.name,
            },
        });
    } catch (error) {
        console.error("Error creating admin user:", error);
        return NextResponse.json(
            { error: "Failed to create admin user" },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const userCount = await prisma.user.count();
        return NextResponse.json({
            setupRequired: userCount === 0,
            userCount
        });
    } catch (error) {
        return NextResponse.json({
            setupRequired: true,
            error: "Could not check user count"
        });
    }
}

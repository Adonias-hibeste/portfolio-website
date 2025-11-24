import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const email = "adoniashibestegithub@gmail.com";
        const password = "Adoni@#23";
        const name = "Adonias Hibeste";

        // 1. Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 2. Upsert the user (Create if not exists, Update if exists)
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

        return NextResponse.json({
            success: true,
            message: "Admin user created/updated successfully",
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            },
            nextStep: "Go to /admin/login and sign in!"
        });

    } catch (error: any) {
        console.error("Seed error:", error);
        return NextResponse.json({
            success: false,
            error: error.message,
            stack: error.stack
        }, { status: 500 });
    }
}

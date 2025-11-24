import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const dynamic = 'force-dynamic';

export async function GET() {
    const debugResults: any = {
        step: "Start",
        email: "adoniashibestegithub@gmail.com",
        envVars: {
            DATABASE_URL_EXISTS: !!process.env.DATABASE_URL,
            POSTGRES_PRISMA_URL_EXISTS: !!process.env.POSTGRES_PRISMA_URL,
            AUTH_SECRET_EXISTS: !!process.env.AUTH_SECRET,
        }
    };

    try {
        // 1. Test DB Connection
        debugResults.step = "Connecting to DB";
        const user = await prisma.user.findUnique({
            where: { email: debugResults.email },
        });

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not found in database",
                debugResults
            }, { status: 404 });
        }

        debugResults.step = "User Found";
        debugResults.userFound = { id: user.id, email: user.email, hasPassword: !!user.password };

        // 2. Test Password
        debugResults.step = "Verifying Password";
        const testPassword = "Adoni@#23";
        const isMatch = await bcrypt.compare(testPassword, user.password);

        debugResults.passwordMatch = isMatch;

        if (!isMatch) {
            return NextResponse.json({
                success: false,
                message: "Password does not match",
                debugResults
            }, { status: 401 });
        }

        return NextResponse.json({
            success: true,
            message: "Login Logic Verified! DB and Password are correct.",
            debugResults
        });

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error: error.message,
            stack: error.stack,
            debugResults
        }, { status: 500 });
    }
}

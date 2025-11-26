import { NextResponse } from "next/server";

export async function GET() {
    // Redirect to the working generate route with download parameter
    return NextResponse.redirect(new URL('/api/cv/generate?download=true', process.env.NEXTAUTH_URL || 'http://localhost:3000'));
}

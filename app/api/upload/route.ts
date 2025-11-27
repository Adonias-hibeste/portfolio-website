import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(request: NextRequest) {
    try {
        // Check if running on Vercel (serverless)
        const isVercel = process.env.VERCEL === '1';

        if (isVercel) {
            return NextResponse.json(
                {
                    error: "File uploads are not supported on Vercel's serverless environment. Please use a cloud storage service like Cloudinary, AWS S3, or Vercel Blob Storage.",
                    suggestion: "For now, you can use image URLs from external sources (e.g., imgur, cloudinary) in the 'Public Image URL' field instead."
                },
                { status: 400 }
            );
        }

        const formData = await request.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json(
                { error: "No file provided" },
                { status: 400 }
            );
        }

        // Validate file type
        if (!file.type.startsWith("image/")) {
            return NextResponse.json(
                { error: "File must be an image" },
                { status: 400 }
            );
        }

        // Validate file size (max 5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            return NextResponse.json(
                { error: "File size must be less than 5MB" },
                { status: 400 }
            );
        }

        // Create a unique filename
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Generate filename with timestamp to avoid conflicts
        const timestamp = Date.now();
        const originalName = file.name.replace(/\s+/g, "-");
        const filename = `${timestamp}-${originalName}`;

        // Save to public/uploads directory
        const uploadsDir = path.join(process.cwd(), "public", "uploads");
        const filepath = path.join(uploadsDir, filename);

        // Create uploads directory if it doesn't exist
        const fs = require("fs");
        if (!fs.existsSync(uploadsDir)) {
            console.log("Creating uploads directory:", uploadsDir);
            fs.mkdirSync(uploadsDir, { recursive: true });
        }

        console.log("Saving file to:", filepath);
        await writeFile(filepath, buffer);
        console.log("File saved successfully");

        // Return the public URL
        const imageUrl = `/uploads/${filename}`;

        return NextResponse.json({ imageUrl }, { status: 200 });
    } catch (error: any) {
        console.error("Upload error details:", {
            message: error.message,
            stack: error.stack,
            code: error.code
        });

        return NextResponse.json(
            {
                error: "Failed to upload file",
                details: error.message,
                suggestion: "If you're on Vercel, use the 'Public Image URL' field with an external image URL instead."
            },
            { status: 500 }
        );
    }
}

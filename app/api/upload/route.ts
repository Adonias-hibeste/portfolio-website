import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(request: NextRequest) {
    try {
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
            fs.mkdirSync(uploadsDir, { recursive: true });
        }

        await writeFile(filepath, buffer);

        // Return the public URL
        const imageUrl = `/uploads/${filename}`;

        return NextResponse.json({ imageUrl }, { status: 200 });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json(
            { error: "Failed to upload file" },
            { status: 500 }
        );
    }
}

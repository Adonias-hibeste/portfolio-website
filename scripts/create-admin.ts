import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function createAdminUser() {
    const email = "admin@portfolio.com";
    const password = "admin123456"; // Change this to your desired password

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            console.log("❌ Admin user already exists!");
            console.log("Email:", email);
            return;
        }

        // Create admin user
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name: "Admin",
            },
        });

        console.log("✅ Admin user created successfully!");
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("📧 Email:", email);
        console.log("🔑 Password:", password);
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("\n⚠️  IMPORTANT: Change the password after first login!");
        console.log("\nYou can now login at: http://localhost:3000/admin/login");
    } catch (error) {
        console.error("❌ Error creating admin user:", error);
    } finally {
        await prisma.$disconnect();
    }
}

createAdminUser();

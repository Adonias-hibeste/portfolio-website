import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function createAdminUser() {
    const email = "Adoniashibestegithub@gmail.com";
    const password = "Adoni@#23";

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        // Upsert admin user (create or update if exists)
        const user = await prisma.user.upsert({
            where: { email },
            update: {
                password: hashedPassword,
                name: "Adonias",
            },
            create: {
                email,
                password: hashedPassword,
                name: "Adonias",
            },
        });

        console.log("✅ Admin user created/updated successfully!");
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("📧 Email:", email);
        console.log("🔑 Password:", password);
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("\nYou can now login at: http://localhost:3000/admin/login");
    } catch (error) {
        console.error("❌ Error creating admin user:", error);
    } finally {
        await prisma.$disconnect();
    }
}

createAdminUser();

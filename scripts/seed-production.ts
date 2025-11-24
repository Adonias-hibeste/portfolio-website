import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    try {
        const email = "adoniashibestegithub@gmail.com";
        const password = "Adoni@#23";
        const name = "Adonias Hibeste";

        console.log(`Seeding admin user: ${email}...`);

        // 1. Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 2. Upsert the user
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

        console.log("✅ Admin user created successfully!");
        console.log(`ID: ${user.id}`);
        console.log(`Email: ${user.email}`);
        console.log(`Name: ${user.name}`);

    } catch (error) {
        console.error("❌ Seed failed:", error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

main();

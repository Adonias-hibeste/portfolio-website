import { PrismaClient } from "@prisma/client";
import { iconNames } from "../lib/iconMap";

const prisma = new PrismaClient();

async function checkSkills() {
    try {
        const skills = await prisma.skill.findMany({
            orderBy: { order: "asc" },
        });

        console.log("\\n📊 Skills in Database:");
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\n");

        const invalidSkills: any[] = [];

        skills.forEach((skill) => {
            const iconExists = iconNames.includes(skill.icon);
            const status = iconExists ? "✅" : "❌";

            console.log(`${status} ${skill.name} → icon: "${skill.icon}"`);

            if (!iconExists) {
                invalidSkills.push(skill);
            }
        });

        if (invalidSkills.length > 0) {
            console.log("\\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
            console.log(`\\n⚠️  Found ${invalidSkills.length} skill(s) with invalid icons:\\n`);
            invalidSkills.forEach(skill => {
                console.log(`   - ${skill.name} (icon: "${skill.icon}")`);
            });
            console.log("\\n💡 These icons don't exist in iconMap.ts");
            console.log("   You need to either:");
            console.log("   1. Update the skill icons in admin panel to valid names");
            console.log("   2. Add these icon names to iconMap.ts");
        } else {
            console.log("\\n✅ All skills have valid icons!");
        }

        console.log("\\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\n");
    } catch (error) {
        console.error("❌ Error:", error);
    } finally {
        await prisma.$disconnect();
    }
}

checkSkills();

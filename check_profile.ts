import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkProfile() {
    const profile = await prisma.profile.findFirst();
    console.log('Profile Data:', JSON.stringify(profile, null, 2));
}

checkProfile()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });

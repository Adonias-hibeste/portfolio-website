const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    const email = 'adoniassahilehibeste12@gmail.com';
    const password = await bcrypt.hash('admin123', 10);

    const user = await prisma.user.upsert({
        where: { email },
        update: { password },
        create: {
            email,
            password,
        },
    });

    console.log({ user });

    const profile = await prisma.profile.upsert({
        where: { id: 'default' }, // Assuming we might want a fixed ID or just create one
        update: {},
        create: {
            name: 'Adonias Hibeste',
            title: 'Mobile App Developer',
            bio: 'Crafting exceptional mobile experiences with creativity and precision.',
            email: 'adoniassahilehibeste12@gmail.com',
            phone: '+251987081856',
            location: 'Ethiopia, Addis Ababa',
            github: 'https://github.com/Adonias-hibeste/Adonias-hibeste',
            linkedin: 'https://www.linkedin.com/in/adonias-hibeste',
            telegram: '@Adoni_2112',
        },
    });

    console.log({ profile });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });

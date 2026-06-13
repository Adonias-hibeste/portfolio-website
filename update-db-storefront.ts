import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const existing = await prisma.project.findFirst({
    where: { title: "Storefront" }
  });

  if (existing) {
    console.log("Storefront project already exists with ID:", existing.id);
    return;
  }

  const project = await prisma.project.create({
    data: {
      title: "Storefront",
      description: "A Pro-Max tier luxury e-commerce application built with Flutter. Focuses on stunning product photography, an ultra-minimalist deep dark theme, and flawless cinematic Hero transitions. Features an AI Stylist that curates a 'Complete the Look' wardrobe based on your aesthetic profile.",
      imageUrl: "/projects/storefront/storefront_discover.png",
      screenshots: [
        "/projects/storefront/storefront_discover.png",
        "/projects/storefront/storefront_detail.png",
        "/projects/storefront/storefront_cart.png"
      ],
      technologies: ["Flutter 3.x", "Dart", "flutter_animate", "glassmorphism"],
      repoLink: "https://github.com/Adonias-hibeste/storefront-app",
      liveLink: "",
      order: -4
    }
  });

  console.log("Successfully created Storefront project:", project.id);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

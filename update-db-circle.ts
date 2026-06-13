import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const circleId = "circle_app_" + Date.now();
  
  const existing = await prisma.project.findFirst({
    where: { title: "Circle" }
  });

  if (existing) {
    console.log("Circle project already exists with ID:", existing.id);
    return;
  }

  const project = await prisma.project.create({
    data: {
      title: "Circle",
      description: "A Pro-Max tier private social network application built with Flutter. Designed for exclusive communities, it replaces noisy feeds with a focused, premium, visually breathtaking cinematic experience. Features an AI Vibe Check dashboard that summarizes community sentiment.",
      imageUrl: "/projects/circle/circle_discover.png",
      screenshots: [
        "/projects/circle/circle_feed.png",
        "/projects/circle/circle_discover.png",
        "/projects/circle/circle_profile.png"
      ],
      technologies: ["Flutter 3.x", "Dart", "Riverpod", "flutter_animate", "glassmorphism"],
      repoLink: "https://github.com/Adonias-hibeste/circle-network",
      liveLink: "",
      order: -3
    }
  });

  console.log("Successfully created Circle project:", project.id);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

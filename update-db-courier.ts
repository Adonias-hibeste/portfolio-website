import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const existing = await prisma.project.findFirst({
    where: { title: "Courier" }
  });

  if (existing) {
    console.log("Courier project already exists with ID:", existing.id);
    return;
  }

  const project = await prisma.project.create({
    data: {
      title: "Courier",
      description: "A Pro-Max tier instant delivery application built with Flutter. Features a breathtaking live map tracking experience with a pulsating neon courier marker, an AI Route Estimator, and a premium neon wallet. Wrapped in a High-Velocity Dark Mode with electric lime green accents.",
      imageUrl: "/projects/courier/courier_tracking.png",
      screenshots: [
        "/projects/courier/courier_dashboard.png",
        "/projects/courier/courier_tracking.png",
        "/projects/courier/courier_wallet.png"
      ],
      technologies: ["Flutter 3.x", "Dart", "flutter_map", "latlong2", "flutter_animate"],
      repoLink: "https://github.com/Adonias-hibeste/courier-app",
      liveLink: "",
      order: -5
    }
  });

  console.log("Successfully created Courier project:", project.id);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });

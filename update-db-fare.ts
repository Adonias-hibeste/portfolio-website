import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const data = {
    title: "Fare — Premium Ride-Hailing",
    description: "A Pro-Max tier ride-hailing application featuring a real interactive OpenStreetMap integration via flutter_map, realistic simulated driver movement, dynamic pricing AI insights, and a highly polished dark-themed user profile with a digital wallet interface.",
    imageUrl: "/projects/fare/fare_discover.png",
    technologies: ["Flutter 3.x", "Dart", "flutter_map", "flutter_animate", "latlong2"],
    githubLink: "https://github.com/Adonias-hibeste/fare-app",
    order: 24,
  };
  try {
    const existing = await prisma.project.findFirst({
      where: { title: data.title },
    });
    if (existing) {
      await prisma.project.update({
        where: { id: existing.id },
        data,
      });
      console.log("Updated Fare.");
    } else {
      await prisma.project.create({ data });
      console.log("Inserted Fare.");
    }
  } catch (error) {
    console.error("Error updating DB:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();

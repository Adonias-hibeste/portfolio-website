import { prisma } from "@/lib/prisma";
import HomeContent from "./HomeContent";

export const dynamic = "force-dynamic";

export default async function Home() {
  let projects: any[] = [];
  let skills: any[] = [];

  try {
    projects = await prisma.project.findMany({
      take: 3,
      orderBy: { order: "asc" },
    });

    skills = await prisma.skill.findMany({
      orderBy: { order: "asc" },
    });
  } catch (e) {
    console.warn("DB connection failed in Home");
  }

  return <HomeContent projects={projects} skills={skills} />;
}

import { prisma } from "@/lib/prisma";
import { getMergedProjects } from "@/lib/data/projects";
import HomeContent from "./HomeContent";

export const dynamic = "force-dynamic";

export default async function Home() {
  let projects: any[] = [];
  let skills: any[] = [];

  try {
    projects = await getMergedProjects();

    const dbSkills = await prisma.skill.findMany({
      orderBy: { order: "asc" },
    });

    skills = [
      ...dbSkills,
      { name: "Supabase", icon: "database", proficiency: 95 },
      { name: "Cursor AI", icon: "code", proficiency: 98 },
      { name: "Claude Code", icon: "terminal", proficiency: 96 }
    ];
  } catch (e) {
    console.warn("DB connection failed in Home, using fallback projects.");
    // Fallback logic handled in getMergedProjects if Prisma fails
    if (projects.length === 0) {
       projects = await getMergedProjects();
    }
  }

  return <HomeContent projects={projects} skills={skills} />;
}

import React from 'react';
import { renderToFile } from '@react-pdf/renderer';
import { CVTemplate } from './components/CVTemplate';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log("Fetching data from DB...");
  const [skills, projects, experiences, educations, profile] = await Promise.all([
    prisma.skill.findMany({ orderBy: { order: "asc" } }),
    prisma.cVProject.findMany({ orderBy: { order: "asc" } }),
    prisma.experience.findMany({ orderBy: { startDate: "desc" } }),
    prisma.education.findMany({ orderBy: { startDate: "desc" } }),
    prisma.profile.findFirst(),
  ]);

  const cvData = {
    name: profile?.name || "Adonias Hibeste",
    title: profile?.title || "Senior Mobile Architect",
    email: profile?.email || "Adoniashibestegithub@gmail.com",
    phone: profile?.phone || "+251 92 683 4833",
    location: profile?.location || "Addis Ababa, Ethiopia",
    summary: profile?.cvSummary || profile?.bio || "",
    avatarUrl: null,
    website: profile?.website,
    github: profile?.github,
    linkedin: profile?.linkedin,
    telegram: profile?.telegram,
    skills: skills.map(skill => ({ name: skill.name })),
    projects: projects.map(project => ({
      title: project.title,
      description: project.description,
      technologies: project.technologies,
      liveLink: project.liveLink || undefined,
      githubLink: project.githubLink || undefined,
    })),
    experiences: experiences.map(exp => ({
      position: exp.position,
      company: exp.company,
      location: exp.location || undefined,
      startDate: exp.startDate.toISOString(),
      endDate: exp.endDate?.toISOString(),
      current: exp.current,
      description: exp.description,
    })),
    educations: educations.map(edu => ({
      institution: edu.institution,
      degree: edu.degree,
      field: edu.field,
      location: edu.location || undefined,
      startDate: edu.startDate.toISOString(),
      endDate: edu.endDate?.toISOString(),
      current: edu.current,
      description: edu.description || undefined,
    })),
  };

  console.log("Generating PDF...");
  // Use React.createElement to avoid JSX issues if run with plain ts-node
  const element = React.createElement(CVTemplate, { data: cvData });
  
  await renderToFile(element, 'final_cv.pdf');
  console.log("PDF generated successfully as final_cv.pdf");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

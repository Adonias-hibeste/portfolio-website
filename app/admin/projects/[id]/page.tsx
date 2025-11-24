import { ProjectForm } from "@/components/ProjectForm";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function EditProjectPage({
    params,
}: {
    params: { id: string };
}) {
    const project = await prisma.project.findUnique({
        where: { id: params.id },
    });

    if (!project) {
        notFound();
    }

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold tracking-tight">Edit Project</h1>
            <ProjectForm project={project} />
        </div>
    );
}

import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
    let projects: any[] = [];
    try {
        projects = await prisma.project.findMany({
            orderBy: { order: "asc" },
        });
    } catch (e) {
        console.warn("Database connection failed during build (Admin Projects)");
    }

    async function deleteProject(formData: FormData) {
        "use server";
        const id = formData.get("id") as string;
        await prisma.project.delete({ where: { id } });
        revalidatePath("/admin/projects");
        revalidatePath("/projects");
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
                <Link
                    href="/admin/projects/new"
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Project
                </Link>
            </div>

            <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                        <thead className="[&_tr]:border-b">
                            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                    Image
                                </th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                    Title
                                </th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                    Tech Stack
                                </th>
                                <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                            {projects.map((project: any) => (
                                <tr
                                    key={project.id}
                                    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                                >
                                    <td className="p-4 align-middle">
                                        <div className="relative h-10 w-16 overflow-hidden rounded">
                                            {project.imageUrl ? (
                                                <Image
                                                    src={project.imageUrl}
                                                    alt={project.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <div className="h-full w-full bg-muted" />
                                            )}
                                        </div>
                                    </td>
                                    <td className="p-4 align-middle font-medium">
                                        {project.title}
                                    </td>
                                    <td className="p-4 align-middle">
                                        <div className="flex gap-1 flex-wrap">
                                            {project.technologies.slice(0, 3).map((tech: string) => (
                                                <span
                                                    key={tech}
                                                    className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary hover:bg-primary/80"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="p-4 align-middle text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                href={`/admin/projects/${project.id}`}
                                                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-8 w-8"
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Link>
                                            <form action={deleteProject}>
                                                <input type="hidden" name="id" value={project.id} />
                                                <button
                                                    type="submit"
                                                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-red-500 hover:text-white h-8 w-8"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

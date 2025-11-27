"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Save, Trash2, Edit } from "lucide-react";
import { createCVProject, updateCVProject, deleteCVProject } from "@/lib/actions";

const formSchema = z.object({
    title: z.string().min(2, "Title is required"),
    description: z.string().min(10, "Description is required"),
    technologies: z.string().min(1, "At least one technology is required"),
    liveLink: z.string().optional(),
    githubLink: z.string().optional(),
});

type CVProjectFormData = z.infer<typeof formSchema>;

interface CVProjectFormProps {
    cvProjects: any[];
}

export function CVProjectForm({ cvProjects }: CVProjectFormProps) {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<CVProjectFormData>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            title: "",
            description: "",
            technologies: "",
            liveLink: "",
            githubLink: "",
        },
    });

    const onSubmit = async (data: CVProjectFormData) => {
        setIsSubmitting(true);
        try {
            const projectData = {
                ...data,
                technologies: data.technologies.split(',').map(t => t.trim()).filter(Boolean),
            };

            if (editingId) {
                await updateCVProject(editingId, projectData);
                setEditingId(null);
            } else {
                await createCVProject(projectData);
            }
            reset();
        } catch (error) {
            console.error(error);
            alert("Something went wrong");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEdit = (project: any) => {
        setEditingId(project.id);
        setValue("title", project.title);
        setValue("description", project.description);
        setValue("technologies", project.technologies.join(", "));
        setValue("liveLink", project.liveLink || "");
        setValue("githubLink", project.githubLink || "");
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this CV project?")) return;
        try {
            await deleteCVProject(id);
        } catch (error) {
            console.error(error);
            alert("Failed to delete");
        }
    };

    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <h3 className="text-lg font-medium">Add / Edit CV Project</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 border p-4 rounded-lg bg-card">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Project Title</label>
                        <input
                            {...register("title")}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            placeholder="E-Commerce Mobile App"
                        />
                        {errors.title && <p className="text-red-500 text-xs">{errors.title.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Description</label>
                        <textarea
                            {...register("description")}
                            rows={4}
                            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-none"
                            placeholder="Describe the project (use line breaks for bullet points)..."
                        />
                        {errors.description && <p className="text-red-500 text-xs">{errors.description.message}</p>}
                        <p className="text-xs text-muted-foreground">Tip: Each line will appear as a bullet point in the CV</p>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Technologies</label>
                        <input
                            {...register("technologies")}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            placeholder="Flutter, Firebase, Stripe, etc. (comma-separated)"
                        />
                        {errors.technologies && <p className="text-red-500 text-xs">{errors.technologies.message}</p>}
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Live Link (Optional)</label>
                            <input
                                {...register("liveLink")}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                placeholder="https://example.com"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">GitHub Link (Optional)</label>
                            <input
                                {...register("githubLink")}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                placeholder="https://github.com/username/repo"
                            />
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                        >
                            {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                            {editingId ? "Update Project" : "Add Project"}
                        </button>
                        {editingId && (
                            <button
                                type="button"
                                onClick={() => {
                                    setEditingId(null);
                                    reset();
                                }}
                                className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent h-10 px-4 py-2"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-medium">CV Projects List</h3>
                <div className="space-y-4">
                    {cvProjects.map((project) => (
                        <div key={project.id} className="flex items-start justify-between p-4 border rounded-lg bg-card">
                            <div className="flex-1">
                                <h4 className="font-bold">{project.title}</h4>
                                <p className="text-sm mt-2 whitespace-pre-wrap text-muted-foreground">{project.description}</p>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {project.technologies.map((tech: string) => (
                                        <span key={tech} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                                {(project.liveLink || project.githubLink) && (
                                    <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                                        {project.liveLink && <span>🔗 Live</span>}
                                        {project.githubLink && <span>💻 GitHub</span>}
                                    </div>
                                )}
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(project)}
                                    className="p-2 hover:bg-accent rounded-md"
                                >
                                    <Edit className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(project.id)}
                                    className="p-2 hover:bg-red-100 text-red-500 rounded-md"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                    {cvProjects.length === 0 && (
                        <p className="text-muted-foreground text-center py-8">No CV projects added yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

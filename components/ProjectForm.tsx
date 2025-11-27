"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Save, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { createProject, updateProject } from "@/lib/actions"; // Need to implement these

const formSchema = z.object({
    title: z.string().min(2, "Title is required"),
    description: z.string().min(10, "Description is required"),
    imageUrl: z.string().optional(),
    technologies: z.string().min(2, "Technologies are required (comma separated)"),
    liveLink: z.string().optional(),
    repoLink: z.string().optional(),
    githubLink: z.string().optional(),
    order: z.coerce.number().default(0),
});

type ProjectFormData = z.infer<typeof formSchema>;

interface ProjectFormProps {
    project?: any; // Type properly if possible
}

export function ProjectForm({ project }: ProjectFormProps) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imagePreview, setImagePreview] = useState(project?.imageUrl || "");

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<ProjectFormData>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            title: project?.title || "",
            description: project?.description || "",
            imageUrl: project?.imageUrl || "",
            technologies: project?.technologies?.join(", ") || "",
            liveLink: project?.liveLink || "",
            repoLink: project?.repoLink || "",
            githubLink: project?.githubLink || "",
            order: project?.order || 0,
        },
    });

    const onSubmit = async (data: ProjectFormData) => {
        setIsSubmitting(true);
        try {
            const formattedData = {
                ...data,
                technologies: data.technologies.split(",").map((t) => t.trim()),
            };

            if (project) {
                await updateProject(project.id, formattedData);
            } else {
                await createProject(formattedData);
            }
            router.push("/admin/projects");
            router.refresh();
        } catch (error) {
            console.error(error);
            alert("Something went wrong");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-2xl">
            <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Title</label>
                        <input
                            {...register("title")}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                        {errors.title && (
                            <p className="text-red-500 text-xs">{errors.title.message}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Order</label>
                        <input
                            type="number"
                            {...register("order")}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <textarea
                        {...register("description")}
                        rows={4}
                        className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                    />
                    {errors.description && (
                        <p className="text-red-500 text-xs">{errors.description.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Project Image</label>
                    <div className="space-y-4">
                        {/* File Upload Input */}
                        <div className="flex items-center gap-4">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={async (e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        setIsSubmitting(true);
                                        try {
                                            const formData = new FormData();
                                            formData.append("file", file);

                                            const response = await fetch("/api/upload", {
                                                method: "POST",
                                                body: formData,
                                            });

                                            const data = await response.json();

                                            if (response.ok) {
                                                const { imageUrl } = data;
                                                // Update the form value using setValue
                                                setValue("imageUrl", imageUrl);
                                                setImagePreview(imageUrl);
                                                alert("Image uploaded successfully!");
                                            } else {
                                                // Show detailed error message
                                                const errorMessage = data.error || "Failed to upload image";
                                                const suggestion = data.suggestion || "";
                                                alert(`${errorMessage}\n\n${suggestion}`);
                                            }
                                        } catch (error) {
                                            console.error("Upload error:", error);
                                            alert("Failed to upload image. Please try using the 'Or paste image URL' field below instead.");
                                        } finally {
                                            setIsSubmitting(false);
                                        }
                                    }
                                }}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                        </div>

                        {/* Or paste URL directly */}
                        <div className="space-y-2">
                            <label className="text-xs text-muted-foreground">Or paste image URL (recommended for Vercel):</label>
                            <input
                                {...register("imageUrl")}
                                onChange={(e) => {
                                    setValue("imageUrl", e.target.value);
                                    setImagePreview(e.target.value);
                                }}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="https://i.imgur.com/example.png"
                            />
                        </div>

                        {/* Image Preview */}
                        {imagePreview && (
                            <div className="relative w-full h-48 border rounded-md overflow-hidden">
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}
                    </div>
                    {errors.imageUrl && (
                        <p className="text-red-500 text-xs">{errors.imageUrl.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Technologies (comma separated)</label>
                    <input
                        {...register("technologies")}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="React, Next.js, TypeScript"
                    />
                    {errors.technologies && (
                        <p className="text-red-500 text-xs">{errors.technologies.message}</p>
                    )}
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Live Link</label>
                        <input
                            {...register("liveLink")}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="https://..."
                        />
                        {errors.liveLink && (
                            <p className="text-red-500 text-xs">{errors.liveLink.message}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Repo Link</label>
                        <input
                            {...register("repoLink")}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="https://..."
                        />
                        {errors.repoLink && (
                            <p className="text-red-500 text-xs">{errors.repoLink.message}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">GitHub Link</label>
                        <input
                            {...register("githubLink")}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="https://github.com/..."
                        />
                        {errors.githubLink && (
                            <p className="text-red-500 text-xs">{errors.githubLink.message}</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex gap-4">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                >
                    {isSubmitting ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <Save className="mr-2 h-4 w-4" />
                    )}
                    Save Project
                </button>
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}

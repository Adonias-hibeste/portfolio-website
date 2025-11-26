"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Save, Trash2, Plus } from "lucide-react";
import { createEducation, updateEducation, deleteEducation } from "@/lib/actions";

const formSchema = z.object({
    institution: z.string().min(2, "Institution is required"),
    degree: z.string().min(2, "Degree is required"),
    field: z.string().min(2, "Field of study is required"),
    location: z.string().optional(),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().optional(),
    current: z.boolean().default(false),
    description: z.string().optional(),
});

type EducationFormData = z.infer<typeof formSchema>;

interface EducationFormProps {
    educations: any[];
}

export function EducationForm({ educations }: EducationFormProps) {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm<EducationFormData>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            institution: "",
            degree: "",
            field: "",
            location: "",
            startDate: "",
            endDate: "",
            current: false,
            description: "",
        },
    });

    const current = watch("current");

    const onSubmit = async (data: EducationFormData) => {
        setIsSubmitting(true);
        try {
            if (editingId) {
                await updateEducation(editingId, data);
                setEditingId(null);
            } else {
                await createEducation(data);
            }
            reset();
        } catch (error) {
            console.error(error);
            alert("Something went wrong");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEdit = (edu: any) => {
        setEditingId(edu.id);
        setValue("institution", edu.institution);
        setValue("degree", edu.degree);
        setValue("field", edu.field);
        setValue("location", edu.location || "");
        setValue("startDate", new Date(edu.startDate).toISOString().split("T")[0]);
        setValue("endDate", edu.endDate ? new Date(edu.endDate).toISOString().split("T")[0] : "");
        setValue("current", edu.current);
        setValue("description", edu.description || "");
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this education?")) return;
        try {
            await deleteEducation(id);
        } catch (error) {
            console.error(error);
            alert("Failed to delete");
        }
    };

    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <h3 className="text-lg font-medium">Add / Edit Education</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 border p-4 rounded-lg bg-card">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Institution</label>
                            <input
                                {...register("institution")}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                placeholder="University of Technology"
                            />
                            {errors.institution && <p className="text-red-500 text-xs">{errors.institution.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Degree</label>
                            <input
                                {...register("degree")}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                placeholder="Bachelor of Science"
                            />
                            {errors.degree && <p className="text-red-500 text-xs">{errors.degree.message}</p>}
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Field of Study</label>
                            <input
                                {...register("field")}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                placeholder="Computer Science"
                            />
                            {errors.field && <p className="text-red-500 text-xs">{errors.field.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Location</label>
                            <input
                                {...register("location")}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                placeholder="City, Country"
                            />
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Start Date</label>
                            <input
                                type="date"
                                {...register("startDate")}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            />
                            {errors.startDate && <p className="text-red-500 text-xs">{errors.startDate.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">End Date</label>
                            <input
                                type="date"
                                {...register("endDate")}
                                disabled={current}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm disabled:opacity-50"
                            />
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="edu-current"
                            {...register("current")}
                            className="h-4 w-4 rounded border-gray-300"
                        />
                        <label htmlFor="edu-current" className="text-sm font-medium">I am currently studying here</label>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Description (Optional)</label>
                        <textarea
                            {...register("description")}
                            rows={3}
                            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-none"
                            placeholder="Honors, activities, etc..."
                        />
                    </div>

                    <div className="flex gap-2">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                        >
                            {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                            {editingId ? "Update Education" : "Add Education"}
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
                <h3 className="text-lg font-medium">Education List</h3>
                <div className="space-y-4">
                    {educations.map((edu) => (
                        <div key={edu.id} className="flex items-start justify-between p-4 border rounded-lg bg-card">
                            <div>
                                <h4 className="font-bold">{edu.institution}</h4>
                                <p className="text-sm text-muted-foreground">{edu.degree} in {edu.field}</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    {new Date(edu.startDate).toLocaleDateString()} - {edu.current ? "Present" : new Date(edu.endDate).toLocaleDateString()}
                                </p>
                                {edu.description && <p className="text-sm mt-2 whitespace-pre-wrap">{edu.description}</p>}
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(edu)}
                                    className="p-2 hover:bg-accent rounded-md"
                                >
                                    <Save className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(edu.id)}
                                    className="p-2 hover:bg-red-100 text-red-500 rounded-md"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                    {educations.length === 0 && (
                        <p className="text-muted-foreground text-center py-8">No education added yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

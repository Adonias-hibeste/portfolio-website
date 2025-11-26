"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Save, Trash2, Plus } from "lucide-react";
import { createExperience, updateExperience, deleteExperience } from "@/lib/actions";

const formSchema = z.object({
    position: z.string().min(2, "Position is required"),
    company: z.string().min(2, "Company is required"),
    location: z.string().optional(),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().optional(),
    current: z.boolean().default(false),
    description: z.string().min(10, "Description is required"),
});

type ExperienceFormData = z.infer<typeof formSchema>;

interface ExperienceFormProps {
    experiences: any[];
}

export function ExperienceForm({ experiences }: ExperienceFormProps) {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm<ExperienceFormData>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            position: "",
            company: "",
            location: "",
            startDate: "",
            endDate: "",
            current: false,
            description: "",
        },
    });

    const current = watch("current");

    const onSubmit = async (data: ExperienceFormData) => {
        setIsSubmitting(true);
        try {
            if (editingId) {
                await updateExperience(editingId, data);
                setEditingId(null);
            } else {
                await createExperience(data);
            }
            reset();
        } catch (error) {
            console.error(error);
            alert("Something went wrong");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEdit = (exp: any) => {
        setEditingId(exp.id);
        setValue("position", exp.position);
        setValue("company", exp.company);
        setValue("location", exp.location || "");
        setValue("startDate", new Date(exp.startDate).toISOString().split("T")[0]);
        setValue("endDate", exp.endDate ? new Date(exp.endDate).toISOString().split("T")[0] : "");
        setValue("current", exp.current);
        setValue("description", exp.description);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this experience?")) return;
        try {
            await deleteExperience(id);
        } catch (error) {
            console.error(error);
            alert("Failed to delete");
        }
    };

    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <h3 className="text-lg font-medium">Add / Edit Experience</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 border p-4 rounded-lg bg-card">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Position</label>
                            <input
                                {...register("position")}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                placeholder="Senior Developer"
                            />
                            {errors.position && <p className="text-red-500 text-xs">{errors.position.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Company</label>
                            <input
                                {...register("company")}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                placeholder="Tech Corp"
                            />
                            {errors.company && <p className="text-red-500 text-xs">{errors.company.message}</p>}
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Location</label>
                            <input
                                {...register("location")}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                placeholder="New York, NY"
                            />
                        </div>
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
                            id="current"
                            {...register("current")}
                            className="h-4 w-4 rounded border-gray-300"
                        />
                        <label htmlFor="current" className="text-sm font-medium">I currently work here</label>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Description</label>
                        <textarea
                            {...register("description")}
                            rows={4}
                            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-none"
                            placeholder="Describe your responsibilities and achievements..."
                        />
                        {errors.description && <p className="text-red-500 text-xs">{errors.description.message}</p>}
                    </div>

                    <div className="flex gap-2">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                        >
                            {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                            {editingId ? "Update Experience" : "Add Experience"}
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
                <h3 className="text-lg font-medium">Experience List</h3>
                <div className="space-y-4">
                    {experiences.map((exp) => (
                        <div key={exp.id} className="flex items-start justify-between p-4 border rounded-lg bg-card">
                            <div>
                                <h4 className="font-bold">{exp.position}</h4>
                                <p className="text-sm text-muted-foreground">{exp.company} • {exp.location}</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    {new Date(exp.startDate).toLocaleDateString()} - {exp.current ? "Present" : new Date(exp.endDate).toLocaleDateString()}
                                </p>
                                <p className="text-sm mt-2 whitespace-pre-wrap">{exp.description}</p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(exp)}
                                    className="p-2 hover:bg-accent rounded-md"
                                >
                                    <Save className="h-4 w-4" /> {/* Reusing Save icon as Edit icon for now, or import Edit */}
                                </button>
                                <button
                                    onClick={() => handleDelete(exp.id)}
                                    className="p-2 hover:bg-red-100 text-red-500 rounded-md"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                    {experiences.length === 0 && (
                        <p className="text-muted-foreground text-center py-8">No experience added yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

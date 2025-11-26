"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import IconPicker from "@/components/IconPicker";
import { Loader2 } from "lucide-react";

const skillSchema = z.object({
    name: z.string().min(1, "Skill name is required"),
    icon: z.string().min(1, "Please select an icon"),
    order: z.coerce.number().min(0, "Order must be 0 or greater").default(0),
});

type SkillFormData = z.infer<typeof skillSchema>;

interface SkillFormProps {
    skill?: {
        id: number;
        name: string;
        icon: string;
        order: number;
    };
    onSubmit: (data: SkillFormData) => Promise<void>;
    redirectPath?: string | null;
}

export default function SkillForm({ skill, onSubmit, redirectPath = "/admin/skills" }: SkillFormProps) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<SkillFormData>({
        resolver: zodResolver(skillSchema) as any,
        defaultValues: {
            name: skill?.name || "",
            icon: skill?.icon || "",
            order: skill?.order || 0,
        },
    });

    const selectedIcon = watch("icon");

    const handleFormSubmit = async (data: SkillFormData) => {
        setIsSubmitting(true);
        try {
            await onSubmit(data);
            if (redirectPath) {
                router.push(redirectPath);
            }
            router.refresh();
        } catch (error) {
            console.error("Error submitting skill:", error);
            alert("Failed to save skill. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            {/* Skill Name */}
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Skill Name *
                </label>
                <input
                    {...register("name")}
                    type="text"
                    id="name"
                    placeholder="e.g., Flutter, React Native, Swift"
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-primary outline-none"
                />
                {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
            </div>

            {/* Icon Picker */}
            <div>
                <label htmlFor="icon" className="block text-sm font-medium text-gray-300 mb-2">
                    Icon *
                </label>
                <IconPicker
                    value={selectedIcon}
                    onChange={(iconName) => setValue("icon", iconName)}
                />
                {errors.icon && (
                    <p className="text-red-500 text-sm mt-1">{errors.icon.message}</p>
                )}
            </div>

            {/* Order */}
            <div>
                <label htmlFor="order" className="block text-sm font-medium text-gray-300 mb-2">
                    Display Order
                </label>
                <input
                    {...register("order", { valueAsNumber: true })}
                    type="number"
                    id="order"
                    min="0"
                    placeholder="0"
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-primary outline-none"
                />
                <p className="text-gray-500 text-sm mt-1">
                    Lower numbers appear first. Leave as 0 for automatic ordering.
                </p>
                {errors.order && (
                    <p className="text-red-500 text-sm mt-1">{errors.order.message}</p>
                )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 pt-4">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-primary text-black rounded-lg hover:bg-primary/90 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                    {skill ? "Update Skill" : "Create Skill"}
                </button>
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors font-semibold"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}

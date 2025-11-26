"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Save } from "lucide-react";
import { updateProfile } from "@/lib/actions";

const formSchema = z.object({
    name: z.string().min(2, "Name is required"),
    title: z.string().min(2, "Title is required"),
    email: z.string().email("Invalid email"),
    phone: z.string().optional(),
    location: z.string().optional(),
    cvSummary: z.string().optional(),
    website: z.string().optional(),
    github: z.string().optional(),
    linkedin: z.string().optional(),
    telegram: z.string().optional(),
});

type ProfileFormData = z.infer<typeof formSchema>;

interface CVProfileFormProps {
    profile: any;
}

export function CVProfileForm({ profile }: CVProfileFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ProfileFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: profile?.name || "",
            title: profile?.title || "",
            email: profile?.email || "",
            phone: profile?.phone || "",
            location: profile?.location || "",
            cvSummary: profile?.cvSummary || profile?.bio || "",
            website: profile?.website || "",
            github: profile?.github || "",
            linkedin: profile?.linkedin || "",
            telegram: profile?.telegram || "",
        },
    });

    const onSubmit = async (data: ProfileFormData) => {
        setIsSubmitting(true);
        try {
            await updateProfile(data);
            alert("Profile updated successfully!");
        } catch (error) {
            console.error(error);
            alert("Failed to update profile");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h3 className="text-lg font-medium">CV Profile Information</h3>
                <p className="text-sm text-muted-foreground">
                    This information will be displayed on your generated CV.
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 border p-4 rounded-lg bg-card">
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Full Name</label>
                        <input
                            {...register("name")}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            placeholder="John Doe"
                        />
                        {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Professional Title</label>
                        <input
                            {...register("title")}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            placeholder="Software Engineer"
                        />
                        {errors.title && <p className="text-red-500 text-xs">{errors.title.message}</p>}
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Email</label>
                        <input
                            {...register("email")}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            placeholder="john@example.com"
                        />
                        {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Phone</label>
                        <input
                            {...register("phone")}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            placeholder="+1 234 567 890"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Location</label>
                        <input
                            {...register("location")}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            placeholder="San Francisco, CA"
                        />
                    </div>
                </div>



                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Website URL</label>
                        <input
                            {...register("website")}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            placeholder="https://www.yourwebsite.com"
                        />
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">GitHub URL</label>
                        <input
                            {...register("github")}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            placeholder="https://github.com/username"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">LinkedIn URL</label>
                        <input
                            {...register("linkedin")}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            placeholder="https://linkedin.com/in/username"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Telegram Username</label>
                        <input
                            {...register("telegram")}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            placeholder="@username"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Professional Summary</label>
                    <textarea
                        {...register("cvSummary")}
                        rows={6}
                        className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-none"
                        placeholder="A brief summary of your professional background..."
                    />
                    <p className="text-xs text-muted-foreground">
                        This summary is specific to your CV and can be different from your website bio.
                    </p>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                    >
                        {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                        Save Profile
                    </button>
                </div>
            </form>
        </div>
    );
}

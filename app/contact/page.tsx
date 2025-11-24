"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { Loader2, Mail, MapPin, Phone, Send } from "lucide-react";

const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log(data);
        setIsSubmitting(false);
        setIsSuccess(true);
        reset();
        setTimeout(() => setIsSuccess(false), 5000);
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-background text-foreground">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white uppercase tracking-widest">
                        Let&apos;s Have A <span className="text-primary">Chat</span>
                    </h1>
                    <p className="text-gray-400">
                        Have a project in mind? I&apos;d love to hear from you.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="flex items-start space-x-4">
                            <div className="p-3 rounded-full bg-primary/10 text-primary">
                                <Mail className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-white mb-1">Email</h3>
                                <p className="text-gray-400">adoniassahilehibeste12@gmail.com</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="p-3 rounded-full bg-primary/10 text-primary">
                                <Phone className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-white mb-1">Phone</h3>
                                <p className="text-gray-400">+251987081856</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="p-3 rounded-full bg-primary/10 text-primary">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-white mb-1">Location</h3>
                                <p className="text-gray-400">Addis Ababa, Ethiopia</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-card/30 p-8 rounded-2xl border border-white/5 backdrop-blur-sm">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div>
                                <input
                                    {...register("name")}
                                    placeholder="YOUR NAME"
                                    className="w-full bg-gray-200 border-none rounded-lg px-6 py-4 text-black placeholder-gray-500 focus:ring-2 focus:ring-primary outline-none transition-all"
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                                )}
                            </div>

                            <div>
                                <input
                                    {...register("email")}
                                    placeholder="EMAIL ADDRESS"
                                    className="w-full bg-gray-200 border-none rounded-lg px-6 py-4 text-black placeholder-gray-500 focus:ring-2 focus:ring-primary outline-none transition-all"
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                                )}
                            </div>

                            <div>
                                <textarea
                                    {...register("message")}
                                    placeholder="CHAT HERE"
                                    rows={4}
                                    className="w-full bg-gray-200 border-none rounded-lg px-6 py-4 text-black placeholder-gray-500 focus:ring-2 focus:ring-primary outline-none resize-none transition-all"
                                />
                                {errors.message && (
                                    <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-4 rounded-full bg-primary text-black font-bold hover:bg-primary/90 transition-all duration-300 uppercase tracking-widest text-lg shadow-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : isSuccess ? (
                                    "Message Sent!"
                                ) : (
                                    "Submit Here"
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

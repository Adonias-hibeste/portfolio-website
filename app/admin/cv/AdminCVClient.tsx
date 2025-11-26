"use client";

import { useState, useEffect } from "react";
import { Download, FileText, Briefcase, GraduationCap, Eye, User, Wrench, Trash2 } from "lucide-react";
import { ExperienceForm } from "@/components/ExperienceForm";
import { EducationForm } from "@/components/EducationForm";
import { CVProfileForm } from "@/components/CVProfileForm";
import SkillForm from "@/components/SkillForm";
import { createSkill, deleteSkill } from "@/lib/actions";
import { CVTemplate } from "@/components/CVTemplate";
import dynamic from "next/dynamic";

const PDFViewer = dynamic(
    () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
    {
        ssr: false,
        loading: () => (
            <div className="w-full h-[500px] border rounded-lg bg-white flex items-center justify-center text-muted-foreground">
                Loading Preview...
            </div>
        ),
    }
);

interface AdminCVClientProps {
    experiences: any[];
    educations: any[];
    profile: any;
    skills: any[];
}

export function AdminCVClient({ experiences, educations, profile, skills }: AdminCVClientProps) {
    const [activeTab, setActiveTab] = useState<"preview" | "profile" | "experience" | "education" | "skills">("preview");
    const [isAddingSkill, setIsAddingSkill] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const cvData = {
        name: profile?.name || "Your Name",
        title: profile?.title || "Professional Title",
        email: profile?.email || "email@example.com",
        phone: profile?.phone || "",
        location: profile?.location || "",
        summary: profile?.cvSummary || profile?.bio || "",
        website: profile?.website,
        github: profile?.github,
        linkedin: profile?.linkedin,
        telegram: profile?.telegram,
        skills: skills || [],
        projects: [],
        experiences: experiences.map((exp: any) => ({
            position: exp.position,
            company: exp.company,
            location: exp.location || undefined,
            startDate: new Date(exp.startDate).toISOString(),
            endDate: exp.endDate ? new Date(exp.endDate).toISOString() : undefined,
            current: exp.current,
            description: exp.description,
        })),
        educations: educations.map((edu: any) => ({
            institution: edu.institution,
            degree: edu.degree,
            field: edu.field,
            location: edu.location || undefined,
            startDate: new Date(edu.startDate).toISOString(),
            endDate: edu.endDate ? new Date(edu.endDate).toISOString() : undefined,
            current: edu.current,
            description: edu.description || undefined,
        })),
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">CV Management</h1>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <FileText className="w-4 h-4" />
                    <span>Use the preview below to download your CV</span>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex space-x-2 rounded-xl bg-muted p-1.5 overflow-x-auto">
                <button
                    onClick={() => setActiveTab("preview")}
                    className={`min-w-[120px] rounded-lg px-4 py-2.5 text-sm font-medium leading-5 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 transition-all ${activeTab === "preview"
                        ? "bg-background text-foreground shadow"
                        : "text-muted-foreground hover:bg-white/[0.12] hover:text-white"
                        }`}
                >
                    <div className="flex items-center justify-center gap-2">
                        <Eye className="w-4 h-4" />
                        Preview
                    </div>
                </button>
                <button
                    onClick={() => setActiveTab("profile")}
                    className={`min-w-[120px] rounded-lg px-4 py-2.5 text-sm font-medium leading-5 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 transition-all ${activeTab === "profile"
                        ? "bg-background text-foreground shadow"
                        : "text-muted-foreground hover:bg-white/[0.12] hover:text-white"
                        }`}
                >
                    <div className="flex items-center justify-center gap-2">
                        <User className="w-4 h-4" />
                        Profile
                    </div>
                </button>
                <button
                    onClick={() => setActiveTab("experience")}
                    className={`min-w-[120px] rounded-lg px-4 py-2.5 text-sm font-medium leading-5 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 transition-all ${activeTab === "experience"
                        ? "bg-background text-foreground shadow"
                        : "text-muted-foreground hover:bg-white/[0.12] hover:text-white"
                        }`}
                >
                    <div className="flex items-center justify-center gap-2">
                        <Briefcase className="w-4 h-4" />
                        Experience
                    </div>
                </button>
                <button
                    onClick={() => setActiveTab("education")}
                    className={`min-w-[120px] rounded-lg px-4 py-2.5 text-sm font-medium leading-5 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 transition-all ${activeTab === "education"
                        ? "bg-background text-foreground shadow"
                        : "text-muted-foreground hover:bg-white/[0.12] hover:text-white"
                        }`}
                >
                    <div className="flex items-center justify-center gap-2">
                        <GraduationCap className="w-4 h-4" />
                        Education
                    </div>
                </button>
                <button
                    onClick={() => setActiveTab("skills")}
                    className={`min-w-[120px] rounded-lg px-4 py-2.5 text-sm font-medium leading-5 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 transition-all ${activeTab === "skills"
                        ? "bg-background text-foreground shadow"
                        : "text-muted-foreground hover:bg-white/[0.12] hover:text-white"
                        }`}
                >
                    <div className="flex items-center justify-center gap-2">
                        <Wrench className="w-4 h-4" />
                        Skills
                    </div>
                </button>
            </div>

            {/* Content */}
            <div className="mt-6">
                {activeTab === "preview" && (
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="rounded-xl border bg-card text-card-foreground shadow">
                            <div className="p-6 flex flex-col items-center text-center space-y-4">
                                <div className="p-4 bg-primary/10 rounded-full">
                                    <FileText className="w-12 h-12 text-primary" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold">Auto-Generated CV</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Generates a professional PDF resume using your portfolio data.
                                    </p>
                                    <div className="mt-4 p-3 bg-primary/10 rounded-lg border border-primary/20">
                                        <p className="text-sm font-medium text-primary">📥 How to Download:</p>
                                        <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                                            <li>• <strong>Desktop:</strong> Click the print icon in the toolbar, then "Save as PDF"</li>
                                            <li>• <strong>Mobile/Tablet:</strong> Tap the share icon and select "Save to Files"</li>
                                            <li>• <strong>Alternative:</strong> Right-click the preview and select "Save as..."</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="w-full pt-4">
                                    {isClient ? (
                                        <PDFViewer width="100%" height="500px" className="border rounded-lg bg-white">
                                            <CVTemplate data={cvData} />
                                        </PDFViewer>
                                    ) : (
                                        <div className="w-full h-[500px] border rounded-lg bg-white flex items-center justify-center text-muted-foreground">
                                            Loading Preview...
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "profile" && (
                    <CVProfileForm profile={profile} />
                )}

                {activeTab === "experience" && (
                    <ExperienceForm experiences={experiences} />
                )}

                {activeTab === "education" && (
                    <EducationForm educations={educations} />
                )}

                {activeTab === "skills" && (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium">Skills</h3>
                            <button
                                onClick={() => setIsAddingSkill(!isAddingSkill)}
                                className="px-4 py-2 bg-primary text-black rounded-lg hover:bg-primary/90 transition-colors font-semibold text-sm"
                            >
                                {isAddingSkill ? "Cancel" : "Add Skill"}
                            </button>
                        </div>

                        {isAddingSkill && (
                            <div className="bg-card border rounded-lg p-4">
                                <SkillForm
                                    onSubmit={async (data) => {
                                        await createSkill(data);
                                        setIsAddingSkill(false);
                                    }}
                                    redirectPath={null}
                                />
                            </div>
                        )}

                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {skills.map((skill) => (
                                <div key={skill.id} className="flex items-center justify-between p-4 bg-card border rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-primary/20 rounded-md flex items-center justify-center text-primary font-bold">
                                            {skill.name[0]}
                                        </div>
                                        <span className="font-medium">{skill.name}</span>
                                    </div>
                                    <button
                                        onClick={async () => {
                                            if (confirm("Are you sure you want to delete this skill?")) {
                                                await deleteSkill(skill.id);
                                            }
                                        }}
                                        className="text-red-500 hover:bg-red-500/10 p-2 rounded-md transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

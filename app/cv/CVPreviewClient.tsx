"use client";

import { useState, useEffect } from "react";
import { FileText } from "lucide-react";
import { CVTemplate } from "@/components/CVTemplate";
import dynamic from "next/dynamic";
import Link from "next/link";

const PDFViewer = dynamic(
    () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
    {
        ssr: false,
        loading: () => (
            <div className="w-full h-screen flex items-center justify-center bg-white text-gray-600">
                Loading CV Preview...
            </div>
        ),
    }
);

interface CVPreviewClientProps {
    experiences: any[];
    educations: any[];
    profile: any;
    skills: any[];
    projects: any[];
}

export default function CVPreviewClient({ experiences, educations, profile, skills, projects }: CVPreviewClientProps) {
    const [isClient, setIsClient] = useState(false);

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
        projects: projects || [],
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
        <div className="min-h-screen bg-background">
            {/* Header with instructions */}
            <div className="bg-card border-b border-border">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <FileText className="w-6 h-6 text-primary" />
                            <h1 className="text-2xl font-bold">Adonias Hibeste - CV</h1>
                        </div>
                        <Link
                            href="/"
                            className="px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors text-sm font-medium"
                        >
                            ← Back to Portfolio
                        </Link>
                    </div>
                    <div className="mt-4 p-4 bg-primary/10 rounded-lg border border-primary/20">
                        <p className="text-sm font-medium text-primary mb-2">📥 How to Download:</p>
                        <ul className="text-xs text-muted-foreground space-y-1">
                            <li>• <strong>Desktop:</strong> Click the print icon in the toolbar, then "Save as PDF"</li>
                            <li>• <strong>Mobile/Tablet:</strong> Tap the share icon and select "Save to Files"</li>
                            <li>• <strong>Alternative:</strong> Right-click the preview and select "Save as..."</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* PDF Preview */}
            <div className="w-full h-[calc(100vh-180px)]">
                {isClient ? (
                    <PDFViewer width="100%" height="100%" className="border-0">
                        <CVTemplate data={cvData} />
                    </PDFViewer>
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-white text-gray-600">
                        Loading Preview...
                    </div>
                )}
            </div>
        </div>
    );
}

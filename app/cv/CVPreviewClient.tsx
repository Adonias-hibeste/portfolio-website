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

    // Refine summary to include Google Play Store and AI tools
    const refinedSummary = (profile?.cvSummary || profile?.bio || "")
        .replace(/App Store/g, "App Store and Google Play Store")
        .replace(/\.$/, "") + " specializing in AI-assisted development using Cursor, Claude Code, and Codex.";

    // Passion projects requested by the user
    const requestedPassionProjectTitles = [
        "Dating App", 
        "Ecommerce App", 
        "ShopEasy", 
        "Meditrack Pro", 
        "FinanceFlow", 
        "Secure VPN", 
        "Urban Taxi", 
        "Express Delivery", 
        "Football Club Manager"
    ];

    const enterpriseKeywords = ['doulado', 'sefere', 'hababond', 'hababbond', 'hababondlite', 'hababbondlite', 'safari'];
    
    const cvData = {
        name: profile?.name || "Adonias Hibeste",
        title: profile?.title || "Senior Mobile Developer",
        email: profile?.email || "email@example.com",
        phone: profile?.phone || "",
        location: profile?.location || "",
        summary: refinedSummary,
        website: profile?.website,
        github: profile?.github,
        linkedin: profile?.linkedin,
        telegram: profile?.telegram,
        skills: [...(skills || []), { name: "Supabase" }],
        experiences: experiences
            .filter((exp: any) => {
                const company = exp.company.toLowerCase();
                return !company.includes("upwork") && !company.includes("various startup");
            })
            .map((exp: any) => {
                let position = exp.position;
                let company = exp.company.replace(/HababBond/g, "Hababond").replace(/\(Personal Project\)/gi, "").trim();
                let description = "";
                let subItems: { title: string; description: string }[] = [];

                if (company.toLowerCase().includes("sefere")) {
                    company = "Sefere";
                    position = "Lead Full Stack Developer";
                    description = "Architected and delivered the Sefere ecosystem, a multi-platform community networking solution. This involved leading the development of the Sefere Social mobile application for diaspora connection, a robust multi-role Web Portal for administration and community management, and the Sefere Theme Studio, a visual design engine for real-time UI/UX customization across the platform.";
                } else if (company.toLowerCase().includes("hababond")) {
                    company = "Hababond";
                    position = "Lead Mobile Developer";
                    description = "Spearheaded the development of the Hababond mobile ecosystem, delivering two high-impact applications. This included a premium dating platform with real-time matching and video connectivity, as well as a comprehensive social networking marketplace that integrates community engagement with seamless commerce and real-time communication features.";
                } else if (company.toLowerCase().includes("doulado")) {
                    company = "Doulado";
                    position = "Lead Mobile App Developer";
                    description = "Engineered a professional practice management platform tailored for doulas. The application automates mission-critical workflows including client intake, automated scheduling, and complex billing/invoicing systems. It integrates secure telehealth video bridges, HIPAA-compliant clinical rich-text documentation, and real-time messaging to facilitate seamless provider-client coordination.";
                } else if (company.toLowerCase().includes("freelance") || company.toLowerCase().includes("independent")) {
                    company = "Independent / Freelance";
                    description = "";
                    subItems = projects
                        .filter((p: any) => requestedPassionProjectTitles.some(t => p.title.toLowerCase().includes(t.toLowerCase())))
                        .map((p: any) => ({
                            title: p.title.replace(/HababBond/g, "Hababond"),
                            description: p.description.split('\n')[0] + " Features include high-performance architecture, clean state management, and production-ready UI/UX standards."
                        }));
                } else {
                    description = exp.description.replace(/HababBond/g, "Hababond").replace(/AI-assisted development tools \(Cursor, Google DeepMind Antigravity\)/gi, "").replace(/\(Personal Project\)/gi, "").trim().split('\n').map((l: string) => l.trim()).filter((l: string) => l.length > 0).join(" ");
                }

                return {
                    position: position,
                    company: company,
                    location: exp.location || undefined,
                    startDate: new Date(exp.startDate).toISOString(),
                    endDate: exp.endDate ? new Date(exp.endDate).toISOString() : undefined,
                    current: exp.current,
                    description: description,
                    subItems: subItems.length > 0 ? subItems : undefined
                };
            }),
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

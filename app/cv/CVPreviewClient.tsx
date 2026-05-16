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

    // Refine summary to include Google Play Store but remove AI tools addition
    const refinedSummary = (profile?.cvSummary || profile?.bio || "")
        .replace(/App Store/g, "App Store and Google Play Store");

    const cvData = {
        name: profile?.name || "Adonias Hibeste",
        title: "Lead Mobile App Developer | Cross-Platform & Native Specialist",
        email: profile?.email || "email@example.com",
        phone: profile?.phone || "",
        location: profile?.location || "",
        summary: refinedSummary,
        website: profile?.website,
        github: profile?.github,
        linkedin: profile?.linkedin,
        telegram: profile?.telegram,
        skills: [...(skills || []), { name: "Supabase" }],
        experiences: [
            {
                company: "Doulado LLC",
                position: "Lead Mobile App Developer",
                location: "USA, Wyoming (Remote)",
                startDate: "2024-01-01T00:00:00Z",
                current: true,
                description: "• Engineered and scaled a comprehensive practice management ecosystem for doulas, managing the entire lifecycle of multiple mobile and web applications.\n• Orchestrated the delivery of 11+ feature modules including real-time telehealth video bridges, HIPAA-compliant clinical notes, and automated billing systems.\n• Led cross-functional teams to integrate secure SSE messaging and complex state management across Flutter, React Native, and native Swift environments.\n• Optimized application performance and delivery pipelines, ensuring high-fidelity user experiences for thousands of active providers."
            },
            {
                company: "Hababond Inc",
                position: "Lead Mobile App Developer",
                location: "Canada, Toronto (Remote)",
                startDate: "2023-01-01T00:00:00Z",
                endDate: "2024-12-31T23:59:59Z",
                current: false,
                description: "• Directed the development of high-impact social networking and dating platforms, delivering multiple production apps across iOS and Android.\n• Built and maintained a premium dating app featuring real-time WebRTC connectivity, swipe-to-match algorithms, and complex geofencing logic.\n• Specialized in building multi-stack solutions, utilizing Flutter and React Native to bridge community engagement with secure marketplace commerce.\n• Reduced crash rates by 25% through rigorous code reviews and implementation of robust feature-module architectures."
            },
            {
                company: "Sefere PLC",
                position: "Lead Full Stack Developer",
                location: "USA, Maryland",
                startDate: "2022-01-01T00:00:00Z",
                endDate: "2023-12-31T23:59:59Z",
                current: false,
                description: "• Architected the Sefere ecosystem from the ground up, including the Sefere Social mobile network, a multi-role Web Portal, and a visual UI Theme Studio.\n• Implemented real-time community discovery tools and Google ML Kit face verification across multiple diaspora-focused applications.\n• Developed a custom design system allowing real-time theme customization for hundreds of community portals.\n• Spearheaded the full-stack delivery using Next.js and Firebase, ensuring 99.9% uptime for critical community infrastructure."
            },
            {
                company: "Independent / Freelance",
                position: "Senior Mobile Developer",
                location: "Remote",
                startDate: "2021-01-01T00:00:00Z",
                endDate: "2022-01-01T00:00:00Z",
                current: false,
                description: "Delivered custom mobile solutions for global clients focusing on e-commerce and logistics.",
                subItems: [
                    { title: "Ecommerce App", description: "Developed a high-performance retail platform with complex inventory management and secure checkout flows." },
                    { title: "Delivery App", description: "Built a real-time logistics solution with live tracking, automated dispatching, and driver-side analytics." }
                ]
            }
        ],
        educations: educations.map((edu: any) => ({
            institution: edu.institution,
            degree: edu.degree,
            field: edu.field,
            location: edu.location || undefined,
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

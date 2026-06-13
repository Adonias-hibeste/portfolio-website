"use client";

import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/Footer";

interface HomeContentProps {
    projects: any[];
    skills: any[];
    profile?: any;
    experiences?: any[];
}

export default function HomeContent({ projects, skills, profile, experiences }: HomeContentProps) {
    return (
        <div className="bg-background text-foreground overflow-x-hidden font-sans selection:bg-primary/30 selection:text-primary">
            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <ProjectsSection projects={projects} />
            <ProcessSection />
            <TestimonialsSection />
            <ContactSection />
            <Footer />
        </div>
    );
}

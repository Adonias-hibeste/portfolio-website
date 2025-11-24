import { ProjectForm } from "@/components/ProjectForm";

export default function NewProjectPage() {
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold tracking-tight">Add Project</h1>
            <ProjectForm />
        </div>
    );
}

import Link from "next/link";
import { LayoutDashboard, FolderKanban, LogOut, User, FileText, Zap } from "lucide-react";
import { SignOutButton } from "@/components/SignOutButton";

export const dynamic = "force-dynamic";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-muted/40">
            {/* Sidebar */}
            <aside className="fixed inset-y-0 left-0 z-10 w-64 border-r bg-background hidden md:block">
                <div className="flex h-full flex-col">
                    <div className="flex h-14 items-center border-b px-6 font-bold text-lg">
                        Admin Panel
                    </div>
                    <nav className="flex-1 space-y-1 px-4 py-4">
                        <Link
                            href="/admin/dashboard"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
                        >
                            <LayoutDashboard className="h-4 w-4" />
                            Dashboard
                        </Link>
                        <Link
                            href="/admin/skills"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
                        >
                            <Zap className="h-4 w-4" />
                            Skills
                        </Link>
                        <Link
                            href="/admin/projects"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
                        >
                            <FolderKanban className="h-4 w-4" />
                            Projects
                        </Link>
                        <Link
                            href="/admin/cv"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
                        >
                            <FileText className="h-4 w-4" />
                            CV / Resume
                        </Link>
                    </nav>
                    <div className="border-t p-4">
                        <SignOutButton />
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-8">
                {children}
            </main>
        </div>
    );
}

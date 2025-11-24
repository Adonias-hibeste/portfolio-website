import SkillForm from "@/components/SkillForm";
import { createSkill } from "@/lib/actions";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewSkillPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link
                    href="/admin/skills"
                    className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 text-gray-400" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-white">Add New Skill</h1>
                    <p className="text-gray-400 mt-1">Create a new skill for your portfolio</p>
                </div>
            </div>

            <div className="bg-card/30 rounded-xl p-8 border border-white/5">
                <SkillForm
                    onSubmit={async (data) => {
                        "use server";
                        await createSkill(data);
                    }}
                />
            </div>
        </div>
    );
}

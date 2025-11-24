import { prisma } from "@/lib/prisma";
import SkillForm from "@/components/SkillForm";
import { updateSkill } from "@/lib/actions";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function EditSkillPage({ params }: { params: { id: string } }) {
    const skillId = parseInt(params.id);

    if (isNaN(skillId)) {
        notFound();
    }

    const skill = await prisma.skill.findUnique({
        where: { id: skillId },
    });

    if (!skill) {
        notFound();
    }

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
                    <h1 className="text-3xl font-bold text-white">Edit Skill</h1>
                    <p className="text-gray-400 mt-1">Update skill details and icon</p>
                </div>
            </div>

            <div className="bg-card/30 rounded-xl p-8 border border-white/5">
                <SkillForm
                    skill={skill}
                    onSubmit={async (data) => {
                        "use server";
                        await updateSkill(skillId, data);
                    }}
                />
            </div>
        </div>
    );
}

import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { deleteSkill } from "@/lib/actions";
import { getIconComponent } from "@/lib/iconMap";

export default async function SkillsPage() {
    const skills = await prisma.skill.findMany({
        orderBy: { order: "asc" },
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white">Skills Management</h1>
                    <p className="text-gray-400 mt-1">Manage your technical skills and icons</p>
                </div>
                <Link
                    href="/admin/skills/new"
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-black rounded-lg hover:bg-primary/90 transition-colors font-semibold"
                >
                    <Plus className="w-4 h-4" />
                    Add Skill
                </Link>
            </div>

            {skills.length === 0 ? (
                <div className="bg-card/30 rounded-xl p-12 text-center border border-white/5">
                    <p className="text-gray-400 mb-4">No skills added yet</p>
                    <Link
                        href="/admin/skills/new"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-black rounded-lg hover:bg-primary/90 transition-colors font-semibold"
                    >
                        <Plus className="w-4 h-4" />
                        Add Your First Skill
                    </Link>
                </div>
            ) : (
                <div className="bg-card/30 rounded-xl border border-white/5 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-card/50 border-b border-white/5">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Icon</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Name</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Order</th>
                                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {skills.map((skill) => {
                                const Icon = getIconComponent(skill.icon);
                                return (
                                    <tr key={skill.id} className="hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                                                {Icon && <Icon className="w-5 h-5 text-primary" />}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-white font-medium">{skill.name}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-gray-400">{skill.order}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={`/admin/skills/${skill.id}`}
                                                    className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </Link>
                                                <form action={async () => {
                                                    "use server";
                                                    await deleteSkill(skill.id);
                                                }}>
                                                    <button
                                                        type="submit"
                                                        className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </form>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

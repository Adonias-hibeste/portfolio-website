"use client";

import { motion } from "framer-motion";
import { getIconComponent } from "@/lib/iconMap";
import { Code } from "lucide-react";

interface TechStackShowcaseProps {
    skills: { name: string; icon: string; proficiency?: number }[];
}

export function TechStackShowcase({ skills }: TechStackShowcaseProps) {
    return (
        <div className="relative">
            <div className="grid grid-cols-3 md:grid-cols-5 gap-6">
                {skills.map((skill, index) => {
                    const IconComponent = getIconComponent(skill.icon);

                    return (
                        <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05, duration: 0.4 }}
                            whileHover={{
                                scale: 1.1,
                                rotate: [0, -5, 5, 0],
                                transition: { duration: 0.3 }
                            }}
                            className="group relative"
                        >
                            {/* Skill Card */}
                            <div className="relative bg-gradient-to-br from-card/60 to-card/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(204,255,0,0.2)]">
                                {/* Glow Effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

                                {/* Icon */}
                                <div className="relative flex flex-col items-center gap-3">
                                    <div className="w-12 h-12 flex items-center justify-center">
                                        {IconComponent ? (
                                            <IconComponent className="w-full h-full text-primary group-hover:scale-110 transition-transform" />
                                        ) : (
                                            <Code className="w-full h-full text-primary group-hover:scale-110 transition-transform" />
                                        )}
                                    </div>

                                    {/* Skill Name */}
                                    <span className="text-xs font-semibold text-gray-300 group-hover:text-white text-center transition-colors">
                                        {skill.name}
                                    </span>
                                </div>

                                {/* Proficiency Bar (if provided) */}
                                {skill.proficiency && (
                                    <div className="mt-3">
                                        <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${skill.proficiency}%` }}
                                                viewport={{ once: true }}
                                                transition={{ delay: index * 0.05 + 0.2, duration: 0.8 }}
                                                className="h-full bg-gradient-to-r from-primary to-primary/60"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}

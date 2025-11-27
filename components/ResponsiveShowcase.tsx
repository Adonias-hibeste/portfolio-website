"use client";

import { motion } from "framer-motion";
import { Smartphone, Tablet, Monitor } from "lucide-react";

export function ResponsiveShowcase() {
    const devices = [
        {
            icon: Smartphone,
            name: "Mobile",
            description: "Optimized for phones",
            color: "text-primary",
            bgColor: "from-primary/10 to-primary/5",
            borderColor: "border-primary/20",
        },
        {
            icon: Tablet,
            name: "Tablet",
            description: "Perfect for tablets",
            color: "text-blue-400",
            bgColor: "from-blue-500/10 to-blue-500/5",
            borderColor: "border-blue-500/20",
        },
        {
            icon: Monitor,
            name: "Desktop",
            description: "Scales beautifully",
            color: "text-purple-400",
            bgColor: "from-purple-500/10 to-purple-500/5",
            borderColor: "border-purple-500/20",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {devices.map((device, index) => {
                const Icon = device.icon;
                return (
                    <motion.div
                        key={device.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className={`bg-gradient-to-br ${device.bgColor} backdrop-blur-sm border ${device.borderColor} rounded-2xl p-8 text-center hover:shadow-[0_0_30px_rgba(204,255,0,0.2)] transition-all duration-300`}
                    >
                        {/* Animated Icon */}
                        <motion.div
                            animate={{
                                rotateY: [0, 360],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "linear",
                                repeatDelay: 2
                            }}
                            className="mx-auto mb-4"
                        >
                            <Icon className={`w-16 h-16 ${device.color}`} />
                        </motion.div>

                        {/* Device Name */}
                        <h4 className={`text-xl font-bold mb-2 ${device.color}`}>
                            {device.name}
                        </h4>

                        {/* Description */}
                        <p className="text-sm text-gray-400">
                            {device.description}
                        </p>

                        {/* Animated Check Mark */}
                        <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                            className="mt-4"
                        >
                            <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${device.bgColor} border-2 ${device.borderColor} mx-auto flex items-center justify-center`}>
                                <svg className={`w-5 h-5 ${device.color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        </motion.div>
                    </motion.div>
                );
            })}
        </div>
    );
}

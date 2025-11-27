"use client";

import { motion } from "framer-motion";
import { PhoneMockup } from "./PhoneMockup";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface AppDemo {
    id: string;
    name: string;
    description: string;
    iosImage?: string;
    androidImage?: string;
    features: string[];
}

interface AppShowcaseProps {
    apps?: AppDemo[];
}

const defaultApps: AppDemo[] = [
    {
        id: "1",
        name: "E-Commerce App",
        description: "Full-featured shopping experience with real-time inventory",
        iosImage: "https://i.imgur.com/placeholder1.png", // Replace with actual images
        androidImage: "https://i.imgur.com/placeholder2.png",
        features: ["Real-time sync", "Push notifications", "Secure payments"],
    },
    {
        id: "2",
        name: "Social Media Platform",
        description: "Connect and share with friends in real-time",
        iosImage: "https://i.imgur.com/placeholder3.png",
        androidImage: "https://i.imgur.com/placeholder4.png",
        features: ["Live chat", "Story sharing", "Video calls"],
    },
];

export function AppShowcase({ apps = defaultApps }: AppShowcaseProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentApp = apps[currentIndex];

    const nextApp = () => {
        setCurrentIndex((prev) => (prev + 1) % apps.length);
    };

    const prevApp = () => {
        setCurrentIndex((prev) => (prev - 1 + apps.length) % apps.length);
    };

    return (
        <div className="relative">
            {/* App Info */}
            <motion.div
                key={currentApp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
            >
                <h3 className="text-3xl font-bold text-white mb-4">{currentApp.name}</h3>
                <p className="text-gray-400 text-lg mb-6 max-w-2xl mx-auto">
                    {currentApp.description}
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                    {currentApp.features.map((feature, index) => (
                        <motion.span
                            key={feature}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-primary text-sm font-medium"
                        >
                            {feature}
                        </motion.span>
                    ))}
                </div>
            </motion.div>

            {/* Phone Mockups - Side by Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto mb-12">
                {/* iOS */}
                <motion.div
                    key={`ios-${currentApp.id}`}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center"
                >
                    <div className="mb-4">
                        <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                            iOS Version
                        </span>
                    </div>
                    <PhoneMockup type="iphone" imageUrl={currentApp.iosImage} />
                </motion.div>

                {/* Android */}
                <motion.div
                    key={`android-${currentApp.id}`}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center"
                >
                    <div className="mb-4">
                        <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                            Android Version
                        </span>
                    </div>
                    <PhoneMockup type="android" imageUrl={currentApp.androidImage} />
                </motion.div>
            </div>

            {/* Navigation */}
            {apps.length > 1 && (
                <div className="flex items-center justify-center gap-6">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={prevApp}
                        className="w-12 h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center hover:bg-primary/20 transition-colors"
                    >
                        <ChevronLeft className="w-6 h-6 text-primary" />
                    </motion.button>

                    {/* Dots Indicator */}
                    <div className="flex gap-2">
                        {apps.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex
                                        ? "bg-primary w-8"
                                        : "bg-gray-600 hover:bg-gray-500"
                                    }`}
                            />
                        ))}
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={nextApp}
                        className="w-12 h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center hover:bg-primary/20 transition-colors"
                    >
                        <ChevronRight className="w-6 h-6 text-primary" />
                    </motion.button>
                </div>
            )}
        </div>
    );
}

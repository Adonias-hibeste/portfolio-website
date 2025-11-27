"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ReactNode } from "react";

interface PhoneMockupProps {
    children?: ReactNode;
    imageUrl?: string;
    type?: "iphone" | "android";
    className?: string;
}

export function PhoneMockup({
    children,
    imageUrl,
    type = "iphone",
    className = ""
}: PhoneMockupProps) {
    return (
        <motion.div
            className={`relative ${className}`}
            whileHover={{ scale: 1.05, rotateY: 5 }}
            transition={{ duration: 0.3 }}
        >
            {/* Phone Frame */}
            <div className={`relative ${type === "iphone" ? "aspect-[9/19.5]" : "aspect-[9/19]"} max-w-[300px] mx-auto`}>
                {/* Phone Border */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-[3rem] shadow-2xl border-8 border-gray-900">
                    {/* Notch (iPhone) */}
                    {type === "iphone" && (
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-2xl z-10" />
                    )}

                    {/* Screen */}
                    <div className="absolute inset-3 bg-white rounded-[2.5rem] overflow-hidden">
                        {imageUrl ? (
                            <Image
                                src={imageUrl}
                                alt="App screenshot"
                                fill
                                className="object-cover"
                            />
                        ) : (
                            children
                        )}
                    </div>

                    {/* Power Button */}
                    <div className="absolute right-0 top-24 w-1 h-12 bg-gray-700 rounded-l" />

                    {/* Volume Buttons */}
                    <div className="absolute left-0 top-20 w-1 h-8 bg-gray-700 rounded-r" />
                    <div className="absolute left-0 top-32 w-1 h-8 bg-gray-700 rounded-r" />
                </div>
            </div>
        </motion.div>
    );
}

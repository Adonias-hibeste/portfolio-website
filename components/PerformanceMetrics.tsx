"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";

interface Metric {
    label: string;
    value: number;
    suffix: string;
    color: string;
}

const metrics: Metric[] = [
    { label: "FPS Animations", value: 60, suffix: " FPS", color: "text-primary" },
    { label: "Load Time", value: 2, suffix: "s", color: "text-blue-400" },
    { label: "Crash-Free Rate", value: 99, suffix: "%", color: "text-green-400" },
    { label: "Average Rating", value: 4.8, suffix: "★", color: "text-yellow-400" },
];

function AnimatedCounter({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!inView) return;

        const duration = 2000;
        const steps = 60;
        const increment = value / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
                setCount(value);
                clearInterval(timer);
            } else {
                setCount(current);
            }
        }, duration / steps);

        return () => clearInterval(timer);
    }, [inView, value]);

    return (
        <span>
            {count.toFixed(value % 1 === 0 ? 0 : 1)}
            {suffix}
        </span>
    );
}

export function PerformanceMetrics() {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.3,
    });

    return (
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {metrics.map((metric, index) => (
                <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="bg-gradient-to-br from-card/60 to-card/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:border-primary/30 transition-all duration-300"
                >
                    <div className={`text-4xl md:text-5xl font-bold mb-2 ${metric.color}`}>
                        <AnimatedCounter value={metric.value} suffix={metric.suffix} inView={inView} />
                    </div>
                    <div className="text-sm text-gray-400 uppercase tracking-wider">{metric.label}</div>
                </motion.div>
            ))}
        </div>
    );
}

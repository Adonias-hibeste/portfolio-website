"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedSectionProps {
    children: ReactNode;
    className?: string;
    initial?: any;
    animate?: any;
    whileInView?: any;
    viewport?: any;
    transition?: any;
    id?: string;
}

export function AnimatedSection({
    children,
    className,
    initial,
    animate,
    whileInView,
    viewport,
    transition,
    id
}: AnimatedSectionProps) {
    return (
        <motion.div
            id={id}
            className={className}
            initial={initial}
            animate={animate}
            whileInView={whileInView}
            viewport={viewport}
            transition={transition}
        >
            {children}
        </motion.div>
    );
}

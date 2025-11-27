"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

interface AccessibleAnimationProps {
    children: ReactNode;
    animation?: any;
    className?: string;
}

/**
 * Wrapper component that respects user's motion preferences
 * Disables animations if user has prefers-reduced-motion enabled
 */
export function AccessibleAnimation({
    children,
    animation = {},
    className = ""
}: AccessibleAnimationProps) {
    const shouldReduceMotion = useReducedMotion();

    if (shouldReduceMotion) {
        // Return static div if user prefers reduced motion
        return <div className={className}>{children}</div>;
    }

    // Return animated version
    return (
        <motion.div {...animation} className={className}>
            {children}
        </motion.div>
    );
}

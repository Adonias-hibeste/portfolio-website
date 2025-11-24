"use client";

import { useEffect } from "react";

export function useAnalytics() {
    useEffect(() => {
        // Generate or retrieve session ID
        let sessionId = localStorage.getItem("sessionId");
        if (!sessionId) {
            sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            localStorage.setItem("sessionId", sessionId);
        }

        // Track page view
        const trackPageView = async () => {
            try {
                await fetch("/api/analytics", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        path: window.location.pathname,
                        sessionId,
                        userAgent: navigator.userAgent,
                        referrer: document.referrer || null,
                    }),
                });
            } catch (error) {
                console.error("Failed to track page view:", error);
            }
        };

        trackPageView();
    }, []);
}

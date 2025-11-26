"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";

export function ConditionalNavbar() {
    const pathname = usePathname();

    // Don't show navbar on admin pages or login page
    if (pathname?.startsWith("/admin")) {
        return null;
    }

    return <Navbar />;
}

"use client";

import { LogOut } from "lucide-react";
import { signOutAction } from "@/lib/actions";

export function SignOutButton() {
    return (
        <button
            onClick={() => signOutAction()}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-red-500 hover:bg-red-500/10"
        >
            <LogOut className="h-4 w-4" />
            Sign Out
        </button>
    );
}

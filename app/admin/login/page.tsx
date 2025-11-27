import LoginForm from "./LoginForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Admin Login | Portfolio",
    description: "Admin login page",
};

export const dynamic = "force-dynamic";

export default function LoginPage() {
    return <LoginForm />;
}

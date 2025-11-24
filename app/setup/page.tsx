"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SetupPage() {
    const router = useRouter();
    const [email, setEmail] = useState("admin@portfolio.com");
    const [password, setPassword] = useState("admin123456");
    const [name, setName] = useState("Admin");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [setupRequired, setSetupRequired] = useState<boolean | null>(null);

    useEffect(() => {
        // Check if setup is required
        fetch("/api/setup")
            .then((res) => res.json())
            .then((data) => {
                setSetupRequired(data.setupRequired);
                if (!data.setupRequired) {
                    // Redirect to login if setup not required
                    setTimeout(() => router.push("/admin/login"), 2000);
                }
            })
            .catch(() => setSetupRequired(true));
    }, [router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/setup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, name }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to create admin user");
            }

            setSuccess(true);
            setTimeout(() => {
                router.push("/admin/login");
            }, 2000);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (setupRequired === null) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900">
                <div className="text-white">Checking setup status...</div>
            </div>
        );
    }

    if (setupRequired === false) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900">
                <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 max-w-md w-full">
                    <div className="text-center">
                        <div className="text-green-400 text-6xl mb-4">✓</div>
                        <h1 className="text-2xl font-bold text-white mb-2">Setup Complete</h1>
                        <p className="text-gray-300">Admin user already exists. Redirecting to login...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 max-w-md w-full">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Initial Setup</h1>
                    <p className="text-gray-300">Create your admin account</p>
                </div>

                {success ? (
                    <div className="text-center">
                        <div className="text-green-400 text-6xl mb-4">✓</div>
                        <h2 className="text-xl font-semibold text-white mb-2">Success!</h2>
                        <p className="text-gray-300">Admin user created. Redirecting to login...</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 text-red-200 text-sm">
                                {error}
                            </div>
                        )}

                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                                Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                placeholder="Admin"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                placeholder="admin@portfolio.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={6}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                placeholder="Min 6 characters"
                            />
                            <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-primary to-primary/80 text-white font-semibold py-3 px-6 rounded-lg hover:from-primary/90 hover:to-primary/70 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Creating..." : "Create Admin Account"}
                        </button>

                        <div className="bg-blue-500/20 border border-blue-500/50 rounded-lg p-4 text-sm text-blue-200">
                            <p className="font-semibold mb-1">ℹ️ Note:</p>
                            <p>This setup page will be disabled after creating the first admin user.</p>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}

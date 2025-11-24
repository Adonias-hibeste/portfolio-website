import { prisma } from "@/lib/prisma";
import { getAnalyticsSummary, getPageViewStats } from "@/lib/analytics";
import { FolderKanban, User, Eye, Users, Zap, TrendingUp, Activity } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
    let projectCount = 0;
    let skillCount = 0;
    let profile = null;
    let analytics: {
        totalVisitors: number;
        totalPageViews: number;
        recentActivity: any[];
    } = {
        totalVisitors: 0,
        totalPageViews: 0,
        recentActivity: [],
    };
    let topPages: { path: string; views: number }[] = [];

    try {
        [projectCount, skillCount, profile, analytics, topPages] = await Promise.all([
            prisma.project.count(),
            prisma.skill.count(),
            prisma.profile.findFirst(),
            getAnalyticsSummary(),
            getPageViewStats(),
        ]);
    } catch (e) {
        console.warn("Database connection failed during build (Dashboard)");
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard</h1>
                <p className="text-gray-400 mt-1">Overview of your portfolio analytics and content</p>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {/* Total Visitors */}
                <div className="rounded-xl border border-white/10 bg-gradient-to-br from-primary/10 to-primary/5 p-6 backdrop-blur-sm">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <h3 className="tracking-tight text-sm font-medium text-gray-300">Total Visitors</h3>
                        <Users className="h-4 w-4 text-primary" />
                    </div>
                    <div className="text-3xl font-bold text-white">{analytics.totalVisitors}</div>
                    <p className="text-xs text-gray-500 mt-1">Unique visitors</p>
                </div>

                {/* Page Views */}
                <div className="rounded-xl border border-white/10 bg-gradient-to-br from-blue-500/10 to-blue-500/5 p-6 backdrop-blur-sm">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <h3 className="tracking-tight text-sm font-medium text-gray-300">Page Views</h3>
                        <Eye className="h-4 w-4 text-blue-400" />
                    </div>
                    <div className="text-3xl font-bold text-white">{analytics.totalPageViews}</div>
                    <p className="text-xs text-gray-500 mt-1">Total views</p>
                </div>

                {/* Total Projects */}
                <div className="rounded-xl border border-white/10 bg-gradient-to-br from-purple-500/10 to-purple-500/5 p-6 backdrop-blur-sm">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <h3 className="tracking-tight text-sm font-medium text-gray-300">Projects</h3>
                        <FolderKanban className="h-4 w-4 text-purple-400" />
                    </div>
                    <div className="text-3xl font-bold text-white">{projectCount}</div>
                    <p className="text-xs text-gray-500 mt-1">Published projects</p>
                </div>

                {/* Total Skills */}
                <div className="rounded-xl border border-white/10 bg-gradient-to-br from-green-500/10 to-green-500/5 p-6 backdrop-blur-sm">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <h3 className="tracking-tight text-sm font-medium text-gray-300">Skills</h3>
                        <Zap className="h-4 w-4 text-green-400" />
                    </div>
                    <div className="text-3xl font-bold text-white">{skillCount}</div>
                    <p className="text-xs text-gray-500 mt-1">Technical skills</p>
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid gap-6 md:grid-cols-2">
                {/* Popular Pages */}
                <div className="rounded-xl border border-white/10 bg-card/30 p-6 backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-4">
                        <TrendingUp className="h-5 w-5 text-primary" />
                        <h2 className="text-lg font-semibold text-white">Popular Pages</h2>
                    </div>
                    {topPages.length > 0 ? (
                        <div className="space-y-3">
                            {topPages.slice(0, 5).map((page, index) => (
                                <div key={page.path} className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs font-bold text-primary w-6">{index + 1}</span>
                                        <span className="text-sm text-gray-300 font-mono">{page.path}</span>
                                    </div>
                                    <span className="text-sm font-semibold text-white">{page.views} views</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-sm">No page view data yet</p>
                    )}
                </div>

                {/* Recent Activity */}
                <div className="rounded-xl border border-white/10 bg-card/30 p-6 backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-4">
                        <Activity className="h-5 w-5 text-blue-400" />
                        <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
                    </div>
                    {analytics.recentActivity.length > 0 ? (
                        <div className="space-y-2">
                            {analytics.recentActivity.map((activity: any, index: number) => (
                                <div key={index} className="flex items-start gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors">
                                    <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm text-gray-300 font-mono truncate">{activity.path}</p>
                                        <p className="text-xs text-gray-500">
                                            {new Date(activity.createdAt).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-sm">No recent activity</p>
                    )}
                </div>
            </div>

            {/* Profile Status */}
            <div className="rounded-xl border border-white/10 bg-card/30 p-6 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-4">
                    <User className="h-5 w-5 text-purple-400" />
                    <h2 className="text-lg font-semibold text-white">Profile Status</h2>
                </div>
                <div className="flex items-center gap-4">
                    <div className={`w-3 h-3 rounded-full ${profile ? 'bg-green-500' : 'bg-red-500'}`} />
                    <span className="text-gray-300">
                        {profile ? "Profile is active and configured" : "Profile not set up yet"}
                    </span>
                </div>
            </div>
        </div>
    );
}

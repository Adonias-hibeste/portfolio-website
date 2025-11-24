import { prisma } from "@/lib/prisma";

export async function getAnalyticsSummary() {
    try {
        const [totalVisitors, totalPageViews, recentActivity] = await Promise.all([
            prisma.visitor.count(),
            prisma.pageView.count(),
            prisma.pageView.findMany({
                take: 10,
                orderBy: { createdAt: "desc" },
                select: {
                    path: true,
                    createdAt: true,
                    userAgent: true,
                },
            }),
        ]);

        return {
            totalVisitors,
            totalPageViews,
            recentActivity,
        };
    } catch (error) {
        console.error("Failed to get analytics summary:", error);
        return {
            totalVisitors: 0,
            totalPageViews: 0,
            recentActivity: [],
        };
    }
}

export async function getPageViewStats() {
    try {
        const pageViews = await prisma.pageView.groupBy({
            by: ["path"],
            _count: {
                path: true,
            },
            orderBy: {
                _count: {
                    path: "desc",
                },
            },
            take: 10,
        });

        return pageViews.map((pv) => ({
            path: pv.path,
            views: pv._count.path,
        }));
    } catch (error) {
        console.error("Failed to get page view stats:", error);
        return [];
    }
}

export async function getVisitorTrends(days: number = 7) {
    try {
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);

        const visitors = await prisma.visitor.findMany({
            where: {
                firstVisit: {
                    gte: startDate,
                },
            },
            select: {
                firstVisit: true,
            },
        });

        // Group by date
        const trendMap = new Map<string, number>();
        visitors.forEach((visitor) => {
            const date = visitor.firstVisit.toISOString().split("T")[0];
            trendMap.set(date, (trendMap.get(date) || 0) + 1);
        });

        return Array.from(trendMap.entries()).map(([date, count]) => ({
            date,
            visitors: count,
        }));
    } catch (error) {
        console.error("Failed to get visitor trends:", error);
        return [];
    }
}

export async function trackProjectView(projectId: string) {
    try {
        await prisma.project.update({
            where: { id: projectId },
            data: {
                views: { increment: 1 },
            },
        });
    } catch (error) {
        console.error("Failed to track project view:", error);
    }
}

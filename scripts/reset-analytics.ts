import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function resetAnalytics() {
    try {
        // Delete all analytics data
        const [pageViews, visitors] = await Promise.all([
            prisma.pageView.deleteMany({}),
            prisma.visitor.deleteMany({}),
        ]);

        console.log("✅ Analytics reset successfully!");
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log(`📊 Deleted ${pageViews.count} page views`);
        console.log(`👥 Deleted ${visitors.count} visitors`);
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("\n🎯 Dashboard counters are now reset to 0");
        console.log("Ready for production deployment!");
    } catch (error) {
        console.error("❌ Error resetting analytics:", error);
    } finally {
        await prisma.$disconnect();
    }
}

resetAnalytics();

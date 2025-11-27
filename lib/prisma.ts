import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

// Polyfill for Vercel Postgres and handle masked DATABASE_URL
// Priority: POSTGRES_PRISMA_URL > DATABASE_URL
if (process.env.POSTGRES_PRISMA_URL) {
    process.env.DATABASE_URL = process.env.POSTGRES_PRISMA_URL;
} else if (!process.env.DATABASE_URL) {
    console.error('CRITICAL: No DATABASE_URL or POSTGRES_PRISMA_URL found!');
}

// Log database URL status (without exposing the full URL)
if (process.env.DATABASE_URL) {
    const dbUrl = process.env.DATABASE_URL;
    console.log('Database URL configured:', {
        starts_with: dbUrl.substring(0, 10),
        length: dbUrl.length,
        is_valid: dbUrl.startsWith('postgres://') || dbUrl.startsWith('postgresql://')
    });
} else {
    console.error('DATABASE_URL is not set!');
}

let prisma: PrismaClient

try {
    prisma = globalForPrisma.prisma || new PrismaClient({
        log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    })
    console.log('Prisma Client initialized successfully');
} catch (error) {
    console.error('Failed to initialize Prisma Client:', error)
    // Re-throw the error instead of creating a proxy
    // This will make the actual error visible
    throw error;
}

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export { prisma }

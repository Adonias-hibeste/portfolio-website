import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

// Polyfill for Vercel Postgres
if (!process.env.DATABASE_URL && process.env.POSTGRES_PRISMA_URL) {
    process.env.DATABASE_URL = process.env.POSTGRES_PRISMA_URL;
}
if (!process.env.DIRECT_URL && process.env.POSTGRES_URL_NON_POOLING) {
    process.env.DIRECT_URL = process.env.POSTGRES_URL_NON_POOLING;
}

let prisma: PrismaClient

try {
    prisma = globalForPrisma.prisma || new PrismaClient()
} catch (error) {
    console.warn('Failed to initialize Prisma Client in this environment:', error)
    // Fallback to a proxy that throws on access - allows imports to succeed during build
    prisma = new Proxy({} as PrismaClient, {
        get: (_target, prop) => {
            // Allow 'then' to pass through for Promise-like checks
            if (prop === 'then') return undefined;
            throw new Error(`Prisma Client failed to initialize. Cannot access property: ${String(prop)}`)
        }
    })
}

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export { prisma }

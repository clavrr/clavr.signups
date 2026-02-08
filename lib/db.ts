import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

// Use pg directly for pooling to support serverless environments better
// Pool configuration is handled via connection string parameters or environment variables
// (e.g. ?connection_limit=10&pool_timeout=20)
const { Pool } = pg;

const globalForPrisma = globalThis as unknown as {
    prisma_v3: PrismaClient | undefined; // Changed key to force new instance again
    pool: pg.Pool | undefined;
};

function createPrismaClient(): PrismaClient {
    const connectionString = process.env.DATABASE_URL;
    const pool = new pg.Pool({ connectionString });
    globalForPrisma.pool = pool;
    const adapter = new PrismaPg(pool);
    return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma_v3 ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma_v3 = prisma;

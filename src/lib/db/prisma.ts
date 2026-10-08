import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { env } from "@/lib/env";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  pgPool: Pool | undefined;
};

function createPrismaClient(): PrismaClient {
  const connectionString = env.DATABASE_URL;
  const isLocal = connectionString.includes("localhost") || connectionString.includes("127.0.0.1");

  const pool =
    globalForPrisma.pgPool ||
    new Pool({
      connectionString,
      max: 10,
      idleTimeoutMillis: 30000,
      ssl: isLocal ? undefined : { rejectUnauthorized: false },
    });

  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.pgPool = pool;
  }

  const adapter = new PrismaPg(pool);
  return new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });
}

function getPrisma(): PrismaClient {
  // If in-memory client is stale (e.g. after adding cmsSection / testimonial models), refresh it
  if (globalForPrisma.prisma && "cmsSection" in globalForPrisma.prisma) {
    return globalForPrisma.prisma;
  }

  const client = createPrismaClient();
  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = client;
  }
  return client;
}

export const prisma = getPrisma();

export default prisma;

import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createClient(): PrismaClient {
  return new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

let cached: PrismaClient | undefined = globalForPrisma.prisma;

function getClient(): PrismaClient {
  if (!cached) {
    cached = createClient();
    if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = cached;
  }
  return cached;
}

/**
 * Lazy Prisma client. `new PrismaClient()` requires DATABASE_URL at construction, and
 * Next imports this module during `next build` (even for dynamic pages) — which would
 * crash the build if DATABASE_URL isn't in the build env. This Proxy defers construction
 * until the first real DB access (request time), so the build never needs DATABASE_URL.
 */
export const prisma: PrismaClient = new Proxy({} as PrismaClient, {
  get(_target, prop, receiver) {
    const client = getClient();
    const value = Reflect.get(client as object, prop, receiver);
    return typeof value === "function" ? value.bind(client) : value;
  },
});

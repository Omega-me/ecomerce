import { PrismaClient } from '@prisma/client';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const prisma = globalThis.prisma ?? (new PrismaClient() as PrismaClient);

if (process.env.NODE_ENV !== 'production')
  globalThis.prisma = prisma as PrismaClient;

export { prisma as client };

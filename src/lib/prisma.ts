// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

declare global {
  // Allow global `var` declaration
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

export default prisma;

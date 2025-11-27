import { prisma } from "@/lib/prisma";

export async function getActiveSessionsForUser(userId: string) {
  return prisma.session.findMany({
    where: { userId, expires: { gt: new Date() } }
  });
}

export async function revokeSession(sessionToken: string) {
  return prisma.session.delete({ where: { sessionToken } });
}

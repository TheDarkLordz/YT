import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

export async function createUserWithPassword({
  email,
  password,
  name,
  onboardingAnswers
}: {
  email: string;
  password: string;
  name?: string;
  onboardingAnswers?: Record<string, unknown>;
}) {
  const passwordHash = await hash(password, 12);
  return prisma.user.create({
    data: {
      email,
      name,
      passwordHash,
      onboardingAnswers: onboardingAnswers ?? null
    }
  });
}

export async function updateOnboardingAnswers(
  userId: string,
  onboardingAnswers: Record<string, unknown>
) {
  return prisma.user.update({
    where: { id: userId },
    data: { onboardingAnswers }
  });
}

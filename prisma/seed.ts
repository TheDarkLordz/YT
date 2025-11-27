import { PrismaClient, IdeaStatus } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  await prisma.verificationToken.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.comparisonSet.deleteMany();
  await prisma.idea.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await hash("password123", 12);
  const founder = await prisma.user.create({
    data: {
      email: "founder@example.com",
      name: "Visionary Founder",
      passwordHash,
      onboardingAnswers: {
        mission: "make climate-friendly ideas obvious",
        timezone: "UTC",
        favoriteMetric: "retention"
      }
    }
  });

  const ideaAlpha = await prisma.idea.create({
    data: {
      ownerId: founder.id,
      inputTitle: "AI-powered climate research assistant",
      inputDescription: "A co-pilot that ingests policy PDFs and synthesizes insights for climate founders.",
      generatedOneLiner: "Copilot that translates messy policy into founder-ready action",
      positioningStatement: "For climate founders who drown in regulation, our assistant summarizes and scores the impact of every policy update.",
      validationPayload: { interviewCount: 6, signal: "strong" },
      status: IdeaStatus.RESEARCHING
    }
  });

  const ideaBeta = await prisma.idea.create({
    data: {
      ownerId: founder.id,
      inputTitle: "Async user testing marketplace",
      inputDescription: "Recruit niche testers and get async Loom feedback in <24h.",
      generatedOneLiner: "Usertesting + Loom for busy product teams",
      positioningStatement: "Unlike generic panels, we match subscribers with subject-matter experts and auto-highlight blockers.",
      validationPayload: { surveySample: 120, interested: 38 },
      status: IdeaStatus.DRAFT
    }
  });

  await prisma.comparisonSet.create({
    data: {
      ownerId: founder.id,
      name: "Go-to-market experiments",
      ideaIds: [ideaAlpha.id, ideaBeta.id],
      scoringMetrics: {
        wowFactor: { weight: 0.3, note: "Investor excitement" },
        feasibility: { weight: 0.2 },
        revenuePotential: { weight: 0.5 }
      }
    }
  });

  await prisma.session.create({
    data: {
      userId: founder.id,
      sessionToken: "seed-session-token",
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
    }
  });

  console.log("Seed data ready. Use founder@example.com / password123 to sign in.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

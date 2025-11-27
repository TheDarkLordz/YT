import { prisma } from "@/lib/prisma";

export async function createComparisonSet({
  ownerId,
  name,
  ideaIds,
  scoringMetrics
}: {
  ownerId: string;
  name: string;
  ideaIds: string[];
  scoringMetrics: Record<string, unknown>;
}) {
  return prisma.comparisonSet.create({
    data: {
      ownerId,
      name,
      ideaIds,
      scoringMetrics
    }
  });
}

export async function addIdeaToComparisonSet(comparisonSetId: string, ideaId: string) {
  const comparisonSet = await prisma.comparisonSet.findUnique({ where: { id: comparisonSetId } });
  if (!comparisonSet) {
    throw new Error("Comparison set not found");
  }

  const ideaIds = Array.from(new Set([...(comparisonSet.ideaIds || []), ideaId]));

  return prisma.comparisonSet.update({
    where: { id: comparisonSetId },
    data: { ideaIds }
  });
}

export async function listComparisonSets(ownerId: string) {
  return prisma.comparisonSet.findMany({
    where: { ownerId },
    orderBy: { updatedAt: "desc" }
  });
}

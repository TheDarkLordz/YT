import { IdeaStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export type CreateIdeaInput = {
  ownerId: string;
  inputTitle: string;
  inputDescription: string;
  generatedOneLiner?: string | null;
  positioningStatement?: string | null;
  validationPayload?: Record<string, unknown> | null;
};

export async function createIdea(data: CreateIdeaInput) {
  return prisma.idea.create({
    data: {
      ...data,
      generatedOneLiner: data.generatedOneLiner ?? null,
      positioningStatement: data.positioningStatement ?? null,
      validationPayload: data.validationPayload ?? null
    }
  });
}

export async function updateIdeaCopy(
  ideaId: string,
  {
    generatedOneLiner,
    positioningStatement,
    validationPayload,
    status
  }: {
    generatedOneLiner?: string | null;
    positioningStatement?: string | null;
    validationPayload?: Record<string, unknown> | null;
    status?: IdeaStatus;
  }
) {
  return prisma.idea.update({
    where: { id: ideaId },
    data: {
      generatedOneLiner,
      positioningStatement,
      validationPayload,
      status
    }
  });
}

export async function listIdeasForUser(userId: string) {
  return prisma.idea.findMany({
    where: { ownerId: userId },
    orderBy: { createdAt: "desc" }
  });
}

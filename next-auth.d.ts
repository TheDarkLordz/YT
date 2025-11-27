import { type DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      onboardingAnswers: Record<string, unknown> | null;
    } & DefaultSession["user"];
  }

  interface User {
    onboardingAnswers: Record<string, unknown> | null;
    passwordHash?: string | null;
  }
}

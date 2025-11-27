import Link from "next/link";

export default function HomePage() {
  return (
    <section>
      <h1>Idea Platform</h1>
      <p>
        This workspace demonstrates a Prisma-backed domain model plus NextAuth session
        security. Use it as a starting point for idea validation workflows.
      </p>
      <Link href="/api/auth/signin">Sign in</Link>
    </section>
  );
}

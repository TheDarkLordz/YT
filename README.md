# Idea Platform Scaffold

This repository bootstraps a Next.js application that combines Prisma with NextAuth to manage users, idea artifacts, comparison sets, and persisted session tokens.

## Tech stack

- Next.js App Router + TypeScript
- Prisma ORM targeting PostgreSQL
- NextAuth with credentials login and optional GitHub OAuth
- Secure, HttpOnly session cookies mapped to persisted session tokens

## Getting started

1. Install dependencies
   ```bash
   npm install
   ```
2. Duplicate `.env.example` to `.env.local` (or `.env`) and fill in the secrets.
3. Apply the schema to your database and seed sample data
   ```bash
   npx prisma migrate deploy
   npm run prisma:seed
   ```
4. Run the dev server
   ```bash
   npm run dev
   ```

## Prisma & data model

Entities included in the schema:

- **User** – stores auth identity, hashed passwords for credential auth, and onboarding answers JSON.
- **Idea** – captures input fields, generated copy (one-liner + positioning), validation payload JSON, and timestamps.
- **ComparisonSet** – relates multiple idea IDs with scoring metrics JSON for qualitative comparison.
- **Session** – NextAuth-managed session tokens backed by Prisma for backend/frontend parity.

Sample data can be regenerated via `npm run prisma:seed`, which provisions a demo founder account (`founder@example.com / password123`) plus two ideas, a comparison set, and related metadata.

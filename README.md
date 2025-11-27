# YT Monorepo

A modern full-stack monorepo with Next.js 13+ frontend and Node.js/Express backend.

## 🚀 Tech Stack

- **Frontend**: Next.js 14+ with App Router, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL (via Docker)
- **Package Manager**: pnpm with workspaces
- **Styling**: Tailwind CSS
- **Linting**: ESLint + Prettier
- **Containerization**: Docker & Docker Compose
- **CI/CD**: GitHub Actions

## 📁 Project Structure

```
yt-monorepo/
├── apps/
│   ├── web/                 # Next.js frontend
│   └── api/                 # Express backend
├── packages/
│   ├── ui/                  # Shared UI component library
│   ├── eslint-config/       # Shared ESLint configuration
│   └── typescript-config/   # Shared TypeScript configuration
├── .github/workflows/       # CI/CD workflows
├── docker-compose.yml       # Development services
└── package.json            # Root package.json
```

## 🛠️ Development

### Prerequisites

- Node.js 18+
- pnpm 8+

### Setup

1. Clone the repository
2. Copy environment variables:
   ```bash
   cp .env.example .env
   ```

3. Install dependencies:
   ```bash
   pnpm install
   ```

4. Start development services:
   ```bash
   docker-compose up -d
   ```

5. Run development servers:
   ```bash
   pnpm dev
   ```

The applications will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:3001

## 📝 Available Scripts

- `pnpm dev` - Start all applications in development mode
- `pnpm build` - Build all applications
- `pnpm test` - Run all tests
- `pnpm lint` - Run linting
- `pnpm type-check` - Run TypeScript type checking
- `pnpm format` - Format code with Prettier

## 🐳 Docker

### Development Services

Start PostgreSQL and Redis:
```bash
docker-compose up -d
```

### Production Build

Build and run the production container:
```bash
docker build -t yt-app .
docker run -p 3000:3000 -p 3001:3001 yt-app
```

## 📦 Workspaces

This monorepo uses pnpm workspaces to manage dependencies and scripts across packages.

### Adding Dependencies

To add a dependency to a specific workspace:
```bash
# Add to web app
pnpm --filter @yt/web add <package>

# Add to API
pnpm --filter @yt/api add <package>

# Add to UI package
pnpm --filter @yt/ui add <package>
```

To add a dependency to all workspaces:
```bash
pnpm -w add <package> -D
```

## 🎨 Shared UI Components

The `@yt/ui` package contains reusable React components shared between applications.

Example usage in the web app:
```tsx
import { Button } from '@yt/ui'

export default function MyComponent() {
  return <Button>Click me</Button>
}
```

## 🔄 CI/CD

The project includes GitHub Actions workflows that run on every push and pull request:

- **Lint**: Runs ESLint on all packages
- **Type Check**: Validates TypeScript types
- **Test**: Runs unit tests
- **Build**: Verifies that all applications build successfully

## 🌍 Environment Variables

Copy `.env.example` to `.env` and configure the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/yt_db"

# Next.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-here"

# Backend API
BACKEND_URL="http://localhost:3001"
PORT=3001

# JWT
JWT_SECRET="your-jwt-secret-here"

# Development
NODE_ENV="development"
```
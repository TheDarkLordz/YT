import { Button } from '@yt/ui'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold text-center">
          Welcome to YT App
        </h1>
      </div>
      
      <div className="flex flex-col items-center gap-4">
        <p className="text-xl text-gray-600">
          This is a Next.js + Node.js monorepo
        </p>
        <Button variant="default">
          Get Started
        </Button>
      </div>
    </main>
  )
}
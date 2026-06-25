import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      <h1 className="text-5xl font-bold mb-4">
        <span className="bg-gradient-to-r from-orange-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
          D.O.R.I.S.
        </span>
      </h1>
      <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
        <strong>D</strong>urable <strong>O</strong>ffloaded <strong>R</strong>ust{' '}
        <strong>I</strong>somorphic <strong>S</strong>tack
      </p>
      <p className="text-muted-foreground mb-8 max-w-xl">
        Zero infrastructure. One-click deploy. Rust on Cloudflare Workers.
      </p>
      <div className="flex gap-4">
        <Link
          href="/docs"
          className="inline-flex items-center px-6 py-3 rounded-lg bg-foreground text-background font-medium hover:opacity-90 transition-opacity"
        >
          Get Started
        </Link>
        <Link
          href="https://github.com/abhalala/doris"
          className="inline-flex items-center px-6 py-3 rounded-lg border border-border font-medium hover:bg-muted transition-colors"
          target="_blank"
        >
          GitHub →
        </Link>
      </div>
      <div className="flex flex-wrap justify-center gap-3 mt-12">
        <span className="px-3 py-1.5 rounded-full bg-muted text-sm">🦀 Rust → WASM</span>
        <span className="px-3 py-1.5 rounded-full bg-muted text-sm">☁️ Cloudflare Workers</span>
        <span className="px-3 py-1.5 rounded-full bg-muted text-sm">🗄️ D1 Database</span>
        <span className="px-3 py-1.5 rounded-full bg-muted text-sm">⚡ Durable Objects</span>
        <span className="px-3 py-1.5 rounded-full bg-muted text-sm">🚀 One-Click Deploy</span>
      </div>
    </main>
  );
}

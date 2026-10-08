import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative mx-auto flex min-h-screen w-full max-w-2xl flex-col justify-center px-5 py-32">
      <div className="grid-bg absolute inset-0 opacity-20" aria-hidden />

      <div className="relative rounded-xl border border-line bg-panel p-8 sm:p-10">
        <p className="font-mono text-7xl font-bold text-line sm:text-8xl">404</p>
        <p className="mt-4 font-mono text-sm tracking-[0.25em] text-primary">
          ROUTE NOT FOUND
        </p>
        <p className="mt-3 text-secondary">
          Looks like this route doesn&apos;t exist in the system.
        </p>

        <div className="mt-8 rounded border border-line bg-ink p-5">
          <p className="font-mono text-[10px] tracking-[0.25em] text-secondary/70">
            SYSTEM STATUS
          </p>
          <div className="mt-3 space-y-2 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="text-secondary">Requested route</span>
              <span className="text-red-400">✕</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-secondary">Navigation</span>
              <span className="text-success">✓</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-secondary">Portfolio</span>
              <span className="text-success">ONLINE</span>
            </div>
          </div>
        </div>

        <Link
          href="/"
          data-cursor="link"
          className="mt-8 inline-block rounded border border-accent bg-accent/10 px-6 py-3 font-mono text-xs tracking-[0.25em] text-primary transition-colors hover:bg-accent/20"
        >
          ← RETURN HOME
        </Link>
      </div>
    </main>
  );
}

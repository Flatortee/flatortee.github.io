import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t bg-background/40 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-6 py-10 grid gap-6 md:grid-cols-3">
        <div>
          <div className="font-semibold tracking-tight">Flatortee</div>
          <p className="mt-2 text-sm text-muted-foreground">
            Next-generation interactive developer platform.
          </p>
        </div>
        <div className="text-sm">
          <div className="text-muted-foreground">Explore</div>
          <div className="mt-2 grid gap-1">
            <Link className="hover:underline" href="/portfolio">Portfolio</Link>
            <Link className="hover:underline" href="/engine">Engine</Link>
            <Link className="hover:underline" href="/docs-engine">Engine Docs</Link>
          </div>
        </div>
        <div className="text-sm">
          <div className="text-muted-foreground">Docs</div>
          <div className="mt-2 grid gap-1">
            <Link className="hover:underline" href="/docs-csharp">C#</Link>
            <Link className="hover:underline" href="/docs-unity">Unity</Link>
          </div>
        </div>
      </div>
      <div className="px-6 pb-10 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Flatortee. Built with Next.js + Fumadocs.
      </div>
    </footer>
  );
}

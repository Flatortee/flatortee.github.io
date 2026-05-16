'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { useSearchModal } from '@/components/search/SearchProvider';
import { cn } from '@/lib/utils';

const links = [
  { href: '/', label: 'Home' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/engine', label: 'Engine' },
  { href: '/docs-engine', label: 'Docs' },
];

export function TopNav() {
  const pathname = usePathname();
  const { open } = useSearchModal();

  return (
    <header className="sticky top-0 z-40 border-b bg-background/40 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center gap-6">
        <Link href="/" className="font-semibold tracking-tight">
          Flatortee<span className="text-primary">//</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => {
            const active = pathname === l.href || (l.href !== '/' && pathname.startsWith(l.href));
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  'px-3 py-2 text-sm rounded-lg transition',
                  active ? 'bg-primary/10 text-foreground' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Search (Ctrl/⌘ K)"
            onClick={open}
            className="hidden md:inline-flex"
          >
            <Search className="h-4 w-4" />
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

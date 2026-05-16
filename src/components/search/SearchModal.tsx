'use client';

import * as Dialog from '@radix-ui/react-dialog';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';

import { useDocsSearch } from 'fumadocs-core/search/client';
import { cn } from '@/lib/utils';

export function SearchModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [value, setValue] = useState('');

  const clientPreset = useMemo(
    () => ({
      type: 'static' as const,
      from: '/search-index.json',
      allowEmpty: false,
    }),
    []
  );

  const { setSearch, query } = useDocsSearch(clientPreset, [clientPreset]);

  useEffect(() => {
    setSearch(value);
  }, [setSearch, value]);

  useEffect(() => {
    if (!open) setValue('');
  }, [open]);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-24 z-50 w-[min(720px,calc(100vw-2rem))] -translate-x-1/2 rounded-2xl border bg-background/70 backdrop-blur-xl shadow-2xl">
          <div className="flex items-center gap-3 border-b px-4 py-3">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              autoFocus
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Search docs (engine, C#, unity)…"
              className="h-9 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            <button
              type="button"
              aria-label="Close"
              onClick={() => onOpenChange(false)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg hover:bg-white/5"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="max-h-[60vh] overflow-auto p-2">
            {query.isLoading ? (
              <div className="p-4 text-sm text-muted-foreground">Searching…</div>
            ) : query.data === 'empty' || !query.data?.length ? (
              <div className="p-4 text-sm text-muted-foreground">No results.</div>
            ) : (
              <div className="grid gap-1">
                {query.data.slice(0, 12).map((r) => (
                  <Link
                    key={r.id}
                    href={r.url}
                    onClick={() => onOpenChange(false)}
                    className={cn(
                      'rounded-xl border bg-card/30 backdrop-blur-xl px-4 py-3 transition',
                      'hover:border-primary/50 hover:bg-card/40'
                    )}
                  >
                    <div className="text-sm font-medium">{stripTags(r.content)}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{r.url}</div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function stripTags(input: string) {
  return input.replace(/<[^>]*>/g, '');
}

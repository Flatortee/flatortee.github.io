'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { SearchModal } from '@/components/search/SearchModal';

const SearchContext = createContext<{ open: () => void } | null>(null);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [openState, setOpenState] = useState(false);

  const open = useCallback(() => setOpenState(true), []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const isK = e.key.toLowerCase() === 'k';
      const isMod = e.metaKey || e.ctrlKey;
      if (isK && isMod) {
        e.preventDefault();
        setOpenState(true);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const value = useMemo(() => ({ open }), [open]);

  return (
    <SearchContext.Provider value={value}>
      {children}
      <SearchModal open={openState} onOpenChange={setOpenState} />
    </SearchContext.Provider>
  );
}

export function useSearchModal() {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error('useSearchModal must be used within SearchProvider');
  return ctx;
}

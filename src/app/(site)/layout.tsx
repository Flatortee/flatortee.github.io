import { TopNav } from '@/components/layout/TopNav';
import { Footer } from '@/components/layout/Footer';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopNav />
      <main className="relative min-h-[calc(100vh-96px)]">{children}</main>
      <Footer />
    </>
  );
}

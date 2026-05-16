import 'fumadocs-ui/style.css';

export default function DocsGroupLayout({ children }: { children: React.ReactNode }) {
  return <main className="relative">{children}</main>;
}

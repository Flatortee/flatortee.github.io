export function BackgroundFX() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 opacity-70" />
      <div className="absolute -top-40 left-1/2 h-[420px] w-[920px] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px] animate-glow" />
      <div className="absolute top-[35%] left-[10%] h-[360px] w-[360px] rounded-full bg-cyan-400/10 blur-[100px] animate-glow" />
    </div>
  );
}

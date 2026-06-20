export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-deep-black text-white">
      <div className="text-center">
        <div className="mx-auto mb-8 h-px w-48 overflow-hidden bg-white/10">
          <div className="h-full w-1/2 animate-shimmer bg-gradient-to-r from-transparent via-neon-pink to-transparent" />
        </div>
        <p className="eyebrow text-neon-pink">Preparing The Finish</p>
      </div>
    </main>
  );
}

import Link from "next/link";

export default function MobileCtaBar() {
  return (
    <>
      <nav aria-label="Quick contact" className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-black/90 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md lg:hidden">
        <div className="mx-auto flex max-w-xl gap-3">
          <Link href="/contact" className="flex-1 rounded-xl border border-white/20 px-3 py-3 text-center text-xs font-bold uppercase tracking-wide text-white">Contact A&amp;S</Link>
          <Link href="/assessment" className="flex-1 rounded-xl bg-gradient-to-r from-neon-pink to-neon-blue px-3 py-3 text-center text-xs font-bold uppercase tracking-wide text-white">Request Assessment</Link>
        </div>
      </nav>
      <div className="h-[calc(5.5rem+env(safe-area-inset-bottom))] lg:hidden" aria-hidden="true" />
    </>
  );
}

import { ArrowDown, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'wouter';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy-900 pb-20 pt-32 text-white lg:pb-28 lg:pt-40">
      <div className="absolute inset-0 opacity-20 casework-grid" />
      <div className="absolute -right-32 top-24 h-96 w-96 rounded-full bg-teal-400/10 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-[1.04fr_.96fr] lg:items-center lg:px-8">
        <div className="fade-up max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-300/30 bg-teal-300/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-teal-200"><span className="h-1.5 w-1.5 rounded-full bg-teal-300" /> A clearer way forward</div>
          <h1 className="font-display text-5xl font-extrabold leading-[1.02] tracking-[-0.055em] text-balance sm:text-6xl lg:text-[5.15rem]">Recover. <span className="text-teal-300">Track. Resolve.</span></h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-slate-300">Submit your recovery case, track its progress, and communicate with our review team from one secure workspace.</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/login" className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-300 px-5 py-3.5 text-sm font-extrabold text-navy-950 transition hover:-translate-y-0.5 hover:bg-teal-200" data-testid="link-submit-case">Submit a Case <ArrowRight size={17} /></Link>
            <Link href="/login" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-5 py-3.5 text-sm font-bold text-white transition hover:border-white/45 hover:bg-white/10" data-testid="link-track-my-case">Track My Case <ArrowRight size={17} /></Link>
            <a href="#how-it-works" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-5 py-3.5 text-sm font-bold text-white transition hover:border-white/45 hover:bg-white/10" data-testid="link-how-it-works">How It Works <ArrowDown size={17} /></a>
          </div>
          <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-400"><span className="inline-flex items-center gap-2"><CheckCircle2 size={16} className="text-teal-300" /> Clear case history</span><span className="inline-flex items-center gap-2"><CheckCircle2 size={16} className="text-teal-300" /> Human review</span></div>
        </div>
        <div className="fade-up fade-up-delay-2 relative">
          <div className="absolute -inset-5 rounded-[2rem] bg-teal-300/10 blur-2xl" />
          <div className="relative overflow-hidden rounded-[1.5rem] border border-white/20 bg-navy-800 shadow-2xl">
            <img src="/case-review.jpg" alt="Professional reviewing a case on a laptop" className="h-[28rem] w-full object-cover opacity-90 lg:h-[34rem]" />
            <div className="absolute inset-x-4 bottom-4 rounded-xl border border-white/15 bg-navy-950/85 p-4 backdrop-blur-md">
              <div className="flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.12em] text-teal-300">Casework workspace</p><p className="mt-1 text-sm font-semibold text-white">A record you can follow</p></div><span className="rounded-full bg-teal-300/15 px-2.5 py-1 text-xs font-bold text-teal-200">Private</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
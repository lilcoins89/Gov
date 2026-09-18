import { ArrowDown, ArrowRight, CalendarClock, CheckCircle2, FileCheck2, LockKeyhole } from 'lucide-react';
import { Link } from 'wouter';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy-900 pb-16 pt-32 text-white lg:pb-24 lg:pt-40">
      <div className="absolute inset-0 opacity-20 casework-grid" />
      <div className="absolute -left-44 top-24 h-[34rem] w-[34rem] rounded-full bg-teal-300/10 blur-3xl" />
      <div className="absolute -right-40 bottom-[-12rem] h-[34rem] w-[34rem] rounded-full bg-cyan-300/10 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-[.95fr_1.05fr] lg:items-center lg:px-8">
        <div className="fade-up max-w-2xl">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-teal-300/30 bg-teal-300/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-teal-200">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-300 shadow-[0_0_0_4px_rgba(94,234,212,0.12)]" />
            A clearer way forward
          </div>
          <h1 className="max-w-3xl font-display text-5xl font-extrabold leading-[0.98] tracking-[-0.06em] text-balance sm:text-6xl lg:text-[5.4rem]">
            Recover. <span className="text-teal-300">Track.</span>
            <br />
            Resolve.
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-8 text-slate-300">
            Submit your recovery case, track its progress, and communicate with our review team from one secure workspace.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/login" className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-300 px-5 py-3.5 text-sm font-extrabold text-navy-950 shadow-[0_12px_30px_-15px_rgba(45,212,191,0.9)] transition hover:-translate-y-0.5 hover:bg-teal-200" data-testid="link-submit-case">
              Submit a Case <ArrowRight size={17} />
            </Link>
            <Link href="/login" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/[0.03] px-5 py-3.5 text-sm font-bold text-white transition hover:border-teal-300/70 hover:bg-white/10" data-testid="link-track-my-case">
              Track My Case <ArrowRight size={17} />
            </Link>
            <a href="#how-it-works" className="inline-flex items-center justify-center gap-2 rounded-xl px-3 py-3.5 text-sm font-bold text-slate-300 transition hover:text-white" data-testid="link-how-it-works">
              How It Works <ArrowDown size={17} />
            </a>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/10 pt-5 text-sm text-slate-400">
            <span className="inline-flex items-center gap-2"><CheckCircle2 size={16} className="text-teal-300" /> Clear case history</span>
            <span className="inline-flex items-center gap-2"><CheckCircle2 size={16} className="text-teal-300" /> Human review</span>
            <span className="inline-flex items-center gap-2"><CheckCircle2 size={16} className="text-teal-300" /> Secure workspace</span>
          </div>
        </div>

        <div className="fade-up fade-up-delay-2 relative mx-auto w-full max-w-xl lg:mr-0">
          <div className="absolute -inset-6 rounded-[2.5rem] bg-teal-300/10 blur-3xl" />
          <div className="relative overflow-visible">
            <div className="overflow-hidden rounded-[2rem] border border-white/20 bg-navy-800 shadow-2xl shadow-navy-950/50">
              <div className="relative">
                <img src="/case-review.jpg" alt="Professional reviewing a case on a laptop" className="h-[26rem] w-full object-cover opacity-90 sm:h-[33rem]" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/5 to-transparent" />
                <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-navy-950/60 px-3 py-2 text-xs font-bold text-white backdrop-blur-md">
                  <LockKeyhole size={14} className="text-teal-300" /> Private workspace
                </div>
                <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/15 bg-navy-950/75 p-4 backdrop-blur-md sm:inset-x-6 sm:bottom-6">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.12em] text-teal-300">Case review</p>
                      <p className="mt-1 text-lg font-bold text-white">A record you can follow</p>
                      <p className="mt-1 text-sm text-slate-300">Updates stay connected to the case.</p>
                    </div>
                    <span className="shrink-0 rounded-full bg-teal-300/15 px-2.5 py-1 text-xs font-bold text-teal-200">In progress</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -right-3 top-20 hidden w-48 rounded-2xl border border-white/15 bg-white p-4 text-navy-900 shadow-xl sm:block lg:-right-8">
              <div className="flex items-center justify-between">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-teal-50 text-teal-800"><FileCheck2 size={18} /></span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700">Received</span>
              </div>
              <p className="mt-4 text-sm font-bold">Documents organized</p>
              <p className="mt-1 text-xs leading-5 text-slate-500">Supporting records stay with your case.</p>
            </div>
            <div className="absolute -bottom-6 -left-3 hidden w-52 rounded-2xl border border-white/15 bg-navy-800/95 p-4 shadow-xl backdrop-blur sm:block lg:-left-8">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-teal-300 text-navy-950"><CalendarClock size={18} /></span>
                <div><p className="text-xs font-bold uppercase tracking-wider text-teal-200">Latest update</p><p className="mt-1 text-sm font-bold text-white">2 hours ago</p></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
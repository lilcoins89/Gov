import { ArrowRight, Quote } from 'lucide-react';
import { Link } from 'wouter';

export function TeamSection() {
  return (
    <section id="team" className="bg-navy-900 py-20 text-white lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[.85fr_1.15fr] lg:items-center lg:px-8">
        <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-300">People behind the process</p><h2 className="mt-4 font-display text-4xl font-extrabold tracking-[-0.04em] sm:text-5xl">A Team Focused on Your Case</h2><p className="mt-5 max-w-lg leading-7 text-slate-300">Our reviewers bring experience across payments, financial institutions, and digital platforms. They look at the full record before recommending a next step.</p><Link href="/login" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-teal-300 hover:text-teal-200" data-testid="link-track-case">Track My Case <ArrowRight size={16} /></Link><div className="mt-8 grid grid-cols-2 gap-3 text-sm font-semibold text-white"><span className="rounded-xl border border-white/10 bg-white/5 px-3 py-3">Case Review</span><span className="rounded-xl border border-white/10 bg-white/5 px-3 py-3">Documentation</span><span className="rounded-xl border border-white/10 bg-white/5 px-3 py-3">Investigation</span><span className="rounded-xl border border-white/10 bg-white/5 px-3 py-3">Client Support</span></div></div>
        <div className="relative overflow-hidden rounded-3xl border border-white/15"><img src="/recovery-team.jpg" alt="Recovery specialists collaborating in a modern office" className="h-80 w-full object-cover lg:h-[25rem]" /><div className="absolute inset-0 bg-gradient-to-t from-navy-950/75 via-transparent to-transparent" /><div className="absolute bottom-5 left-5 right-5 flex items-end justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.14em] text-teal-300">GOV team</p><p className="mt-1 font-display text-xl font-bold">Experienced. Accountable. Present.</p></div><div className="grid h-11 w-11 place-items-center rounded-full bg-teal-300 text-navy-900"><Quote size={18} /></div></div></div>
      </div>
    </section>
  );
}
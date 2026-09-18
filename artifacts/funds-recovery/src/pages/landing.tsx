import { ArrowRight, CheckCircle2, ClipboardCheck, FileCheck2, LockKeyhole, MessageCircle, SearchCheck, ShieldCheck } from 'lucide-react';
import { Link } from 'wouter';
import { Hero } from '@/components/casework/Hero';
import { Navbar } from '@/components/casework/Navbar';
import { TeamSection } from '@/components/casework/TeamSection';

const processSteps = [
  { n: '01', icon: FileCheck2, title: 'Submit Your Case', text: 'Provide details about your situation and upload supporting documents.' },
  { n: '02', icon: SearchCheck, title: 'Case Review', text: 'Our team reviews the submitted information and updates the case status.' },
  { n: '03', icon: MessageCircle, title: 'Track Progress', text: 'Monitor updates, requests for information, and case activity from your dashboard.' },
  { n: '04', icon: ClipboardCheck, title: 'Resolution', text: 'Display the final case outcome and relevant next steps.' },
];

export default function Landing() {
  return (
    <div className="min-h-dvh bg-background">
      <Navbar />
      <Hero />

      <section className="relative z-10 -mt-px border-y border-white/10 bg-navy-900 pb-12">
        <div className="mx-auto grid max-w-7xl gap-3 px-5 sm:grid-cols-3 lg:px-8">
          {[
            { label: 'Private workspace', text: 'Your record, documents, and messages stay together.', icon: LockKeyhole },
            { label: 'Human review', text: 'A specialist reviews the information you provide.', icon: ShieldCheck },
            { label: 'Clear next steps', text: 'Status updates make it easier to know what happens next.', icon: CheckCircle2 },
          ].map(({ label, text, icon: Icon }) => (
            <div key={label} className="flex gap-3 border-t border-white/10 py-5 sm:border-t-0 sm:border-l sm:px-5 first:sm:border-l-0 first:sm:pl-0">
              <Icon size={19} className="mt-0.5 shrink-0 text-teal-300" />
              <div><p className="text-sm font-bold text-white">{label}</p><p className="mt-1 text-xs leading-5 text-slate-400">{text}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="relative overflow-hidden bg-background py-24 lg:py-32">
        <div className="absolute right-[-8rem] top-24 h-72 w-72 rounded-full bg-teal-100/60 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-800">How it works</p>
              <h2 className="mt-4 font-display text-4xl font-extrabold tracking-[-0.05em] text-navy-900 sm:text-5xl">A process you can see, not guess at.</h2>
            </div>
            <p className="max-w-md text-base leading-7 text-muted-foreground lg:text-right">Good casework starts with a complete record and honest expectations. Each stage gives you a clearer view of what is happening.</p>
          </div>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map(({ n, icon: Icon, title, text }, index) => (
              <div key={n} className="card-hover group relative overflow-hidden rounded-2xl border border-border bg-card p-6 soft-shadow">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-teal-300 to-cyan-400 opacity-0 transition group-hover:opacity-100" />
                <div className="flex items-start justify-between">
                  <span className="font-display text-4xl font-extrabold tracking-[-0.06em] text-teal-700/45">{n}</span>
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-teal-50 text-teal-800 transition group-hover:bg-teal-300 group-hover:text-navy-950"><Icon size={21} /></span>
                </div>
                <h3 className="mt-8 font-display text-xl font-extrabold text-navy-900">{title}</h3>
                <p className="mt-2 leading-7 text-muted-foreground">{text}</p>
                <div className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-800"><span className="h-px w-6 bg-teal-300" /> Stage {index + 1}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-teal-50/70 py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 lg:grid-cols-[.8fr_1.2fr] lg:items-center lg:px-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white/70 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-teal-900"><LockKeyhole size={14} /> A note on outcomes</div>
            <h2 className="mt-5 max-w-md font-display text-3xl font-extrabold tracking-[-0.04em] text-navy-900 sm:text-4xl">Review is a process, not a promise.</h2>
          </div>
          <div className="rounded-3xl border border-white bg-white/75 p-6 shadow-[0_20px_60px_-40px_rgba(24,63,91,0.45)] sm:p-8">
            <p className="max-w-3xl text-lg leading-8 text-navy-900">Every case is different. We do not promise a particular result — we promise a clear record of the work and the information available to us.</p>
            <div className="mt-6 flex flex-col gap-4 border-t border-teal-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm leading-6 text-muted-foreground">Start with the information you have. You can add documents and respond to questions later.</p>
              <Link href="/login" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-navy-900 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-navy-800" data-testid="link-safe-next-step">Take the next step <ArrowRight size={16} /></Link>
            </div>
          </div>
        </div>
      </section>

      <TeamSection />

      <section className="bg-background py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[1.1fr_.9fr] lg:items-end lg:px-8">
          <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-800">Built for clarity</p><h2 className="mt-4 max-w-xl font-display text-4xl font-extrabold tracking-[-0.05em] text-navy-900 sm:text-5xl">The details are not an afterthought.</h2></div>
          <div className="space-y-4 text-sm leading-7 text-muted-foreground">
            <p className="flex gap-3"><CheckCircle2 className="mt-1 shrink-0 text-teal-700" size={18} />Secure document and message areas keep the important context together.</p>
            <p className="flex gap-3"><CheckCircle2 className="mt-1 shrink-0 text-teal-700" size={18} />Status language is straightforward, with review separated from any eventual outcome.</p>
            <p className="flex gap-3"><CheckCircle2 className="mt-1 shrink-0 text-teal-700" size={18} />Designed for stressful moments when an organized next step matters.</p>
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-card">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p className="text-sm text-muted-foreground">© 2024 Casework. A clearer record for difficult financial situations.</p>
          <div className="flex gap-5 text-sm font-bold text-muted-foreground"><a href="#how-it-works" className="hover:text-foreground">How it works</a><Link href="/login" className="hover:text-foreground">Client sign in</Link></div>
        </div>
      </footer>
    </div>
  );
}
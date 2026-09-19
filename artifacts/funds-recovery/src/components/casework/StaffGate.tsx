import { ArrowRight, LockKeyhole, ShieldCheck } from 'lucide-react';
import { FormEvent, ReactNode, useEffect, useState } from 'react';
import { Link } from 'wouter';
import { ADMIN_EMAIL } from '@/data/casework';
import { BrandMark } from './BrandMark';

const STAFF_ACCESS_KEY = 'casework-staff-access';
const STAFF_EMAIL_KEY = 'casework-staff-email';
const DEMO_STAFF_CODE = 'casework-staff';

function hasStaffAccess() {
  try {
    return sessionStorage.getItem(STAFF_ACCESS_KEY) === 'granted' && sessionStorage.getItem(STAFF_EMAIL_KEY) === ADMIN_EMAIL;
  } catch {
    return false;
  }
}

export function StaffGate({ children }: { children: ReactNode }) {
  const [granted, setGranted] = useState(hasStaffAccess);
  const [email, setEmail] = useState(ADMIN_EMAIL);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const robots = document.querySelector('meta[name="robots"]');
    const previous = robots?.getAttribute('content');
    const previousTitle = document.title;
    robots?.setAttribute('content', 'noindex, nofollow');
    document.title = 'GOV Internal Workspace';
    return () => {
      if (robots && previous) robots.setAttribute('content', previous);
      document.title = previousTitle;
    };
  }, []);

  if (granted) return <>{children}</>;

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (email.trim().toLowerCase() !== ADMIN_EMAIL) {
      setError('Use the designated GOV admin email to continue.');
      return;
    }
    if (code.trim() !== DEMO_STAFF_CODE) {
      setError('That access code was not recognized.');
      return;
    }
    try {
      sessionStorage.setItem(STAFF_ACCESS_KEY, 'granted');
      sessionStorage.setItem(STAFF_EMAIL_KEY, ADMIN_EMAIL);
    } catch { /* local-only demo */ }
    setGranted(true);
    setError('');
  };

  return (
    <main className="grid min-h-dvh bg-background lg:grid-cols-[.8fr_1.2fr]">
      <section className="relative hidden overflow-hidden bg-navy-900 p-10 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="absolute inset-0 opacity-20 casework-grid" />
        <div className="relative"><Link href="/"><BrandMark light /></Link><div className="mt-32 max-w-md"><p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-300">Internal workspace</p><h1 className="mt-5 font-display text-5xl font-extrabold leading-[1.05] tracking-[-0.05em]">Keep the review desk focused.</h1><p className="mt-6 leading-7 text-slate-300">The staff workspace is separate from the public client experience and is available only to authorized reviewers.</p></div></div>
        <div className="relative flex items-center gap-3 text-sm text-slate-400"><ShieldCheck size={18} className="text-teal-300" /> Staff tools stay behind a dedicated access boundary.</div>
      </section>
      <section className="flex flex-col px-5 py-7 sm:px-10 lg:justify-center lg:px-20">
        <div className="mx-auto w-full max-w-md">
          <div className="lg:hidden"><BrandMark /></div>
          <div className="mt-16 lg:mt-0"><div className="grid h-12 w-12 place-items-center rounded-2xl bg-teal-50 text-teal-800"><LockKeyhole size={22} /></div><p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-teal-800">Admin access required</p><h2 className="mt-4 font-display text-4xl font-extrabold tracking-[-0.045em] text-navy-900">GOV admin sign in</h2><p className="mt-3 leading-7 text-muted-foreground">This internal area is not linked from the public site. Use the designated admin email and access code to continue.</p></div>
          <form onSubmit={submit} className="mt-9 space-y-5">
            <label className="block text-sm font-bold">Admin email<input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full rounded-xl border border-input bg-card px-4 py-3.5 text-sm outline-none transition focus:border-teal-600 focus:ring-4 focus:ring-teal-100" placeholder="Admin email" autoComplete="email" data-testid="input-admin-email" /></label>
            <label className="block text-sm font-bold">Staff access code<input type="password" value={code} onChange={(event) => setCode(event.target.value)} className="mt-2 w-full rounded-xl border border-input bg-card px-4 py-3.5 text-sm outline-none transition focus:border-teal-600 focus:ring-4 focus:ring-teal-100" placeholder="Enter access code" autoComplete="off" data-testid="input-staff-access-code" /></label>
            <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-navy-900 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-navy-800" data-testid="button-staff-access">Enter staff workspace <ArrowRight size={17} /></button>
            {error && <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-800" role="alert" data-testid="text-staff-access-error">{error}</p>}
          </form>
          <p className="mt-8 text-center text-xs leading-5 text-muted-foreground">This local gate keeps the admin area out of the public experience. Connect it to production identity management before handling live staff data.</p>
        </div>
      </section>
    </main>
  );
}
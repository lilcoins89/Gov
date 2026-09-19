import { ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { BrandMark } from '@/components/casework/BrandMark';
import { getSupabaseConfigError, supabase } from '@/lib/supabase';

export default function Login() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setNotice('');
    setError('');
    if (!supabase) {
      setError(getSupabaseConfigError() ?? 'Sign in is temporarily unavailable.');
      return;
    }
    setIsSubmitting(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setIsSubmitting(false);
    if (signInError) {
      setError(signInError.message.toLowerCase().includes('confirm') ? 'Please confirm your email before signing in.' : 'Invalid email or password.');
      return;
    }
    setNotice('Sign in confirmed. Opening your workspace…');
    setLocation('/dashboard');
  };

  return (
    <main className="grid min-h-dvh bg-background lg:grid-cols-[.92fr_1.08fr]">
      <section className="relative hidden overflow-hidden bg-navy-900 p-10 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="absolute inset-0 opacity-20 casework-grid" />
        <div className="relative"><Link href="/"><BrandMark light /></Link><div className="mt-32 max-w-md"><p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-300">Client workspace</p><h1 className="mt-5 font-display text-5xl font-extrabold leading-[1.05] tracking-[-0.05em]">A calm place to keep your case moving.</h1><p className="mt-6 leading-7 text-slate-300">Sign in to see status updates, messages, and the next information your reviewer needs.</p></div></div>
        <div className="relative flex items-center gap-3 text-sm text-slate-400"><ShieldCheck size={18} className="text-teal-300" /> Your case record stays organized in one place.</div>
      </section>
      <section className="flex flex-col px-5 py-7 sm:px-10 lg:justify-center lg:px-20">
        <Link href="/" className="mb-16 inline-flex w-fit items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground lg:hidden"><ArrowLeft size={16} /> Back to GOV</Link>
        <div className="mx-auto w-full max-w-md"><div className="lg:hidden"><BrandMark /></div><div className="mt-10 lg:mt-0"><p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-800">Secure sign in</p><h2 className="mt-4 font-display text-4xl font-extrabold tracking-[-0.045em] text-navy-900">Welcome back.</h2><p className="mt-3 leading-7 text-muted-foreground">Use your email to access your GOV workspace.</p></div>
          <form onSubmit={submit} className="mt-9 space-y-5"><label className="block text-sm font-bold">Email address<input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full rounded-xl border border-input bg-card px-4 py-3.5 text-sm outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100" autoComplete="email" /></label><label className="block text-sm font-bold">Password<input type="password" required minLength={6} value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 w-full rounded-xl border border-input bg-card px-4 py-3.5 text-sm outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100" autoComplete="current-password" /></label><button type="submit" disabled={isSubmitting} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-navy-900 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-navy-800 disabled:cursor-not-allowed disabled:opacity-60">{isSubmitting ? 'Signing in…' : 'Sign in'} <ArrowRight size={17} /></button>{error && <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-800" role="alert">{error}</p>}{notice && <p className="rounded-xl border border-teal-200 bg-teal-50 px-4 py-3 text-sm font-semibold text-teal-900" role="status">{notice}</p>}</form>
        </div>
      </section>
    </main>
  );
}

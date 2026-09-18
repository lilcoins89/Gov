import { ArrowRight, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'wouter';
import { BrandMark } from './BrandMark';

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="absolute inset-x-0 top-0 z-20 border-b border-white/10">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <Link href="/" onClick={() => setOpen(false)}><BrandMark light /></Link>
        <nav className={`${open ? 'flex' : 'hidden'} absolute left-4 right-4 top-[4.5rem] flex-col gap-1 rounded-2xl border border-navy-700 bg-navy-900 p-3 shadow-xl md:static md:flex md:flex-row md:items-center md:gap-7 md:border-0 md:bg-transparent md:p-0 md:shadow-none`} data-testid="nav-public">
          <a href="#how-it-works" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white">How it works</a>
          <a href="#team" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white">Our team</a>
          <Link href="/login" onClick={() => setOpen(false)} className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 px-4 py-2.5 text-sm font-bold text-white transition hover:border-teal-300 hover:bg-white/10 md:mt-0">Client sign in <ArrowRight size={15} /></Link>
        </nav>
        <button type="button" onClick={() => setOpen(!open)} className="rounded-lg p-2 text-white md:hidden" aria-label="Toggle navigation" data-testid="button-toggle-nav">{open ? <X size={21} /> : <Menu size={21} />}</button>
      </div>
    </header>
  );
}
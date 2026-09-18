import { ArrowLeft, FilePlus2 } from 'lucide-react';
import { Link } from 'wouter';
import { DashboardSidebar } from '@/components/casework/DashboardSidebar';
import { CaseForm } from '@/components/casework/CaseForm';

export default function NewCase() {
  return <div className="min-h-dvh bg-background"><DashboardSidebar /><main className="md:pl-[17.5rem]"><div className="mx-auto max-w-4xl px-5 pb-16 pt-20 md:px-8 md:pt-10"><Link href="/dashboard" className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground" data-testid="link-back-dashboard"><ArrowLeft size={16} /> Back to overview</Link><header className="mt-7 flex items-start gap-4"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-teal-100 text-teal-800"><FilePlus2 size={22} /></span><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-800">New case</p><h1 className="mt-2 font-display text-4xl font-extrabold tracking-[-0.05em] text-navy-900">Start with what you know.</h1><p className="mt-2 max-w-2xl leading-7 text-muted-foreground">The more specific the record, the more useful the first review can be. You can save your documents for the next step.</p></div></header><div className="mt-9"><CaseForm /></div></div></main></div>;
}
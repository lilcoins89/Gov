import { Activity, ArrowRight, BriefcaseBusiness, Check, ChevronDown, Clock3, FilePlus2, Filter, LifeBuoy, MessageCircle, Search, UserRound } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'wouter';
import { DashboardSidebar } from '@/components/casework/DashboardSidebar';
import { StatusBadge } from '@/components/casework/StatusBadge';
import { formatCurrency, formatDate, loadCases, loadSupportThreads, reviewers, saveCases, type CaseStatus } from '@/data/casework';

const statusOptions: CaseStatus[] = ['Submitted', 'Under Review', 'Information Required', 'In Progress', 'Resolved', 'Closed'];

function initials(name: string) {
  return name.split(' ').map((part) => part[0]).join('').slice(0, 2);
}

export default function Admin() {
  const [cases, setCases] = useState(loadCases);
  const [status, setStatus] = useState<'All' | CaseStatus>('All');
  const [query, setQuery] = useState('');
  const supportThreads = loadSupportThreads();
  const filtered = useMemo(
    () => cases.filter((item) => (status === 'All' || item.status === status) && `${item.id} ${item.title} ${item.institution} ${item.assignedReviewer}`.toLowerCase().includes(query.toLowerCase())),
    [cases, query, status],
  );
  const openCases = cases.filter((item) => !['Resolved', 'Closed'].includes(item.status));
  const informationRequired = cases.filter((item) => item.status === 'Information Required');
  const supportNeedsReply = supportThreads.filter((thread) => thread.status === 'Open').length;
  const totalValue = openCases.reduce((total, item) => total + item.amountInvolved, 0);

  const updateStatus = (id: string, next: CaseStatus) => {
    const updated = cases.map((item) => item.id === id ? { ...item, status: next, lastUpdate: new Date().toISOString().slice(0, 10) } : item);
    setCases(updated);
    saveCases(updated);
  };

  const assign = (id: string, reviewer: string) => {
    const updated = cases.map((item) => item.id === id ? { ...item, assignedReviewer: reviewer } : item);
    setCases(updated);
    saveCases(updated);
  };

  return (
    <div className="min-h-dvh bg-background">
      <DashboardSidebar staff />
      <main className="md:pl-[17.5rem]">
        <div className="mx-auto max-w-7xl px-5 pb-16 pt-20 md:px-8 md:pt-10">
          <header className="flex flex-col gap-5 border-b border-border pb-8 lg:flex-row lg:items-end lg:justify-between">
            <div><p className="text-sm font-semibold text-muted-foreground">GOV operations · Review desk</p><h1 className="mt-2 font-display text-4xl font-extrabold tracking-[-0.05em] text-navy-900 sm:text-5xl">Admin dashboard</h1><p className="mt-2 max-w-2xl text-muted-foreground">A live working view of the case queue, reviewer workload, and client support.</p></div>
            <div className="flex flex-wrap gap-2"><Link href="/admin/support" className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-bold text-card-foreground transition hover:border-teal-300 hover:text-teal-800"><LifeBuoy size={16} /> Support inbox</Link><Link href="/dashboard/cases/new" className="inline-flex items-center gap-2 rounded-xl bg-navy-900 px-4 py-3 text-sm font-bold text-white transition hover:bg-navy-800"><FilePlus2 size={16} /> New case</Link></div>
          </header>

          <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-border bg-card p-5 soft-shadow"><div className="flex items-center justify-between"><p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Open queue</p><span className="grid h-9 w-9 place-items-center rounded-xl bg-teal-50 text-teal-800"><BriefcaseBusiness size={17} /></span></div><p className="mt-4 font-display text-3xl font-extrabold text-navy-900">{openCases.length}</p><p className="mt-1 text-xs text-muted-foreground">Cases needing active review</p></div>
            <div className="rounded-2xl border border-border bg-card p-5 soft-shadow"><div className="flex items-center justify-between"><p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Awaiting information</p><span className="grid h-9 w-9 place-items-center rounded-xl bg-amber-50 text-amber-800"><Clock3 size={17} /></span></div><p className="mt-4 font-display text-3xl font-extrabold text-navy-900">{informationRequired.length}</p><p className="mt-1 text-xs text-muted-foreground">Clients have a request to answer</p></div>
            <div className="rounded-2xl border border-border bg-card p-5 soft-shadow"><div className="flex items-center justify-between"><p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Open case value</p><span className="grid h-9 w-9 place-items-center rounded-xl bg-sky-50 text-sky-800"><Activity size={17} /></span></div><p className="mt-4 font-display text-3xl font-extrabold text-navy-900">{formatCurrency(totalValue)}</p><p className="mt-1 text-xs text-muted-foreground">Across active records</p></div>
            <Link href="/admin/support" className="rounded-2xl border border-teal-200 bg-teal-50 p-5 transition hover:border-teal-400"><div className="flex items-center justify-between"><p className="text-xs font-bold uppercase tracking-wider text-teal-800">Support needs reply</p><span className="grid h-9 w-9 place-items-center rounded-xl bg-white text-teal-800"><MessageCircle size={17} /></span></div><p className="mt-4 font-display text-3xl font-extrabold text-teal-950">{supportNeedsReply}</p><p className="mt-1 text-xs text-teal-800/75">Open conversations in support <ArrowRight size={13} className="ml-1 inline" /></p></Link>
          </section>

          <div className="mt-10 grid gap-6 xl:grid-cols-[1.45fr_.75fr]">
            <section className="rounded-2xl border border-border bg-card soft-shadow">
              <div className="flex flex-col gap-4 border-b border-border p-5 lg:flex-row lg:items-center lg:justify-between"><div><div className="flex items-center gap-2"><h2 className="font-display text-xl font-extrabold">Case queue</h2><span className="rounded-full bg-muted px-2.5 py-1 text-xs font-bold text-muted-foreground">{filtered.length}</span></div><p className="mt-1 text-sm text-muted-foreground">Search, assign, and update cases without leaving the review desk.</p></div><div className="flex flex-col gap-2 sm:flex-row"><label className="relative"><Search size={16} className="pointer-events-none absolute left-3 top-3.5 text-muted-foreground" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search cases" className="w-full rounded-xl border border-input bg-background py-3 pl-9 pr-3 text-sm outline-none focus:border-teal-600 sm:w-52" data-testid="input-search-cases" /></label><label className="relative"><Filter size={15} className="pointer-events-none absolute left-3 top-3.5 text-muted-foreground" /><select value={status} onChange={(event) => setStatus(event.target.value as 'All' | CaseStatus)} className="w-full appearance-none rounded-xl border border-input bg-background py-3 pl-9 pr-9 text-sm outline-none focus:border-teal-600 sm:w-52" data-testid="select-filter-status"><option>All</option>{statusOptions.map((option) => <option key={option}>{option}</option>)}</select><ChevronDown size={15} className="pointer-events-none absolute right-3 top-3.5 text-muted-foreground" /></label></div></div>
              <div className="hidden overflow-x-auto md:block"><table className="w-full text-left"><thead className="border-b border-border bg-muted/40 text-xs font-bold uppercase tracking-wider text-muted-foreground"><tr><th className="px-5 py-3">Case</th><th className="px-5 py-3">Status</th><th className="px-5 py-3">Amount</th><th className="px-5 py-3">Reviewer</th><th className="px-5 py-3">Updated</th></tr></thead><tbody className="divide-y divide-border">{filtered.map((item) => <tr key={item.id} className="transition hover:bg-muted/30"><td className="px-5 py-4"><Link href={`/dashboard/cases/${item.id}`} className="font-bold text-card-foreground hover:text-teal-800">{item.title}</Link><p className="mt-1 text-xs text-muted-foreground">{item.id} · {item.institution}</p></td><td className="px-5 py-4"><select value={item.status} onChange={(event) => updateStatus(item.id, event.target.value as CaseStatus)} className="mb-2 block rounded-lg border border-border bg-background px-2 py-1 text-xs font-bold outline-none" data-testid={`select-status-${item.id}`}>{statusOptions.map((option) => <option key={option}>{option}</option>)}</select><StatusBadge status={item.status} /></td><td className="px-5 py-4 text-sm font-bold">{formatCurrency(item.amountInvolved)}</td><td className="px-5 py-4"><label className="flex items-center gap-2 text-sm"><UserRound size={15} className="text-muted-foreground" /><select value={item.assignedReviewer} onChange={(event) => assign(item.id, event.target.value)} className="max-w-[130px] bg-transparent text-sm font-semibold outline-none" data-testid={`select-reviewer-${item.id}`}><option>Pending assignment</option>{reviewers.map((reviewer) => <option key={reviewer.id}>{reviewer.name}</option>)}</select></label></td><td className="px-5 py-4 text-sm text-muted-foreground">{formatDate(item.lastUpdate)}</td></tr>)}</tbody></table></div>
              <div className="space-y-3 p-4 md:hidden">{filtered.map((item) => <div key={item.id} className="rounded-xl border border-border p-4"><div className="flex items-start justify-between gap-2"><Link href={`/dashboard/cases/${item.id}`} className="font-bold">{item.title}</Link><StatusBadge status={item.status} /></div><p className="mt-1 text-xs text-muted-foreground">{item.id} · {formatCurrency(item.amountInvolved)}</p><div className="mt-4 grid gap-2"><select value={item.status} onChange={(event) => updateStatus(item.id, event.target.value as CaseStatus)} className="rounded-lg border border-border bg-background px-3 py-2 text-xs font-bold" data-testid={`mobile-select-status-${item.id}`}>{statusOptions.map((option) => <option key={option}>{option}</option>)}</select><select value={item.assignedReviewer} onChange={(event) => assign(item.id, event.target.value)} className="rounded-lg border border-border bg-background px-3 py-2 text-xs font-bold" data-testid={`mobile-select-reviewer-${item.id}`}><option>Pending assignment</option>{reviewers.map((reviewer) => <option key={reviewer.id}>{reviewer.name}</option>)}</select></div></div>)}</div>
              {filtered.length === 0 && <div className="p-12 text-center"><Check size={24} className="mx-auto text-teal-700" /><p className="mt-3 font-bold">No cases match this view.</p><p className="mt-1 text-sm text-muted-foreground">Try another status or search term.</p></div>}
            </section>

            <aside className="space-y-6">
              <section className="rounded-2xl border border-border bg-card p-5 soft-shadow"><div className="flex items-center justify-between"><div><h2 className="font-display text-lg font-extrabold">Reviewer workload</h2><p className="mt-1 text-xs text-muted-foreground">Assigned active cases</p></div><UserRound size={18} className="text-teal-700" /></div><div className="mt-5 space-y-4">{reviewers.map((reviewer) => { const assigned = openCases.filter((item) => item.assignedReviewer === reviewer.name).length; const percentage = Math.min(100, Math.round((assigned / Math.max(1, reviewer.openCases)) * 100)); return <div key={reviewer.id}><div className="flex items-center justify-between gap-3"><div className="flex min-w-0 items-center gap-2"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-navy-900 text-[10px] font-bold text-white">{initials(reviewer.name)}</span><div className="min-w-0"><p className="truncate text-sm font-bold">{reviewer.name}</p><p className="truncate text-[11px] text-muted-foreground">{reviewer.specialization}</p></div></div><span className="shrink-0 text-xs font-bold text-muted-foreground">{assigned} active</span></div><div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-teal-500" style={{ width: `${Math.max(8, percentage)}%` }} /></div></div>; })}</div></section>
              <section className="rounded-2xl border border-border bg-card p-5 soft-shadow"><div className="flex items-center justify-between"><div><h2 className="font-display text-lg font-extrabold">Needs attention</h2><p className="mt-1 text-xs text-muted-foreground">The next actions to review</p></div><Clock3 size={18} className="text-amber-600" /></div><div className="mt-5 space-y-3">{informationRequired.slice(0, 3).map((item) => <Link key={item.id} href={`/dashboard/cases/${item.id}`} className="block rounded-xl border border-amber-100 bg-amber-50/60 p-3 transition hover:border-amber-300"><p className="text-sm font-bold text-amber-950">{item.title}</p><p className="mt-1 text-xs text-amber-900/70">{item.id} · Waiting on client information</p></Link>)}{informationRequired.length === 0 && <p className="rounded-xl bg-muted p-3 text-sm text-muted-foreground">No information requests are waiting.</p>}</div></section>
              <section className="rounded-2xl bg-navy-900 p-5 text-white"><p className="text-xs font-bold uppercase tracking-[0.14em] text-teal-300">Quick links</p><div className="mt-4 space-y-2"><Link href="/admin/support" className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-sm font-bold transition hover:bg-white/10">Open support inbox <ArrowRight size={15} /></Link><Link href="/dashboard" className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-sm font-bold transition hover:bg-white/10">Preview client workspace <ArrowRight size={15} /></Link></div></section>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
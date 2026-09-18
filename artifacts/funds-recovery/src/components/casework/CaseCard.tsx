import { ArrowUpRight, CalendarDays, CircleDollarSign } from 'lucide-react';
import { Link } from 'wouter';
import { formatCurrency, formatDate, type CaseRecord } from '@/data/casework';
import { StatusBadge } from './StatusBadge';

export function CaseCard({ item, compact = false }: { item: CaseRecord; compact?: boolean }) {
  return <Link href={`/dashboard/cases/${item.id}`} className="card-hover group block rounded-2xl border border-border bg-card p-5 soft-shadow" data-testid={`card-case-${item.id}`}>
    <div className="flex items-start justify-between gap-4"><div><div className="flex flex-wrap items-center gap-2"><span className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">{item.id}</span><StatusBadge status={item.status} /></div><h3 className="mt-3 font-display text-lg font-extrabold tracking-[-0.025em] text-card-foreground group-hover:text-teal-700">{item.title}</h3></div><ArrowUpRight size={18} className="shrink-0 text-muted-foreground transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-teal-700" /></div>
    {!compact && <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">{item.description}</p>}
    <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 border-t border-border pt-4 text-xs font-semibold text-muted-foreground"><span className="inline-flex items-center gap-1.5"><CircleDollarSign size={14} className="text-teal-700" /> {formatCurrency(item.amountInvolved)}</span><span className="inline-flex items-center gap-1.5"><CalendarDays size={14} /> Updated {formatDate(item.lastUpdate)}</span></div>
  </Link>;
}
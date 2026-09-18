import type { CaseStatus } from '@/data/casework';

const tone: Record<CaseStatus, string> = {
  Submitted: 'bg-slate-100 text-slate-700 border-slate-200',
  'Under Review': 'bg-teal-50 text-teal-800 border-teal-200',
  'Information Required': 'bg-amber-50 text-amber-800 border-amber-200',
  'In Progress': 'bg-indigo-50 text-indigo-800 border-indigo-200',
  Resolved: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  Closed: 'bg-slate-100 text-slate-500 border-slate-200',
};

export function StatusBadge({ status }: { status: CaseStatus }) {
  return <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-bold ${tone[status]}`} data-testid={`status-${status.toLowerCase().replaceAll(' ', '-')}`}><span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />{status}</span>;
}
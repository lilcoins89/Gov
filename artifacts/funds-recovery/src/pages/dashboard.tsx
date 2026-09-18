import { Activity, ArrowRight, Bell, FilePlus2, MoreHorizontal } from 'lucide-react';
import { Link } from 'wouter';
import { DashboardSidebar } from '@/components/casework/DashboardSidebar';
import { CaseCard } from '@/components/casework/CaseCard';
import { StatsCards } from '@/components/casework/StatsCards';
import { loadCases } from '@/data/casework';

export default function Dashboard() {
  const cases = loadCases();
  const active = cases.filter((item) => !['Resolved', 'Closed'].includes(item.status));
  const underReview = cases.filter((item) => item.status === 'Under Review').length;
  const attention = cases.filter((item) => item.status === 'Information Required');
  const closed = cases.filter((item) => item.status === 'Closed').length;

  return (
    <div className="min-h-dvh bg-background">
      <DashboardSidebar />
      <main className="md:pl-[17.5rem]">
        <div className="mx-auto max-w-7xl px-5 pb-14 pt-20 md:px-8 md:pt-10">
          <header className="flex flex-col gap-5 border-b border-border pb-8 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-muted-foreground">Monday, June 10, 2024</p>
              <h1 className="mt-2 font-display text-4xl font-extrabold tracking-[-0.05em] text-navy-900">Overview</h1>
              <p className="mt-2 text-muted-foreground">Here’s the latest across your case record.</p>
            </div>
            <div className="flex items-center gap-3">
              <button type="button" onClick={() => window.alert('No new notifications.')} className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-card text-muted-foreground transition hover:border-teal-300 hover:text-teal-800" aria-label="Notifications" data-testid="button-notifications">
                <Bell size={18} />
              </button>
              <Link href="/dashboard/cases/new" className="inline-flex items-center gap-2 rounded-xl bg-navy-900 px-4 py-3 text-sm font-bold text-white transition hover:bg-navy-800" data-testid="link-new-case">
                <FilePlus2 size={16} /> Submit a Case
              </Link>
            </div>
          </header>

          <div className="mt-8">
            <StatsCards activeCount={active.length} underReviewCount={underReview} attentionCount={attention.length} closedCount={closed} />
          </div>

          <div className="mt-10 grid gap-6 xl:grid-cols-[1.45fr_.8fr]">
            <section>
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="font-display text-xl font-extrabold">Recent cases</h2>
                  <p className="mt-1 text-sm text-muted-foreground">Your latest submissions and updates</p>
                </div>
                <Link href="/dashboard/cases/new" className="text-sm font-bold text-teal-800 hover:text-teal-700" data-testid="link-add-case">Add case</Link>
              </div>
              <div className="space-y-4">
                {cases.slice(0, 3).map((item) => <CaseCard item={item} key={item.id} />)}
              </div>
              {cases.length === 0 && <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center"><p className="font-bold">No cases yet</p><p className="mt-1 text-sm text-muted-foreground">When you submit a case, it will appear here.</p></div>}
            </section>

            <aside className="space-y-6">
              <div className="rounded-2xl border border-border bg-card p-5 soft-shadow">
                <div className="flex items-center justify-between"><h2 className="font-display text-lg font-extrabold">Activity</h2><Activity size={18} className="text-teal-700" /></div>
                <div className="mt-5 space-y-5">
                  <div className="flex gap-3"><span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-teal-600" /><div><p className="text-sm font-semibold">Amelia Park reviewed your documents</p><p className="mt-1 text-xs text-muted-foreground">Northstar Capital · 2 days ago</p></div></div>
                  <div className="flex gap-3"><span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-amber-500" /><div><p className="text-sm font-semibold">More information requested</p><p className="mt-1 text-xs text-muted-foreground">Card payment dispute · Apr 2</p></div></div>
                  <div className="flex gap-3"><span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-slate-400" /><div><p className="text-sm font-semibold">Case submitted</p><p className="mt-1 text-xs text-muted-foreground">Wire transfer investigation · Feb 19</p></div></div>
                </div>
                <button type="button" onClick={() => window.alert('Full activity history will be available here.')} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-teal-800" data-testid="button-view-activity">View all activity <ArrowRight size={15} /></button>
              </div>
              <div className="rounded-2xl bg-navy-900 p-5 text-white">
                <div className="flex items-center justify-between"><p className="text-xs font-bold uppercase tracking-[0.14em] text-teal-300">Need help?</p><MoreHorizontal size={18} className="text-slate-400" /></div>
                <p className="mt-3 font-display text-xl font-extrabold">Keep the record moving.</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">Add a note or document to an existing case whenever something changes.</p>
                <Link href="/dashboard/cases/CW-24018" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-teal-300" data-testid="link-help-case">Open a case <ArrowRight size={15} /></Link>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
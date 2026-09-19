import { Check, ChevronDown, Inbox, LifeBuoy, MessageCircle, Search, Send, UserRound } from 'lucide-react';
import { FormEvent, useMemo, useState } from 'react';
import { Link } from 'wouter';
import { DashboardSidebar } from '@/components/casework/DashboardSidebar';
import { formatDate, loadSupportThreads, saveSupportThreads, type SupportStatus, type SupportThread } from '@/data/casework';

const statusStyles: Record<SupportStatus, string> = {
  Open: 'border-teal-200 bg-teal-50 text-teal-800',
  'Awaiting Client': 'border-amber-200 bg-amber-50 text-amber-800',
  Closed: 'border-slate-200 bg-slate-100 text-slate-700',
};

export default function AdminSupport() {
  const [threads, setThreads] = useState(loadSupportThreads);
  const [selectedId, setSelectedId] = useState(threads[0]?.id ?? null);
  const [filter, setFilter] = useState<'All' | SupportStatus>('All');
  const [query, setQuery] = useState('');
  const [draft, setDraft] = useState('');
  const selected = threads.find((thread) => thread.id === selectedId) ?? null;
  const filtered = useMemo(() => threads.filter((thread) => (filter === 'All' || thread.status === filter) && `${thread.id} ${thread.subject} ${thread.category}`.toLowerCase().includes(query.toLowerCase())), [filter, query, threads]);

  const persist = (next: SupportThread[]) => {
    setThreads(next);
    saveSupportThreads(next);
  };

  const updateStatus = (id: string, status: SupportStatus) => persist(threads.map((thread) => thread.id === id ? { ...thread, status } : thread));

  const sendReply = (event: FormEvent) => {
    event.preventDefault();
    if (!selected || !draft.trim()) return;
    const now = new Date().toISOString();
    persist(threads.map((thread) => thread.id === selected.id
      ? { ...thread, status: 'Awaiting Client', lastMessageAt: now, messages: [...thread.messages, { id: `staff-${Date.now()}`, sender: 'GOV support', body: draft.trim(), sentAt: now, role: 'staff' as const }] }
      : thread));
    setDraft('');
  };

  return (
    <div className="min-h-dvh bg-background">
      <DashboardSidebar staff />
      <main className="md:pl-[17.5rem]">
        <div className="mx-auto max-w-7xl px-5 pb-16 pt-20 md:px-8 md:pt-10">
          <header className="flex flex-col gap-5 border-b border-border pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div><p className="text-sm font-semibold text-muted-foreground">Operations · Staff support</p><h1 className="mt-2 font-display text-4xl font-extrabold tracking-[-0.05em] text-navy-900">Support inbox</h1><p className="mt-2 text-muted-foreground">Reply to client questions and keep every support handoff documented.</p></div>
            <div className="flex items-center gap-2 rounded-xl border border-teal-200 bg-teal-50 px-4 py-3 text-sm font-bold text-teal-900"><span className="h-2 w-2 rounded-full bg-teal-600" />{threads.filter((thread) => thread.status === 'Open').length} need a reply</div>
          </header>

          <div className="mt-8 grid gap-5 lg:grid-cols-[22rem_1fr]">
            <section className="rounded-2xl border border-border bg-card p-4 soft-shadow">
              <div className="flex items-center gap-2 px-1"><Inbox size={17} className="text-teal-700" /><p className="text-sm font-bold">All conversations</p></div>
              <div className="mt-4 flex flex-col gap-2 sm:flex-row lg:flex-col"><label className="relative flex-1"><Search size={15} className="pointer-events-none absolute left-3 top-3.5 text-muted-foreground" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search inbox" className="w-full rounded-xl border border-input bg-background py-3 pl-9 pr-3 text-sm outline-none focus:border-teal-600" data-testid="input-search-support" /></label><label className="relative"><select value={filter} onChange={(event) => setFilter(event.target.value as 'All' | SupportStatus)} className="w-full appearance-none rounded-xl border border-input bg-background px-3 py-3 pr-9 text-sm outline-none focus:border-teal-600" data-testid="select-support-filter"><option>All</option><option>Open</option><option>Awaiting Client</option><option>Closed</option></select><ChevronDown size={15} className="pointer-events-none absolute right-3 top-3.5 text-muted-foreground" /></label></div>
              <div className="mt-4 space-y-1">{filtered.map((thread) => <button type="button" key={thread.id} onClick={() => setSelectedId(thread.id)} className={`w-full rounded-xl p-3 text-left transition ${selectedId === thread.id ? 'bg-navy-900 text-white' : 'hover:bg-muted'}`} data-testid={`button-admin-support-thread-${thread.id}`}><div className="flex items-start justify-between gap-2"><p className="line-clamp-2 text-sm font-bold">{thread.subject}</p><span className={`mt-0.5 h-2 w-2 shrink-0 rounded-full ${thread.status === 'Open' ? 'bg-teal-500' : thread.status === 'Awaiting Client' ? 'bg-amber-500' : 'bg-slate-400'}`} /></div><p className={`mt-1 text-xs ${selectedId === thread.id ? 'text-slate-300' : 'text-muted-foreground'}`}>{thread.id} · {thread.category}</p><p className={`mt-2 text-[11px] ${selectedId === thread.id ? 'text-slate-400' : 'text-muted-foreground'}`}>{formatDate(thread.lastMessageAt.slice(0, 10))}</p></button>)}</div>
              {filtered.length === 0 && <div className="py-10 text-center"><LifeBuoy size={23} className="mx-auto text-teal-700" /><p className="mt-3 text-sm font-bold">No matches</p></div>}
            </section>

            <section className="min-h-[38rem] rounded-2xl border border-border bg-card soft-shadow">
              {selected ? <div className="flex min-h-[38rem] flex-col">
                <header className="border-b border-border p-5 sm:p-7"><div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"><div><div className="flex flex-wrap items-center gap-2"><span className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">{selected.id}</span><span className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-bold ${statusStyles[selected.status]}`}>{selected.status}</span></div><h2 className="mt-3 font-display text-2xl font-extrabold text-navy-900">{selected.subject}</h2><p className="mt-1 text-sm text-muted-foreground">{selected.category} · Assigned to {selected.assignedTo}</p></div><div className="flex items-center gap-2"><UserRound size={15} className="text-muted-foreground" /><select value={selected.status} onChange={(event) => updateStatus(selected.id, event.target.value as SupportStatus)} className="rounded-lg border border-border bg-background px-3 py-2 text-xs font-bold outline-none focus:border-teal-600" data-testid="select-admin-support-status"><option>Open</option><option>Awaiting Client</option><option>Closed</option></select></div></div>{selected.caseId && <Link href={`/dashboard/cases/${selected.caseId}`} className="mt-4 inline-flex text-sm font-bold text-teal-800 hover:text-teal-700">Open related case · {selected.caseId}</Link>}</header>
                <div className="flex-1 space-y-4 overflow-auto p-5 sm:p-7">{selected.messages.map((message) => <div key={message.id} className={`flex gap-3 ${message.role === 'staff' ? 'flex-row-reverse' : ''}`}><div className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-bold ${message.role === 'staff' ? 'bg-navy-900 text-white' : 'bg-teal-100 text-teal-900'}`}>{message.role === 'staff' ? 'CS' : 'ME'}</div><div className={`max-w-[82%] rounded-2xl px-4 py-3 ${message.role === 'staff' ? 'bg-navy-900 text-white' : 'bg-muted text-foreground'}`}><div className="flex flex-wrap items-center gap-2"><p className="text-xs font-bold">{message.sender}</p><p className={`text-[10px] ${message.role === 'staff' ? 'text-slate-300' : 'text-muted-foreground'}`}>{formatDate(message.sentAt.slice(0, 10))}</p></div><p className="mt-1 text-sm leading-6">{message.body}</p></div></div>)}</div>
                <form onSubmit={sendReply} className="border-t border-border p-4 sm:p-5"><div className="flex gap-2"><input value={draft} onChange={(event) => setDraft(event.target.value)} className="min-w-0 flex-1 rounded-xl border border-input bg-background px-3.5 py-3 text-sm outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100" placeholder="Reply to client…" data-testid="input-admin-support-reply" /><button type="submit" className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-navy-900 text-white transition hover:bg-navy-800" aria-label="Send staff reply" data-testid="button-send-admin-support-reply"><Send size={17} /></button></div><p className="mt-2 text-xs text-muted-foreground">Sending a reply changes the thread to Awaiting Client.</p></form>
              </div> : <div className="grid min-h-[38rem] place-items-center p-8 text-center"><div><MessageCircle size={28} className="mx-auto text-teal-700" /><h2 className="mt-4 font-display text-xl font-extrabold">Choose a conversation</h2><p className="mt-1 text-sm text-muted-foreground">Select a support thread to review and reply.</p></div></div>}
            </section>
          </div>
          <div className="mt-5 flex items-center gap-2 text-xs text-muted-foreground"><Check size={15} className="text-teal-700" /> Replies and status changes are saved locally for this demo workspace.</div>
        </div>
      </main>
    </div>
  );
}
import { ArrowLeft, CheckCircle2, Inbox, LifeBuoy, Link2, MessageCircle, Plus, Send, X } from 'lucide-react';
import { FormEvent, useMemo, useState } from 'react';
import { Link } from 'wouter';
import { DashboardSidebar } from '@/components/casework/DashboardSidebar';
import { currentUser, formatDate, loadCases, loadSupportThreads, saveSupportThreads, type SupportStatus, type SupportThread } from '@/data/casework';

const statusStyles: Record<SupportStatus, string> = {
  Open: 'border-teal-200 bg-teal-50 text-teal-800',
  'Awaiting Client': 'border-amber-200 bg-amber-50 text-amber-800',
  Closed: 'border-slate-200 bg-slate-100 text-slate-700',
};

function StatusPill({ status }: { status: SupportStatus }) {
  return <span className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-bold ${statusStyles[status]}`}>{status}</span>;
}

export default function Support() {
  const [threads, setThreads] = useState(loadSupportThreads);
  const [selectedId, setSelectedId] = useState(threads[0]?.id ?? null);
  const [draft, setDraft] = useState('');
  const [isNew, setIsNew] = useState(false);
  const [newSubject, setNewSubject] = useState('');
  const [newCategory, setNewCategory] = useState<SupportThread['category']>('Case question');
  const [newMessage, setNewMessage] = useState('');
  const [newCaseId, setNewCaseId] = useState('');
  const cases = loadCases();
  const selected = threads.find((thread) => thread.id === selectedId) ?? null;
  const openCount = threads.filter((thread) => thread.status !== 'Closed').length;

  const selectThread = (id: string) => {
    setSelectedId(id);
    setIsNew(false);
    setDraft('');
  };

  const persist = (next: SupportThread[]) => {
    setThreads(next);
    saveSupportThreads(next);
  };

  const sendReply = (event: FormEvent) => {
    event.preventDefault();
    if (!selected || !draft.trim()) return;
    const next = threads.map((thread) => thread.id === selected.id
      ? {
          ...thread,
          status: 'Open' as const,
          lastMessageAt: new Date().toISOString(),
          messages: [...thread.messages, { id: `msg-${Date.now()}`, sender: currentUser.name, body: draft.trim(), sentAt: new Date().toISOString(), role: 'client' as const }],
        }
      : thread);
    persist(next);
    setDraft('');
  };

  const createThread = (event: FormEvent) => {
    event.preventDefault();
    if (!newSubject.trim() || !newMessage.trim()) return;
    const now = new Date().toISOString();
    const thread: SupportThread = {
      id: `SUP-${Math.floor(1100 + Math.random() * 800)}`,
      subject: newSubject.trim(),
      category: newCategory,
      caseId: newCaseId || undefined,
      status: 'Open',
      assignedTo: 'Support desk',
      lastMessageAt: now,
      messages: [{ id: `msg-${Date.now()}`, sender: currentUser.name, body: newMessage.trim(), sentAt: now, role: 'client' }],
    };
    persist([thread, ...threads]);
    setSelectedId(thread.id);
    setNewSubject('');
    setNewMessage('');
    setNewCaseId('');
    setIsNew(false);
  };

  return (
    <div className="min-h-dvh bg-background">
      <DashboardSidebar />
      <main className="md:pl-[17.5rem]">
        <div className="mx-auto max-w-7xl px-5 pb-16 pt-20 md:px-8 md:pt-10">
          <header className="flex flex-col gap-5 border-b border-border pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-muted-foreground">Client workspace · Support</p>
              <h1 className="mt-2 font-display text-4xl font-extrabold tracking-[-0.05em] text-navy-900">Support inbox</h1>
              <p className="mt-2 max-w-2xl text-muted-foreground">Ask a question, share context, and keep support replies connected to your case record.</p>
            </div>
            <button type="button" onClick={() => setIsNew(true)} className="inline-flex items-center justify-center gap-2 rounded-xl bg-navy-900 px-4 py-3 text-sm font-bold text-white transition hover:bg-navy-800" data-testid="button-new-support-thread">
              <Plus size={16} /> New message
            </button>
          </header>

          <div className="mt-8 grid gap-5 lg:grid-cols-[20rem_1fr]">
            <section className="rounded-2xl border border-border bg-card p-3 soft-shadow">
              <div className="flex items-center justify-between px-2 pb-3">
                <div className="flex items-center gap-2"><Inbox size={17} className="text-teal-700" /><p className="text-sm font-bold">Your conversations</p></div>
                <span className="text-xs font-semibold text-muted-foreground">{openCount} open</span>
              </div>
              <div className="space-y-1">
                {threads.map((thread) => (
                  <button type="button" key={thread.id} onClick={() => selectThread(thread.id)} className={`w-full rounded-xl p-3 text-left transition ${selectedId === thread.id && !isNew ? 'bg-navy-900 text-white' : 'hover:bg-muted'}`} data-testid={`button-support-thread-${thread.id}`}>
                    <div className="flex items-start justify-between gap-2"><p className="line-clamp-2 text-sm font-bold">{thread.subject}</p>{thread.status !== 'Closed' && <span className={`mt-0.5 h-2 w-2 shrink-0 rounded-full ${selectedId === thread.id && !isNew ? 'bg-teal-300' : 'bg-teal-600'}`} />}</div>
                    <p className={`mt-1 text-xs ${selectedId === thread.id && !isNew ? 'text-slate-300' : 'text-muted-foreground'}`}>{thread.caseId ?? thread.category}</p>
                    <p className={`mt-2 text-[11px] ${selectedId === thread.id && !isNew ? 'text-slate-400' : 'text-muted-foreground'}`}>{formatDate(thread.lastMessageAt.slice(0, 10))}</p>
                  </button>
                ))}
                {threads.length === 0 && <div className="rounded-xl border border-dashed border-border p-6 text-center"><LifeBuoy size={22} className="mx-auto text-teal-700" /><p className="mt-3 text-sm font-bold">No conversations yet</p></div>}
              </div>
            </section>

            <section className="min-h-[38rem] rounded-2xl border border-border bg-card soft-shadow">
              {isNew ? (
                <form onSubmit={createThread} className="p-5 sm:p-8" data-testid="form-new-support-thread">
                  <div className="flex items-start justify-between gap-4 border-b border-border pb-5"><div><p className="text-xs font-bold uppercase tracking-[0.15em] text-teal-800">New conversation</p><h2 className="mt-2 font-display text-2xl font-extrabold text-navy-900">How can we help?</h2><p className="mt-1 text-sm text-muted-foreground">A support specialist will reply in this inbox.</p></div><button type="button" onClick={() => setIsNew(false)} className="rounded-lg p-2 text-muted-foreground hover:bg-muted" aria-label="Cancel new message"><X size={18} /></button></div>
                  <div className="mt-7 grid gap-5 sm:grid-cols-2">
                    <label className="text-sm font-bold sm:col-span-2">Subject<input value={newSubject} onChange={(event) => setNewSubject(event.target.value)} className="mt-2 w-full rounded-xl border border-input bg-background px-3.5 py-3 text-sm outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100" placeholder="What do you need help with?" data-testid="input-support-subject" /></label>
                    <label className="text-sm font-bold">Category<select value={newCategory} onChange={(event) => setNewCategory(event.target.value as SupportThread['category'])} className="mt-2 w-full rounded-xl border border-input bg-background px-3.5 py-3 text-sm outline-none focus:border-teal-600" data-testid="select-support-category"><option>Case question</option><option>Technical help</option><option>Document support</option></select></label>
                    <label className="text-sm font-bold">Related case <span className="font-normal text-muted-foreground">(optional)</span><select value={newCaseId} onChange={(event) => setNewCaseId(event.target.value)} className="mt-2 w-full rounded-xl border border-input bg-background px-3.5 py-3 text-sm outline-none focus:border-teal-600" data-testid="select-support-case"><option value="">No specific case</option>{cases.map((item) => <option key={item.id} value={item.id}>{item.id} · {item.title}</option>)}</select></label>
                    <label className="text-sm font-bold sm:col-span-2">Message<textarea value={newMessage} onChange={(event) => setNewMessage(event.target.value)} className="mt-2 min-h-40 w-full resize-y rounded-xl border border-input bg-background px-3.5 py-3 text-sm outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100" placeholder="Share the question or context you want the support team to see." data-testid="textarea-support-message" /></label>
                  </div>
                  <div className="mt-7 flex justify-end"><button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-navy-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-navy-800" data-testid="button-send-new-support"><Send size={16} /> Send message</button></div>
                </form>
              ) : selected ? (
                <div className="flex min-h-[38rem] flex-col">
                  <header className="border-b border-border p-5 sm:p-7">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div><div className="flex flex-wrap items-center gap-2"><span className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">{selected.id}</span><StatusPill status={selected.status} /></div><h2 className="mt-3 font-display text-2xl font-extrabold text-navy-900">{selected.subject}</h2><p className="mt-1 text-sm text-muted-foreground">{selected.category} · {selected.assignedTo}</p></div>{selected.caseId && <Link href={`/dashboard/cases/${selected.caseId}`} className="inline-flex items-center gap-2 text-sm font-bold text-teal-800 hover:text-teal-700"><Link2 size={15} /> View case</Link>}</div>
                  </header>
                  <div className="flex-1 space-y-4 overflow-auto p-5 sm:p-7">{selected.messages.map((message) => <div key={message.id} className={`flex gap-3 ${message.role === 'client' ? 'flex-row-reverse' : ''}`}><div className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-bold ${message.role === 'client' ? 'bg-navy-900 text-white' : 'bg-teal-100 text-teal-900'}`}>{message.role === 'client' ? 'ME' : 'CS'}</div><div className={`max-w-[82%] rounded-2xl px-4 py-3 ${message.role === 'client' ? 'bg-navy-900 text-white' : 'bg-muted text-foreground'}`}><div className="flex flex-wrap items-center gap-2"><p className="text-xs font-bold">{message.sender}</p><p className={`text-[10px] ${message.role === 'client' ? 'text-slate-300' : 'text-muted-foreground'}`}>{formatDate(message.sentAt.slice(0, 10))}</p></div><p className="mt-1 text-sm leading-6">{message.body}</p></div></div>)}</div>
                  <form onSubmit={sendReply} className="border-t border-border p-4 sm:p-5"><div className="flex gap-2"><input value={draft} onChange={(event) => setDraft(event.target.value)} className="min-w-0 flex-1 rounded-xl border border-input bg-background px-3.5 py-3 text-sm outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100" placeholder="Reply to support…" data-testid="input-support-reply" /><button type="submit" className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-navy-900 text-white transition hover:bg-navy-800" aria-label="Send support reply" data-testid="button-send-support-reply"><Send size={17} /></button></div><p className="mt-2 text-xs text-muted-foreground">Replies are saved to this browser until live support storage is connected.</p></form>
                </div>
              ) : (
                <div className="grid min-h-[38rem] place-items-center p-8 text-center"><div><MessageCircle size={28} className="mx-auto text-teal-700" /><h2 className="mt-4 font-display text-xl font-extrabold">Choose a conversation</h2><p className="mt-1 text-sm text-muted-foreground">Select a thread or start a new message with support.</p></div></div>
              )}
            </section>
          </div>
          <div className="mt-5 flex items-center gap-2 text-xs text-muted-foreground"><CheckCircle2 size={15} className="text-teal-700" /> Support replies stay attached to a clear conversation record.</div>
        </div>
      </main>
    </div>
  );
}
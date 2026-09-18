import { FileText, UploadCloud, X } from 'lucide-react';
import { useState } from 'react';
import { seedDocuments, type DocumentRecord } from '@/data/casework';

export function DocumentUploader({ showSeed = true }: { showSeed?: boolean }) {
  const [documents, setDocuments] = useState<DocumentRecord[]>(showSeed ? seedDocuments : []);
  const [notice, setNotice] = useState('');
  const addFiles = (files: FileList | null) => {
    if (!files?.length) return;
    const next = Array.from(files).map((file, index) => ({ id: `local-${Date.now()}-${index}`, name: file.name, type: file.name.split('.').pop()?.toUpperCase() || 'FILE', uploadedDate: new Date().toISOString().slice(0, 10), size: `${Math.max(1, Math.round(file.size / 1024))} KB`, status: 'Received' }));
    setDocuments((current) => [...current, ...next]); setNotice(`${next.length} document${next.length > 1 ? 's' : ''} added to this draft.`);
  };
  return <div className="space-y-4" data-testid="document-uploader"><label className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-teal-300 bg-teal-50/60 px-5 py-8 text-center transition hover:border-teal-500 hover:bg-teal-50"><UploadCloud size={25} className="text-teal-700" /><span className="mt-3 text-sm font-bold text-teal-900">Add supporting documents</span><span className="mt-1 text-xs text-teal-800/70">PDF, JPG, or PNG up to 10 MB each</span><input type="file" multiple className="sr-only" onChange={(event) => addFiles(event.target.files)} data-testid="input-documents" /></label>{notice && <p className="text-xs font-semibold text-teal-800" data-testid="text-upload-notice">{notice}</p>}{documents.length > 0 && <div className="space-y-2">{documents.map((document) => <div key={document.id} className="flex items-center gap-3 rounded-xl border border-border bg-card px-3 py-3"><div className="grid h-9 w-9 place-items-center rounded-lg bg-muted text-teal-800"><FileText size={17} /></div><div className="min-w-0 flex-1"><p className="truncate text-sm font-bold text-card-foreground">{document.name}</p><p className="text-xs text-muted-foreground">{document.type} · {document.size} · {document.status}</p></div><button type="button" onClick={() => setDocuments((items) => items.filter((item) => item.id !== document.id))} className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground" aria-label={`Remove ${document.name}`} data-testid={`button-remove-document-${document.id}`}><X size={16} /></button></div>)}</div>}</div>;
}
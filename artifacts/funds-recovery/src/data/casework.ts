export type UserRole = 'client' | 'reviewer' | 'admin';
export type CaseStatus =
  | 'Submitted'
  | 'Under Review'
  | 'Information Required'
  | 'In Progress'
  | 'Resolved'
  | 'Closed';

export type User = { id: string; name: string; email: string; role: UserRole };
export type CaseRecord = {
  id: string;
  title: string;
  category: string;
  description: string;
  amountInvolved: number;
  incidentDate: string;
  institution: string;
  submittedDate: string;
  status: CaseStatus;
  lastUpdate: string;
  assignedReviewer: string;
  notes: string;
  additionalNotes?: string;
};
export type DocumentRecord = { id: string; name: string; type: string; uploadedDate: string; size: string; status: string };
export type Message = { id: string; sender: string; body: string; sentAt: string; kind: 'team' | 'client' | 'request' };
export type StatusEvent = { id: string; label: string; description: string; date: string; completed: boolean; current: boolean };
export type Reviewer = { id: string; name: string; initials: string; specialization: string; openCases: number };
export type SupportStatus = 'Open' | 'Awaiting Client' | 'Closed';
export type SupportMessage = { id: string; sender: string; body: string; sentAt: string; role: 'client' | 'staff' };
export type SupportThread = {
  id: string;
  subject: string;
  category: 'Case question' | 'Technical help' | 'Document support';
  caseId?: string;
  status: SupportStatus;
  assignedTo: string;
  lastMessageAt: string;
  messages: SupportMessage[];
};

export const currentUser: User = { id: 'u-100', name: 'Morgan Ellis', email: 'morgan.ellis@example.com', role: 'client' };

export const reviewers: Reviewer[] = [
  { id: 'r-1', name: 'Amelia Park', initials: 'AP', specialization: 'Payments & card disputes', openCases: 12 },
  { id: 'r-2', name: 'Jonah Reyes', initials: 'JR', specialization: 'Investment platforms', openCases: 8 },
  { id: 'r-3', name: 'Nadia Okafor', initials: 'NO', specialization: 'Digital asset transfers', openCases: 15 },
];

export const seedCases: CaseRecord[] = [
  {
    id: 'CW-24018',
    title: 'Northstar Capital transfer review',
    category: 'Investment platform',
    description: 'I am requesting a review of a series of transfers made after an investment platform changed its withdrawal terms. The account is no longer accessible.',
    amountInvolved: 18450,
    incidentDate: '2024-04-18',
    institution: 'Northstar Capital',
    submittedDate: '2024-05-02',
    status: 'Under Review',
    lastUpdate: '2024-05-09',
    assignedReviewer: 'Amelia Park',
    notes: 'Initial documentation received. Reviewing account statements and correspondence.',
  },
  {
    id: 'CW-23971',
    title: 'Card payment dispute',
    category: 'Card payment',
    description: 'A card payment was processed by a merchant after the service was cancelled. The merchant has not responded to written requests.',
    amountInvolved: 1260,
    incidentDate: '2024-03-06',
    institution: 'Meridian Bank',
    submittedDate: '2024-03-22',
    status: 'Information Required',
    lastUpdate: '2024-04-02',
    assignedReviewer: 'Jonah Reyes',
    notes: 'Please add the original cancellation confirmation and the merchant response.',
  },
  {
    id: 'CW-23744',
    title: 'Wire transfer investigation',
    category: 'Bank transfer',
    description: 'A wire transfer was sent to an account that has since been flagged by the receiving institution. I would like help organizing the available evidence.',
    amountInvolved: 7320,
    incidentDate: '2024-02-11',
    institution: 'Harbor Union',
    submittedDate: '2024-02-19',
    status: 'In Progress',
    lastUpdate: '2024-03-14',
    assignedReviewer: 'Nadia Okafor',
    notes: 'A formal information request has been prepared for the receiving institution.',
  },
];

export const statusEventsFor = (item: CaseRecord): StatusEvent[] => {
  const finalised = ['Resolved', 'Closed'].includes(item.status);
  const reviewStarted = item.status !== 'Submitted';
  const documentsReceived = ['Under Review', 'Information Required', 'In Progress', 'Resolved', 'Closed'].includes(item.status);
  const updatesStarted = ['Information Required', 'In Progress', 'Resolved', 'Closed'].includes(item.status);
  const messagesStarted = ['Information Required', 'In Progress', 'Resolved', 'Closed'].includes(item.status);
  return [
    { id: 'submitted', label: 'Case submitted', description: 'Your case and initial details were received by GOV.', date: item.submittedDate, completed: true, current: item.status === 'Submitted' },
    { id: 'review-started', label: 'Review started', description: 'A specialist checks the facts, timeline, and supporting documents.', date: reviewStarted ? '2024-05-04' : '', completed: reviewStarted, current: item.status === 'Under Review' },
    { id: 'documents-received', label: 'Documents received', description: 'Supporting documents are organized alongside the case record.', date: documentsReceived ? '2024-05-09' : '', completed: documentsReceived, current: item.status === 'Information Required' },
    { id: 'review-updates', label: 'Review updates', description: 'The team shares requests, findings, and documented next steps as the review progresses.', date: updatesStarted ? '2024-05-20' : '', completed: updatesStarted, current: item.status === 'In Progress' },
    { id: 'team-messages', label: 'Messages from the team', description: 'Questions and updates from your review team stay attached to the case record.', date: messagesStarted ? item.lastUpdate : '', completed: messagesStarted, current: false },
    { id: 'current-status', label: 'Current status', description: finalised ? 'The final case outcome and relevant next steps are recorded here.' : `This case is currently ${item.status.toLowerCase()}.`, date: finalised ? '2024-06-04' : item.lastUpdate, completed: finalised, current: !finalised },
  ];
};

export const messagesFor = (item: CaseRecord): Message[] => [
  { id: 'm-1', sender: item.assignedReviewer || 'GOV team', body: 'Thanks for sharing the initial record. We are reviewing the timeline and will let you know if anything else would make the case clearer.', sentAt: item.lastUpdate, kind: 'team' },
  ...(item.status === 'Information Required'
    ? [{ id: 'm-2', sender: 'GOV team', body: 'Please add the cancellation confirmation and any response from the merchant. These help us keep the review focused.', sentAt: '2024-04-02', kind: 'request' as const }]
    : []),
];

export const seedSupportThreads: SupportThread[] = [
  {
    id: 'SUP-1042',
    subject: 'Question about the documents requested',
    category: 'Document support',
    caseId: 'CW-23971',
    status: 'Awaiting Client',
    assignedTo: 'Support desk',
    lastMessageAt: '2024-04-03T15:30:00.000Z',
    messages: [
      { id: 'sup-1042-1', sender: 'Morgan Ellis', body: 'I uploaded the cancellation confirmation. Is there anything else you need from me?', sentAt: '2024-04-02T14:10:00.000Z', role: 'client' },
      { id: 'sup-1042-2', sender: 'GOV support', body: 'Thanks, Morgan. The cancellation confirmation is now attached to your case. We will let you know if the review team needs another document.', sentAt: '2024-04-03T15:30:00.000Z', role: 'staff' },
    ],
  },
  {
    id: 'SUP-1038',
    subject: 'How do I add another case document?',
    category: 'Technical help',
    status: 'Closed',
    assignedTo: 'Support desk',
    lastMessageAt: '2024-03-28T10:20:00.000Z',
    messages: [
      { id: 'sup-1038-1', sender: 'Morgan Ellis', body: 'I found another statement and want to add it to my record.', sentAt: '2024-03-27T09:05:00.000Z', role: 'client' },
      { id: 'sup-1038-2', sender: 'GOV support', body: 'Open the case from your overview, then use the Documents panel to upload it. I am closing this support thread for now.', sentAt: '2024-03-28T10:20:00.000Z', role: 'staff' },
    ],
  },
];

export const seedDocuments: DocumentRecord[] = [
  { id: 'doc-1', name: 'account-statement-april.pdf', type: 'PDF', uploadedDate: '2024-05-02', size: '1.8 MB', status: 'Reviewed' },
  { id: 'doc-2', name: 'email-correspondence.pdf', type: 'PDF', uploadedDate: '2024-05-02', size: '624 KB', status: 'Received' },
];

export const loadSupportThreads = (): SupportThread[] => {
  try {
    const saved = localStorage.getItem('casework-support-threads');
    return saved ? JSON.parse(saved) as SupportThread[] : seedSupportThreads;
  } catch {
    return seedSupportThreads;
  }
};

export const saveSupportThreads = (items: SupportThread[]) => {
  try { localStorage.setItem('casework-support-threads', JSON.stringify(items)); } catch { /* local-only demo */ }
};

export const loadCases = (): CaseRecord[] => {
  try {
    const saved = localStorage.getItem('casework-cases');
    return saved ? JSON.parse(saved) as CaseRecord[] : seedCases;
  } catch {
    return seedCases;
  }
};

export const saveCases = (items: CaseRecord[]) => {
  try { localStorage.setItem('casework-cases', JSON.stringify(items)); } catch { /* local-only demo */ }
};

export const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);

export const formatDate = (value: string) =>
  value ? new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(`${value}T12:00:00`)) : 'Pending';
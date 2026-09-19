export type CaseStatus =
  | 'Submitted'
  | 'Under Review'
  | 'Information Required'
  | 'In Progress'
  | 'Resolved'
  | 'Closed';

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

export type DocumentRecord = {
  id: string;
  caseId: string;
  name: string;
  type: string;
  uploadedDate: string;
  size: string;
  status: string;
  storagePath: string;
};

export type Message = {
  id: string;
  sender: string;
  body: string;
  sentAt: string;
  kind: 'team' | 'client' | 'request';
};

export type StatusEvent = {
  id: string;
  label: string;
  description: string;
  date: string;
  completed: boolean;
  current: boolean;
};

export type Reviewer = {
  id: string;
  name: string;
  initials: string;
  specialization: string;
  openCases: number;
};

export type SupportStatus = 'Open' | 'Awaiting Client' | 'Closed';
export type SupportMessage = { id: string; sender: string; body: string; sentAt: string; role: 'client' | 'staff' };
export type SupportThread = {
  id: string;
  subject: string;
  category: 'Case question' | 'Technical help' | 'Document support';
  caseId?: string | null;
  status: SupportStatus;
  assignedTo: string;
  lastMessageAt: string;
};

export const reviewers: Reviewer[] = [
  { id: 'r-1', name: 'Amelia Park', initials: 'AP', specialization: 'Payments & card disputes', openCases: 12 },
  { id: 'r-2', name: 'Jonah Reyes', initials: 'JR', specialization: 'Investment platforms', openCases: 8 },
  { id: 'r-3', name: 'Nadia Okafor', initials: 'NO', specialization: 'Digital asset transfers', openCases: 15 },
];

export const caseCategories = [
  'Investment platform',
  'Card payment',
  'Bank transfer',
  'Digital asset transfer',
  'Other financial matter',
];

export const statusEventsFor = (item: CaseRecord): StatusEvent[] => {
  const finalised = ['Resolved', 'Closed'].includes(item.status);
  const reviewStarted = item.status !== 'Submitted';
  const documentsReceived = ['Under Review', 'Information Required', 'In Progress', 'Resolved', 'Closed'].includes(item.status);
  const updatesStarted = ['Information Required', 'In Progress', 'Resolved', 'Closed'].includes(item.status);
  const messagesStarted = ['Information Required', 'In Progress', 'Resolved', 'Closed'].includes(item.status);
  return [
    { id: 'submitted', label: 'Case submitted', description: 'Your case and initial details were received by GOV.', date: item.submittedDate, completed: true, current: item.status === 'Submitted' },
    { id: 'review-started', label: 'Review started', description: 'A specialist checks the facts, timeline, and supporting documents.', date: reviewStarted ? item.submittedDate : '', completed: reviewStarted, current: item.status === 'Under Review' },
    { id: 'documents-received', label: 'Documents received', description: 'Supporting documents are organized alongside the case record.', date: documentsReceived ? item.lastUpdate : '', completed: documentsReceived, current: item.status === 'Information Required' },
    { id: 'review-updates', label: 'Review updates', description: 'The team shares requests, findings, and documented next steps as the review progresses.', date: updatesStarted ? item.lastUpdate : '', completed: updatesStarted, current: item.status === 'In Progress' },
    { id: 'team-messages', label: 'Messages from the team', description: 'Questions and updates from your review team stay attached to the case record.', date: messagesStarted ? item.lastUpdate : '', completed: messagesStarted, current: false },
    { id: 'current-status', label: 'Current status', description: finalised ? 'The final case outcome and relevant next steps are recorded here.' : `This case is currently ${item.status.toLowerCase()}.`, date: item.lastUpdate, completed: finalised, current: !finalised },
  ];
};

export const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);

export const formatDate = (value: string) =>
  value ? new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(`${value.slice(0, 10)}T12:00:00`)) : 'Pending';

export const formatDateTime = (value: string) =>
  value ? new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' }).format(new Date(value)) : 'Pending';

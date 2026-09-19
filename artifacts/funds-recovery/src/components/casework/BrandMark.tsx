import { ShieldCheck } from 'lucide-react';

export function BrandMark({ light = false }: { light?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5" data-testid="brand-gov">
      <span className={`grid h-9 w-9 place-items-center rounded-xl ${light ? 'bg-teal-300 text-navy-950' : 'bg-navy-800 text-teal-300'}`}>
        <ShieldCheck size={19} strokeWidth={2.1} />
      </span>
      <span className={`font-display text-[1.1rem] font-extrabold tracking-[-0.03em] ${light ? 'text-white' : 'text-navy-900'}`}>GOV</span>
    </span>
  );
}
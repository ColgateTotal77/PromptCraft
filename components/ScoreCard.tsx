import { cn } from '@/lib/utils';
import { DS } from '@/lib/design-system';

interface ScoreCardProps {
  label: string;
  score: number;
  colorClass?: string;
}

export function ScoreCard({ label, score, colorClass }: ScoreCardProps) {
  return (
    <div
      className={cn(
        DS.card.base,
        DS.utils.center,
        ' flex-col gap-2 p-4 min-w-[100px]'
      )}
    >
      <div className={cn(DS.utils.center, 'relative w-12 h-12')}>
        <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
          <path
            className="text-gray-100"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          />
          <path
            className={cn(
              'text-gray-900 transition-all duration-1000 ease-out',
              colorClass
            )}
            strokeDasharray={`${score}, 100`}
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          />
        </svg>
        <span className={cn(DS.text.h4, 'absolute font-bold')}>{score}</span>
      </div>
      <span className={cn(DS.text.label, 'tracking-wide')}>{label}</span>
    </div>
  );
}

import { cn } from '@/lib/utils';
import { DS } from '@/lib/design-system';
import { Star } from 'lucide-react';

interface FavoriteButtonProps {
  isFavorite: boolean;
}

export default function FavoriteButton({ isFavorite }: FavoriteButtonProps) {
  return (
    <button
      className={cn(
        DS.button.icon,
        'hover:bg-red-50 hover:text-red-600 text-gray-400'
      )}
      aria-label="Add to favorites"
    >
      <Star
        className={cn('w-4 h-4', isFavorite && 'fill-current text-red-500')}
      />
    </button>
  );
}

import { DS } from '@/lib/design-system';
import React from 'react';
import Library from '@/features/library/components/Library';

export default function LibraryPage() {
  return (
    <main className={DS.layout.mainContent}>
      <Library />
    </main>
  );
}

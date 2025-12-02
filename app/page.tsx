import { DS } from '@/lib/design-system';
import { cn } from '@/lib/utils';
import React from 'react';
import Workspace from '@/features/dashboard/components/Workspace';

export default function DashboardPage() {
  return (
    <main className={ DS.layout.mainContent }>
      <header className={ DS.layout.sectionHeader }>
        <div className="flex flex-col gap-2">
          <h1 className={ DS.text.h1 }>Workspace</h1>
          <p className="text-gray-500">Refine your ideas into production-ready prompts.</p>
        </div>
        <button className={ cn(DS.button.base, DS.button.secondary) }>
          Share
        </button>
      </header>
      <Workspace/>
    </main>
  );
}

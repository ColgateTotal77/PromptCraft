import React from 'react';
import { Command } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DS } from '@/lib/design-system';
import { SidebarNav } from '@/features/sidebar/components/SidebarNav';
import { UserBlock } from '@/features/sidebar/components/UserBlock';

export function Sidebar() {
  return (
    <aside className="flex flex-col justify-between w-[250px] h-full border-r border-gray-200 bg-gray-50 shrink-0">
      <div className="flex flex-col gap-8 p-6">
        <div className="flex items-center gap-2">
          <div className={ cn(DS.utils.center, 'w-8 h-8 bg-gray-900 rounded-lg text-white shadow-sm') }>
            <Command size={ 18 }/>
          </div>
          <span className="font-bold text-gray-900 text-lg tracking-tight">PromptCraft</span>
        </div>
        <SidebarNav/>
      </div>
      <UserBlock/>
    </aside>
  );
}

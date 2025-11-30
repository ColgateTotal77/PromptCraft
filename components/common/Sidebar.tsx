'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Layout, Settings, Users, Library, LogOut, Command } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';
import { DS } from '@/lib/design-system';

const navItems = [
  { name: 'Workspace', icon: Layout, href: '/' },
  { name: 'Community', icon: Users, href: '/community' },
  { name: 'Library', icon: Library, href: '/library' },
  { name: 'Settings', icon: Settings, href: '/settings' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex flex-col justify-between w-[250px] h-full border-r border-gray-200 bg-gray-50 shrink-0">
      <div className="flex flex-col gap-8 p-6">
        <div className="flex items-center gap-2">
          <div className={ cn(DS.utils.center, 'w-8 h-8 bg-gray-900 rounded-lg text-white shadow-sm') }>
            <Command size={ 18 }/>
          </div>
          <span className="font-bold text-gray-900 text-lg tracking-tight">PromptCraft</span>
        </div>

        <nav className="space-y-1">
          { navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={ item.name }
                href={ item.href }
                className={ cn(
                  'w-full flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200',
                  isActive
                    ? `bg-white  shadow-sm border border-gray-200 ${DS.text.h4}`
                    : `hover:text-gray-900 hover:bg-gray-100/80 ${DS.text.h4Muted}`
                ) }
              >
                <item.icon size={ 18 }/>
                { item.name }
              </Link>
            );
          }) }
        </nav>
      </div>

      <div className={ cn(DS.card.glass, 'flex flex-col gap-2 p-4') }>
        <div className="flex flex-col gap-4">
          <div className={ cn(DS.text.metaMuted, 'flex justify-between') }>
            <span>Daily Generations</span>
            <span>3 / 20</span>
          </div>
          <Progress value={ 15 }/>
        </div>

        <div className="flex items-center gap-3">
          <div className={ cn(DS.avatar.base, DS.avatar.sm) }>
            {/* <img src="..." alt="Avatar" /> */ }
          </div>
          <div className="flex-1 min-w-0">
            <p className={ cn(DS.text.h4, 'truncate') }>User</p> {/*Todo check what is truncate*/ }
            <p className={ cn(DS.text.metaMuted, 'font-normal truncate') }>Pro Plan</p>
          </div>
          <button className={ cn(DS.button.ghost, 'p-1 h-auto') }>
            <LogOut size={ 16 }/>
          </button>
        </div>
      </div>
    </aside>
  );
}

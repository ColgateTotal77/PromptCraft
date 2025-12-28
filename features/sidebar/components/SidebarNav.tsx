'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { DS } from '@/lib/design-system';
import { Layout, Library, Settings, Users } from 'lucide-react';

const navItems = [
  { name: 'Workspace', icon: Layout, href: '/' },
  { name: 'Community', icon: Users, href: '/community' },
  { name: 'Library', icon: Library, href: '/library' },
  { name: 'Settings', icon: Settings, href: '/settings' },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="space-y-1">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              'w-full flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200',
              isActive
                ? `bg-white shadow-sm border border-gray-200 ${DS.text.h4}`
                : `hover:text-gray-900 hover:bg-gray-100/80 ${DS.text.h4Muted}`
            )}
          >
            <item.icon size={18} />
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}

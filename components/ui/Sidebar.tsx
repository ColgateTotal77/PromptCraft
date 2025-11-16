'use client';

import * as Collapsible from '@radix-ui/react-collapsible';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Sidebar() {
  const pathname = usePathname();

  const items = [
    { label: 'Workbench', href: '/', icon: null },
    { label: 'Community', href: '/community', icon: null },
    { label: 'Library', href: '/library', icon: null },
    { label: 'Settings', href: '/settings', icon: null },
  ];

  return (
    <aside className="w-64 bg-gray-800 h-screen p-4">
      <Collapsible.Root defaultOpen>
        <nav className="flex flex-col gap-2">
          { items.map(item => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={ item.href }
                href={ item.href }
                className={ `
                  px-3 py-2 rounded-md transition
                  ${ active ? 'bg-gray-700' : 'hover:bg-gray-700' }
                ` }
              >
                { item.label }
              </Link>
            );
          }) }
        </nav>
      </Collapsible.Root>
    </aside>
  );
}

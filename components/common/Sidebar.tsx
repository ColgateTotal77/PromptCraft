"use client";

import React from "react";
import {
  Layout,
  Settings,
  Users,
  Library,
  LogOut,
  Command
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Workspace", icon: Layout, href: "/" },
  { name: "Community", icon: Users, href: "/community" },
  { name: "Library", icon: Library, href: "/library" },
  { name: "Settings", icon: Settings, href: "/settings" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-[250px] border-r border-gray-200 bg-gray-50 flex flex-col justify-between z-30 hidden md:flex">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center text-white shadow-sm">
            <Command size={18} />
          </div>
          <span className="font-bold text-gray-900 text-lg tracking-tight">PromptCraft</span>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200",
                  isActive
                    ? "bg-white text-gray-900 shadow-sm border border-gray-200"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-100/80"
                )}
              >
                <item.icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-6 border-t border-gray-200 bg-white/50 backdrop-blur-sm">
        <div className="mb-4">
          <div className="flex justify-between text-xs font-medium text-gray-500 mb-2">
            <span>Daily Generations</span>
            <span>3 / 20</span>
          </div>
          <Progress value={15} />
        </div>

        <div className="flex items-center gap-3 pt-2">
          <div className="w-8 h-8 rounded-full bg-gray-200 border border-gray-300 overflow-hidden">
            {/* Placeholder for avatar */}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">Alex Developer</p>
            <p className="text-xs text-gray-500 truncate">Pro Plan</p>
          </div>
          <button className="text-gray-400 hover:text-gray-600 transition-colors">
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}

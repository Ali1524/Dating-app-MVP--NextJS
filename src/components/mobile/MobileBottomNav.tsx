'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, Plus, Heart, User } from 'lucide-react';

interface MobileBottomNavProps {
  onUploadClick: () => void;
}

const navItems = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/explore', icon: Search, label: 'Explore' },
  { href: null, icon: Plus, label: 'Upload', isSpecial: true },
  { href: '/challenges', icon: Heart, label: 'Challenges' },
  { href: '/profile', icon: User, label: 'Profile' },
] as const;

export default function MobileBottomNav({ onUploadClick }: MobileBottomNavProps) {
  const pathname = usePathname();
  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <nav className="fixed bottom-0 left-1/2 z-50 w-full max-w-[430px] -translate-x-1/2 border-t border-gray-200 bg-white">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon;

          if ('isSpecial' in item) {
            return (
              <button
                key={item.label}
                onClick={onUploadClick}
                aria-label="Upload photo"
                className="-mt-6 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 p-3.5 text-white shadow-lg ring-4 ring-white"
              >
                <Icon className="h-6 w-6" />
              </button>
            );
          }

          const active = isActive(item.href);
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center px-3 py-2 transition-colors ${
                active ? 'text-purple-600' : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              <Icon className={`h-6 w-6 ${active ? 'fill-current' : ''}`} />
              <span className="mt-1 text-xs">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

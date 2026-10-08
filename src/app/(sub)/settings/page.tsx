'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search, Bookmark, Archive, Activity, Bell, Clock, TrendingUp, BadgeCheck, CalendarClock, SlidersHorizontal,
  Lock, Star, Repeat, Ban, Trophy, Sparkles, MapPin, Send, Tag, MessageCircle, UserPlus, HelpCircle,
  ShieldCheck, UserCircle, Info, PlusCircle, LogOut,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import SubHeader from '@/components/shared/SubHeader';
import { useAuth } from '@/contexts/AuthContext';

interface Item { label: string; icon: LucideIcon; href?: string; danger?: boolean; action?: 'logout' }
interface Section { title?: string; items: Item[] }

const sections: Section[] = [
  { items: [
    { label: 'Saved', icon: Bookmark, href: '/profile' },
    { label: 'Archive', icon: Archive },
    { label: 'Your Activity', icon: Activity, href: '/dashboard' },
    { label: 'Notifications', icon: Bell },
    { label: 'Time Management', icon: Clock },
  ]},
  { title: 'For Professionals', items: [
    { label: 'Insights', icon: TrendingUp, href: '/dashboard' },
    { label: 'Verified', icon: BadgeCheck },
    { label: 'Scheduled Contents', icon: CalendarClock },
    { label: 'Creator tools and controls', icon: SlidersHorizontal },
  ]},
  { title: 'Who can see your content', items: [
    { label: 'Account Privacy', icon: Lock },
    { label: 'Close Friends', icon: Star },
    { label: 'Crossposting', icon: Repeat },
    { label: 'Blocked', icon: Ban },
    { label: 'Challenges', icon: Trophy, href: '/challenges' },
    { label: 'Earned Points', icon: Sparkles, href: '/dashboard' },
    { label: 'Story and locations', icon: MapPin },
  ]},
  { items: [
    { label: 'Messages', icon: Send },
    { label: 'Tags and mentions', icon: Tag },
    { label: 'Comments', icon: MessageCircle },
    { label: 'Follow and invites', icon: UserPlus },
  ]},
  { items: [
    { label: 'Help', icon: HelpCircle },
    { label: 'Privacy Center', icon: ShieldCheck },
    { label: 'Account status', icon: UserCircle },
    { label: 'About', icon: Info },
  ]},
  { title: 'Login', items: [
    { label: 'Add account', icon: PlusCircle },
    { label: 'Log out', icon: LogOut, danger: true, action: 'logout' },
  ]},
];

export default function SettingsPage() {
  const router = useRouter();
  const { signOut } = useAuth();
  const [query, setQuery] = useState('');

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sections;
    return sections
      .map((s) => ({ ...s, items: s.items.filter((i) => i.label.toLowerCase().includes(q)) }))
      .filter((s) => s.items.length);
  }, [query]);

  const onClick = async (item: Item) => {
    if (item.action === 'logout') {
      await signOut();
      router.replace('/login');
    } else if (item.href) router.push(item.href);
    else toast(`${item.label} coming soon`);
  };

  return (
    <div className="bg-white pb-10">
      <SubHeader title="Settings" />

      <div className="px-5 py-3">
        <div className="flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-gray-500"
          />
          <Search className="h-[18px] w-[18px] text-gray-500" />
        </div>
      </div>

      {visible.length === 0 && <p className="px-5 py-8 text-center text-sm text-gray-500">No settings found.</p>}

      {visible.map((section, i) => (
        <div key={i} className={i > 0 ? 'border-t-[3px] border-gray-100 pt-4' : ''}>
          {section.title && <p className="px-5 pb-2 text-sm font-semibold text-gray-500">{section.title}</p>}
          {section.items.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                onClick={() => onClick(item)}
                className={`flex w-full items-center gap-3 px-5 py-3 text-left text-base active:bg-gray-50 ${
                  item.danger ? 'text-red-600' : 'text-gray-900'
                }`}
              >
                <Icon className="h-[18px] w-[18px]" />
                {item.label}
              </button>
            );
          })}
          <div className="h-3" />
        </div>
      ))}
    </div>
  );
}

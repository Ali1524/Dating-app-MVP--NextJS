'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

interface SubHeaderProps {
  title?: string;
  right?: React.ReactNode;
  onBack?: () => void;
}

/** Back-arrow header used on full-screen (non-tab) screens, as in the Figma designs. */
export default function SubHeader({ title, right, onBack }: SubHeaderProps) {
  const router = useRouter();
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between border-b border-gray-200 bg-white px-5 py-4">
      <div className="flex items-center gap-4">
        <button
          onClick={onBack ?? (() => router.back())}
          aria-label="Go back"
          className="-ml-1 rounded-full p-1 text-gray-900 hover:bg-gray-100"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        {title && <h1 className="text-xl font-bold text-gray-900">{title}</h1>}
      </div>
      {right}
    </header>
  );
}

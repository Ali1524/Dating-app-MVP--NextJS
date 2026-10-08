import type { Metadata, Viewport } from 'next';
import './globals.css';
import Providers from '@/components/shared/Providers';

export const metadata: Metadata = {
  title: 'SnapEarn Photo Sharing Platform',
  description: 'Share photos, join challenges and earn.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#9333ea',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {/* Phone-width column; centered with a shadow on larger screens */}
          <div className="relative mx-auto min-h-screen w-full max-w-[430px] bg-gray-50 shadow-2xl">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}

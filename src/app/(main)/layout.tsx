'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthGate from '@/components/shared/AuthGate';
import MobileHeader from '@/components/mobile/MobileHeader';
import MobileBottomNav from '@/components/mobile/MobileBottomNav';
import UploadModal from '@/components/mobile/UploadModal';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [showUpload, setShowUpload] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <AuthGate>
      <MobileHeader onUploadClick={() => setShowUpload(true)} onSearchClick={() => router.push('/explore')} />
      <main key={refreshKey} className="min-h-screen">{children}</main>
      <MobileBottomNav onUploadClick={() => setShowUpload(true)} />
      <UploadModal
        isOpen={showUpload}
        onClose={() => setShowUpload(false)}
        onUploadSuccess={() => {
          setRefreshKey((k) => k + 1);
          router.push('/');
        }}
      />
    </AuthGate>
  );
}

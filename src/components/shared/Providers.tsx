'use client';

import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/contexts/AuthContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {children}
      <Toaster
        position="top-center"
        toastOptions={{ duration: 3000, style: { background: '#363636', color: '#fff' } }}
      />
    </AuthProvider>
  );
}

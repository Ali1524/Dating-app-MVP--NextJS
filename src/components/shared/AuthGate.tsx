'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export function Spinner() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600">
      <div className="rounded-2xl bg-white p-8 shadow-2xl">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-purple-600" />
        <p className="mt-4 text-center text-gray-600">Loading...</p>
      </div>
    </div>
  );
}

/** Wrap protected screens. Redirects to /login when there is no session. */
export default function AuthGate({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.replace('/login');
  }, [loading, user, router]);

  if (loading || !user) return <Spinner />;
  return <>{children}</>;
}

/** Wrap /login and /signup. Sends signed-in users to the feed. */
export function GuestOnly({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) router.replace('/');
  }, [loading, user, router]);

  if (loading || user) return <Spinner />;
  return <>{children}</>;
}

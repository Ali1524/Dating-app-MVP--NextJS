import AuthGate from '@/components/shared/AuthGate';

export default function SubLayout({ children }: { children: React.ReactNode }) {
  return <AuthGate>{children}</AuthGate>;
}

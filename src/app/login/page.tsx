import LoginForm from '@/components/auth/LoginForm';
import { GuestOnly } from '@/components/shared/AuthGate';

export default function LoginPage() {
  return (
    <GuestOnly>
      <LoginForm />
    </GuestOnly>
  );
}

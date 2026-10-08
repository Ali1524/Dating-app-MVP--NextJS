import SignupForm from '@/components/auth/SignupForm';
import { GuestOnly } from '@/components/shared/AuthGate';

export default function SignupPage() {
  return (
    <GuestOnly>
      <SignupForm />
    </GuestOnly>
  );
}

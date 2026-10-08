'use client';

import { Suspense } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { Check } from 'lucide-react';
import GradientButton from '@/components/shared/GradientButton';
import { getChallenge } from '@/data/challenges';
import { ENTRY_FEE, methodLabel } from '@/data/payments';

function Success() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const params = useSearchParams();
  const challenge = getChallenge(id);

  const rows = [
    ['Challenge', challenge.title],
    ['Payment method', methodLabel(params.get('method'))],
    ['Transaction ID', params.get('txn') ?? '—'],
    ['Date', new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })],
  ];

  return (
    <div className="flex min-h-screen flex-col bg-white px-6 pb-10 pt-16">
      <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-green-100">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-500 shadow-lg">
          <Check className="h-10 w-10 text-white" strokeWidth={3} />
        </div>
      </div>

      <h1 className="mt-6 text-center text-2xl font-bold text-gray-900">Payment Successful</h1>
      <p className="mt-1 text-center text-gray-600">Successfully paid <span className="font-semibold text-gray-900">{ENTRY_FEE}PKR</span></p>

      <div className="mt-8 rounded-2xl border border-gray-100 bg-gray-50 p-5">
        <h2 className="mb-3 font-semibold text-gray-900">Payment Details</h2>
        <dl className="space-y-3 text-sm">
          {rows.map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4">
              <dt className="text-gray-500">{k}</dt>
              <dd className="text-right font-medium text-gray-900">{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-auto space-y-3 pt-10">
        <GradientButton onClick={() => router.replace('/')}>Back Home</GradientButton>
        <button onClick={() => router.replace('/challenges')} className="w-full py-2 font-medium text-purple-600">View challenges</button>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense>
      <Success />
    </Suspense>
  );
}

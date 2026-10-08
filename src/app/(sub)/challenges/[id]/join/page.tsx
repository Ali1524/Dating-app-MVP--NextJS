'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Users, Clock, Trophy, Check } from 'lucide-react';
import SubHeader from '@/components/shared/SubHeader';
import GradientButton from '@/components/shared/GradientButton';
import { getChallenge } from '@/data/challenges';
import { ENTRY_FEE, paymentMethods, PaymentMethodId } from '@/data/payments';

export default function JoinChallengePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const challenge = getChallenge(id);
  const [method, setMethod] = useState<PaymentMethodId>('easypaisa');

  return (
    <div className="pb-10">
      <SubHeader title="Payment Method" />

      {/* Challenge summary */}
      <div className="m-5 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <img src={challenge.image} alt={challenge.title} className="h-36 w-full object-cover" />
        <div className="p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-gray-900">{challenge.title}</h2>
              <p className="text-sm text-gray-600">{challenge.description}</p>
            </div>
            <span className="whitespace-nowrap rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold capitalize text-purple-700">{challenge.type}</span>
          </div>
          <div className="mt-3 flex items-center gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-1"><Users className="h-4 w-4" />{challenge.participants}</span>
            <span className="flex items-center gap-1"><Trophy className="h-4 w-4" />PKR {challenge.prize.toLocaleString()}</span>
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{new Date(challenge.endDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>
          </div>
        </div>
      </div>

      <div className="px-5">
        <div className="mb-5 flex items-center justify-between rounded-xl bg-purple-50 px-4 py-3">
          <span className="font-semibold text-gray-900">Join Challenge</span>
          <span className="font-bold text-purple-700">{ENTRY_FEE}PKR</span>
        </div>

        <h3 className="mb-3 text-base font-semibold text-gray-900">Select payment method</h3>
        <div className="space-y-3">
          {paymentMethods.map((m) => {
            const selected = method === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setMethod(m.id)}
                className={`flex w-full items-center gap-3 rounded-xl border-2 bg-white px-4 py-3 text-left transition-colors ${
                  selected ? 'border-purple-600' : 'border-gray-200'
                }`}
              >
                <span className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white ${m.color}`}>{m.label[0]}</span>
                <span className="flex-1 font-medium text-gray-900">{m.label}</span>
                <span className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${selected ? 'border-purple-600 bg-purple-600' : 'border-gray-300'}`}>
                  {selected && <Check className="h-3 w-3 text-white" />}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-8">
          <GradientButton onClick={() => router.push(`/challenges/${challenge.id}/payment?method=${method}`)}>
            Place Challenge
          </GradientButton>
        </div>
      </div>
    </div>
  );
}

'use client';

import { Suspense, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import SubHeader from '@/components/shared/SubHeader';
import GradientButton from '@/components/shared/GradientButton';
import { ENTRY_FEE, methodLabel, paymentMethods } from '@/data/payments';

const formatCard = (v: string) => v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
const formatExpiry = (v: string) => {
  const d = v.replace(/\D/g, '').slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
};

function PaymentForm() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const method = useSearchParams().get('method');

  const [holder, setHolder] = useState('');
  const [number, setNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [paying, setPaying] = useState(false);

  const pay = async () => {
    if (!holder.trim()) return toast.error("Enter the cardholder's name");
    if (number.replace(/\s/g, '').length < 16) return toast.error('Enter a valid 16-digit card number');
    if (expiry.length < 5) return toast.error('Enter the expiry date (MM/YY)');
    if (cvv.length < 3) return toast.error('Enter a valid CVV');
    setPaying(true);
    await new Promise((r) => setTimeout(r, 1200)); // mock payment
    const txn = `SE${Date.now().toString().slice(-9)}`;
    router.replace(`/challenges/${id}/success?method=${method ?? 'card'}&txn=${txn}`);
  };

  const input = 'w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-purple-500';

  return (
    <div className="pb-10">
      <SubHeader title="Join Challenge" />

      {/* Provider chips */}
      <div className="flex items-center gap-3 px-5 pt-5">
        {paymentMethods.map((m) => (
          <button
            key={m.id}
            onClick={() => router.replace(`/challenges/${id}/payment?method=${m.id}`)}
            className={`flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold text-white ${m.color} ${
              m.id === method ? 'ring-4 ring-purple-200' : 'opacity-60'
            }`}
            aria-label={m.label}
          >
            {m.label[0]}
          </button>
        ))}
      </div>
      <h2 className="px-5 pb-4 pt-4 text-xl font-bold text-gray-900">{methodLabel(method)}</h2>

      {/* Live card preview */}
      <div className="mx-5 rounded-2xl bg-gradient-to-br from-purple-600 via-fuchsia-600 to-pink-600 p-5 text-white shadow-lg">
        <div className="flex items-center justify-between text-sm opacity-90">
          <span>Card</span>
          <span className="font-semibold">SnapEarn</span>
        </div>
        <div className="mt-5 h-8 w-11 rounded-md bg-yellow-300/80" />
        <p className="mt-5 font-mono text-xl tracking-widest">{number || '1234 5678 9088 1234'}</p>
        <div className="mt-5 flex items-end justify-between text-xs">
          <div>
            <p className="opacity-70">CARD HOLDER</p>
            <p className="text-sm font-semibold uppercase">{holder || 'John Doe'}</p>
          </div>
          <div className="text-right">
            <p className="opacity-70">VALID THRU</p>
            <p className="text-sm font-semibold">{expiry || '06/30'}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4 px-5 pt-6">
        <label className="block">
          <span className="mb-1 block text-sm text-gray-600">Cardholder&apos;s Name</span>
          <input className={input} value={holder} onChange={(e) => setHolder(e.target.value)} placeholder="John Doe" autoComplete="cc-name" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm text-gray-600">Card Number</span>
          <input className={input} inputMode="numeric" value={number} onChange={(e) => setNumber(formatCard(e.target.value))} placeholder="1234 5678 9088 1234" autoComplete="cc-number" />
        </label>
        <div className="grid grid-cols-2 gap-4">
          <label className="block">
            <span className="mb-1 block text-sm text-gray-600">Expiry</span>
            <input className={input} inputMode="numeric" value={expiry} onChange={(e) => setExpiry(formatExpiry(e.target.value))} placeholder="MM/YY" autoComplete="cc-exp" />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm text-gray-600">CVV</span>
            <input className={input} inputMode="numeric" type="password" value={cvv} onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))} placeholder="•••" autoComplete="cc-csc" />
          </label>
        </div>

        <GradientButton onClick={pay} loading={paying} className="mt-2">
          Pay {ENTRY_FEE}PKR
        </GradientButton>
        <p className="text-center text-xs text-gray-500">Demo only. No real payment is made.</p>
      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense>
      <PaymentForm />
    </Suspense>
  );
}

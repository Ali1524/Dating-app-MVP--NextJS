export const ENTRY_FEE = 500;

export const paymentMethods = [
  { id: 'jazzcash', label: 'JazzCash', color: 'bg-red-600' },
  { id: 'easypaisa', label: 'Easypaisa', color: 'bg-green-600' },
  { id: 'card', label: 'Debit / Credit Card', color: 'bg-indigo-600' },
] as const;

export type PaymentMethodId = (typeof paymentMethods)[number]['id'];

export const methodLabel = (id: string | null) => paymentMethods.find((m) => m.id === id)?.label ?? 'Card';

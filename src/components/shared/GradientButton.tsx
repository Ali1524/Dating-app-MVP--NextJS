import React from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean };

export default function GradientButton({ className = '', loading, children, disabled, ...rest }: Props) {
  return (
    <button
      {...rest}
      disabled={disabled || loading}
      className={`w-full rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 py-3.5 text-lg font-semibold text-white shadow-md transition-all hover:shadow-lg active:scale-[0.99] disabled:opacity-60 ${className}`}
    >
      {loading ? 'Please wait…' : children}
    </button>
  );
}

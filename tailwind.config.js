/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: { purple: '#9333ea', pink: '#db2777', indigo: '#5b32e8' },
      },
      animation: {
        'bounce-subtle': 'bounce 1s infinite',
        'pulse-slow': 'pulse 2s infinite',
      },
    },
  },
  plugins: [],
};

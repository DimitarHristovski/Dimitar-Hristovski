/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'dark-cosmic': '#0F1A2E',
        'deep-purple': '#3D1B6F',
        'hero-blue': '#2E66F6',
        'fiery-orange': '#FF5A2D',
        'energy-red': '#FF2E2E',
        'gold-accent': '#F7B500',
        'metal-grey': '#8B8B8B',
        'cold-steel': '#4A5568',
      },
    },
  },
  plugins: [],
};

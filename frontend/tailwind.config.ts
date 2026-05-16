import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        card: '0 20px 60px rgba(15, 23, 42, 0.08)',
      },
      colors: {
        brand: {
          light: '#0ea5e9',
          dark: '#38bdf8',
        },
      },
    },
  },
  plugins: [],
};

export default config;

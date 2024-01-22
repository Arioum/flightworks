import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      mc: { min: '500px' },
      sm: { min: '639px' },
      md: { min: '767px' },
      lg: { min: '1023px' },
      xl: { min: '1279px' },
    },
  },
  plugins: [],
} satisfies Config;

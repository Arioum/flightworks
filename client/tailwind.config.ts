import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      mc: { max: '450px' },
      sm: { max: '539px' },
      md: { max: '767px' },
      lg: { max: '1023px' },
      xl: { max: '1279px' },
    },
  },
  plugins: [],
} satisfies Config;

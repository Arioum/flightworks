import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      'mc': {'max' : '500px'},
      'sm': {'max': '639px'},
      'md': {'max': '767px'},
      'lg': {'max': '1023px'},
      'xl': {'max': '1279px'},
    },
  },
  plugins: [],
} satisfies Config;

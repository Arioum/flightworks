import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    // Desktop-first (max-width) breakpoints. Tailwind emits them in this
    // order, so list them largest first: then a smaller breakpoint's rule
    // comes later in the CSS and wins, e.g. `lg:grid-cols-2 md:grid-cols-1`
    // gives one column on phones.
    screens: {
      xl: { max: '1279px' },
      lg: { max: '1023px' },
      md: { max: '767px' },
      sm: { max: '539px' },
      mc: { max: '450px' },
    },
  },
  plugins: [],
} satisfies Config;

import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './shared/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      display: ['Roboto', 'sans-serif'],
    },
    screens: {
      xs: { max: '320px' },

      sm: { max: '576px' },
      // => @media (min-width: 640px) { ... }

      md: { max: '768px' },
      // => @media (min-width: 768px) { ... }

      lg: { max: '1024px' },
      // => @media (min-width: 1024px) { ... }

      xl: { max: '1280px' },
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    colors: {
      'admin-bg': '#1E1E30',
      'admin-main': '#38394E',
      'admin-secondary': 'rgb(39, 40, 60)',
      'admin-btn': '#C035A2',
      'admin-input': '#5A5B70',
      'admin-text': '#C7C7C7',
    },
  },
  plugins: [],
}
export default config

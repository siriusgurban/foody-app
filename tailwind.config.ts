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
      xs: { max: '319px' },

      sm: { max: '576px' },
      // => @media (min-width: 640px) { ... }

      md: { max: '768px' },
      // => @media (min-width: 768px) { ... }

      lg: { max: '1024px' },
      // => @media (min-width: 1024px) { ... }

      xl: { max: '1280px' },
      // => @media (min-width: 1280px) { ... }
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    colors: {
      'admin-bg': 'rgb(30, 30, 48)',
      'admin-main': 'rgb(56, 57, 78)',
      'admin-secondary': 'rgb(39, 40, 60)',
      'admin-btn': 'rgb(192, 53, 162)',
      'admin-input': 'rgb(90, 91, 112)',
      
      'admin-secondary-heading': 'rgba(242, 242, 242, 0.87)',
      'admin-secondary-select': 'rgb(242, 242, 242);',
      'admin-secondary-add': 'rgb(255, 255, 255)',
      'admin-add-button-bg':'rgb(192, 53, 162)',
      'admin-delete-icon':' rgb(235, 87, 87)',
      'admin-edit-icon':' rgb(0, 178, 169);',
      'admin-restaurant-card-category':'rgb(130, 130, 130);',
    },
  },
  plugins: [],
}
export default config

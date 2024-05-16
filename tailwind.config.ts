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
      xs: '319px',

      sm: '576px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1440px',
      // => @media (min-width: 1280px) { ... }
    },

    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'admin-bg': '#1E1E30',
        'admin-main': '#38394E',
        'admin-secondary': '#27283C',
        'admin-btn': '#C035A2',
        'admin-btnhover': '#CD61ED',
        'admin-aside': '#C74FEB',
        'admin-input': '#5A5B70',
        'admin-text': '#C7C7C7',
        'admin-secondary-heading': 'rgba(242, 242, 242, 0.87)',
        'admin-secondary-select': 'rgb(242, 242, 242);',
        'admin-secondary-add': 'rgb(255, 255, 255)',
        'admin-add-button-bg': 'rgb(192, 53, 162)',
        'admin-delete-icon': ' rgb(235, 87, 87)',
        'admin-edit-icon': ' rgb(0, 178, 169);',
        'admin-restaurant-card-category': 'rgb(130, 130, 130);',
        'admin-modal-placeholder': 'rgb(242, 242, 242)',
        'admin-modal-upload-icon': ' rgb(236, 92, 248);',
        'admin-modal-frame-bg': 'rgb(67, 68, 90)',
        'admin-white': 'rgb(255, 255, 255)',
        'admin-modal-purple-btn': 'rgb(192, 53, 162)',
        'admin-cancel-btn': 'rgb(67, 68, 90)',
        'admin-modal-scrollbar': 'rgb(239, 93, 168)',
      },
    },
    plugins: [],
  },
}
export default config

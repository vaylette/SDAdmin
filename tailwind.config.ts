import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-helvetica-now-display)']
      },
      backgroundImage: {
        'auth': "url('/images/background/auth.jpg')",
        'header': "url('/images/background/header.jpg')",
        'overview': "url('/images/background/overview_card.png')",
      },
      dropShadow: {
        'auth' : '0px 40px 50px rgba(0, 0, 0, 0.15)',
      },
      boxShadow: {
        'drop': '0px 0px 1px 0px rgba(0, 0, 0, 0.04), 0px 0px 2px 0px rgba(0, 0, 0, 0.06), 0px 4px 8px 0px rgba(0, 0, 0, 0.04)'
      }
    },
    colors: {
      transparent: 'transparent',
      'black': {
        default: '#000000',
        100: '#222222CC',
        200: '#2222221A',
        300: '#22222266',
        400: '#22222299',
        500: '#22222214',
        600: '#D9D9D980',
      },
      'white': {
        default: '#FFFFFF',
        100: '#F4F4F4',
        200: '#FFFFFFCC',
        300: '#F7F7F7'
      },
      'orange': {
        default: '#FF9D0D',
        100: '#FF9D0D26',
        200: '#FF9D0D80',
        300: '#FFCE86'
      },
      'red': {
        default: '#FF0000'
      }
    }
  },
  plugins: [],
}
export default config

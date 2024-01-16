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
      },
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
        600: '#D9D9D980'
      },
      'white': {
        default: '#FFFFFF',
        100: '#F4F4F4',
        200: '#FFFFFFCC'
      },
      'orange': {
        default: '#FF9D0D',
        100: '#FF9D0D26',
        200: '#FF9D0D80',
        300: '#FFCE86',
      },
      'red': {
        default: '#FF0000'
      }
    }
  },
  plugins: [],
}
export default config

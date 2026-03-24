import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00B3FF',
          50: '#E6F7FF',
          100: '#B3E8FF',
          200: '#80D9FF',
          300: '#4DC9FF',
          400: '#1ABAFF',
          500: '#00B3FF',
          600: '#0090CC',
          700: '#006D99',
          800: '#004A66',
          900: '#002733',
        },
        dark: {
          DEFAULT: '#0F0F14',
          50: '#2A2A35',
          100: '#24242E',
          200: '#1E1E27',
          300: '#181820',
          400: '#121219',
          500: '#0F0F14',
          600: '#0C0C10',
          700: '#09090C',
          800: '#060608',
          900: '#030304',
        },
        gold: {
          DEFAULT: '#FFD700',
          50: '#FFF8E0',
          100: '#FFEFB3',
          200: '#FFE680',
          300: '#FFDD4D',
          400: '#FFD41A',
          500: '#FFD700',
          600: '#C9A23A',
          700: '#A68500',
          800: '#735C00',
          900: '#403300',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Montserrat', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'shimmer': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      boxShadow: {
        'glow-blue': '0 0 20px rgba(0, 179, 255, 0.3)',
        'glow-blue-lg': '0 0 40px rgba(0, 179, 255, 0.4)',
        'glow-gold': '0 0 20px rgba(255, 215, 0, 0.3)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.36)',
      },
    },
  },
  plugins: [],
};

export default config;

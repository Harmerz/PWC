/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        neutral: {
          0: 'FFFFFF',
          50: '#F6F6F6',
          100: '#EEEEEE',
          300: '#BBBFC8',
          500: '#7F838E',
          700: '#4F525B',
          900: '#242730',
          1000: '#0E111A',
        },
        eneutral: {
          100: '#181C25',
          200: '#1E222A',
          300: '#2F323B',
          400: '#20232C',
        },
        bluex: {
          100: '#DAE6FD',
          200: '#B6CDFC',
          400: '#6D9AF9',
          500: '#4881F7',
          800: '#1D3870',
          900: '#0F2043',
          1000: '#010816',
        },
        bluey: {
          400: '#5885F0',
          500: '#2E67EC',
          600: '#2552BD',
          900: '#09152F',
          950: '#050A18',
        },
        bluez: {
          500: '#163BB8',
          600: '#122F93',
          700: '#0D236E',
          850: '#071237',
        },
        error: { 500: '#FF4D4F' },
        credit: {
          100: '#469D52',
          200: '#8DC34D',
          300: '#F9D74A',
          400: '#F09436',
          500: '#EB532D',
          600: '#BE2E2C',
        },
      },
      fontFamily: {
        dmsans: ['DM Sans'],
        inter: ['Inter'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  // eslint-disable-next-line global-require
  plugins: [require('tailwind-scrollbar-hide')],
}

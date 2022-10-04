const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
      screens: {
        '2xs': '360px',
        'xs': '480px',
      },
    },
  },
  daisyui: {
    themes: [
      {
        light: {
          'primary': '#3B82F6',
          'primary-focus': '#2563EB',
          'primary-content': '#EFF6FF',
          'secondary': '#8B5CF6',
          'secondary-focus': '#7C3AED',
          'secondary-content': '#F5F3FF',
          'accent': '#F59E0B',
          'accent-focus': '#D97706',
          'accent-content': '#FFFBEB',
          'neutral': '#1F2937',
          'neutral-focus': '#111827',
          'neutral-content': '#F3F4F6',
          'base-100': '#FFFFFF',
          'base-200': '#F1F5F9',
          'base-300': '#E2E8F0',
          'base-content': '#171717',
          'info': '#BFDBFE',
          'info-content': '#1E3A8A',
          'success': '#BBF7D0',
          'success-content': '#14532D',
          'warning': '#FEF08A',
          'warning-content': '#713F12',
          'error': '#FECACA',
          'error-content': '#7D1D1D',
        },
      },
      {
        dark: {
          'primary': '#2563EB',
          'primary-focus': '#1D4ED8',
          'primary-content': '#DBEAFE',
          'secondary': '#7C3AED',
          'secondary-focus': '#6D28D9',
          'secondary-content': '#EDE9FE',
          'accent': '#D97706',
          'accent-focus': '#B45309',
          'accent-content': '#FEF3C7',
          'neutral': '#1F2937',
          'neutral-focus': '#111827',
          'neutral-content': '#F3F4F6',
          'base-100': '#0C1323',
          'base-200': '#090D18',
          'base-300': '#05070D',
          'base-content': '#F5F5F5',
          'info': '#1E3A8A',
          'info-content': '#BFDBFE',
          'success': '#14532D',
          'success-content': '#BBF7D0',
          'warning': '#713F12',
          'warning-content': '#FEF08A',
          'error': '#7D1D1D',
          'error-content': '#FECACA',
        },
      },
    ],
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
}

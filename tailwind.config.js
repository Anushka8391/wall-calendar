/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out forwards',
        'slide-up': 'slideUp 0.25s ease-out forwards',
        'scale-in': 'scaleIn 0.15s ease-out forwards',
        'dot-pop': 'dotPop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
            '0%': { opacity: '0', transform: 'scale(0.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        dotPop: {
          '0%': { transform: 'translate(-50%, 0) scale(0)' },
          '100%': { transform: 'translate(-50%, 0) scale(1)' },
        },
      },
      boxShadow: {
        calendar:
          '0 30px 80px rgba(0,0,0,0.2)',
        'day-selected': '0 4px 12px rgba(37, 99, 235, 0.35)',
      },
    },
  },
  plugins: [],
};
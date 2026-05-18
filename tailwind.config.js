/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#224d92',
          hover: '#1b3f78',
          light: '#e8eef8',
        },
        gold: {
          DEFAULT: '#d4af37',
          light: '#f5e9a3',
        },
        surface: '#ffffff',
        background: '#f8fafc',
        border: '#e2e8f0',
        'text-primary': '#1e293b',
        'text-secondary': '#64748b',
        success: '#16a34a',
        danger: '#dc2626',
        warning: '#d97706',
      },
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
      },
      borderRadius: {
        xl: '12px',
        '2xl': '16px',
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)',
        'card-hover': '0 4px 12px rgba(34,77,146,0.12), 0 8px 24px rgba(0,0,0,0.06)',
        modal: '0 24px 64px rgba(0,0,0,0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          from: { opacity: '0', transform: 'translateX(-16px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}

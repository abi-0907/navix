/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        michroma: ['Michroma', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        nunito: ['Nunito', 'sans-serif'],
        pressstart: ['"Press Start 2P"', 'cursive'], // Arcade-style font
        luckiest: ['"Luckiest Guy"', 'cursive'],     // Cartoon-style font
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-10px)' },
          '50%': { transform: 'translateX(10px)' },
          '75%': { transform: 'translateX(-5px)' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        fadeInUp: {
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        float: {
          '0%': {
            transform: 'translate(-50%, -50%) scale(1)',
          },
          '100%': {
            transform: 'translate(-60%, -55%) scale(1.15)',
          },
        },
      },
      animation: {
        shake: 'shake 0.4s ease',
        'gradient-x': 'gradient-x 12s ease infinite',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'floating-bubbles': 'float 12s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [],
};

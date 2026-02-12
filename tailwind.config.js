/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        romantic: {
          'pink-light': '#F8E1E7',
          'pink': '#F5C6D6',
          'pink-rose': '#E8A0B5',
          'red': '#B91C3C',
          'red-deep': '#9F1239',
          'red-dark': '#7F1D1D',
          'white': '#FFFBFF',
          'white-soft': '#FFF5F5',
        },
      },
      fontFamily: {
        script: ['Dancing Script', 'cursive'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'petal-fall': {
          '0%': { transform: 'translateY(-10vh) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(110vh) rotate(720deg)', opacity: '0.6' },
        },
      },
      animation: {
        'petal-fall': 'petal-fall 12s linear infinite',
      },
    },
  },
  plugins: [],
}

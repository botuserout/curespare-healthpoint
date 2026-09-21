/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0B4336',
          deep: '#07382D',
          sage: '#A8C99D',
          softSage: '#DCE9D9',
          warmWhite: '#F7F8F4',
          textPrimary: '#111714',
          textSecondary: '#5D6661',
          border: '#DDE3DE',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      maxWidth: {
        'content': '1320px',
      },
      boxShadow: {
        'editorial': '0 20px 40px -15px rgba(11, 67, 54, 0.07)',
        'card-hover': '0 25px 50px -12px rgba(7, 56, 45, 0.12)',
      }
    },
  },
  plugins: [],
}

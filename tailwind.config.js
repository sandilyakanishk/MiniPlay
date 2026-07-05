/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        coral: '#FF6B9D',
        sky: '#5DC1F0',
        lime: '#8BE87E',
        sunny: '#FFD93D',
        lavender: '#B48DE0',
        navy: '#1F2937',
      },
      borderRadius: {
        '2xl': '1rem',
      },
    },
  },
  plugins: [],
}

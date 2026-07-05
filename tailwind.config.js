/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        coral: '#d97887',
        sky: '#5caeca',
        lime: '#83c98b',
        sunny: '#f0d48a',
        lavender: '#9d88c9',
        navy: '#1F2937',
      },
      borderRadius: {
        '2xl': '1rem',
      },
    },
  },
  plugins: [],
}

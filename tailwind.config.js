/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['.src/**/*.{scss,css,tsx}'],
  theme: {
    extend: {
      screens: {
        'xl': '1176px',
      }
    },
  },
  plugins: [],
}

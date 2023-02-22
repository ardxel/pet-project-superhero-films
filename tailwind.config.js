/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['.src/**/**/*.{scss,css,tsx}'],
  theme: {
    extend: {
      screens: {
        sm: '500px',
        md: '618px',
        nl: '736px',
        lg: '900px',
        xl: '1176px',
      },
      colors: {
        color1: 'var(--color1)',
        color39: 'var(--color39)',
        color97: 'var(--color97)',
      },
    },
  },
  plugins: [],
};

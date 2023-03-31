/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['.src/**/**/*.{scss,css,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: '428px',
        sm: '500px',
        md: '618px',
        nl: '736px',
        ag: '828px',
        lg: '900px',
        xl: '1176px',
        xl2: '1280px',
        mag: { max: '828px' },
      },
      colors: {
        color1: 'var(--color1)',
        color3: 'var(--color3)',
        color5: 'var(--color5)',
        color7: 'var(--color7)',
        color9: 'var(--color9)',
        color13: 'var(--color13)',
        color17: 'var(--color17)',
        color19: 'var(--color19)',
        color110: 'var(--color110)',
        color31: 'var(--color31)',
        color35: 'var(--color35)',
        color39: 'var(--color39)',
        color73: 'var(--color73)',
        color93: 'var(--color93)',
        color97: 'var(--color97)',
      },
    },
  },
  plugins: [],
};

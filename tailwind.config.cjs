/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#e2001a',
        'brand-light': '#ff1631',
        'brand-dark': '#af0014',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};

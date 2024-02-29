/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // or 'media' or 'class'
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'general-background': '#1E90FF',
        'buttons-background': '#398fe5',
        'buttons-background-hover': '#2e7ac2',
        'screen-background': '#DBDBDB',
        'general-background-dark': '#2E86C1',
        'screen-background-dark': '#1B2631',
        'buttons-background-dark': '#398fe5',
        'buttons-background--darkhover': '#2e7ac2',
        'form-background-dark': '#434E5A',
      }
    },
  },
  plugins: [],
}


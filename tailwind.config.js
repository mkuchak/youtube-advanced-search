const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        // https://www.tailwindshades.com/
        primary: {},
        secondary: {},
        tertiary: {}
      },
      screens: {
        xs: { max: '300px' }
      }
    }
  },
  plugins: []
}

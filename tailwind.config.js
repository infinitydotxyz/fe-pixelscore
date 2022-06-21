const theme = require('./tailwind.theme.js');

module.exports = {
  content: [
    './src/**/*.{html,js,ts,jsx,tsx}',
    './node_modules/flowbite/**/*.js',
    './node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        pixel: ['Pixel', 'sans-serif']
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' }
        },
        redglow: {
          '50%': { boxShadow: '0 0 30px red' }
        }
      },
      animation: {
        wiggle: 'wiggle 200ms ease-in-out',
        redglow: 'redglow 300ms ease-in-out'
      },
      ...theme
    }
  },
  plugins: [require('flowbite/plugin')]
};

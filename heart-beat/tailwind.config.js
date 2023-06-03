/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      height: {
        '1/2-screen': '50vh',
      },
      colors: {
        primary: {
          DEFAULT: '#FF7F50', // Coral
          light: '#FFA07A', //Light Salmon
        },
        background: {
          DEFAULT: '#F3E5AB', // Vanilla
        },
        accent:{
          DEFAULT: '#FF9933', // Deep Saffron
        },
        text:{
          DEFAULT: '#696969', // Dim Gray
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}

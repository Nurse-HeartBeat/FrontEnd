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
          DEFAULT: '#420f5a', // Coral
          light: '#771fa1', //Light Salmon
        },
        lightP: {
          DEFAULT: '#d48ef5'
        },
        background: {
          DEFAULT: '#F5F5F5', // Vanilla
        },
        accent:{
          DEFAULT: '#214666', // Deep Saffron
        },
        text:{
          DEFAULT: '#4A4A4A', // Dim Gray
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

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'navy-dark': '#0A1628',
        'navy-blue': '#0F1F3D',
        'neon-green': '#00FF94',
        'neon-green-light': '#00FFA3',
      },
      fontFamily: {
        'outfit': ['Outfit', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-blue': 'linear-gradient(180deg, #0A1628 0%, #1A2F5A 100%)',
      },
    },
  },
  plugins: [],
}

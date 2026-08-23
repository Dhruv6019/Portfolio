/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#F2EFE6',
        ink: '#0F0E0B',
        accent: '#E8432D',
        grid: '#D9D5CA',
        'ink-light': '#3A3830',
        muted: '#8A877E',
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'cursive'],
        body: ['Inter', 'sans-serif'],
      },
      fontSize: {
        'fluid-xl': 'clamp(5rem, 15vw, 18rem)',
        'fluid-lg': 'clamp(3rem, 8vw, 10rem)',
        'fluid-md': 'clamp(2rem, 5vw, 6rem)',
      },
    },
  },
  plugins: [],
}

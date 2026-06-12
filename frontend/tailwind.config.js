/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#EF3826',      // Match the orange-red color of Nilkanth Quartz logo
          dark: '#111827',     // Deep charcoal/black
          gray: '#374151',     // Medium gray
          light: '#F9FAFB',    // Background light gray
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

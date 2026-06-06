/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // <--- CRITICAL: This enables the manual toggle
  theme: {
    extend: {
      fontFamily: {
        // This matches the names in the Google Fonts link above
        playfair: ['"Playfair Display"', 'serif'], 
        lato: ['"Lato"', 'sans-serif'],
        oswald: ['Oswald', 'sans-serif'],
      },
      colors: {
        luxury: {
          cream: '#F9F9F7',
          maroon: '#2A0A0A', // Deep Maroon
          gold: '#D4AF37',   // Accent Gold
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
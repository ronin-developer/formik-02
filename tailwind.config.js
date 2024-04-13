/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'tomato': '#ff6347',
      'mygrey': '#717D7E',
      'darkgrey': '#405355',
      'firebrick': '#b22222',
      'ghostwhite': '#f8f8ff'
    },

    fontFamily: {
      'Josefinans': ['JosefinSans', 'sans-serif'], 
    }, 
    extend: {
      
    }, 
  },
  plugins: [],
}

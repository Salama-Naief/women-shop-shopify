/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:"#8F59F0",
        secondary:"#E655B6",
        error:"#D92D18"
      }
    
    },
  },
  plugins: [],
}

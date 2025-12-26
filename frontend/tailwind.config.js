/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": '#5f6FFF',
        
      "primary-dark": "#553C9A" // darker shade for hover
      },
    },
  },
  plugins: [],
}
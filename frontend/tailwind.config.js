/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-header": "#5B2333",
        "alert-text": "#F24333",
        "hover-alert-text": "#F22235"
      }
    },
  },
  plugins: [],
}

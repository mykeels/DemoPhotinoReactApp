/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: () => ({
      purple: {
        100: "#9568a8",
        200: "#521f49"
      },
      lavender: {
        100: "#b295f5",
        200: "#a37bd1"
      },
      pink: "#fcc5fc",
      white: "#FFFFFF",
      black: "#000"
    }),
    extend: {},
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      primary: "#284B62",
      secondary: "#D0E7F6",
      accent: "#278ED3",
    },
    fontFamily: {
      sans: ["Inter", "sans-serif"],
      heading: ["Rubik", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      poppins: ["Poppins", ...defaultTheme.fontFamily.sans],
      inder: ["Inder", ...defaultTheme.fontFamily.sans],
    },
    extend: {
      maxWidth: {
        "8xl": "90rem",
      },
      colors: {
        orange: {
          50: "#FEF4EB",
          100: "#FEE8D7",
          200: "#FDD1AF",
          300: "#FCBA88",
          400: "#FBA665",
          500: "#FA8E3C",
          600: "#F46D06",
          700: "#B35005",
          800: "#773503",
          900: "#3C1B02",
        },
        "lighter-orange": "#f9c7a1",
        "main-black": "#252525",
        "main-white": "#f9f9fb",
        "gray-map": "#D9D9D9",
        "gray-hover": "#BDBDBD",
      },
    },
  },
  plugins: [],
};

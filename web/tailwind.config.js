/** @type {import('tailwindcss').Config} */
const globalTheme = require("./src/styles/design/theme");
const globalAnimations = require("./src/styles/design/animations");
const { typographies } = require("./src/styles/design/typography");
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    ...typographies,
    extend: {
      ...globalTheme,
      ...globalAnimations,
      fontFamily: {
        sans: "Poppins, sans-serif",
      },
    },
  },
  plugins: [],
};

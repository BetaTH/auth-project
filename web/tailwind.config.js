/** @type {import('tailwindcss').Config} */
const globalTheme = require("./src/style/theme");
const globalAnimations = require("./src/style/animations");
const textStyles = require("./src/style/typography");
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    ...textStyles.typographies,
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

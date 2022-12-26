/** @type {import('tailwindcss').Config} */
const globalTheme = require("./src/styles/design/theme");
const globalAnimations = require("./src/styles/design/animations");
const { typographies, register } = require("./src/styles/design/typography");
const plugin = require("tailwindcss/plugin");
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
  plugins: [plugin(register)],
};

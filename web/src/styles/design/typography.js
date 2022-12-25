const typographies = {
  textStylesRegular: {
    sx: {
      fontSize: "1.2rem",
      fontWeight: "400",
      lineHeight: "auto",
      letterSpacing: "-0.01em",
    },
    sm: {
      fontSize: "1.4rem",
      fontWeight: "400",
      lineHeight: "140%",
      letterSpacing: "-0.01em",
    },
    base: {
      fontSize: "1.6rem",
      fontWeight: "400",
      lineHeight: "140%",
      letterSpacing: "-0.02em",
    },
    lg: {
      fontSize: "1.8rem",
      fontWeight: "400",
      lineHeight: "140%",
      letterSpacing: "-0.02em",
    },
    xl: {
      fontSize: "2rem",
      fontWeight: "400",
      lineHeight: "140%",
      letterSpacing: "-0.02em",
    },
    "2xl": {
      fontSize: "2.4rem",
      fontWeight: "400",
      lineHeight: "120%",
      letterSpacing: "-0.02em",
    },
    "3xl": {
      fontSize: "3.2rem",
      fontWeight: "400",
      lineHeight: "140%",
      letterSpacing: "-0.02em",
    },
    "4xl": {
      fontSize: "3.6rem",
      fontWeight: "400",
      lineHeight: "120%",
      letterSpacing: "-0.03em",
    },
    "5xl": {
      fontSize: "4rem",
      fontWeight: "400",
      lineHeight: "120%",
      letterSpacing: "-0.03em",
    },
    "6xl": {
      fontSize: "7.2rem",
      fontWeight: "400",
      lineHeight: "110%",
      letterSpacing: "-0.04em",
    },
  },
  textStylesMedium: {
    sx: {
      fontSize: "1.2rem",
      fontWeight: "500",
      lineHeight: "auto",
      letterSpacing: "-0.01em",
    },
    sm: {
      fontSize: "1.4rem",
      fontWeight: "500",
      lineHeight: "140%",
      letterSpacing: "-0.01em",
    },
    base: {
      fontSize: "1.6rem",
      fontWeight: "500",
      lineHeight: "140%",
      letterSpacing: "-0.02em",
    },
    lg: {
      fontSize: "1.8rem",
      fontWeight: "500",
      lineHeight: "140%",
      letterSpacing: "-0.02em",
    },
    xl: {
      fontSize: "2rem",
      fontWeight: "500",
      lineHeight: "140%",
      letterSpacing: "-0.02em",
    },
    "2xl": {
      fontSize: "2.4rem",
      fontWeight: "500",
      lineHeight: "120%",
      letterSpacing: "-0.02em",
    },
    "3xl": {
      fontSize: "3.2rem",
      fontWeight: "500",
      lineHeight: "140%",
      letterSpacing: "-0.02em",
    },
    "4xl": {
      fontSize: "3.6rem",
      fontWeight: "500",
      lineHeight: "120%",
      letterSpacing: "-0.03em",
    },
    "5xl": {
      fontSize: "4rem",
      fontWeight: "500",
      lineHeight: "120%",
      letterSpacing: "-0.03em",
    },
    "6xl": {
      fontSize: "7.2rem",
      fontWeight: "500",
      lineHeight: "110%",
      letterSpacing: "-0.04em",
    },
  },
  textStylesSemibold: {
    sx: {
      fontSize: "1.2rem",
      fontWeight: "600",
      lineHeight: "auto",
      letterSpacing: "-0.01em",
    },
    sm: {
      fontSize: "1.4rem",
      fontWeight: "600",
      lineHeight: "140%",
      letterSpacing: "-0.01em",
    },
    base: {
      fontSize: "1.6rem",
      fontWeight: "600",
      lineHeight: "140%",
      letterSpacing: "-0.02em",
    },
    lg: {
      fontSize: "1.8rem",
      fontWeight: "600",
      lineHeight: "140%",
      letterSpacing: "-0.02em",
    },
    xl: {
      fontSize: "2rem",
      fontWeight: "600",
      lineHeight: "140%",
      letterSpacing: "-0.02em",
    },
    "2xl": {
      fontSize: "2.4rem",
      fontWeight: "600",
      lineHeight: "120%",
      letterSpacing: "-0.02em",
    },
    "3xl": {
      fontSize: "3.2rem",
      fontWeight: "600",
      lineHeight: "140%",
      letterSpacing: "-0.02em",
    },
    "4xl": {
      fontSize: "3.6rem",
      fontWeight: "600",
      lineHeight: "120%",
      letterSpacing: "-0.03em",
    },
    "5xl": {
      fontSize: "4rem",
      fontWeight: "600",
      lineHeight: "120%",
      letterSpacing: "-0.03em",
    },
    "6xl": {
      fontSize: "7.2rem",
      fontWeight: "600",
      lineHeight: "110%",
      letterSpacing: "-0.04em",
    },
  },
  textStylesBold: {
    sx: {
      fontSize: "1.2rem",
      fontWeight: "700",
      lineHeight: "auto",
      letterSpacing: "-0.01em",
    },
    sm: {
      fontSize: "1.4rem",
      fontWeight: "700",
      lineHeight: "140%",
      letterSpacing: "-0.01em",
    },
    base: {
      fontSize: "1.6rem",
      fontWeight: "700",
      lineHeight: "140%",
      letterSpacing: "-0.02em",
    },
    lg: {
      fontSize: "1.8rem",
      fontWeight: "700",
      lineHeight: "140%",
      letterSpacing: "-0.02em",
    },
    xl: {
      fontSize: "2rem",
      fontWeight: "700",
      lineHeight: "140%",
      letterSpacing: "-0.02em",
    },
    "2xl": {
      fontSize: "2.4rem",
      fontWeight: "700",
      lineHeight: "120%",
      letterSpacing: "-0.02em",
    },
    "3xl": {
      fontSize: "3.2rem",
      fontWeight: "700",
      lineHeight: "140%",
      letterSpacing: "-0.02em",
    },
    "4xl": {
      fontSize: "3.6rem",
      fontWeight: "700",
      lineHeight: "120%",
      letterSpacing: "-0.03em",
    },
    "5xl": {
      fontSize: "4rem",
      fontWeight: "700",
      lineHeight: "120%",
      letterSpacing: "-0.03em",
    },
    "6xl": {
      fontSize: "7.2rem",
      fontWeight: "700",
      lineHeight: "110%",
      letterSpacing: "-0.04em",
    },
  },
};

const register = ({ matchUtilities, theme }) => {
  matchUtilities(
    {
      "text-style-regular": (value) => value,
    },
    { values: theme("textStylesRegular") }
  );
  matchUtilities(
    {
      "text-style-medium": (value) => value,
    },
    { values: theme("textStylesMedium") }
  );
  matchUtilities(
    {
      "text-style-semibold": (value) => value,
    },
    { values: theme("textStylesSemibold") }
  );
  matchUtilities(
    {
      "text-style-bold": (value) => value,
    },
    { values: theme("textStylesBold") }
  );
};

module.exports = {
  typographies,
  register,
};

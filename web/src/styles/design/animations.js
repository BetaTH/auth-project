const animations = {
  keyframes: {
    "translate-vertical": {
      "0%": { transform: "translateY(-100%)" },
      "100%": { transform: "translateY(0)" },
    },
    show: {
      "0%": { opacity: 0 },
      "100%": { opacity: 1 },
    },
  },
  animation: {
    "slide-in-from-top": "translate-vertical 0.5s",
    show: "show 0.4s ease-in-out",
  },
};

module.exports = animations;

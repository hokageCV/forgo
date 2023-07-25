/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mont: ["montserrat", "sans-serif"],
      },
      colors: {
        baseBG: "#8894a8",
        snow: {
          4: "#c8d0e0",
          3: "#D8DEE9",
          2: "#E5E9F0",
          1: "#ECEFF4",
        },
        night: {
          5: "#1e232e",
          4: "#2E3440",
          3: "#3B4252",
          2: "#434C5E",
          1: "#4C566A",
        },
        frost: {
          4: "#5E81AC",
          3: "#81A1C1",
          2: "#88C0D0",
          1: "#8FBCBB",
        },
        lal: "#BF616A",
        flame: "#D08770",
        grass: "#A3BE8C",
        soil: "#EBCB8B",
        purp: "#B48EAD"

      },
      spacing: {
        "shell": "700px",
      }
    },
  },
  plugins: [require("daisyui")],
};
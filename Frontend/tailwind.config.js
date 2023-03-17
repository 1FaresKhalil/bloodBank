/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      Poppins: ["Poppins", "sans-serif"],
      Rakkas: ["Rakkas"],
    },
    extend: {
      backgroundSize: {
        "200%": "200%",
      },
      keyframes: {
        rotate: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: { rotate: "rotate 600ms ease" },
      colors: {
        "dark-grey": "rgba(0, 0, 0, 0.15)",
      },
      boxShadow: {
        "3xl": "0px 4px 4px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};

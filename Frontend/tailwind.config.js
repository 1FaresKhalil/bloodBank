/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"  , 'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      Poppins: ["Poppins", "sans-serif"],
      Rakkas: ["Rakkas"],
    },
    extend: {
      keyframes: {
        rotate: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: { rotate: "rotate 600ms ease" },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        bp: "992px",
      },
      animation: {
        slideDown: "slideDown 0.3s 0.1s ease-in-out both",
      },
      keyframes: {
        slideDown: {
          "0%": { transform: "translateY(-25px)", opacity: "0%" },
          "100%": { transform: "translateY(0px)", opacity: "100%" },
        },
      },
    },
  },
  plugins: [],
};

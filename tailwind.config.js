/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        scaleUpDown: {
          "0%, 100%": { transform: "scale(0.7)", fill: "white" }, // Small size at start and end
          "50%": { transform: "scale(1.2)", fill: "#2EA4DF" }, // Large size at the midpoint
        },
      },
      animation: {
        scaleUpDown: "scaleUpDown 500ms ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

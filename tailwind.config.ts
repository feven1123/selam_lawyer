import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        serif: ["var(--font-playfair)", "serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#0F2847", // Deeper Navy
          50: "#f0f5fa",
          100: "#e1ecf6",
          200: "#c4dded",
          300: "#9ec5e1",
          400: "#75a6d3",
          500: "#5688c3",
          600: "#416ba8",
          700: "#36568c",
          800: "#2f4973",
          900: "#0F2847",
          950: "#1d2e46",
        },
        secondary: {
          DEFAULT: "#C5A065", // Rich Gold
          50: "#fbf8f2",
          100: "#f6efde",
          200: "#ebdeb9",
          300: "#dec58d",
          400: "#c5a065",
          500: "#b58d4a",
          600: "#9a723b",
          700: "#7b5832",
          800: "#66492e",
          900: "#543d29",
          950: "#2e2014",
        }
      }
    },
  },
  plugins: [],
};

export default config;

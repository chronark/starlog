const defaultTheme = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,js,tsx,jsx,mdx}", "./projects/**/*.mdx", "./authors/**/*.mdx"],
  darkMode: "class",
  theme: {
    fontFamily: {
      sans: ["var(--font-inter)", ...defaultTheme.fontFamily.sans],
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

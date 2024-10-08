/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {screens: {
    "2sm": "425px",
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
  },
  extend: {
    fontFamily: {
      sans: [
        '"Helvetica Neue"',
      ],
    },
  },
    extend: {},
  },
  plugins: [],
}


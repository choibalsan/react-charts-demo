/** @type {import('tailwindcss').Config} */

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  theme: {
    extend: {
      colors: {
        "primary-100": "#F0FFF4",
        "primary-300": "#9AE6B4",
        "primary-500": "#111111",
        "primary-700": "#276749",
        "primary-900": "#22543D",
        "secondary-100": "#E6FFFA",
        "secondary-300": "#81E6D9",
        "secondary-500": "#38B2AC",
        "secondary-700": "#2C7A7B",
        "secondary-900": "#234E52",
        "accent-100": "#FFFAF0",
        "accent-300": "#F8D38D",
        "accent-500": "#ED8936",
        "accent-700": "#C05621",
        "accent-900": "#7B341E",
      },
      fontFamily: {
        body: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

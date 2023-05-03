/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: ({ colors }) => ({
        primarylighter: '#b3b5fc',
        primarylight: '#a0a3fb',
        primary: '#8DA2FB',
        primarydark: '#7a7efa',
        primarydarker: '#686cf9'
      })
    },
    fontFamily: {
      roboto: ["Roboto", "sans-serif"],
      karla: ["Karla", "sans-serif"],
      arizona: ["Arizona"],
    },
  },
  plugins: [require("flowbite/plugin")],
};

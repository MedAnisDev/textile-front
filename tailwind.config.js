/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        backgroundproduct: "#A05222", 
        backgroundSection: "#F8F4F1" ,
        navbar: "#F1E1F4", 
        button: "#F8F4F1", 
        footer: "#CABFB6", 
      },
      fontFamily: {
        sans: ['Avenir', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'],
      },

    },
    plugins: [],
  },
};

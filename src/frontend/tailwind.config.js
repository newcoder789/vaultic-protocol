/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // fontFamily: {
      //   // sans: ['Poppins', 'sans-serif'],
      //    sans: ['Inter', 'sans-serif'],
      fontFamily: {
       heading: ['Orbitron', 'sans-serif'],
        body: ['Exo 2', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

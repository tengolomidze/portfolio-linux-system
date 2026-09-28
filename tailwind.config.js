/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      aspectRatio: {
        'blog': '5334 / 3000',
      },
      fontFamily: {
      },
      fontSize: {
      },
      colors: {
      },
    },
    screens: {
      'phone': '550px',
      'tablet': '800px',
      'laptop': '1024px',
      'desktop': '1280px',
    }, 
  },
  plugins: [],
}
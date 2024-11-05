/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        nasalization: ['Nasalization', 'sans-serif'],
      }
    },
  },
  plugins: [],
}


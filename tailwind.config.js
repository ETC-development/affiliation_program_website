/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        nasalization: ['Nasalization', 'sans-serif'],
      },

      backgroundImage: {
        'gradient-green': 'linear-gradient(90deg, rgba(1,159,79,1) 0%, rgba(14,69,37,1) 100%)',
        'radial-green' : 'radial-gradient(circle, rgba(14,53,33,1) 0%, rgba(3,28,13,1) 50%)',
      },


      colors: {
        fontGreen: '#00A14F', // Add your custom color here
      },
    },
  },
  plugins: [],
}


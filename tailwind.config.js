/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}', // Sesuaikan dengan struktur proyek Anda
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
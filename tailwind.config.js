/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        jiraniPrimary: '#1e3a8a', 
        jiraniSecondary: '#64748b',
        jiraniAccent: '#10b981',
        jiraniLight: '#f3f4f6',
      },
    },
  },
  plugins: [],
};

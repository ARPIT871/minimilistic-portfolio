/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'neon-blue': '#00f2fe',
      },
      backgroundColor: {
        dark: '#1a1a1a',
        light: '#ffffff',
      },
      textColor: {
        dark: '#ffffff',
        light: '#1a1a1a',
      },
    },
  },
  plugins: [],
};

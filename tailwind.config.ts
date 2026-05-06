/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          sans: ['DM Sans', 'sans-serif'],
          serif: ['Playfair Display', 'serif'],
        },
        colors: {
          brand: {
            dark: '#1a2e44',
            primary: '#1e3a5f',
            secondary: '#2d5a7b',
            accent: '#00a896',
            light: '#e8f4f0',
            cream: '#f7f5f0',
            warm: '#c9a96e',
          },
        },
      },
    },
    plugins: [],
  }
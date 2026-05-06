/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      colors: {
        finance: {
          ink: '#10212f',
          teal: '#0f766e',
          blue: '#2563eb',
          mint: '#d8f3e8',
          sky: '#e7f0ff'
        }
      },
      boxShadow: {
        soft: '0 18px 45px rgba(15, 33, 47, 0.08)'
      }
    }
  },
  plugins: []
};

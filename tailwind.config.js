/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          900: '#0f172a',
          800: '#112a4a',
          700: '#1e3a8a',
          500: '#2563eb',
        },
      },
      boxShadow: {
        soft: '0 24px 80px rgba(15, 23, 42, 0.12)',
      },
    },
  },
  plugins: [],
}

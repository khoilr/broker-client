/** @type {import('tailwindcss').Config} */
module.exports = {
    plugins: {
        'postcss-import': {},
        tailwindcss: {},
        autoprefixer: {},
      },
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        barlow: [
          '"Barlow Condensed"', 'sans-serif'
        ]
      },
      colors: {
        main: '#F0F1F5'
      }
    },
  },
  // eslint-disable-next-line no-dupe-keys
  plugins: [],
}

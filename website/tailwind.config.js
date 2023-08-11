/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        medium:
          '0px 0px 15px 0px rgba(0,0,0,.06),0px 2px 30px 0px rgba(0,0,0,.22),inset 0px 0px 1px 0px hsla(0,0%,100%,.15)',
      },
    },
  },
  plugins: [],
};

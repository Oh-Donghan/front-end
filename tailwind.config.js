/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontSize: {
        '18px': '18px',
        '16px': '16px',
      },
      aspectRatio: {
        '4/5': '4/5',
      },
      width: {
        '480px': '480px',
      },
      maxWidth: {
        '480px': '480px',
      },
      height: {
        'h-screen-minus-nav': 'calc(100vh - 90px)',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.no-scrollbar': {
          /* firefox */
          'scrollbar-width': 'none',
          /* safari and chrome */
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      });
    },
  ],
};

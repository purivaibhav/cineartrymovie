// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        heading: ['Satoshi', 'sans-serif'],
        unbounded: ['Unbounded', 'sans-serif'],
        manrope: ['Manrope', 'sans-serif'],
        mont: ['Montserrat', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        syne: ['Syne', 'sans-serif'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        spinCw: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
         fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        spinCcw: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(-360deg)' },
        },
         blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        'spin-cw': 'spinCw 1s ease-in-out',
        'spin-ccw': 'spinCcw 1s ease-in-out',
         'blink': 'blink 1s infinite',
      },
      
    },
  },
  plugins: [],
};

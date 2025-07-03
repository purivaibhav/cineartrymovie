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
        spinCcw: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(-360deg)' },
        },
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        'spin-cw': 'spinCw 1s ease-in-out',
        'spin-ccw': 'spinCcw 1s ease-in-out',
      },
      
    },
  },
  plugins: [],
};

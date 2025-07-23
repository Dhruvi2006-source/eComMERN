module.exports = {
  theme: {
    extend: {
      keyframes: {
        bounceY: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      animation: {
        bounceY: 'bounceY 1s ease-in-out infinite',
      }
    }
  }
}

const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  purge: ["./src/**/*.js", "./src/**/*.jsx", "./src/**/*.ts", "./src/**/*.tsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    backgroundColor: theme => ({
      ...theme('colors'),
      'monss': '#191919'
    }),
    extend: {
      height: defaultTheme=> ({
        "screen/2": "50vh",
        "screen/3": "calc(100vh / 3)",
        "screen/4": "calc(100vh / 4)",
        "screen/5": "calc(100vh / 5)",
        "screen-90": "90vh",
        "screen-80": "80vh",
        "screen-70": "70vh",
        "screen-60": "60vh",
      }),
      minHeight: defaultTheme => ({
        "screen/2": "50vh",
        "screen/3": "calc(100vh / 3)",
        "screen/4": "calc(100vh / 4)",
        "screen/5": "calc(100vh / 5)",
        "screen-90": "90vh",
        "screen-80": "80vh",
        "screen-70": "70vh",
        "screen-60": "60vh",
      }),
      fontFamily: {
        sans: ['Graphik', ...defaultTheme.fontFamily.sans], // used for headers
        serif: ['Raleway', ...defaultTheme.fontFamily.serif], // used for body content
        william: ['william']
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("tailwindcss")],
}

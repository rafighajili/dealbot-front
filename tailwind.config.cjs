/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xs: "475px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },

    container: {
      screens: {
        xs: "90vw",
        sm: "640px",
        md: "1024px",
        lg: "1280px",
      },
      padding: {
        sm: "20px",
        md: "62px",
        lg: "40px",
      },
      center: true,
    },

    extend: {
      colors: {
        primary: "#213caf",
        secondary: "#ee22c8",
        dark: {
          400: "#2e385b",
          500: "#141a31",
          600: "#0f162a",
        },
      },

      gridTemplateColumns: {
        howitworks: "300px 1fr",
      },
    },
  },
  plugins: [],
};

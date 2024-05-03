/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "node_modules/daisyui/dist/**/*.js"],
  theme: {
    extend: {},
    mytheme: {
      primary: "#852CFF",
      secondary: "#ACFF5A",
      accent: "#ffffff",
      neutral: "#5AC4FF",
      base: "#ffffff",
      info: "#22d3ee",
      success: "#a3e635",
      warning: "#FFD15A",
      error: "#ef4444",
    },

    // colors: {
    //   primary300: "#852CFF",
    //   primary200: "#A05AFF",
    //   primary100: "#C49AFC",
    //   neutral600: "#171518",
    //   neutral500: "#444246",
    //   neutral400: "#736F78",
    //   neutral300: "#A19DA6",
    //   neutral200: "#C4C2C6",
    //   neutral100: "#ECEAEE",
    //   accentB200: "#5AC4FF",
    //   accentB100: "#AAE0FF",
    //   accentG200: "#ACFF5A",
    //   accentG100: "#C6FE8E",
    //   accentO200: "#FFD15A",
    //   accentO100: "#FFDE89",
    //   white: "#FFFFFF",
    //   // black: colors.black,
    //   // white: colors.white,
    //   // gray: colors.slate,
    //   // green: colors.emerald,s
    //   // purple: colors.violet,
    //   // yellow: colors.amber,
    //   // pink: colors.fuchsia,
    // },
    backgroundImage: {},
  },
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#0ea5e9",
          secondary: "#1BCFB4",
          accent: "#fbbf24",
          neutral: "#852CFF",
          "base-100": "#f3f4f6",
          info: "#22d3ee",
          success: "#22c55e",
          warning: "#FFD15A",
          error: "#ef4444",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};

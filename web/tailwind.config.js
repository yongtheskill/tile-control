module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./**/*.html"],
    darkMode: "class",
    theme: {
      fontFamily: {
        sans: 'Montserrat, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
        serif: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
        mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
        head: 'Raleway, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      },
      container: { center: true },
      extend: {
        colors: {
          main: "#ffffff",
          "t-main": "#000000",
          "main-dark": "#0F172A",
          "t-main-dark": "#ffffff",
          primary: "#E2E8F0",
          "t-primary": "#000000",
          "primary-dark": "#334155",
          "t-primary-dark": "#ffffff",
          secondary: "#7765E3",
          "t-secondary": "#ffffff",
          "secondary-dark": "#EB5E55",
          "t-secondary-dark": "#ffffff",
        },
      },
    },
    plugins: [],
  };
  
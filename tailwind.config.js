/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,hbs}"],
  theme: {
    extend: {
      gridTemplateRows: {
        layout: "max-content 1fr max-content",
      },
      backgroundImage: {
        workspace:
          'url("https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80")',
      },
    },
  },
  plugins: [require("tailwindcss-animated")],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'vintage': "url('/assets/vintageBackground.jpg')"
      }
    },
  },
  plugins: [require("daisyui"),     require("tailwindcss-animation-delay"),],
  daisyUI: {
    themes: ["autumn", "forest", "coffee", "dark", "luxury", "dracula", "cupcake", "emerald"]
  }
};

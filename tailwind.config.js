/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      transformStyle: {
        "preserve-3d": "preserve-3d",
      },
      backfaceVisibility: {
        hidden: "hidden",
      },
      rotate: {
        "y-180": "rotateY(180deg)",
      },
      perspective: {
        1000: "1000px",
      },
      colors: {
        roxo_padrao: "#7369ff",
        "roxo-gradiente": "#8679ff",
        roxo_menu: "#6547FF",
        roxo_menu_hover: "#471EFF",
      },
      animation: {
        fadeIn: "fadeIn 0.3s ease-out",
        slideIn: "slideIn 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideIn: {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  variants: {
    extend: {
      transformStyle: ["responsive"],
      backfaceVisibility: ["responsive"],
      rotate: ["responsive"],
      perspective: ["responsive"],
    },
  },
  plugins: [],
};

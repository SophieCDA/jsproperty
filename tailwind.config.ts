import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palette Luxe JS Property
        noir: {
          DEFAULT: "#0a0a0a",
          elegant: "#141414",
          surface: "#1a1a1a",
          light: "#222222",
        },
        or: {
          DEFAULT: "#c9a962",
          clair: "#e3d4a8",
          fonce: "#a88c4a",
          subtil: "rgba(201, 169, 98, 0.1)",
        },
        ivoire: {
          DEFAULT: "#f8f6f3",
          pur: "#ffffff",
        },
        gris: {
          noble: "#888888",
          clair: "#cccccc",
          sombre: "#444444",
        },
        azur: {
          profond: "#1a3a5c",
          mer: "#2d5a7b",
          clair: "#4a7a9b",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-montserrat)", "system-ui", "sans-serif"],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "30": "7.5rem",
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "fade-in-up": "fadeInUp 0.8s ease-out forwards",
        "fade-in-down": "fadeInDown 0.8s ease-out forwards",
        "scale-in": "scaleIn 0.5s ease-out forwards",
        "slide-in-left": "slideInLeft 0.8s ease-out forwards",
        "slide-in-right": "slideInRight 0.8s ease-out forwards",
        "pulse-soft": "pulseSoft 2s ease-in-out infinite",
        "scroll-line": "scrollLine 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInDown: {
          "0%": { opacity: "0", transform: "translateY(-30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.5", transform: "scale(1.5)" },
        },
        scrollLine: {
          "0%, 100%": { transform: "scaleY(1)", opacity: "1" },
          "50%": { transform: "scaleY(0.5)", opacity: "0.5" },
        },
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-luxury":
          "linear-gradient(135deg, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;

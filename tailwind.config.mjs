import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
  ],
  theme: {
    extend: {
      // global.css の CSS 変数をそのまま参照する。
      // html.dark で変数が差し替わるので dark: 修飾なしでテーマに追従する。
      colors: {
        paper: "var(--paper)",
        ink: {
          DEFAULT: "var(--ink)",
          soft: "var(--ink-soft)",
        },
        muted: "var(--muted)",
        line: "var(--line)",
        ai: {
          DEFAULT: "var(--ai)",
          soft: "var(--ai-soft)",
        },
      },
      fontFamily: {
        sans: ["Zen Kaku Gothic New", "Space Grotesk", ...defaultTheme.fontFamily.sans],
        display: ["Space Grotesk", ...defaultTheme.fontFamily.sans],
        mono: ["JetBrains Mono", ...defaultTheme.fontFamily.mono],
      },
      maxWidth: {
        wrap: "var(--wrap)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

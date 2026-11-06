import type { Config } from "tailwindcss";

/**
 * Every colour maps to a CSS variable defined in app/globals.css, so light and
 * dark themes switch automatically. Preflight is disabled because the reference
 * design relies on browser defaults plus its own small reset (see globals.css).
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  corePlugins: { preflight: false },
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        ink: { DEFAULT: "var(--ink)", 2: "var(--ink-2)" },
        line: { DEFAULT: "var(--line)", 2: "var(--line-2)" },
        glow: { DEFAULT: "var(--glow)", 2: "var(--glow-2)" },
        accent: {
          DEFAULT: "var(--accent)",
          2: "var(--accent-2)",
          soft: "var(--accent-soft)",
          on: "var(--on-accent)",
        },
        danger: "var(--danger)",
        "warn-soft": "var(--warn-soft)",
        btn: { DEFAULT: "var(--btn)", fg: "var(--btn-fg)", knob: "var(--btn-knob)" },
        deep: {
          DEFAULT: "var(--deep)",
          fg: "var(--deep-fg)",
          2: "var(--deep-2)",
          line: "var(--deep-line)",
        },
      },
      fontFamily: {
        display: "var(--display)",
        body: "var(--body)",
        mono: "var(--mono)",
      },
      borderRadius: {
        card: "20px",
        sm: "14px",
        band: "28px",
        pill: "999px",
      },
      boxShadow: {
        card: "var(--shadow)",
      },
      maxWidth: {
        container: "1240px",
      },
      screens: {
        // Mirrors the reference's max-width breakpoints
        mob: { max: "680px" },
        tab: { max: "1100px" },
      },
    },
  },
  plugins: [],
};

export default config;

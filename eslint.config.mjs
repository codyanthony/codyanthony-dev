import js from "@eslint/js";

export default [
  {
    ignores: [
      "dist/**",
      ".astro/**",
      "node_modules/**",
      ".wrangler/**",
    ],
  },

  js.configs.recommended,
  {
    files: ["**/*.mjs"],
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
    },
  },
];

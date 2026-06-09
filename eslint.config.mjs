import { createRequire } from "node:module";
import js from "@eslint/js";
import astroPlugin from "eslint-plugin-astro";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import globals from "globals"; // Enforces runtime environment variable tables

const require = createRequire(import.meta.url);
const mdx = require("eslint-plugin-mdx");

export default [
  // 1. Global Ignores (Keep build schemas clean)
  {
    ignores: [
      "dist/**",
      ".astro/**",
      "node_modules/**",
      ".wrangler/**",
      "worker-configuration.d.ts", // Exclude auto-generated worker types file entirely
    ],
  },

  // 2. Base Rules for Javascript Files
  js.configs.recommended,

  // 3. Local Node.js Execution Context (Applies strictly to your scripts & asset tools)
  {
    files: ["scripts/**/*.mjs", "scripts/**/*.js", "*.mjs"],
    languageOptions: {
      globals: {
        ...globals.node, // Declares process, Buffer, and console as completely valid
      },
    },
    rules: {
      // Explicitly tells the base engine to skip vars starting with an underscore
      "no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "no-console": "off",
    },
  }, // <-- FIXED: Added missing closing brace and comma here to close out Section 3 cleanly

  // 4. Cloudflare Worker Edge Route Files Context
  {
    files: ["src/pages/**/*.ts", "src/pages/**/*.js"],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.worker, // Validates caches, Response, Headers
        crypto: "readonly", // Validates edge crypto bindings
        BodyInit: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },

  // 5. Astro Components Validation Block
  ...astroPlugin.configs.recommended,
  {
    files: ["src/**/*.astro"],
    rules: {
      // Relaxes unused vars for Astro files to accommodate standard Props pattern declarations
      "no-unused-vars": ["warn", { varsIgnorePattern: "^(Props|_)" }],
    },
  },

  // 6. Portfolio MDX Case Studies Content Validation (Safely Bridged)
  mdx.configs.flat,
  mdx.configs.flatCodeBlocks,
  {
    files: ["**/*.mdx"],
    rules: {
      "mdx/remark": "warn",
      "no-undef": "error",
      // Silences unused component imports because they are handled via the global components mapper
      "no-unused-vars": "off",
    },
  },

  // 7. Puppeteer Visual Verification Hook Context (Merged from blog-launch branch)
  {
    // screenshot.mjs runs browser-context code inside puppeteer page.evaluate(),
    // so it needs browser globals (document, window, getComputedStyle) on top of node.
    files: ["scripts/screenshot.mjs"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
  },

  // 4. Cloudflare Worker Edge Route Files Context
  {
    files: ["src/pages/**/*.ts", "src/pages/**/*.js"],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.worker, // Validates caches, Response, Headers
        crypto: "readonly", // Validates edge crypto bindings
        BodyInit: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },

  // 5. Astro Components Validation Block
  ...astroPlugin.configs.recommended,
  {
    files: ["src/**/*.astro"],
    rules: {
      // Relaxes unused vars for Astro files to accommodate standard Props pattern declarations
      "no-unused-vars": ["warn", { varsIgnorePattern: "^(Props|_)" }],
    },
  },

  // 6. Portfolio MDX Case Studies Content Validation (Safely Bridged)
  mdx.configs.flat,
  mdx.configs.flatCodeBlocks,
  {
    files: ["**/*.mdx"],
    rules: {
      "mdx/remark": "warn",
      "no-undef": "error",
      // Silences unused component imports because they are handled via the global components mapper
      "no-unused-vars": "off",
    },
  },
];

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — local dev server at `localhost:4321`
- `npm run build` — production build into `./dist/`
- `npm run preview` — preview the built site locally
- `npm run astro check` — Astro/TypeScript diagnostics (no separate lint/test scripts exist)

## Architecture

This is Cody Anthony's technical-writing portfolio, built as an **Astro + Starlight** site rendered **SSR on Cloudflare Pages** (`output: "server"` with `@astrojs/cloudflare`). React is enabled as an Astro integration for client-side islands.

### Content model
Portfolio pages live in `src/content/docs/` and are exposed as routes by filename via the Starlight `docsLoader` (see `src/content.config.ts`). The four portfolio categories each have their own subdirectory:

- `api-documentation/` — API reference samples
- `architecture-guides/` — deployment / architecture writing (`.md`)
- `console-ux/` — product copy and API-design influence samples (`.mdx`, so components like `<CardGrid>` / `<Aside>` can be used inline)
- `systems-strategy/` — docs-systems work; the category landing page is `systems-strategy/systems-strategy.mdx` (routed at `/systems-strategy/systems-strategy/`, *not* `/systems-strategy/`)

Top-level files like `index.mdx`, `about.md`, `contact.md`, `colophon.md` are the home / informational pages.

### Sidebar navigation
The sidebar is **not** auto-generated — it is hand-maintained in `astro.config.mjs` under `starlight({ sidebar: [...] })`. When you add a new portfolio page in `src/content/docs/`, you must also add a corresponding entry to the sidebar config or it won't appear in navigation. The same file also contains the OG/Twitter meta tags and social links.

### Footer override + visitor counter (Cloudflare KV)
Starlight's default Footer is overridden in `astro.config.mjs` (`components.Footer → ./src/components/Footer.astro`). The custom footer mounts a React island (`VisitorCounter.jsx`, `client:load`) that calls `/api/visitor-count`.

That endpoint is a **Cloudflare Pages Function** at `functions/api/visitor-count.js` — not an Astro route. It reads/writes a single `total_visitors` key in a Cloudflare KV namespace bound as `VISITOR_COUNT` (configured in `wrangler.jsonc`, namespace id `0030dcaee1bb40eb94634bb77eb57a20`). POSTs are debounced client-side via `sessionStorage`. Because this is a Pages Function (not Astro SSR), it only works on Cloudflare deployments / `wrangler pages dev` — it will 404 under `npm run dev`.

### Assets

- **Images go in `src/assets/`** (not `public/`) so Astro's image pipeline can optimize, hash-stamp, and emit modern formats. In `.mdx` pages, import the image and render with Astro's `<Image>` component:
  ```mdx
  import { Image } from "astro:assets";
  import foo from "../../../assets/foo.png";

  <Image src={foo} alt="..." />
  ```
  The path is `../../../assets/` from `src/content/docs/<category>/*.mdx`. The Starlight hero image in `index.mdx` uses `file: ../../assets/houston.webp` (one fewer `../` because it's at depth 2, not 3).
- **`public/` is reserved for files that need stable URLs or that Astro can't process**: the writing-sample PDFs (`Cody_Anthony_Sample_*.pdf`), `favicon.svg`, `og.png` (referenced by absolute URL in the OG meta tag — moving it would hash-stamp the filename and break already-shared social previews), `_routes.json`, and `.assetsignore`.

### Styling
Custom theme overrides live in `src/styles/custom.css` (registered via `customCss` in `astro.config.mjs`). The palette is Cloudflare-orange (`--sl-color-accent: #F38020`) with a dark hero gradient. There is a custom **"Author's Note" aside style** keyed off `data-title*="Author's Note"` / `aria-label*="Author's Note"` (teal, italic) — use this exact title string in Starlight `<Aside>` components to opt in. Note that the custom CSS heavily uses `!important` on hero/button selectors to defeat Starlight defaults; check there first when hero/CTA styling looks wrong.

### Deployment specifics
- `wrangler.jsonc` sets `pages_build_output_dir: "dist"`, `compatibility_flags: ["nodejs_compat", "global_fetch_strictly_public"]`, and binds the `VISITOR_COUNT` KV namespace.
- `public/_routes.json` includes all paths (no exclusions).
- The site is published at `https://codyanthony.dev/` (the staging URL `cloudflare-portfolio-1tl.pages.dev` is referenced by the OG image meta tag).

### ESLint
`eslint.config.mjs` only lints `.mjs` files and Cloudflare Functions JS (with Worker globals declared). Astro/MDX/JSX content files are **not** linted by this config.

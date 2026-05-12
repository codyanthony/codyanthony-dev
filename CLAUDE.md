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
- `architecture-guides/` — deployment / architecture writing
- `console-ux/` — product copy and API-design influence samples
- `systems-strategy/` — docs-systems work (also includes top-level `systems-strategy.md`)

Top-level files like `index.mdx`, `about.md`, `contact.md`, `colophon.md` are the home / informational pages.

### Sidebar navigation
The sidebar is **not** auto-generated — it is hand-maintained in `astro.config.mjs` under `starlight({ sidebar: [...] })`. When you add a new portfolio page in `src/content/docs/`, you must also add a corresponding entry to the sidebar config or it won't appear in navigation. The same file also contains the OG/Twitter meta tags and social links.

### Footer override + visitor counter (Cloudflare KV)
Starlight's default Footer is overridden in `astro.config.mjs` (`components.Footer → ./src/components/Footer.astro`). The custom footer mounts a React island (`VisitorCounter.jsx`, `client:load`) that calls `/api/visitor-count`.

That endpoint is a **Cloudflare Pages Function** at `functions/api/visitor-count.js` — not an Astro route. It reads/writes a single `total_visitors` key in a Cloudflare KV namespace bound as `VISITOR_COUNT` (configured in `wrangler.jsonc`, namespace id `0030dcaee1bb40eb94634bb77eb57a20`). POSTs are debounced client-side via `sessionStorage`. Because this is a Pages Function (not Astro SSR), it only works on Cloudflare deployments / `wrangler pages dev` — it will 404 under `npm run dev`.

### Styling
Custom theme overrides live in `src/styles/custom.css` (registered via `customCss` in `astro.config.mjs`). The palette is Cloudflare-orange (`--sl-color-accent: #F38020`) with a dark hero gradient. There is a custom **"Author's Note" aside style** keyed off `data-title*="Author's Note"` / `aria-label*="Author's Note"` (teal, italic) — use this exact title string in Starlight `<Aside>` components to opt in. Note that the custom CSS heavily uses `!important` on hero/button selectors to defeat Starlight defaults; check there first when hero/CTA styling looks wrong.

### Deployment specifics
- `wrangler.jsonc` sets `pages_build_output_dir: "dist"`, `compatibility_flags: ["nodejs_compat", "global_fetch_strictly_public"]`, and binds the `VISITOR_COUNT` KV namespace.
- `public/_routes.json` includes all paths (no exclusions).
- Static PDFs of writing samples are served from `public/` (e.g. `Cody_Anthony_Sample_*.pdf`).
- The site is published at `https://codyanthony.dev/` (the staging URL `cloudflare-portfolio-1tl.pages.dev` is referenced by the OG image meta tag).

### ESLint
`eslint.config.mjs` only lints `.mjs` files and Cloudflare Functions JS (with Worker globals declared). Astro/MDX/JSX content files are **not** linted by this config.

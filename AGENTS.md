# CLAUDE.md

Guidance for Claude Code (claude.ai/code) when working in this repository.

## Commands

This repo uses **pnpm** (pinned via `packageManager` in `package.json`).

- `pnpm install` — install dependencies
- `pnpm dev` — local dev server at `http://localhost:4321`. Runs through the `@astrojs/cloudflare` adapter, so the Workers runtime and R2 bindings from `wrangler.jsonc` are available to on-demand routes during dev (no `platformProxy` flag needed in adapter v13 — it's automatic).
- `pnpm build` — production build. Emits `dist/client/` (static assets) **and** `dist/server/` (the Worker entry + a generated `dist/server/wrangler.json` deploy config).
- `pnpm preview` — builds, then serves the Worker locally via `wrangler dev` against the generated config. (Plain `astro preview` does not work once an adapter is present.)
- `pnpm deploy` — builds, then `wrangler deploy --config dist/server/wrangler.json`. **Do not** run a bare `npx wrangler deploy` against the root `wrangler.jsonc` — that config has no `main`/Worker and would ship a broken static-only site.
- `pnpm astro check` — Astro/TypeScript diagnostics (no separate lint/test scripts exist). Must be 0/0/0 before committing. After editing `wrangler.jsonc`, run `npx wrangler types` to regenerate `worker-configuration.d.ts` (the typed `Env` with R2 bindings).
- `node scripts/screenshot.mjs` — visual verification harness; see `scripts/README.md`

Postinstall scripts are deny-by-default in pnpm 10+. The allowlist of build-script-permitted packages lives in `pnpm-workspace.yaml` under `allowBuilds`. If a new native dep is added and `pnpm install` reports `ERR_PNPM_IGNORED_BUILDS`, add it there. `puppeteer` is intentionally `false` in that list — Chrome is installed on demand via `npx puppeteer browsers install chrome` only on machines that actually run the screenshot script.

## Architecture

Cody Anthony's portfolio — an Astro site (**Astro 6**) deployed to **Cloudflare Workers** via the `@astrojs/cloudflare` adapter (v13, built on `@cloudflare/vite-plugin`). The config is `output: "static"`, so **every page is still statically prerendered by default** — the site is static-first. The adapter only takes over routes that explicitly opt out with `export const prerender = false`. Today that's a single on-demand endpoint: the R2 asset proxy at `/assets/[...path]` (see **R2 asset serving** below). All static pages are served from Cloudflare's edge; only `/assets/*` runs Worker code.

> History: this site was _originally_ pure-static with no adapter/edge compute. The Cloudflare adapter was added to serve build-generated artifacts (blog media, OG images) from R2 same-origin, with room to grow into request-time logic (dynamic OG generation, signed share links, doc-feedback capture). If that roadmap is ever dropped, the adapter can be removed and the site reverts to pure-static.

Astro renders Markdown/MDX through the official `@astrojs/mdx` integration. There is no UI framework (no React/Vue/Svelte islands today) — `.astro` components handle all rendering. If a future interactive island is needed, `@astrojs/react` can be added back without architectural changes.

Important: an earlier iteration ran on the **Starlight** documentation theme. Starlight is fully removed. Layouts, components, navigation, and styling are now hand-rolled in this codebase. Do not look for Starlight in current code — references to it in any file are stale.

### Content model

Content collections are defined in `src/content.config.ts`:

- **`case-studies`** — every portfolio entry. Files live in `src/content/case-studies/<subdirectory>/<slug>.{md,mdx}`. The subdirectory is purely organizational; what determines display grouping is each entry's `section` + `subcategory` frontmatter.
- **`blog`** — placeholder collection for future blog posts. `src/content/blog/` is empty today; the empty-directory warning during `pnpm dev` and `pnpm astro check` is informational.

Case-study frontmatter schema (validated at build time):

```yaml
title: string
description: string
section: "product-content-design" | "technical"
subcategory: "narrative" | "api-references" | "architecture-guides" | "docs-as-code"
order: number          # used to sort within a section
draft: boolean         # default false; drafts are filtered from getCollection()
pdf:                   # optional — attaches a download button to the case-study layout
  href: string         # path under /public, e.g. "/Cody_Anthony_Sample_2_*.pdf"
  label: string        # optional button label
```

Top-level pages (Home, About, About-This-Site, Case Studies index) are `.astro` files in `src/pages/`, **not** content collection entries. They contain finalized prose inline rather than loading from MDX.

### Routing

| URL                                | Source file                                                                                                                               |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `/`                                | `src/pages/index.astro`                                                                                                                   |
| `/about/`                          | `src/pages/about.astro`                                                                                                                   |
| `/about-this-site/`                | `src/pages/about-this-site.astro`                                                                                                         |
| `/case-studies/`                   | `src/pages/case-studies/index.astro` (bifurcated index — Section 1 Product Content Design + Section 2 Technical Architecture & Reference) |
| `/case-studies/<category>/<slug>/` | `src/pages/case-studies/[...slug].astro` (dynamic, renders each collection entry through `CaseStudyLayout`)                               |
| `/assets/<key>`                    | `src/pages/assets/[...path].ts` — **on-demand** (`prerender = false`) R2 proxy; see **R2 asset serving**                                  |

`trailingSlash: "ignore"` in `astro.config.mjs` — both `/about` and `/about/` resolve. It is **not** `"always"`: the R2 asset proxy serves extensionful URLs like `/assets/blog/og.png`, which must work _without_ a trailing slash (OG `<meta>` images, `<img src>`). Existing trailing-slash page URLs and the `_redirects` rules still resolve; canonical `<link>` tags in `BaseLayout` handle SEO dedup.

Legacy URL redirects are in `public/_redirects` (`/colophon/` → `/about-this-site/`, `/contact/` → `/about/`, and `/api-documentation/*`, `/architecture-guides/*`, `/console-ux/*`, `/systems-strategy/*` to their new `/case-studies/...` prefixes). Cloudflare Workers Static Assets reads this file natively.

### Layouts

- `src/layouts/BaseLayout.astro` — html/head/meta/OG, mounts `Header` and `Footer`. Every page renders through it.
- `src/layouts/PageLayout.astro` — adds a narrow prose container around children. Use for typographic pages.
- `src/layouts/CaseStudyLayout.astro` — case-study header (eyebrow breadcrumb, title, description, optional PDF download button), then a prose container for the MDX body, then a "back to all case studies" footer.

### Components

`src/components/`:

- `Header.astro` — sticky top nav: brand left, `Case Studies | About` right. Mobile hamburger toggle via a tiny inline `<script>`.
- `Footer.astro` — code-comment-styled "// Built with Astro — View site source" line + social links.
- `Aside.astro`, `Card.astro`, `CardGrid.astro`, `LinkCard.astro` — hand-rolled replacements for the corresponding Starlight components. **API-compatible** with the previous Starlight usage so case-study MDX renders unchanged. Imported in MDX via the `@components/*` path alias defined in `tsconfig.json`.
- `Button.astro` — variants: `primary`, `default`, `ghost`. Supports `download={true}` for PDF links and auto-detects external URLs to add `target="_blank"`.

### Styling

All styles live in `src/styles/global.css` and are imported once via `BaseLayout.astro`. The palette is monochromatic charcoal — no accent colors. Type system, spacing scale, and layout containers are CSS-variable-driven (`--c-*`, `--fs-*`, `--sp-*`, `--content-width-*`).

Notable sections of `global.css`:

- `.identity` + `.identity__grid` — Home page hero, two-column 1.2fr/0.8fr grid that collapses to single column with image-first stacking at ≤1024px.
- `.about-intro` + `.about-intro__grid` — same pattern, smaller portrait, for the About page.
- `.portrait` — rounded-square (`border-radius: 20px`) portrait frame with optional `.portrait__badge` overlays. Hover transitions `filter: grayscale(15% → 0%)`.
- `.cs-section` / `.cs-list` — Case Studies index layout.
- `.case-study-header` / `.case-study-footer` — case-study page chrome.

### Assets

- **`src/assets/`** — images that Astro should optimize (WebP/AVIF generation, hash-stamping, density variants). All case-study screenshots and `cody-anthony.jpg` (the headshot) live here. Import them in `.astro` / `.mdx`:

  ```astro
  import { Image } from "astro:assets";
  import headshot from "../assets/cody-anthony.jpg";
  <Image src={headshot} width={320} height={320} densities={[2]} alt="…" />
  ```

  From a case-study MDX at depth 3, the path is `../../../assets/<name>`.

- **`public/`** — files that need stable URLs or that Astro can't process:
  - `assets/cody-anthony-resume.pdf` — resume, linked from Home + About download buttons. URL stays stable when content changes; do not move into `src/assets/`.
  - `Cody_Anthony_Sample_1_*.pdf`, `Cody_Anthony_Sample_2_*.pdf` — writing-sample PDFs attached to case studies via the optional `pdf` frontmatter field.
  - `favicon.svg`, `og.png` — referenced by `BaseLayout.astro` via absolute paths.
  - `_redirects` — Cloudflare URL redirect rules (see Routing above).

- **R2 (`codyanthony-dev-bucket`)** — for **machine-generated artifacts**, not hand-authored source. Build tooling (e.g. the `blog-draft` workflow) writes blog media / OG images here; the site serves them at request time via the `/assets/[...path]` endpoint. This is distinct from `src/assets/` (Astro-optimized source images) and `public/` (stable-URL static files committed to the repo). Use R2 for things produced by automation that shouldn't live in git.

### R2 asset serving

`src/pages/assets/[...path].ts` is an on-demand endpoint (`export const prerender = false`) that streams objects out of the `codyanthony-dev-bucket` R2 bucket:

- The bucket is bound as **`PORTFOLIO_ASSETS`** in `wrangler.jsonc` (`r2_buckets`). Access it via `import { env } from "cloudflare:workers"` then `env.PORTFOLIO_ASSETS` — **not** `Astro.locals.runtime.env`, which was removed in the v13 adapter. Types come from `worker-configuration.d.ts` (regenerate with `npx wrangler types` after binding changes).
- The catch-all `path` segment is the **exact R2 object key**: `/assets/blog/og/post.png` → key `blog/og/post.png`.
- Missing object → `404`. On hit, `object.writeHttpMetadata(headers)` maps the stored Content-Type / Cache-Control, and `httpEtag` is copied to the `etag` header.
- Responses are stored in `caches.open("portfolio-assets")` (the edge Cache API; `caches.default` isn't in Astro's DOM-lib `CacheStorage` type) so repeat hits skip R2. Default `Cache-Control` is a modest `max-age=3600` (not `immutable`) so artifacts regenerated under the same key don't pin stale forever; a producer can set a longer `Cache-Control` on the R2 object to override.
- Roadmap (why the adapter exists): this endpoint is the foundation for request-time features — dynamic OG-image generation (render → cache-to-R2 → serve), signed/expiring share links, and a doc-feedback capture endpoint.

### Deployment

The `@astrojs/cloudflare` adapter makes this a **Cloudflare Worker with a static-asset binding** (no longer pure Workers Static Assets). The build emits two trees plus a generated deploy config:

- `dist/client/` — prerendered HTML + hashed assets (the `ASSETS` binding).
- `dist/server/` — the Worker entry (`entry.mjs`) and **`dist/server/wrangler.json`**, a complete deploy config the adapter derives from the root `wrangler.jsonc` (adds `main`, points `assets.directory` at `../client`, carries the `PORTFOLIO_ASSETS` R2 binding, etc.).

Deploy with **`pnpm deploy`** (= `astro build && wrangler deploy --config dist/server/wrangler.json`). The root `wrangler.jsonc` is the **source** config (bindings, name, compatibility) consumed by the adapter at build/dev time; it intentionally has no `main`, so never `wrangler deploy` it directly — always use the generated config.

The site is published at `https://codyanthony.dev/`. The GitHub repository name target is `codyanthony-dev` (rename TBD by the user).

### TypeScript path aliases

Defined in `tsconfig.json`:

- `@components/*` → `src/components/*`
- `@layouts/*` → `src/layouts/*`
- `@assets/*` → `src/assets/*`

Use these in MDX imports for portability. Relative paths still work but require accurate `../` counting.

### Verification

- `pnpm astro check` — Astro/TypeScript diagnostics (no separate lint/test scripts exist). Must be 0/0/0 before committing. After editing `wrangler.jsonc`, run `npx wrangler types` to regenerate `worker-configuration.d.ts` (the typed `Env` with R2 bindings).
- `pnpm run lint` — Runs the full system linting suite. Checks all Astro components, TypeScript scripts, Cloudflare Worker source code, and root Markdown configuration files.
- `pnpm run lint:js` — Isolates the script engine lint check (Astro + TS + MDX components layout logic).
- `pnpm run lint:md` — Isolates static style validation for root markdown documentation files (README.md, CLAUDE.md, AGENTS.md).
- `node scripts/screenshot.mjs` — visual verification across desktop + mobile viewports for the marketing pages. See `scripts/README.md` for full usage. Run after any layout / styling / hero change.

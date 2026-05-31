# codyanthony.dev

Source for [codyanthony.dev](https://codyanthony.dev), the portfolio of Cody Anthony, technical content designer and documentation strategist.

## Stack

- **[Astro](https://astro.build) 6** — static-first output (`output: "static"`). Pages prerender to HTML at build; two routes run on demand (see Architecture).
- **MDX** via `@astrojs/mdx` for case-study content, in typed content collections with Zod-validated frontmatter.
- **[Cloudflare Workers](https://developers.cloudflare.com/workers/)** via the `@astrojs/cloudflare` adapter, with **R2** object storage for build-generated artifacts.
- Hand-rolled layouts, components, and CSS. No UI framework, no theme dependency, zero JavaScript shipped to the browser by default.

## Architecture

The site is static-first: every page prerenders to HTML and is served from Cloudflare's edge. Two routes opt out of prerendering and run as Worker code:

- **`/og/[slug].png`** — generates an Open Graph card per page (Satori renders the page title to SVG, resvg rasterizes it to PNG), then caches it in R2 so later requests skip the render.
- **`/assets/[...path]`** — streams build-generated artifacts (OG images, blog media) out of the `codyanthony-dev-bucket` R2 bucket, with edge caching.

The R2 bucket is bound as `PORTFOLIO_ASSETS` in `wrangler.jsonc`. Everything else is prebuilt HTML.

## Local development

This project uses [pnpm](https://pnpm.io/installation) (pinned via `packageManager` in `package.json`).

```bash
pnpm install      # install dependencies
pnpm dev          # dev server at http://localhost:4321 (Worker runtime + R2 binding available)
pnpm build        # build into ./dist/ (client + server trees)
pnpm preview      # build, then serve the Worker locally via wrangler dev
pnpm astro check  # TypeScript / Astro diagnostics
```

## Project structure

```
src/
  pages/                    # routes: Home, About, About-This-Site, case studies
    og/[slug].png.ts        #   on-demand: per-page OG image (cached to R2)
    assets/[...path].ts     #   on-demand: R2 asset proxy
  layouts/                  # BaseLayout, PageLayout, CaseStudyLayout
  components/               # Header, Footer, Aside, Card, CardGrid, LinkCard, Button
  content/
    case-studies/           # typed case-study collection (md/mdx)
  assets/                   # images processed by Astro's pipeline
  styles/global.css         # full theme; imported once via BaseLayout
public/                     # static passthrough: favicon, PDFs, redirects
wrangler.jsonc              # source config: app name, R2 binding, compatibility
```

## Deployment

`pnpm build` emits two trees: `dist/client/` (prerendered HTML and hashed assets) and `dist/server/` (the Worker entry). The adapter also writes `dist/server/wrangler.json`, the deploy config that wires them together.

```bash
pnpm deploy   # build, then: wrangler deploy --config dist/server/wrangler.json
```

Deploy from that generated config, not the root `wrangler.jsonc` (which declares bindings but has no Worker entry). Legacy URL redirects from the previous Starlight-based version of this site live in `public/_redirects` and are read natively by Cloudflare.

## License

Source code is MIT licensed. Case-study content, copy, and the portrait photo are © Cody Anthony, all rights reserved.

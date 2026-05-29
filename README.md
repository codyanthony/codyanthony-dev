# codyanthony.dev

Source for [codyanthony.dev](https://codyanthony.dev) — the portfolio site of Cody Anthony, technical content designer and documentation strategist.

## Stack

- **[Astro](https://astro.build) 5.x** — static site generator (`output: "static"`, no SSR routes)
- **MDX** via `@astrojs/mdx` for case-study content
- **Typed content collections** for case studies, with Zod-validated frontmatter
- **Cloudflare Workers Static Assets** for edge delivery
- Hand-rolled layouts, components, and CSS — no UI framework, no theme dependency

## Local development

This project uses [pnpm](https://pnpm.io/installation) (pinned via `packageManager` in `package.json`).

```bash
pnpm install      # install dependencies
pnpm dev          # local dev server at http://localhost:4321
pnpm build        # production build into ./dist/
pnpm preview      # preview the built site locally
pnpm astro check  # TypeScript / Astro diagnostics
```

## Project structure

```
src/
  pages/                    # routed Astro pages (Home, About, About-This-Site, case studies)
  layouts/                  # BaseLayout, PageLayout, CaseStudyLayout
  components/               # Header, Footer, Aside, Card, CardGrid, LinkCard, Button
  content/
    case-studies/           # typed case-study collection (md/mdx)
  assets/                   # images processed by Astro's pipeline
  styles/
    global.css              # full theme; imported once via BaseLayout
public/                     # static passthrough — favicon, OG image, PDFs, redirects
wrangler.jsonc              # Cloudflare Workers Static Assets config
```

## Deployment

The site deploys to Cloudflare Workers Static Assets. After `pnpm build`:

```bash
npx wrangler deploy
```

Legacy URL redirects (preserving inbound links from a previous Starlight-based version of this site) are declared in `public/_redirects` and read natively by Cloudflare.

## License

Source code is MIT licensed. Case-study content, copy, and the portrait photo are © Cody Anthony — all rights reserved.

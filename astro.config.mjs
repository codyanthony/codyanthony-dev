// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: "https://codyanthony.dev",
  // Pages remain static (prerendered) by default. The Cloudflare adapter only
  // takes over routes that opt out via `export const prerender = false`
  // (currently just the R2 asset proxy at /assets/[...path]).
  output: "static",
  // "ignore" (not "always") so the R2 asset proxy at /assets/[...path] can be
  // reached at extensionful URLs WITHOUT a trailing slash (e.g.
  // /assets/blog/og.png) — required for OG <meta> images and <img> tags.
  // Existing trailing-slash page URLs and the _redirects rules still resolve;
  // canonical <link> tags in BaseLayout handle SEO dedup.
  trailingSlash: "ignore",
  integrations: [mdx()],
  // @astrojs/cloudflare v13 runs on @cloudflare/vite-plugin, so the Workers
  // runtime (incl. R2 bindings declared in wrangler.jsonc) is wired into
  // `astro dev` automatically — no `platformProxy` flag needed. Bindings are
  // read inside endpoints via `import { env } from "cloudflare:workers"`.
  adapter: cloudflare(),
});

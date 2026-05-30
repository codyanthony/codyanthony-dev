import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";
import { ImageResponse, loadGoogleFont } from "workers-og";

// On-demand: renders a social card per request (then caches it). Not prerendered.
export const prerender = false;

const WIDTH = 1200;
const HEIGHT = 630;
const FONT_FAMILY = "Inter";
const FONT_WEIGHT = 600;
const CACHE_CONTROL = "public, max-age=3600";

/**
 * Tier-1 proof of concept: dynamic Open Graph image generation.
 *
 *   GET /og/<slug>.png?title=<text>
 *
 * Flow: derive a content hash from slug+title → if a matching PNG already
 * exists in R2 (`PORTFOLIO_ASSETS`), stream it back; otherwise render the card
 * with `workers-og` (Satori + resvg WASM), persist it to R2 for next time, and
 * return it. Because the cache key includes the title, editing a post's title
 * produces a fresh image instead of serving a stale one.
 */
export const GET: APIRoute = async ({ params, url, locals }) => {
  const slug = params.slug;
  if (!slug) {
    return new Response("Not Found", { status: 404 });
  }
  const title = url.searchParams.get("title")?.trim() || slug;
  const key = await cacheKey(slug, title);

  // 1. Already generated → serve the stored PNG.
  const cached = await env.PORTFOLIO_ASSETS.get(key);
  if (cached) {
    return pngResponse(cached.body, cached.httpEtag);
  }

  // 2. Render a fresh card.
  const font = await loadGoogleFont({ family: FONT_FAMILY, weight: FONT_WEIGHT });
  const image = new ImageResponse(cardHtml(title), {
    width: WIDTH,
    height: HEIGHT,
    format: "png",
    fonts: [{ name: FONT_FAMILY, data: font, weight: FONT_WEIGHT, style: "normal" }],
  });
  const png = await image.arrayBuffer();

  // 3. Persist to R2 out of band so it doesn't delay this response.
  locals.cfContext.waitUntil(
    env.PORTFOLIO_ASSETS.put(key, png, {
      httpMetadata: { contentType: "image/png", cacheControl: CACHE_CONTROL },
    }),
  );

  return pngResponse(png);
};

/** R2 object key, namespaced under `og/` and salted with a slug+title hash. */
async function cacheKey(slug: string, title: string): Promise<string> {
  const bytes = new TextEncoder().encode(`${slug}|${title}`);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  const hex = [...new Uint8Array(digest)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return `og/${slug}-${hex.slice(0, 12)}.png`;
}

function pngResponse(body: BodyInit | null, etag?: string): Response {
  const headers = new Headers({
    "content-type": "image/png",
    "cache-control": CACHE_CONTROL,
  });
  if (etag) headers.set("etag", etag);
  return new Response(body, { headers });
}

/** Charcoal social card matching the site palette. Satori needs explicit
 * flex/`display` on every container and inline styles only. */
function cardHtml(title: string): string {
  return `
    <div style="display:flex;flex-direction:column;justify-content:space-between;width:100%;height:100%;padding:80px;background:#1a1a1a;color:#f5f5f5;font-family:'${FONT_FAMILY}';">
      <div style="display:flex;font-size:30px;letter-spacing:6px;text-transform:uppercase;color:#8a8a8a;">Documentation Strategist</div>
      <div style="display:flex;font-size:76px;line-height:1.12;letter-spacing:-1px;">${escapeHtml(title)}</div>
      <div style="display:flex;font-size:32px;color:#8a8a8a;">codyanthony.dev</div>
    </div>`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

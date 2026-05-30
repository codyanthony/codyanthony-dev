import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";

// On-demand (server-rendered) route. Every other page in this project stays
// statically prerendered; this single endpoint opts out so it can read from R2
// per request. Without this, `output: "static"` would try to prerender it.
export const prerender = false;

// Default browser/edge cache lifetime for an artifact when the stored object
// doesn't carry its own Cache-Control. Deliberately modest (not `immutable`):
// machine-generated artifacts like OG cards are regenerated under the *same*
// key, so a year-long immutable cache would pin a stale image forever. A
// producer that knows an object is content-addressed can set a longer
// Cache-Control on the R2 object itself — `writeHttpMetadata` will honor it.
const DEFAULT_CACHE_CONTROL = "public, max-age=3600";

/**
 * Streams a build-time / machine-generated artifact out of the
 * `codyanthony-dev-bucket` R2 bucket (bound as `PORTFOLIO_ASSETS` in
 * wrangler.jsonc). The catch-all `path` segment is used verbatim as the R2
 * object key, so `/assets/blog/og/my-post.png` fetches the object
 * `blog/og/my-post.png`.
 *
 * Responses are stored in the Cloudflare edge cache (`caches.default`) so
 * repeat requests are served without a round-trip to R2.
 */
export const GET: APIRoute = async ({ params, request, locals }) => {
  const key = params.path;

  // No key (bare `/assets/`) → nothing to look up.
  if (!key) {
    return new Response("Not Found", { status: 404 });
  }

  // Serve a previously cached response without touching R2. (`caches.open` is
  // used over `caches.default` because the latter isn't in the DOM lib's
  // `CacheStorage` type that ships with Astro's strict tsconfig.)
  const cache = await caches.open("portfolio-assets");
  const hit = await cache.match(request);
  if (hit) {
    return hit;
  }

  const object = await env.PORTFOLIO_ASSETS.get(key);

  // Missing object → 404. (`get` returns `R2ObjectBody | null`.)
  if (object === null) {
    return new Response("Not Found", { status: 404 });
  }

  // Carry the stored HTTP metadata (Content-Type, Cache-Control, etc.) and the
  // strong validator across to the client response.
  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("etag", object.httpEtag);
  if (!headers.has("cache-control")) {
    headers.set("cache-control", DEFAULT_CACHE_CONTROL);
  }

  const response = new Response(object.body, { headers });

  // Populate the edge cache out of band so it never delays this response.
  locals.cfContext.waitUntil(cache.put(request, response.clone()));

  return response;
};

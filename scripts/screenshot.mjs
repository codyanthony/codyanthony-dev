/**
 * Visual verification script for the portfolio site.
 *
 * Launches headless Chrome via puppeteer, navigates to each configured URL at
 * each configured viewport, and writes a PNG to /tmp. Also prints a small
 * diagnostic block per page (viewport, element counts, image load state, grid
 * dimensions) so layout bugs surface in stdout, not just visually.
 *
 * Usage:
 *   pnpm dev                   # in one terminal
 *   node scripts/screenshot.mjs  # in another
 *
 * Customize: edit the TARGETS and VIEWPORTS arrays below.
 * Full docs: see scripts/README.md
 */

import puppeteer from "puppeteer";

const BASE = process.env.SITE_BASE ?? "http://localhost:4321";
const OUT_DIR = process.env.OUT_DIR ?? "/tmp";

const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

const TARGETS = [
  { path: "/", slug: "home" },
  { path: "/about/", slug: "about" },
  { path: "/about-this-site/", slug: "about-this-site" },
  { path: "/case-studies/", slug: "case-studies" },
];

// Only capture these (path, viewport) pairs. Comment out lines to skip.
const SHOTS = TARGETS.flatMap((t) =>
  VIEWPORTS.map((v) => ({ ...t, viewport: v }))
);

async function diagnose(page) {
  return page.evaluate(() => {
    const grid = document.querySelector(".identity__grid, .about-intro__grid");
    const h1s = document.querySelectorAll("h1");
    const imgs = document.querySelectorAll(".portrait__img");
    return {
      viewport: { w: window.innerWidth, h: window.innerHeight, dpr: window.devicePixelRatio },
      h1Count: h1s.length,
      portraitCount: imgs.length,
      portraitLoaded: Array.from(imgs).every((i) => i.complete && i.naturalWidth > 0),
      grid: grid
        ? {
            display: getComputedStyle(grid).display,
            cols: getComputedStyle(grid).gridTemplateColumns,
            width: grid.offsetWidth,
          }
        : null,
    };
  });
}

const browser = await puppeteer.launch({
  headless: true,
  // --disable-gpu and --force-device-scale-factor=1 work around a chromium headless
  // bug that occasionally renders the page tiled (duplicated columns) when GPU
  // compositing kicks in. Removing them will make screenshots flaky.
  args: [
    "--no-sandbox",
    "--disable-setuid-sandbox",
    "--disable-gpu",
    "--disable-dev-shm-usage",
    "--force-device-scale-factor=1",
    "--hide-scrollbars",
  ],
});

try {
  for (const shot of SHOTS) {
    const url = `${BASE}${shot.path}`;
    const out = `${OUT_DIR}/${shot.slug}-${shot.viewport.name}.png`;
    const page = await browser.newPage();
    await page.setViewport({
      width: shot.viewport.width,
      height: shot.viewport.height,
      deviceScaleFactor: 1,
    });
    await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });
    // Give Astro's dev-mode image endpoint a moment to finish streaming
    await new Promise((r) => setTimeout(r, 800));

    const diag = await diagnose(page);
    await page.screenshot({ path: out, fullPage: false });
    console.log(
      `${out}  (${shot.viewport.width}x${shot.viewport.height})  ` +
        `h1=${diag.h1Count} portrait=${diag.portraitCount} ` +
        `loaded=${diag.portraitLoaded} ` +
        `grid=${diag.grid ? diag.grid.cols : "n/a"}`
    );
    await page.close();
  }
} finally {
  await browser.close();
}

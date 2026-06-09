# scripts/

Project-local tooling that supports development but isn't part of the production build.

## screenshot.mjs

Visual verification harness. Drives headless Chrome via puppeteer to capture PNGs of the running dev server at multiple viewports, and prints a per-page diagnostic line (element counts, image load state, computed grid columns) so layout bugs show up in stdout before you ever look at the screenshot.

### Why it exists

Astro's type checker (`pnpm astro check`) verifies the code compiles. It does not verify the page *looks right*. Visual regressions — a broken grid, a missing image, a fight between two CSS rules — sail past the type checker. This script closes that gap for the handful of pages that drive the portfolio's first impression.

### Prerequisites

1. **Dev server running.** Start it in a separate terminal:
   ```bash
   pnpm dev
   ```
   The script defaults to `http://localhost:4321` (Astro's dev port).

2. **Chrome installed for puppeteer.** Puppeteer ships without a browser binary by default in this repo (see `pnpm-workspace.yaml` `allowBuilds: { puppeteer: false }`). Install Chrome once:
   ```bash
   npx puppeteer browsers install chrome
   ```
   Chrome lands in `~/.cache/puppeteer/`. You only need to do this once per machine.

### Run

```bash
node scripts/screenshot.mjs
```

Output:
```
/tmp/home-desktop.png  (1440x900)  h1=1 portrait=1 loaded=true grid=662.391px 441.609px
/tmp/home-mobile.png   (390x844)   h1=1 portrait=1 loaded=true grid=358px
/tmp/about-desktop.png (1440x900)  h1=1 portrait=1 loaded=true grid=662.391px 441.609px
/tmp/about-mobile.png  (390x844)   h1=1 portrait=1 loaded=true grid=358px
...
```

Each line tells you:
- File path of the screenshot
- Viewport used
- Number of `<h1>` elements on the page (should be 1 — sanity check that markup didn't duplicate)
- Number of `.portrait__img` images
- Whether the portrait loaded successfully (`true`/`false`)
- The computed `grid-template-columns` value (so you can verify the responsive collapse fired correctly: two columns at desktop, one at mobile)

### Diagnostic line — what to look for

A healthy run on the home page at desktop reads roughly:
```
/tmp/home-desktop.png  (1440x900)  h1=1 portrait=1 loaded=true grid=662.391px 441.609px
```

Common failure modes:

| Symptom | Likely cause |
|---|---|
| `h1=0` | Page rendered an error state or you broke the markup. |
| `h1>1` | Page accidentally rendering the hero twice (a real bug to investigate). |
| `loaded=false` | Image URL is wrong, image is missing on disk, or the dev-image endpoint is failing. Check the URL in the screenshot's source. |
| `grid=none` | CSS didn't apply — the grid class is missing or the stylesheet wasn't loaded. |
| `grid` shows one column (e.g. `grid=1168px`) at desktop | The 1024px media query fired when it shouldn't have. Check viewport setup. |

### Customize

Edit the constants at the top of `screenshot.mjs`:

- **`TARGETS`** — the routes to capture. Add or remove paths.
- **`VIEWPORTS`** — the viewport sizes. Add tablet, ultrawide, etc. as needed.
- **`SHOTS`** — defaults to the Cartesian product of TARGETS × VIEWPORTS. Comment out individual pairs if a particular combination is not useful.

Environment overrides without editing the file:

```bash
SITE_BASE=http://localhost:4322 node scripts/screenshot.mjs    # different port
OUT_DIR=./screenshots node scripts/screenshot.mjs              # different output directory
```

### Chromium flags worth knowing about

The script launches Chrome with `--disable-gpu --force-device-scale-factor=1 --disable-dev-shm-usage`. These are not cosmetic — without them, headless Chrome occasionally tiles the rendered viewport, producing screenshots where the page content appears duplicated side by side. The script's diagnostic line (`h1=N portrait=N`) was added specifically because that bug is silent: the PNG looks wrong but the DOM is fine. If you see a screenshot that looks duplicated, trust the diagnostic line.

### When to run it

- After any change to a layout file (`src/layouts/*.astro`), the global stylesheet (`src/styles/global.css`), or the hero/about pages (`src/pages/index.astro`, `src/pages/about.astro`).
- Before opening a PR that touches markup or CSS.
- When the type checker passes but something "feels off" visually.

It is **not** a substitute for opening the dev server in a real browser and using the page — interactive states (hover, focus, menu toggles) need a human. It catches structural and layout regressions, not behavior.

### What this script does not do

- It does not run for production builds. It only screenshots a live dev server.
- It does not pixel-diff against a baseline. There is no `screenshots/baseline/` directory; PNGs are just dropped in `/tmp` for manual inspection.
- It does not test interactive behavior. Hover states, the mobile menu toggle, and link navigation require either expansion of the script or actual browser use.

If a baseline pixel-diff workflow becomes useful later, extend this script with a `--baseline` mode that saves to `screenshots/baseline/` and a `--check` mode that diffs against it.

## generate-og.mjs

Generates the Open Graph / Twitter Card image at `public/og.png` (1200×630). The composition is driven by an inline SVG that is converted to PNG via sharp, so the output is deterministic and the source is reviewable in git.

### Why it exists

`public/og.png` is referenced by `BaseLayout.astro`'s `og:image` and `twitter:image` meta tags. Whenever the social preview content drifts away from the site (tagline outdated, palette mismatched, brand stale), the image needs to be regenerated. Keeping the composition in a script — rather than re-doing it in Figma each time — means a copy edit is a 30-second `node` invocation instead of a design task.

### Prerequisites

- `sharp` is already a project dependency. Nothing else to install.
- No dev server needed (this script renders without hitting the running site).

### Run

```bash
node scripts/generate-og.mjs
```

Output:
```
Wrote public/og.png  1200x630  42KB
```

The resulting PNG is committed and shipped from `public/` directly. Cloudflare Workers Static Assets serves it from `/og.png`; no build-time processing is involved.

### Customize

Edit the constants at the top of `generate-og.mjs`:

- **Palette** (`BG`, `TEXT`, `MUTED`, `DIM`, `BORDER`) — all pulled from `src/styles/global.css` CSS variables. Keep these in sync if the site palette changes.
- **Text content** — the SVG body holds the URL byline, the headline, the supporting capability tags, and the name byline. Edit the strings directly inside the SVG template literal.
- **Dimensions** — `W` and `H` constants. Standard Facebook/LinkedIn/Twitter spec is 1200×630; don't change unless you have a reason.

### Composition rationale

The four text elements each have a specific job and shouldn't be reshuffled without thinking about what's being communicated:

| Element | Position | Job |
|---|---|---|
| `// codyanthony.dev` (mono) | Top-left | URL byline. Anchors the image to the site without spending headline real estate on identity. |
| Two-line tagline (large sans) | Center-left | The value pitch — the click-decision driver. |
| Three-tag capability row (medium sans) | Bottom-left | Substance proof — shows breadth without insider jargon. |
| `Cody Anthony` (small sans, right-aligned) | Bottom-right | Name byline. Present for contexts where the platform isn't already showing your name (forwarded links, bookmarks, ATS). |

### When to run it

- After changing the site's tagline, positioning, or capability framing.
- After changing the palette in `src/styles/global.css`.
- If you ever rename the domain (the URL byline is hardcoded).

### What this script does not do

- It does not render in a real browser. Text is laid out by librsvg via sharp. Font lookups depend on system fontconfig — on most environments this resolves to a clean sans-serif (DejaVu Sans, Liberation Sans, or platform equivalent). The output is consistent across renders on the same machine; it may differ slightly between Linux/macOS/Windows. Generate it on the machine that ships the final image.
- It does not auto-update meta tags. The meta tags in `BaseLayout.astro` reference `/og.png` directly; no string substitution needed.
- It does not generate retina (2×) variants. Social platforms downsample as needed; the 1200×630 standard is the largest commonly displayed size.

## generate-blog-og.mjs

Generates per-post Open Graph / Twitter Card images for every blog post. Scans `src/content/blog/*.{md,mdx}`, parses each post's frontmatter, and emits a 1200×630 PNG to `public/og/blog/{slug}.png`. The visual language matches `generate-og.mjs` (same palette, same mono URL mark, same sans headline) so per-post cards stay coherent next to the site card on LinkedIn or other social platforms.

### Why it exists

When a post URL is shared on LinkedIn or Twitter, the platform fetches the page's `og:image` to build the link-preview card. Reusing the site-wide `og.png` across every post means every post looks identical in the social feed — no signal that anything new is there. Per-post images use the post's actual title in the card, giving each share a real preview and dramatically higher click-through.

The card path is referenced by `src/pages/blog/[...slug].astro`, which passes `/og/blog/{slug}.png` to `BlogPostLayout` → `BaseLayout`. The image must exist at that path at build time, or the meta tags will point to a 404.

### Prerequisites

- `sharp` is already a project dependency. Nothing else to install.
- At least one post in `src/content/blog/` with valid frontmatter (`title`, `date`).

### Run

```bash
node scripts/generate-blog-og.mjs
```

Output:
```
Wrote public/og/blog/content-alchemy.png  1200x630  48KB  "Content Alchemy"
```

One PNG per post. The generated `public/og/blog/` directory and its contents are committed.

### When to run it

- After publishing a new blog post (the most common trigger).
- After editing a post's `title` or `date` in frontmatter.
- After changing the palette in `src/styles/global.css` (regenerate all cards so the visual language stays in sync).
- After changing the layout in the script's `renderSvg()` function (e.g., adjusting font sizes, repositioning byline).

If you skip this step for a new post, the post will still ship — its `og:image` meta tag will point to `/og/blog/{slug}.png` and that URL will 404, so social cards for that post fall back to a generic preview without an image. Don't skip.

### Customize

Edit the constants at the top of `generate-blog-og.mjs`:

- **Palette** (`BG`, `TEXT`, `MUTED`, `DIM`, `BORDER`) — kept in sync with the site OG script and the site stylesheet.
- **`W`, `H`** — output dimensions. Standard 1200×630; don't change without a reason.
- **`BLOG_DIR`, `OUT_DIR`** — input and output paths. Defaults assume running from the project root.

To change the card composition (font sizes, positions, byline text), edit `renderSvg()`. The current layout:

| Element | Position | Job |
|---|---|---|
| `// codyanthony.dev / blog` (mono) | Top-left | URL byline. Identifies the source and signals the post is from the blog (vs. site root). |
| Post title (large sans, 1–3 wrapped lines) | Upper-middle | The headline. Wrapped at ~30 chars via `wrapTitle()` to fit the card width. |
| Post date (small mono) | Bottom-left | Anchors the card in time. Useful when a post is shared months after publication. |
| `Cody Anthony · Documentation Strategist` (small sans) | Bottom-right | Brand byline. Same canonical title used across resume + LinkedIn. |

### Title wrapping caveat

`wrapTitle()` is a character-count-based greedy wrapper, not a true font-metric wrapper. It assumes a ~0.50em average glyph width for the sans-serif at 60px. Titles with many wide characters (W, M, all-caps) may slightly exceed the visual width budget. Titles with mostly narrow characters (i, l, t) will leave some extra space. If a title overflows badly, either shorten it or lower the `maxLineChars` argument in the script.

The wrapper caps at 3 lines. A 4th line would overflow the byline row.

### What this script does not do

- It does not run as part of `pnpm build`. It's a one-shot Node script you invoke manually after authoring or editing posts. Wire it into a pre-commit hook if you want automation.
- It does not regenerate the site OG image (`public/og.png`). That's a separate script (`generate-og.mjs`).
- It does not handle posts with frontmatter that doesn't match the expected shape. If `parseFrontmatter()` can't find a `title` or `date` field, the script throws. Frontmatter parsing is intentionally simple — it does not handle multi-line scalars, block sequences, or complex YAML. Keep blog frontmatter to flat key/value pairs.

## check-blog-prose.mjs

Deterministic scan for AI-tell patterns in a blog post draft. Runs as the deterministic gate in the blog-draft and blog-review workflows. Catches the patterns that grep-able rules can detect; LLM-judgment patterns (aphoristic closings, schematic-identical templates) run separately as part of `blog-checklist`.

```bash
node scripts/check-blog-prose.mjs src/content/blog/post.mdx
```

Exit code is 0 if no critical findings, 1 if any critical findings. Findings print to stdout in a human-readable form grouped by rule.

### Why it exists

The `blog-checklist` skill aggregates pre-publish checks. Several of those checks (em dashes, banned words, throat-clearing phrases) are deterministically detectable. Leaving them to LLM-judgment introduces drift: the same draft may pass on one read and fail on another. Deterministic scripts make the detection reliable and the failures unambiguous.

The script encodes a subset of the rules from `.claude/skills/ai-antipatterns/SKILL.md` — specifically the ones that can be checked with regex and light tokenization. Harder patterns (aphoristic closing slogans, schematic-identical bullet templates) require structural judgment and stay in the LLM-checked portion of `blog-checklist`.

### Detections

| Rule | Severity | What it flags |
|---|---|---|
| `em-dash-in-prose` | critical | Em dash (`—`) in a position not exempt under the description-list / link-list / numbered-description / empty-table-cell / horizontal-rule allowances |
| `without-inversion` | critical | "Without X, Y. Without Y, X." parallel two-sentence inversion structure |
| `banned-word` | critical | Any word from the ai-antipatterns universal banned-words list (leverage, robust, comprehensive, seamless, etc.) |
| `throat-clearing` | critical | Phrase from the ai-antipatterns throat-clearing / summary-padding / forced-enthusiasm / filler-transition / "X common framing" lists |
| `triple-repetition` | warning | 3+ consecutive sentences starting with the same word (excluding stopwords like "the," "this") |
| `long-parallel-construction` | warning | Sentence over 25 words containing a parallel-construction marker (either/or, not only/but also, on the one hand/on the other hand, whether/or). Reads smooth but often signals AI prose; splitting at the parallel marker produces more natural rhythm. |

Critical findings cause exit code 1. Warnings do not (they're advisory).

### Output format

```
# check-blog-prose findings — src/content/blog/anatomy-of-a-documentation-pipeline.mdx

Critical: 2  |  Warning: 1

## em-dash-in-prose (1)

  L42 [critical] When a draft came back factually correct but strategically wrong — when it documented the product accurately…
        → Replace with comma, period, colon, or parentheses.

## without-inversion (1)

  L51 [critical] Without the conventions, the pipeline produces a thousand inconsistent translations. Without the pipeline…
        → Classic AI rhetorical move. Rewrite one of the two sentences with a different structure.

## triple-repetition (1)

  L37 [warning] 3 consecutive sentences open with "the". First: The deterministic layer scales repetition.
        → Vary the opening word/structure of at least one sentence in the run.
```

### Preprocessing — what the script ignores

To avoid false positives, the script preprocesses the input before running detections:

- **Frontmatter** is stripped. The schema lives in `src/content.config.ts`; this script doesn't validate it.
- **Fenced code blocks** are masked with blank lines (preserving line numbers but excluding code from prose checks).
- **Em-dash exception contexts** (description lists, link lists, numbered description items, empty table cells, horizontal-rule separators of em dashes) are recognized line-by-line and excluded from the em-dash check.

Inline code (backtick-delimited) is NOT currently masked. If banned words appear in inline code samples, the script will flag them. Wrap such samples in fenced blocks if false positives become a problem.

### When to run it

- Inside `/blog-draft` Step 6 (deterministic validation, after writing the draft file and before declaring success)
- Inside `/blog-review` (deterministic findings, before the adversarial pass)
- Manually on any draft: `node scripts/check-blog-prose.mjs path/to/file.mdx`

### Customize

To extend detections:

- **Banned words:** Add to the `BANNED_WORDS` array. Source: `ai-antipatterns/SKILL.md` banned-words table.
- **Throat-clearing phrases:** Add to the `THROAT_CLEARING_PHRASES` array. Lowercase, exact substring matches.
- **New rule:** Add a new check block following the pattern of existing ones — read the body, regex-match, call `add({ severity, rule, line, text, suggestion })`.

### What this script does not do

- It does not detect aphoristic closing slogans. The pattern is too structurally varied for regex; LLM judgment is required.
- It does not detect schematic-identical templates across parallel sections. Detecting "all three case sections use the same bullet template" requires structural parsing beyond what this script does.
- It does not detect parallel construction across three sentences (the deeper version of triple-repetition). It does detect the simpler case (same opening word).
- It does not auto-fix anything. Findings are reported; the writer decides how to address them.
- It does not replace LLM-judgment checks in `blog-checklist`. The skill explicitly requires both — script-deterministic + LLM-judgment.

## generate-linkedin-assets.mjs

Generates two LinkedIn-optimized assets on your Desktop: a profile banner (1584×396 JPEG) and a tight-cropped profile headshot (1000×1000 JPEG). Run once whenever the brand tagline, palette, or source photo changes.

```bash
node scripts/generate-linkedin-assets.mjs
```

Outputs:

```
Wrote ~/Desktop/linkedin-banner.jpg   1584x396  ~40 KB
Wrote ~/Desktop/linkedin-headshot.jpg 1000x1000 ~155 KB
```

Override the output directory with `OUT_DIR=/somewhere/else node scripts/generate-linkedin-assets.mjs`.

### Why it exists

LinkedIn's banner upload validator is significantly more particular than the documented spec implies. Generating banners by hand (or with a tool that doesn't know about LinkedIn's specific gotchas) leads to repeated silent "save failed" errors with no diagnostic. This script encodes every constraint we discovered through trial-and-error, so a fresh run produces a file LinkedIn will accept on the first try.

The headshot is a tighter crop than the site portrait, optimized for LinkedIn's circular profile-photo display.

### Prerequisites

- `sharp` is already a project dependency. No other tools required.
- The source photo at `Cody Pro Photos 2026/Favorites/Aragon-Favorites-Cody-Anthony-1.jpg` must exist locally. This folder is gitignored (it's a 189 MB photo set); restore it from backup if missing.

### LinkedIn upload gotchas the script handles

Every item below was a silent upload failure during initial testing. The script handles all of them; this list exists so the next person doesn't have to rediscover them.

| Constraint | What the script does |
|---|---|
| **JFIF APP0 segment required.** LinkedIn's banner validator silently rejects JPEGs that lack the JFIF header marker, even when every other property is valid. Sharp/libvips omits this 18-byte segment by default. | The script post-processes the sharp output to inject the JFIF APP0 segment (version 1.01, no density units, no thumbnail) immediately after the SOI marker. See the `injectJfifMarker()` function. |
| **Progressive JPEG encoding.** LinkedIn's processor has been observed to reject baseline-only JPEGs at banner sizes. | The script uses `progressive: true`. |
| **Standard 4:2:0 chroma subsampling.** 4:4:4 chroma also works in practice (LinkedIn's stock Lummi banners use it), but 4:2:0 is the safest default. | The script uses `chromaSubsampling: "4:2:0"`. |
| **No alpha channel.** Sharp's PNG-style outputs include an RGBA alpha channel by default. LinkedIn's JPEG validator silently rejects images with alpha even when fully opaque. | The script calls `.flatten({ background: BG })` before JPEG encoding to compose against the charcoal background, dropping any alpha. |
| **No mozjpeg optimization.** LinkedIn's processor has been observed to choke on mozjpeg-optimized JPEGs in some cases. | The script uses `mozjpeg: false`. |
| **No URLs in banner text.** LinkedIn's image classifier OCRs banners and flags any image containing what looks like a website domain. Even the user's own portfolio URL triggers the moderation block. The banner can have a tagline, capability list, etc. — just no URL. | The script's SVG composition contains no URL byline. Earlier versions included `// codyanthony.dev` and were the cause of the upload-failure debugging session. |

### Composition rationale

The banner uses a 4:1 layout (1584×396) with content kept clear of LinkedIn's bottom-left profile-photo overlay zone:

| Element | Position | Job |
|---|---|---|
| Two-line tagline (large sans) | Center-right (x=500) | The value pitch. Clear of the profile-photo overlay zone (bottom-left ~250×250). |
| Capability row (medium sans) | Bottom-center (x=500, y=325) | Substance proof — three categories that mirror the site's OG image. Also kept clear of the profile-photo zone. |

The headshot crop uses **deterministic manual coordinates**, not sharp's `position: "attention"` smart-crop. Attention was tested and produced a left-of-center face because it identified the high-entropy corridor architecture in the source photo as more "interesting" than the face itself. Manual coordinates are tuned to put the face squarely in the horizontal center and place the eye line at ~35% from the top, which is the standard portrait-composition target.

```js
// Source is 1792x2176. Face center ≈ (905, 445).
// Extract 1200x1200 from (305, 20) → face lands at (600, 425) within the extract,
// i.e. centered horizontally, slightly above vertical center. Resize to 1000x1000.
.extract({ left: 305, top: 20, width: 1200, height: 1200 })
.resize(1000, 1000)
```

If the source photo changes, recompute these coordinates — they are not portable.

### Customize

Edit the constants at the top of `generate-linkedin-assets.mjs`:

- **Palette** (`BG`, `TEXT`, `MUTED`, `DIM`, `BORDER`) — pulled from `src/styles/global.css`. Keep in sync with the site OG image script.
- **Banner dimensions** (`BANNER_W`, `BANNER_H`) — LinkedIn's documented spec is 1584×396. Don't change unless LinkedIn updates the spec.
- **SVG text content** — tagline + capability row strings in the SVG template literal.
- **Headshot source** (`SOURCE`) — path to the source photo.
- **Headshot extract box** — the four numbers in the `.extract()` call. Recompute if the source photo changes.
- **Output directory** — defaults to `~/Desktop` via `os.homedir()`. Override at invocation with `OUT_DIR=...`.

### Upload steps

1. **Banner.** LinkedIn → your profile → hover over the existing banner → click the camera icon → **Add background** → upload `~/Desktop/linkedin-banner.jpg`. The image is already at LinkedIn's exact spec (1584×396); no cropping needed.
2. **Headshot.** LinkedIn → your profile → click the profile photo → **Update photo** → upload `~/Desktop/linkedin-headshot.jpg`. LinkedIn's editor will let you fine-tune the circular crop, but the image is already framed for that display mode.

### Troubleshooting upload failures

If a freshly-generated banner fails to upload with "save failed":

1. **Run `file ~/Desktop/linkedin-banner.jpg`.** The output should start with `JPEG image data, JFIF standard 1.01`. If the JFIF marker is missing, the post-processing step didn't run.
2. **Re-upload a previously-working file** (your old banner or a Lummi stock image from LinkedIn's library). If that *also* now fails, the issue is account-side (rate limit, temporary block, LinkedIn service degradation) — not the file. Wait a few hours and retry.
3. **Check for URLs in the banner.** If you've edited the SVG to add a URL byline back in, LinkedIn's classifier will reject the image silently. URLs in banner text are the single most common content-moderation trigger we encountered.
4. **Reduce text density.** Text-heavy banners are at higher risk of being flagged. If the current banner has lots of text and is being rejected despite the rest of the format being correct, try generating a variant with only the tagline (drop the capability row) and see if that uploads.

### What this script does not do

- It does not auto-upload to LinkedIn. LinkedIn has no public profile API for media uploads; uploads happen manually through the LinkedIn UI.
- It does not produce optimized retina variants. The 1000×1000 headshot covers LinkedIn's display sizes at any density.
- It does not validate the resulting file against LinkedIn's actual upload pipeline. The constraints encoded in the script are best-effort based on observed silent-failure modes.

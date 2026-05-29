---
name: blog-checklist
description: Pre-publish checklist for blog posts on the Cody Anthony brand — beat presence, voice scan, anti-pattern scan, frontmatter validation, OG image regeneration. Runs before any post ships to production.
tags: [writing, blog, checklist, pre-publish]
---

# Skill: blog-checklist

## When to load this skill

Load when a blog post draft is complete and ready for pre-publish review. Runs after drafting (via `commands/blog-draft.md`) and as the final gate before merging to `main`.

For mid-draft style guidance, use `ai-antipatterns` and `personal-tone` directly. This skill is the **final gate** — it aggregates checks from those skills, plus structural checks from `blog-post-framework`, plus operational checks specific to publishing.

## The checklist

Run each item against the draft. Report pass/fail per item. Revise the draft before submitting if any item fails.

### Frontmatter validation

- [ ] `title` is present, descriptive, not clickbait
- [ ] `description` is present, one sentence, mirrors what's promised in the post
- [ ] `date` is set to the intended publish date (ISO 8601 format, e.g. `2026-06-08`)
- [ ] `tags` array contains at least 2 topical tags (data-only — UI is deferred)
- [ ] `draft: false` (or absent — default is false)
- [ ] No stray frontmatter fields not defined in `src/content.config.ts`

### Beat presence (per `blog-post-framework`)

- [ ] **Why this** beat establishes stakes by the second paragraph
- [ ] **What's true** beat includes at least one concrete example with detail
- [ ] **What's portable** insight is extractable as a single shareable sentence
- [ ] Opener shape varies from the writer's last 2–3 posts (consult `src/content/blog/` history; skip if fewer than 2 posts exist)

### Voice scan (per `personal-tone`)

- [ ] First-person, present tense (unless retrospective)
- [ ] Contractions natural unless single-sentence weight required
- [ ] Zero "X, not Y" contrast framings
- [ ] No verbatim praise quotes
- [ ] No effort signaling ("huge effort," "really proud of," "after months of work")
- [ ] No sales-pitch closing
- [ ] Canonical title "Documentation Strategist" used where applicable
- [ ] Three-pillar shorthand (Content Strategy / Documentation Systems / AI Workflows) in canonical order if listed inline
- [ ] AI credit explicit where AI did the work
- [ ] Brand phrase "complex software products" appears at most once

### Anti-pattern scan (per `ai-antipatterns`)

- [ ] Zero em dashes in prose (description lists + link lists exempt)
- [ ] No words from `ai-antipatterns` banned-words list (leverage, robust, comprehensive, seamless, etc.)
- [ ] No throat-clearing openers ("It's important to note...," "As you may know...")
- [ ] No summary padding ("In conclusion...," "To summarize...")
- [ ] No forced enthusiasm ("Excited to share...," "This is a game-changer...")
- [ ] No filler transitions ("Let's dive into...," "Without further ado...")
- [ ] No paired synonyms ("detect and identify," "manage and control")
- [ ] No tripled lists for emphasis ("fast, reliable, and efficient")
- [ ] No fake precision (statistics without sources)
- [ ] No emoji, no exclamation points, no scare quotes
- [ ] First sentence of every section leads with the point, not the windup

### Length and pacing

- [ ] Reading time 3–8 min (600–1,600 words) — or longer is justified
- [ ] No section runs more than 4–5 paragraphs without a structural break (subheading, list, code block, blockquote)
- [ ] Closing line delivers the portable insight, not a CTA

### Cross-references

- [ ] Internal links to relevant case studies where natural (cross-pollinates SEO + drives portfolio depth discovery)
- [ ] No broken external links (verify any URLs cited in the post resolve)
- [ ] No internal URLs that point to private/unfinished work

### Operational checks

- [ ] Slug matches filename in `src/content/blog/` (kebab-case, no spaces, no special chars)
- [ ] File extension is `.mdx` (not `.md` — required for any post that uses MDX components like `<Aside>`)
- [ ] OG image regenerated: run `node scripts/generate-blog-og.mjs` from project root
- [ ] OG image exists at `public/og/blog/{slug}.png`
- [ ] `pnpm astro check` passes 0 errors

### Pre-merge

- [ ] Branch is feature branch, not `main`
- [ ] Commit message follows repo convention (imperative, descriptive)
- [ ] Optional: preview deploy via `npx wrangler versions upload` on feature branch
- [ ] Optional: manually visit the preview URL in a browser, read the post end-to-end

### Pre-LinkedIn-share

- [ ] OG card preview displays correctly (test by sharing the URL in a LinkedIn draft and checking the auto-generated preview card)
- [ ] Post URL is direct: `codyanthony.dev/blog/{slug}/`, not the home page
- [ ] LinkedIn share text drafted separately, not just the URL (the share text matters more than the post title for LinkedIn algorithm + click-through)

## Self-check

Before declaring the post ready:

- [ ] All checklist items above either pass or are explicitly waived with reason
- [ ] No item is skipped silently
- [ ] If any item fails and is not addressed, the user is the one deciding to publish anyway — not the AI

## Scope boundary

This skill covers:
- Pre-publish checks aggregated from voice, style, structure, and operational skills
- Frontmatter validation against the project's content collection schema
- Operational gates (OG image regen, astro check, preview deploy)

This skill does **not** cover:
- **Style guidance during drafting** → `ai-antipatterns`, `personal-tone`
- **Structural framework** → `blog-post-framework`
- **Orchestration of the draft → review → save flow** → `commands/blog-draft.md`, `commands/blog-review.md`
- **Post-publish promotion** (LinkedIn share copy, X share, etc.) — out of scope; handled per-post manually

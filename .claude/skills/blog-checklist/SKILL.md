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
- [ ] `description` reads as concrete as (or more concrete than) the strongest line in the post — not a softer abstraction of the thesis. If the description sounds more abstract than the post, revise.
- [ ] `date` is set to the intended publish date (ISO 8601 format, e.g. `2026-06-08`)
- [ ] `tags` array contains at least 2 topical tags (data-only — UI is deferred)
- [ ] `draft: false` (or absent — default is false)
- [ ] For series posts, `series_theme` and `series_theme_url` set if the navigation block uses them
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

### Fact-accuracy scan (per `writer-context`)

Critical check. Drafting agents often generate plausible-sounding claims about the writer's history that don't match reality. Verify every claim about Cody's work history against the `writer-context` skill:

- [ ] All employer + title + date claims match `writer-context`
- [ ] No "founding writer" claim for ROSA (he joined post-GA — see `writer-context` § AWS role specifics)
- [ ] "Founding lead writer" claim used only for EVS, not ROSA
- [ ] No "preview through GA" claim for ROSA (only applies to EVS)
- [ ] No "inherited a backlog" or "took ownership transferred" framing for the AWS XML migration
- [ ] No "wrote alongside Red Hat's technical writers" or similar overstatements of the cross-vendor collab state
- [ ] AWS-side ROSA docs format claim: AsciiDoc (which Cody led the adoption of), not Markdown
- [ ] AWS pre-migration format claim: DocBook XML, not DITA
- [ ] Years-of-experience claims are accurate to the kind of work claimed (e.g., "8 years technical writing" not "8 years content infrastructure")
- [ ] No "non-deterministic logic to systematize complex research" or similar opaque Cloudflare phrasing
- [ ] No banned words (especially `ecosystem` for the Cloudflare solution-guide work — use `collection`, `set`, or `line`)
- [ ] `writer-context` self-check passed

### Anti-pattern scan — deterministic gate (per `ai-antipatterns`)

**Run the script first.** Several anti-patterns are deterministically detectable; the script is the source of truth for those rules, not LLM judgment:

```bash
node scripts/check-blog-prose.mjs src/content/blog/{slug}.mdx
```

The script flags (and the checklist marks pass/fail based on its exit code):

- [ ] Zero em dashes in prose (description lists + link lists exempt) — *script: `em-dash-in-prose`*
- [ ] No words from `ai-antipatterns` banned-words list — *script: `banned-word`*
- [ ] No throat-clearing openers, summary padding, forced enthusiasm, filler transitions, "A common framing in…" patterns — *script: `throat-clearing`*
- [ ] No "Without X, Y. Without Y, X." inversions — *script: `without-inversion`*
- [ ] No triple-repetition (3+ consecutive sentences opening with the same word) — *script: `triple-repetition` (warning)*

**Exit code:** 0 = pass on critical rules; 1 = critical findings. Do not advance past this check until the script exits 0.

### Anti-pattern scan — LLM judgment (per `ai-antipatterns`)

The script does not cover these patterns; they require structural judgment:

- [ ] No aphoristic closing slogans (especially as bookends)
- [ ] Parallel sections render with structural variety (not identical bullet templates across cases/examples)
- [ ] Parallel examples developed to comparable depth (per `blog-post-framework`)
- [ ] Artifacts named where legitimately nameable (own work or public); abstracted only for NDA/proprietary/reputational concerns. Vague references to artifacts that *could* be named are a substance gap.
- [ ] No paired synonyms ("detect and identify," "manage and control")
- [ ] No tripled lists for emphasis ("fast, reliable, and efficient")
- [ ] No fake precision (statistics without sources)
- [ ] No emoji, no exclamation points, no scare quotes
- [ ] First sentence of every section leads with the point
- [ ] No buzz-shape phrases reaching for weight through abstraction, not the windup

### Length and pacing

- [ ] Word count in a comfortable range (~600–1,200); shorter or longer is fine if every section earns its place (no reading-time targets — word count is the measure)
- [ ] No section runs more than 4–5 paragraphs without a structural break (subheading, list, code block, blockquote)
- [ ] Closing line delivers the portable insight, not a CTA

### Cross-references

- [ ] Internal links to relevant case studies where natural (cross-pollinates SEO + drives portfolio depth discovery)
- [ ] No broken external links (verify any URLs cited in the post resolve)
- [ ] No internal URLs that point to private/unfinished work

### Operational checks

- [ ] Slug matches filename in `src/content/blog/` (kebab-case, no spaces, no special chars)
- [ ] File extension is `.mdx` (not `.md` — required for any post that uses MDX components like `<Aside>`)
- [ ] OG card reads well at the post `title` (rendered dynamically by `/og/[slug].png` and cached to R2 — no static file to generate or commit)
- [ ] `pnpm astro check` passes 0 errors
- [ ] `node scripts/check-blog-prose.mjs src/content/blog/{slug}.mdx` exits 0

### Series-specific checks (only if `series` frontmatter field is set)

Per `series-blocks` skill:

- [ ] All `CONFIRM PRE-LAUNCH` placeholders filled in with real values
- [ ] Series intro block present at top of body (after frontmatter, before prose)
- [ ] Series navigation block present at bottom of body (after a `---` horizontal rule)
- [ ] Disclaimer block (where required by the series) present unchanged
- [ ] All URLs in the series blocks resolve (no 404)
- [ ] Author names and post titles match coordinator confirmation

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

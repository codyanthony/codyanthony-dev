---
name: blog-checklist
description: Pre-publish checklist for blog posts on the Cody Anthony brand — blueprint consistency, beat presence, voice scan, anti-pattern scan, frontmatter validation, dynamic OG card checks, and operational gates. Runs before any post ships to production.
tags: [writing, blog, checklist, pre-publish]
---

# Skill: blog-checklist

## When to load this skill

Load when a blog post draft is complete and ready for pre-publish review. Runs after drafting (via `commands/blog-draft.md`) and as the final gate before merging to `main`.

For mid-draft style guidance, use `ai-antipatterns` and `personal-tone` directly. This skill is the **final gate** — it aggregates checks from blueprint context, voice rules, style rules, structural checks from `blog-post-framework`, systems-writing checks where applicable, and operational checks specific to publishing.

## The checklist

Run each item against the draft. Report pass/fail/skip per item. Revise the draft before submitting if any item fails.

### Frontmatter validation

- [ ] `title` is present, descriptive, not clickbait
- [ ] `description` is present, one sentence, mirrors what's promised in the post
- [ ] `description` reads as concrete as (or more concrete than) the strongest line in the post — not a softer abstraction of the thesis. If the description sounds more abstract than the post, revise.
- [ ] `date` is set to the intended publish date (ISO 8601 format, e.g., `2026-06-08`)
- [ ] `tags` array contains at least 2 topical tags (data-only — UI is deferred)
- [ ] `draft: false` (or absent — default is false)
- [ ] For series posts, `series_theme` and `series_theme_url` set if the navigation block uses them
- [ ] No stray frontmatter fields not defined in `src/content.config.ts`

### Blueprint consistency, if `.claude/plans/{slug}.md` exists

- [ ] Motivating question is preserved: the draft is still driven by the question the plan identified, not merely by the topic.
- [ ] Violated expectation is preserved: the draft carries what the writer expected, assumed, or believed before the work complicated it.
- [ ] Central claim is preserved: the draft answers or complicates the planned claim rather than drifting into a neighboring idea.
- [ ] Architecture is preserved: the draft uses the blueprint's governing structure unless the drift clearly improves the post.
- [ ] Reader movement is preserved: the draft moves from starting point → first pressure → escalation → turn → landing, or an intentionally improved equivalent.
- [ ] Draft has not collapsed into a static framework tour unless enumeration is explicitly the intended reader movement.
- [ ] Anchor story is preserved or any change is explicitly justified.
- [ ] Evidence map is represented: each required part / move appears in the draft.
- [ ] Collision events are present: every load-bearing example includes the pressure that made the example matter.
- [ ] Beat outline is satisfied as content checks, not rendered as a visible template.
- [ ] Blueprint drift is classified: no drift, drafting-level drift, beneficial blueprint-level drift, or accidental blueprint-level drift.
- [ ] Beneficial blueprint-level drift has been reflected back into `.claude/plans/{slug}.md` before publish.
- [ ] Accidental blueprint-level drift has been repaired or explicitly accepted by the writer.

If no blueprint exists, mark this section `SKIP — no blueprint found`; do not invent blueprint failures.

### Beat presence (per `blog-post-framework`)

- [ ] **Why this** beat establishes stakes by the second paragraph
- [ ] Opener authenticity: the opener connects to the motivating question, violated expectation, starting point, or first pressure. It could not open any generic article on the topic.
- [ ] **What's true** beat develops the chosen architecture through concrete examples, evidence-map moments, collision events, and reader movement
- [ ] **What's portable** insight is extractable as a single shareable sentence
- [ ] Opener shape varies from the writer's last 2–3 posts (consult `src/content/blog/` history; skip if fewer than 2 posts exist)
- [ ] Opener earns its abstraction (`blog-post-framework` → Earn the abstraction): an abstraction-first opener is paid off with concrete evidence, not merely decorated

### Structural integrity (per `blog-post-framework`)

- [ ] Every example passes the deletion test (remove it; if the argument loses nothing essential, it is decoration) — run per example, not once per beat
- [ ] Every load-bearing example has a collision event: a decision, tradeoff, ambiguity, contradiction, failed assumption, boundary condition, consequence, escalation, or changed understanding. If the example only illustrates a claim already made, revise or cut it.
- [ ] Reader movement is clear: the post changes the reader's understanding as it moves, rather than presenting a static framework or list of parts.
- [ ] Paragraph rhythm varies: the post does not stack too many thesis-heavy, abstraction-first, or equally emphatic paragraphs in a row.
- [ ] Emphasis density is controlled: high-weight claims have room to land through concrete detail, consequence, transition, or quieter observation.
- [ ] Paragraph functions vary across the post: observation, example, pressure, interpretation, transition, consequence, earned claim, and landing are not all rendered in the same shape.
- [ ] No architecture announcement unless the architecture itself is the story. The post should not overexplain its own structure.
- [ ] One dominant idea per section; no two competing decompositions overloaded into one section
- [ ] Conclusion thesis discipline: the final-emphasis positions (last sentence, and the sentence closing the penultimate paragraph) land the thesis, not a supporting idea
- [ ] Conclusion lands as discovery: the ending carries the changed understanding the post earned, not a summary of the architecture, a restated central claim, or a slogan.
- [ ] Final sentence emerges from the post's evidence, collision events, reader movement, or violated expectation. It could not be attached unchanged to any competent article on the topic.
- [ ] **Systems posts only:** the served party stays visible — a reader can answer "who cares?" from the blog post (`systems-writing` → Keep the served party visible; skip for non-systems posts)

### Systems-writing checks, for systems posts

- [ ] The selected system-shaped or inquiry-shaped architecture still fits the draft.
- [ ] The served party stays visible — a reader can answer "who cares?" from the blog post.
- [ ] Collision events are present for load-bearing examples.
- [ ] The draft does not force an inquiry post into a layer decomposition.
- [ ] The draft does not convert a changed-belief post into a static framework tour.
- [ ] Sensitive examples are abstracted or screened when needed.

Skip this section for non-systems posts.

### Voice scan (per `personal-tone`)

- [ ] First-person, present tense (unless retrospective)
- [ ] Contractions natural unless single-sentence weight required
- [ ] Builder voice: recounts what was built or observed, not blogger/philosophy drift; abstraction sits after the evidence (`personal-tone` → Builder voice)
- [ ] Zero "X, not Y" contrast framings, including the variants ("doesn't X but Y," "not in A but in B," "instead of X, Y," the negative cleft "what X couldn't do was Y")
- [ ] No verbatim praise quotes
- [ ] No effort or scale flexing ("huge effort," "really proud of," "after months of work," difficulty-flex variants); scale mentioned only when it explains the system's behavior
- [ ] No sales-pitch closing
- [ ] Canonical title "Documentation Strategist" used where applicable
- [ ] Three-pillar shorthand (Content Strategy / Documentation Systems / AI Workflows) in canonical order if listed inline
- [ ] AI credit explicit where AI did the work
- [ ] Brand phrase "complex software products" appears at most once
- [ ] Employer abstracted by default in blog/craft posts unless naming is essential to the argument (`personal-tone` → Employer identity)

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

- [ ] Zero em dashes in prose (description lists + link lists exempt) — _script: `em-dash-in-prose`_
- [ ] No words from `ai-antipatterns` banned-words list — _script: `banned-word`_
- [ ] No throat-clearing openers, summary padding, forced enthusiasm, filler transitions, "A common framing in…" patterns — _script: `throat-clearing`_
- [ ] No "Without X, Y. Without Y, X." inversions — _script: `without-inversion`_
- [ ] No triple-repetition (3+ consecutive sentences opening with the same word) — _script: `triple-repetition` (warning)_

**Exit code:** 0 = pass on critical rules; 1 = critical findings. Do not advance past this check until the script exits 0.

### Anti-pattern scan — LLM judgment (per `ai-antipatterns`)

The script does not cover these patterns; they require structural judgment:

- [ ] No aphoristic closing slogans (especially as bookends); apply the final-line test — does the ending land on an observation or on a maxim? (`ai-antipatterns` → Aphoristic slogan closings)
- [ ] Parallel sections render with structural variety (not identical bullet templates across cases/examples)
- [ ] Parallel examples developed to comparable depth (per `blog-post-framework`)
- [ ] Artifacts named where legitimately nameable (own work or public); abstracted only for NDA/proprietary/reputational concerns. Vague references to artifacts that _could_ be named are a substance gap.
- [ ] No paired synonyms ("detect and identify," "manage and control")
- [ ] No tripled lists for emphasis ("fast, reliable, and efficient")
- [ ] No fake precision (statistics without sources)
- [ ] No emoji, no exclamation points, no scare quotes
- [ ] First sentence of every section leads with the point
- [ ] No buzz-shape phrases reaching for weight through abstraction, not the windup

### Length and pacing

- [ ] Word count in a comfortable range (~600–1,200); shorter or longer is fine if every section earns its place (no reading-time targets — word count is the measure)
- [ ] No section runs more than 4–5 paragraphs without a structural break (subheading, list, code block, blockquote)
- [ ] Closing line delivers the portable insight as discovered understanding, not a CTA, slogan, summary, or generic maxim

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

- [ ] OG card preview displays correctly (test with LinkedIn Post Inspector or by sharing the URL in a LinkedIn draft and checking the auto-generated preview card)
- [ ] Post URL is direct: `codyanthony.dev/blog/{slug}/`, not the home page
- [ ] LinkedIn share text drafted separately, not just the URL (the share text matters more than the post title for LinkedIn algorithm + click-through)

## Self-check

Before declaring the post ready:

- [ ] All checklist items above either pass, skip with reason, or are explicitly waived with reason
- [ ] No item is skipped silently
- [ ] If any item fails and is not addressed, the user is the one deciding to publish anyway — not the AI
- [ ] If the draft changed the plan in a meaningful way, the blueprint was updated or the writer explicitly waived the mismatch.

## Scope boundary

This skill covers:

- Blueprint consistency checks when `.claude/plans/{slug}.md` exists
- Pre-publish checks aggregated from blueprint, voice, style, structure, systems-writing, and operational skills
- Frontmatter validation against the project's content collection schema
- Operational gates (dynamic OG card verification, astro check, preview deploy)

This skill does **not** cover:

- **Style guidance during drafting** → `ai-antipatterns`, `personal-tone`
- **Structural framework** → `blog-post-framework`
- **Systems-writing architecture and evidence guidance** → `systems-writing`
- **Orchestration of the draft → review → save flow** → `commands/blog-draft.md`, `commands/blog-review.md`
- **Post-publish promotion** (LinkedIn share copy, X share, etc.) — out of scope; handled per-post manually

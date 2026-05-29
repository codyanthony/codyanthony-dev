---
description: Draft a blog post for codyanthony.dev/blog/ using the three-beat framework, personal-tone voice, and ai-antipatterns universal style guide. Saves to src/content/blog/{slug}.mdx and regenerates the per-post OG image.
version: 1.0
---

# /blog-draft

Drives a blog post from idea to ready-to-merge draft. Orchestrates four skills (`ai-antipatterns`, `personal-tone`, `blog-post-framework`, `blog-checklist`) and the OG image generator script.

> **Running blog-draft v1.0** — Idea → outlined three beats → drafted with voice → pre-publish checklist → saved to `src/content/blog/`. Per-post OG image regenerated. Does not deploy; merge to `main` is a separate step.

Print the banner above verbatim before doing anything else.

## Dependencies

**Required skills:** `ai-antipatterns` (universal negative style guide), `personal-tone` (voice + brand alignment), `blog-post-framework` (three-beat structure), `blog-checklist` (pre-publish gates).

**Required scripts:** `scripts/generate-blog-og.mjs` (per-post OG image generation).

**Required tools:** Read, Write, Bash. No external network calls beyond what the OG script does locally.

**Optional:** preview deploy via `npx wrangler versions upload` (manual, post-save).

## Step 0: Load skills

Load all four skills in order:

1. `.claude/skills/ai-antipatterns/SKILL.md` (universal style guide — banned words, phrases, structural antipatterns, em-dash rules)
2. `.claude/skills/personal-tone/SKILL.md` (voice + brand alignment — first-person, present-tense, three pillars, canonical title)
3. `.claude/skills/blog-post-framework/SKILL.md` (three beats, opener shapes, length guidance)
4. `.claude/skills/blog-checklist/SKILL.md` (pre-publish checks, used in Step 5)

If any skill is missing, **STOP** and report which one. Do not attempt to draft without all four.

## Step 1: Gather input from the user

Ask the user these four questions, one at a time. Wait for each answer before asking the next.

### Q1: Core idea

> What's the core idea of this post — in one sentence? This is the portable insight readers should leave with.

If the user's answer is vague ("documentation strategy," "AI for tech writers"), push for specificity. The portable insight beat in `blog-post-framework` is the test: can the reader extract a single shareable sentence? If the user can't articulate the insight in one sentence, the post isn't ready to draft yet.

### Q2: Concrete examples

> What 1–3 specific examples will you use to illustrate this idea? Real situations from your work, ideally.

If the user offers only abstract examples, ask for the concrete version. Per `blog-post-framework`, abstract argument without concrete example is generic.

### Q3: Audience

> Who's the primary reader? (e.g., junior tech writers, hiring managers, AI-curious docs practitioners, senior content strategists)

The audience shapes the substance beat. A post for junior writers needs different scaffolding than a post for senior practitioners.

### Q4: Opener shape preference

> Any preference for opener shape? Options from `blog-post-framework`:
> - Vivid concrete scenario
> - Surprising claim / reframe
> - Personal anecdote with universal resonance
> - Genuine question
> - Metric-led / defamiliarizing data
> - Connect-to-prior-work
> - Counterintuitive observation
> - Quote-led (only if the quote earns its place)
>
> Or describe a different shape. If unsure, say "your call" — I'll pick what fits.

Before drafting, list any post slugs in `src/content/blog/` and check whether the most recent 2–3 posts have used the same opener shape. If so, recommend a different shape.

### Q5: Optional fourth beat

> Should the post include a "What's next" beat (invitation to engage)? Per `blog-post-framework`, include only when natural — skip when forced.

## Step 2: Confirm slug and outline

Propose a slug derived from the core idea:
- kebab-case
- no special characters
- 2–4 words ideally
- file extension `.mdx`

Show the user: "Slug: `{slug}` — file will save to `src/content/blog/{slug}.mdx`. Accept or propose a different slug?"

Then sketch the three beats in 1–2 sentences each:

```
Beat 1 (Why this): {one-sentence sketch of the opener + stakes}
Beat 2 (What's true): {one-sentence sketch of the substance, naming the example(s)}
Beat 3 (What's portable): {the one-sentence insight, verbatim from Q1}
Beat 4 (optional, What's next): {one-sentence sketch, or "skip"}
```

Ask: "Outline correct? Adjust any beat, or proceed to draft?"

Wait for confirmation before drafting.

## Step 3: Draft

Write the full post body. Apply:

- **`blog-post-framework`** — three beats present, opener shape per Q4, length 3–8 min reading time target
- **`personal-tone`** — first-person, present-tense, contractions natural, no contrast framing, brand-aligned
- **`ai-antipatterns`** — universal style banishments, zero em dashes in prose, no banned words

Compose the frontmatter:

```yaml
---
title: "{post title}"
description: "{one-sentence description for meta tag + RSS}"
date: {publish date in YYYY-MM-DD format}
tags: [{2+ topical tags}]
draft: false
---
```

Use today's date by default; ask user if a future publish date is intended.

Show the user the full draft (frontmatter + body) inline. Do not save yet.

## Step 4: Self-check against blog-checklist

Run the `blog-checklist` skill against the draft. Report each item's pass/fail result. Format:

```
## blog-checklist results

### Frontmatter
[✓ / ✗] title present, descriptive
[✓ / ✗] description present, one sentence
[✓ / ✗] date set
...

### Beat presence
[✓ / ✗] Why this — stakes by paragraph 2
[✓ / ✗] What's true — at least one concrete example
[✓ / ✗] What's portable — extractable as single shareable sentence
[✓ / ✗] Opener shape varies from recent posts
...

### Voice scan
[✓ / ✗] First-person, present-tense
[✓ / ✗] No "X, not Y" contrast framings
[✓ / ✗] No effort signaling
...

### Anti-pattern scan
[✓ / ✗] Zero em dashes in prose
[✓ / ✗] No banned words
[✓ / ✗] No throat-clearing openers
...

### Length
Word count: {N}
Reading time: ~{N} min
[✓ / ✗] Length 3–8 min or justified
```

For each failure, propose the specific fix and ask the user to confirm before applying.

## Step 5: User review + revisions

Present the revised draft. Offer the user options:

> Draft is ready. Options:
>
> - `accept` — save to `src/content/blog/{slug}.mdx` and regenerate OG image
> - `revise` — describe what to change
> - `review` — run `/blog-review` for adversarial review before accepting (recommended for high-stakes posts)
> - `cancel` — exit without saving

If user picks `revise`, apply edits and loop back to Step 4 (re-run checklist).

If user picks `review`, hand off to `/blog-review` command. Apply review fixes and loop back to Step 4.

If user picks `cancel`, exit without writing the file.

## Step 6: Save and run deterministic gates

On `accept`, run these steps in order. **All are deterministic — defer to scripts and tools, do not reimplement in LLM context.**

1. **Write the file.** Use the Write tool to save `src/content/blog/{slug}.mdx`.
2. **Regenerate OG images.** Run `node scripts/generate-blog-og.mjs` via Bash. This regenerates per-post OG images for every post in `src/content/blog/`, including the new one. (Deterministic given frontmatter.)
3. **Verify the OG image landed.** Check `public/og/blog/{slug}.png` exists via `test -f`. If missing, report and **STOP** — do not declare success.
4. **Run astro check.** Run `pnpm astro check` via Bash. If exit code is non-zero or output reports errors, report the errors and **STOP** — do not declare success. (Catches MDX syntax errors, missing imports, frontmatter schema violations.)
5. **Word count + reading time confirmation.** Compute word count from the post body (`wc -w` via Bash on the file with frontmatter stripped, or count tokens in the body string). Reading time = `ceil(words / 200)`. Verify reading time is 3–8 min unless the writer explicitly justified longer.
6. **Report:**

```
Saved: src/content/blog/{slug}.mdx
OG image: public/og/blog/{slug}.png ({W}x{H}, {KB}KB)
Frontmatter:
  title: {title}
  date: {date}
  tags: {tags}

Next steps:
- Commit and push to feature branch
- Optional: npx wrangler versions upload (preview deploy)
- Merge to main when ready
- Share post URL on LinkedIn with separate share-text draft
```

## Rules

- **Skills are canonical.** Do not override `ai-antipatterns` or `personal-tone` rules for stylistic preference within a single post. If the user asks for an em dash, refuse — point to the exceptions list and explain. If the user disagrees with a banned word, capture the disagreement and ask them to edit the skill rather than work around it.
- **No invention.** Do not introduce examples, metrics, or quotes the user did not provide. If a beat needs an example and the user didn't offer one, pause and ask.
- **AI credit honesty.** If the user prompts a draft with minimal input ("write 800 words on content alchemy"), the post is AI-drafted. Apply `personal-tone`'s AI-credit-explicit rule — name the AI involvement somewhere in the post if it was substantive.
- **No save without checklist pass.** If any checklist item fails and the user has not explicitly waived it, the file does not get written.
- **One post per invocation.** This command drafts a single post. Multi-post sessions invoke the command separately for each.

---
description: Draft a blog post for codyanthony.dev/blog/ using the three-beat framework, personal-tone voice, and ai-antipatterns universal style guide. Interactive flow with branch management, system-generated proposals, series support, deterministic-script validation, and optional commit/deploy.
version: 1.0
---

# /blog-draft

Drives a blog post from idea to ready-to-merge draft. Eight phases: Setup → Inputs → Proposals → Compose → Validate → Review → Save → Ship. Each phase gates on user confirmation; the deterministic script runs before LLM judgment during validation.

> **Running blog-draft v1.0** — Skill load + verification gate → branch management → interactive inputs (six questions, one at a time) → system proposals (title, slug, outline, tags) → compose direct to file → deterministic + LLM validation → user review → deterministic save gates → optional commit/deploy.

Print the banner above verbatim before doing anything else. Then print:

> Type `cancel` at any point to exit. Files already written will be preserved with `draft: true` in frontmatter — re-run `/blog-draft` on the same slug to resume.

## Dependencies

**Required skills (must load before drafting begins):**

- `.claude/skills/ai-antipatterns/SKILL.md` — universal negative style guide (canonical)
- `.claude/skills/personal-tone/SKILL.md` — voice, brand alignment, audience layering
- `.claude/skills/blog-post-framework/SKILL.md` — three-beat structure, opener shapes
- `.claude/skills/blog-checklist/SKILL.md` — pre-publish gates

**Loaded conditionally (in Phase 1 Q4 if post is series-participating):**

- `.claude/skills/series-blocks/SKILL.md` — intro/navigation block templates

**Required scripts:**

- `scripts/check-blog-prose.mjs` — deterministic prose validation
- `scripts/generate-blog-og.mjs` — per-post OG image generation

**Required tools:** Read, Write, Bash, Edit. Bash for git operations, script invocation, file existence checks, and `pnpm astro check`.

---

## Phase 0: Setup

### 0a. Skill loading and verification gate

Load all required skills via Read (skill auto-discovery via the Skill tool may not surface project-local skills depending on Claude Code session configuration; Read is the reliable path).

Confirm each skill is loaded by listing one key rule from each in this format:

```
Skills loaded:
  [x] ai-antipatterns — "Zero em dashes in prose (description lists / link lists exempt)"
  [x] personal-tone — "Audience layering: peers primary, recruiters always reading too"
  [x] blog-post-framework — "Three beats: Why this / What's true / What's portable"
  [x] blog-checklist — "Deterministic gate runs check-blog-prose.mjs before LLM judgment"
```

**Do not proceed past this gate until all four skills are confirmed in context.** If any failed to load, report which one and stop.

### 0b. Branch management

Detect current branch:

```bash
CURRENT_BRANCH=$(git -C . branch --show-current)
echo "Current branch: $CURRENT_BRANCH"
```

**If `CURRENT_BRANCH` is `main`:** drafting on main is not allowed without explicit override. Prompt:

```
Current branch: main

Drafting on main is not recommended — feature branches keep production
deploy safety and let you preview without affecting the live site.

Options:
  setup     Create a feature branch (named blog/wip-{YYYY-MM-DD}; renamed to blog/{slug} in Phase 2)
  continue  Proceed on main (you'll need to manage commits and deploy carefully)
  cancel    Exit
```

Wait for response.

- `setup`: if working tree has uncommitted changes, prompt `stash / commit / discard / cancel`. After resolution, run:
  ```bash
  git -C . checkout main
  git -C . pull origin main
  git -C . checkout -b "blog/wip-$(date +%Y-%m-%d)"
  ```
  This branch will be renamed to `blog/{slug}` in Phase 2 once the slug is chosen.
- `continue`: proceed on main, print warning.
- `cancel`: exit.

**If `CURRENT_BRANCH` starts with `blog/`:** existing feature branch. Ask:

```
On existing feature branch: {branch}

Options:
  continue  Use this branch (draft will save to this branch)
  new       Create a new blog/wip-{date} branch off main
  cancel    Exit
```

**If `CURRENT_BRANCH` is any other branch:** ask:

```
On branch: {branch}

Options:
  stay      Stay on this branch (draft will save to it)
  setup     Create a blog/wip-{date} branch off main
  cancel    Exit
```

Print the resolved branch and proceed.

---

## Phase 1: Inputs

Six questions. **Ask each, wait for the user's answer, then ask the next.** Do not batch.

### Q1: Core idea

> What's the core idea of this post — in one sentence? This is the portable insight readers should leave with.

If the answer is vague ("documentation strategy," "AI tools"), push for specificity. The portable-insight beat is the test: can a reader extract a single shareable sentence from the post? If the writer can't articulate the insight in one sentence, the post isn't ready to draft.

Wait for confirmation before asking Q2.

### Q2: Concrete examples

> What 1–3 specific situations from your work will you anchor the idea in? Real examples with detail.

If the writer offers abstract examples, ask for the concrete version. Per `blog-post-framework`, abstract argument without concrete example is generic.

Wait for the writer to confirm the examples list.

### Q3: Primary audience

> Who's the primary reader? Examples: junior tech writers, senior peers, AI-curious docs practitioners, hiring managers.

Per `personal-tone` audience layering: the post serves a primary audience while remaining legible to recruiters (always-reading secondary). The primary answer shapes substance choices.

Wait for the answer.

### Q4: Series participation

> Is this post part of a collaborative series or roundup? (yes / no)

If `no`: continue without loading `series-blocks`.

If `yes`: ask which series. Currently supported (the `series` enum in `src/content.config.ts`):
- `per-the-docs`

If the writer names a series not in the enum, STOP: "The `series` enum in `src/content.config.ts` does not include `{name}`. Extend the enum and add a section to `series-blocks/SKILL.md` before drafting."

Load `series-blocks/SKILL.md` and confirm the chosen series template is documented.

### Q5: Publish date

> What date should the post be dated? Default is today ({YYYY-MM-DD}).

Accept today's date or a future date. Use ISO 8601 (YYYY-MM-DD). For series posts, the date should match the coordinator's confirmed publish window.

### Q6: Opener shape preference

> Any preference for opener shape? Options from `blog-post-framework`:
> - Vivid concrete scenario
> - Surprising claim / reframe
> - Personal anecdote with universal resonance
> - Genuine question
> - Metric-led / defamiliarizing data
> - Connect-to-prior-work
> - Counterintuitive observation
> - Quote-led
>
> Or "your call" — I'll pick the shape that fits the post's substance.

If "your call": before generating the outline in Phase 2e, check `src/content/blog/` for recent posts and avoid shapes used in the last 2-3 posts (per `blog-post-framework`'s opener-variety rule).

---

## Phase 2: Proposals

System generates each artifact; writer confirms or proposes alternative.

### 2a. Title

Generate **3–5 distinct title candidates** based on Phase 1 inputs. Constraints:

- No buzzwords from `ai-antipatterns` banned-words list
- No "X, not Y" contrast framing (per `personal-tone`)
- No anchoring on "Documentation Strategist" as the hook
- Lead with substance, not brand
- Vary across shapes: descriptive, provocative, structural, scene-led — at least three distinct shapes

Present with brief framing notes:

```
Title candidates:

A. {title} — {frame: e.g., "Descriptive; promises N concrete examples"}
B. {title} — {frame: e.g., "Provocative; sets up a contrarian claim"}
C. {title} — {frame: e.g., "Structural; promises a teardown"}
D. {title} — {frame: ...}
E. {title} — {frame: ...}

Pick A / B / C / D / E, or propose your own.
```

If the writer dislikes all five, regenerate once with their feedback. Cap regeneration at two rounds — if no fit after two, stop and ask the writer to articulate what's missing.

### 2b. Slug

Derive 2–3 slug variants from the chosen title:

- kebab-case, no special characters
- 2–4 words ideally
- Reads well as a permanent URL
- Doesn't repeat brand framing in URL form

```
Slug candidates (file will save to src/content/blog/{slug}.mdx):

A. {slug-a}
B. {slug-b}
C. {slug-c}

Pick or propose your own.
```

### 2c. Existing-draft check

Check whether `src/content/blog/{slug}.mdx` already exists:

```bash
test -f "src/content/blog/{slug}.mdx" && echo "EXISTS" || echo "NEW"
```

If `EXISTS`: prompt:

```
A draft already exists at src/content/blog/{slug}.mdx (dated {date}, {N} words).

Options:
  resume      Load the existing content as the starting point; continue at Phase 4 (validate)
  overwrite   Delete existing and start fresh
  rename      Return to Phase 2b for a different slug
  cancel      Exit; existing file untouched
```

Behavior:
- `resume`: read the file, skip to Phase 4. Skip Phases 2d (branch rename — assume already on the right branch), 2e (outline), 2f (tags), and Phase 3 (compose).
- `overwrite`: delete file with `rm`, continue normally to Phase 2d.
- `rename`: return to Phase 2b.
- `cancel`: exit with no changes.

### 2d. Branch rename

If currently on `blog/wip-{date}` (created in Phase 0b), rename to `blog/{slug}`:

```bash
git -C . branch -m "blog/{slug}"
```

If on any other branch, leave alone.

### 2e. Outline

Generate a three-beat outline (plus optional fourth beat for series or invitation-to-engage):

```
Beat 1 (Why this — stakes + opener): {one-paragraph sketch}
  Opener shape: {chosen per Q6, or system-picked if "your call"}

Beat 2 (What's true — substance): {one-paragraph sketch}
  Examples integrated:
    - {Example 1 from Q2 — how it appears in the post}
    - {Example 2 from Q2 — how it appears}
    - {Example 3 from Q2 — how it appears}

Beat 3 (What's portable): {the one-sentence insight from Q1, plus any sharpening notes}

Beat 4 (What's next — optional): {if series, "series navigation block per series-blocks template"; otherwise "skip" or a brief invitation-to-engage line}
```

Present and ask: "Outline correct? Adjust any beat, or proceed?"

Wait for writer confirmation. If revisions, regenerate the affected beat and re-present.

### 2f. Tags

Generate 3–5 topical tags from Q3 audience + Q1 insight + chosen title. Present:

```
Tag proposal: ["{tag-a}", "{tag-b}", "{tag-c}", "{tag-d}"]

Confirm, edit, or replace.
```

Wait for writer confirmation.

---

## Phase 3: Compose

Write the draft directly to `src/content/blog/{slug}.mdx`. **Do not show the draft inline in chat.** Print a structured summary instead; the writer inspects the file in VS Code.

### Composition rules

Apply all loaded skills during composition:

- **`blog-post-framework`** — three beats present, opener shape per Q6, length 3–8 min reading time target, section rendering varies (no schematic-identical templates across parallel sections)
- **`personal-tone`** — first-person, present tense, contractions natural, no contrast framing, no effort signaling, audience layering, brand alignment
- **`ai-antipatterns`** — universal style banishments, zero em dashes in prose, no banned words, no aphoristic closings, no "Without X, Y. Without Y, X." inversions, no triple parallel construction
- **`series-blocks`** (if applicable) — insert intro block at top of body, navigation block at bottom

### Frontmatter

```yaml
---
title: "{post title}"
description: "{one-sentence description}"
date: {publish date from Q5}
tags: [{confirmed tags from 2f}]
draft: false
{if series} series: {series-slug from Q4}
---
```

### Body order

1. **If series:** insert intro block at the top (per `series-blocks` template, `[CONFIRM PRE-LAUNCH: ...]` placeholders for unknowns)
2. **Beat 1** (Why this)
3. **Beat 2** (What's true) — with concrete examples integrated
4. **Beat 3** (What's portable)
5. **Beat 4** (What's next) — if applicable
6. **If series:** insert navigation block at the bottom (after a `---` horizontal rule)

### Write the file

Use the Write tool to save to `src/content/blog/{slug}.mdx`.

### Structured summary

After write, print:

```
Composed: src/content/blog/{slug}.mdx
  Word count: {N}
  Reading time: ~{N} min
  Beats present: Why this / What's true / What's portable / What's next ({yes|skip})
  Series: {series-slug or "standalone"}
  CONFIRM PRE-LAUNCH placeholders: {N}
  Branch: {current-branch}

Open the file in VS Code for inspection before validation.
```

---

## Phase 4: Validate

### 4a. Deterministic gate (script)

Run the prose-check script against the saved file:

```bash
node scripts/check-blog-prose.mjs src/content/blog/{slug}.mdx
```

If exit code is `0`: pass. Continue to 4b.

If exit code is `1` (critical findings): present each finding with the script's output. For each finding, propose a specific fix and ask the writer:

```
Finding: {rule}
  L{line} [{severity}] {text}
  Suggested fix: {specific replacement}

Apply? (yes / edit / skip)
```

- `yes`: apply the proposed fix via the Edit tool
- `edit`: ask writer for their fix, apply
- `skip`: leave as-is; writer accepts the finding

After all findings resolved, re-run the script. If still failing, loop until exit `0` or writer abandons (in which case, exit to Phase 5 review).

### 4b. LLM-judgment checks

Run the LLM-judgment items from `blog-checklist` (the items the script does not cover):

- Beat presence (Why this, What's true, What's portable, optional What's next)
- Aphoristic closing slogans (especially as bookends)
- Schematic-identical templates across parallel sections
- Paired synonyms, tripled lists for emphasis, fake precision
- Voice scan (audience layering, AI credit explicit, no verbatim praise, no effort signaling)
- Length is 3–8 min or justified
- Internal links to relevant case studies where natural
- Series checks (if applicable): placeholders flagged, intro/nav blocks present

Report each item pass/fail per `blog-checklist`'s format. For each failure, propose the fix with the same `yes / edit / skip` interaction.

Print structured summary:

```
Validation:
  Deterministic (check-blog-prose.mjs): 0 critical, {N} warnings
  LLM checklist: {P} pass / {F} fail
  {if fails: list each fail with line + brief description}
```

---

## Phase 5: Review

Present:

```
Draft is ready for review.

File: src/content/blog/{slug}.mdx
Branch: {current-branch}

Options:
  accept    Proceed to Save phase
  revise    Describe what to change; loop back to relevant phase
  review    Run /blog-review for an adversarial second pass (recommended for series posts)
  cancel    Set draft: true in frontmatter, preserve file, exit
```

Behavior:

- `accept`: continue to Phase 6.
- `revise`: ask which phase to loop back to (compose, validate). Apply the writer's described changes via Edit. Re-run validation.
- `review`: invoke `/blog-review` on the file. Apply findings, then return to Phase 5.
- `cancel`: edit the frontmatter to set `draft: true`, print "Draft preserved at `src/content/blog/{slug}.mdx` with draft: true. Branch `{current-branch}` retained. Re-run /blog-draft on slug `{slug}` to resume." Exit.

For series posts, recommend `review` strongly (cross-author chain raises stakes).

---

## Phase 6: Save (deterministic gates)

All steps deterministic. Defer to scripts and tools. Each gate must pass before declaring success.

### 6a. Regenerate OG image

```bash
node scripts/generate-blog-og.mjs
```

### 6b. Verify OG image exists

```bash
test -f "public/og/blog/{slug}.png" && echo "OG_OK" || echo "OG_MISSING"
```

If `OG_MISSING`: STOP. Report the failure.

### 6c. Run astro check

```bash
pnpm astro check
```

If exit code is non-zero: STOP. Report errors.

### 6d. Re-run prose-check against saved file

```bash
node scripts/check-blog-prose.mjs src/content/blog/{slug}.mdx
```

If exit code is non-zero: STOP. This catches anything that got reintroduced between Phase 4 and now.

### 6e. Word count + reading time

```bash
# Strip frontmatter, count words
WORDS=$(awk 'BEGIN{f=0} /^---$/{f++; next} f==2{print}' src/content/blog/{slug}.mdx | wc -w | tr -d ' ')
READING_TIME=$(( (WORDS + 199) / 200 ))
echo "WORDS=$WORDS READING_TIME=${READING_TIME}min"
```

If reading time is outside 3–8 min and the writer didn't justify longer, flag as a warning (don't block).

Print summary:

```
Save gates passed:
  OG image regenerated: public/og/blog/{slug}.png
  pnpm astro check: 0 errors
  check-blog-prose.mjs: 0 critical
  Reading time: {N} min
```

---

## Phase 7: Ship (optional)

### 7a. Commit

```
Commit this draft and OG image to {current-branch}? (commit / skip)
```

If `commit`:

```bash
git -C . add "src/content/blog/{slug}.mdx" "public/og/blog/{slug}.png"
git -C . commit -m "{commit message generated from post title + intent}"
```

The commit message follows the repo convention (imperative, descriptive, ≤72 chars). Co-author line per the project's git convention if present.

Generate the message from the post: e.g., `Add blog post: {post title}` or more specific based on content.

### 7b. Preview deploy

```
Push branch and trigger a Cloudflare preview deploy? (deploy / skip)
```

If `deploy`:

```bash
git -C . push -u origin "{current-branch}"
npx wrangler versions upload
```

Capture and report the preview URL from wrangler's output.

If `skip`: continue to 7c.

### 7c. Final report

```
{post title}

File: src/content/blog/{slug}.mdx
OG image: public/og/blog/{slug}.png ({W}x{H}, {KB}KB)
Branch: {current-branch}
{if committed} Commit: {short-sha}
{if deployed} Preview: {preview-url}

Frontmatter:
  title: {title}
  date: {date}
  tags: {tags}
  series: {series or "standalone"}

Validation:
  check-blog-prose.mjs: 0 critical, {N} warnings
  pnpm astro check: 0 errors
  Reading time: {N} min

{if series}
Pre-launch placeholders remaining: {N}
  Find with: grep -n "CONFIRM PRE-LAUNCH" src/content/blog/{slug}.mdx
  All must be filled before publish. Coordinator typically confirms 24-48 hours before launch.

Next steps:
- Final review on dev server: pnpm dev
{if not deployed} - Preview deploy: npx wrangler versions upload
- Merge to main when ready
- Share post URL on LinkedIn with a separate share-text draft
```

---

## Rules

- **Skills are canonical.** Do not override `ai-antipatterns` or `personal-tone` rules for stylistic preference within a single post. If the writer asks for an em dash, refuse and point to the exceptions list. If they disagree with a banned word, capture the disagreement and ask them to edit the skill rather than work around it.
- **One question at a time in Phase 1.** Do not batch Q1–Q6. Each answer shapes the next question.
- **System proposes, writer confirms.** Phases 2a–2f are generation steps. The writer picks or proposes alternatives; the agent does not pre-decide.
- **Deterministic before LLM.** Phase 4a (script) runs before Phase 4b (LLM judgment). Critical script findings block advancement.
- **No invention.** Do not introduce examples, metrics, or quotes the writer did not provide. If a beat needs an example and the writer didn't offer one, pause and ask.
- **AI credit honesty.** Per `personal-tone`, name AI involvement when AI did the work. If the writer prompts a draft with minimal input, the post is AI-drafted — flag in the draft itself where contextually appropriate, not just hidden disclosure.
- **No save without all gates passing.** Phase 6 deterministic gates (OG, astro check, prose re-check, word count) all must pass. If any fail, surface the error and do not declare success.
- **Cancel preserves the file.** Cancel at Phase 5 sets `draft: true` in frontmatter and leaves the file on disk. Writer can resume by re-running `/blog-draft` on the same slug. Cancel before any file is written (Phases 0–2) just exits.
- **Existing draft check before overwrite.** Phase 2c surfaces the existing draft and offers `resume / overwrite / rename / cancel`. Never silently overwrite.
- **Branch hygiene.** Never write a new blog post directly to `main` without explicit writer consent in Phase 0b. Default to feature-branch flow. Temporary `blog/wip-{date}` branch is fine; gets renamed to `blog/{slug}` once the slug exists.
- **Series stakes.** For series posts, recommend `/blog-review` (Phase 5 `review` option). The cross-author chain and public series brand justify the second pass.
- **One post per invocation.** This command drafts a single post. Multi-post sessions invoke the command separately for each.

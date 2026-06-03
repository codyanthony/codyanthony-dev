---
description: Draft a blog post for codyanthony.dev/blog/ using the three-beat framework, personal-tone voice, and ai-antipatterns universal style guide. Interactive flow with branch management, system-generated proposals, series support, deterministic-script validation, and optional commit/deploy.
version: 1.1
---

# /blog-draft

Executes an approved blueprint from `/blog-plan` into a ready-to-merge draft. The architecture, anchor story, and outline are already decided and validated in the plan; this command does not re-plan. Eight phases: Setup → Blueprint → Proposals → Compose → Validate → Review → Save → Ship. Each phase gates on user confirmation; the deterministic script runs before LLM judgment during validation.

> **Running blog-draft v1.1** — Skill load + verification gate → branch management → load the blueprint (`.claude/plans/{slug}.md`) + confirm remaining metadata → confirm proposals (title, slug, outline from blueprint, tags) → compose direct to file → deterministic + LLM validation → user review → deterministic save gates → optional commit/deploy.

> Run `/blog-plan` first. It produces the blueprint this command consumes. Starting here without one is only for a simple post with one obvious example; anything with real architecture should be planned first.

Print the banner above verbatim before doing anything else. Then print:

> Type `cancel` at any point to exit. Files already written will be preserved with `draft: true` in frontmatter — re-run `/blog-draft` on the same slug to resume.

## Dependencies

**Required skills (must load before drafting begins):**

- `.claude/skills/ai-antipatterns/SKILL.md` — universal negative style guide (canonical)
- `.claude/skills/personal-tone/SKILL.md` — voice, brand alignment, audience layering
- `.claude/skills/blog-post-framework/SKILL.md` — three-beat structure, opener shapes
- `.claude/skills/blog-checklist/SKILL.md` — pre-publish gates
- `.claude/skills/writer-context/SKILL.md` — verified work history, role specifics, NDA/proprietary reference guidance, common overclaims to refuse

**Loaded conditionally (in Phase 1b if the blueprint marks the post series-participating):**

- `.claude/skills/series-blocks/SKILL.md` — intro/navigation block templates

**Required scripts:**

- `scripts/check-blog-prose.mjs` — deterministic prose validation

OG images are no longer generated as a build step: the social card is rendered
on demand by the `/og/[slug].png` endpoint and cached to R2 on first scrape (see
Phase 6). No `generate-blog-og.mjs` / static PNG.

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
  [x] writer-context — "Refuse 'founding writer for ROSA' (he joined post-GA); refuse 'inherited' framing for AWS XML migration"
```

**Do not proceed past this gate until all five skills are confirmed in context.** If any failed to load, report which one and stop.

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

## Phase 1: Load the blueprint

Drafting consumes a blueprint produced by `/blog-plan`. The central claim, architecture and its parts, anchor story, evidence map, beat outline, opener shape, working title, slug, and links are already decided and validated there. **Do not re-open them here.** This command executes the plan; it does not re-plan.

### 1a. Read the blueprint

Ask the writer for the slug, or locate the blueprint:

```bash
ls .claude/plans/*.md 2>/dev/null
```

Read `.claude/plans/{slug}.md` and extract: central claim, architecture and required parts, anchor story, evidence map, beat outline, opener shape, working title, slug, links/cross-references, contentious decisions (employer name/abstract, sensitive examples screened, opener register, second-instance/on-ramp budget), and open questions. The employer name/abstract decision feeds the employer-abstraction check at Phase 4b.

**If no blueprint exists:**

- **Substantial or systems post:** stop and recommend running `/blog-plan` first. The anchor-fit gate is the cheap checkpoint; skipping it is what produces throwaway drafts.
- **Simple post, one obvious example:** run a quick inline plan now (central claim in one sentence, the single anchor, a three-beat outline, opener shape) and continue. Keep it to a few minutes.

### 1b. Confirm remaining metadata

The blueprint settles structure. Confirm the few draft-time items it does not carry, one at a time:

- **Publish date.** Default today ({YYYY-MM-DD}); ISO 8601. For series posts, match the coordinator's confirmed window.
- **Tags.** Propose 3–5 topical tags from the claim, audience, and title; writer confirms or edits.
- **Series specifics** (only if the blueprint marks this a series post): load `series-blocks`; confirm `series_theme` name and `series_theme_url`, or leave `[CONFIRM PRE-LAUNCH: ...]` placeholders; confirm the theme tie-back is by substance, not labeling.

---

## Phase 2: Proposals

System generates each artifact; writer confirms or proposes alternative.

### 2a. Title

The blueprint carries a working title; start from it. If the writer wants options, generate **3–5 distinct title candidates** from the blueprint's working title and central claim. Constraints:

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

### 2e. Outline (from the blueprint)

The beat outline, opener shape, and the anchor walked through the architecture's parts are already in the blueprint. **Do not regenerate them.** Restate the outline back to the writer for a final confirmation before composing.

If the writer wants a structural change (different architecture, different anchor, a beat that does not fit), that is a planning change, not a drafting change. Stop and route it back to `/blog-plan` so the anchor-fit gate runs again. Do not absorb structural rework into the draft flow; that is the loop this split exists to prevent.

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

Compose to the approved blueprint: its beat outline, anchor story, and architecture parts are the spine. Apply all loaded skills during composition:

- **`blog-post-framework`** — three beats present; opener shape per the blueprint. Length is not a compose-time target; write to the blueprint and let structural integrity govern. Apply **structural integrity**: forward motion (each section changes the reader's state, no timeline resets, no re-established context), no semantic duplication (no insight restated in fresh words across the post), earn the abstraction (concrete before claim), and section rendering varies (no schematic-identical templates across parallel sections).
- **`personal-tone`** — first-person, present tense, contractions natural, no contrast framing, no effort signaling, audience layering, brand alignment
- **`ai-antipatterns`** — universal style banishments, zero em dashes in prose, no banned words, no aphoristic closings, no "Without X, Y. Without Y, X." inversions, no triple parallel construction
- **`series-blocks`** (if applicable) — insert intro block at top of body, navigation block at bottom

### Frontmatter

```yaml
---
title: "{post title}"
description: "{one-sentence description}"
date: {publish date from Phase 1b}
tags: [{confirmed tags from 2f}]
draft: false
{if series} series: {series-slug from the blueprint}
{if series and Q4a theme name provided} series_theme: "{theme name}"
{if series and Q4a theme URL provided} series_theme_url: "{theme url}"
---
```

**Description specificity check.** The frontmatter `description` is load-bearing (RSS feed, social-card previews, meta tags, search snippets). It should be a sharper version of the strongest concrete line in the post, not a softer abstraction of the thesis. If the description sounds more abstract than the post itself, revise. A good test: paste the description in isolation and ask whether it would compel a reader to open the post. If the answer is "barely," it's too abstract.

### Body order

1. **If series:** insert intro block at the top (per `series-blocks` template, `[CONFIRM PRE-LAUNCH: ...]` placeholders for unknowns)
2. **Beat 1** (Why this)
3. **Beat 2** (What's true) — with concrete examples integrated
4. **Beat 3** (What's portable)
5. **Beat 4** (What's next) — if applicable
6. **If series:** insert navigation block at the bottom (after a `---` horizontal rule)

### Write the file

Use the Write tool to save to `src/content/blog/{slug}.mdx`.

### Pre-presentation self-review (fix-in-place)

Before printing the structured summary or inviting review, re-read the draft once as a skeptical senior reader and **correct in place** against the Phase 4b checklist below. Then run the deterministic script (Phase 4a) and fix any critical findings in place. Only after both passes, present.

The principle: *the writer must not be the first to catch a failure on this list.* This is a **re-sequence of the existing validate phase, not a new mechanism** — it moves the first cleanup ahead of presentation so the writer reviews an already-screened draft instead of a raw one. Note in the structured summary how many issues this pass corrected.

### Structured summary

After write, print:

```
Composed: src/content/blog/{slug}.mdx
  Word count: {N}
  Self-review (fix-in-place): {N} issues corrected; deterministic script 0 critical
  Beats present: Why this / What's true / What's portable / What's next ({yes|skip})
  Series: {series-slug or "standalone"}
  CONFIRM PRE-LAUNCH placeholders: {N}
  Branch: {current-branch}

Open the file in VS Code for inspection before validation.
```

---

## Phase 4: Validate

The compose-tail self-review (Phase 3) already ran this checklist once as a fix-in-place pass and cleared the deterministic script. Phase 4 is the **writer-in-the-loop** verification: re-run the checks, surface anything that remains, and decide each item with the writer. It is a confirmation pass, not the first catch.

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

Run the LLM-judgment checklist from `blog-checklist` — the items the deterministic script does not cover (beat presence, structural integrity, voice scan, anti-pattern LLM-judgment, length/pacing, cross-references). **`blog-checklist` is the canonical list and cites each item's source skill; run it there rather than re-enumerating it here**, so the draft-time pass and the pre-publish gate cannot drift apart.

In addition, run the draft-flow-specific checks `blog-checklist` does not carry:

- Architecture consistency: the draft still delivers the claim through the blueprint's architecture and evidence map. Flag drift, do not silently absorb it; an improvement updates the blueprint, a genuine architecture change routes back to `/blog-plan`, an accidental dropped part gets repaired.
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

### 6a. OG image — generated dynamically (no action)

The social card is rendered on demand by `/og/[slug].png` and cached to R2 on
first scrape; `src/pages/blog/[...slug].astro` passes the post title to it
automatically. There is no static OG file to generate, verify, or commit — just
make sure the post `title` reads well as a card.

### 6b. Run astro check

```bash
pnpm astro check
```

If exit code is non-zero: STOP. Report errors.

### 6c. Re-run prose-check against saved file

```bash
node scripts/check-blog-prose.mjs src/content/blog/{slug}.mdx
```

If exit code is non-zero: STOP. This catches anything that got reintroduced between Phase 4 and now.

### 6e. Word count + reading time

```bash
# Strip frontmatter, count words
WORDS=$(awk 'BEGIN{f=0} /^---$/{f++; next} f==2{print}' src/content/blog/{slug}.mdx | wc -w | tr -d ' ')
echo "WORDS=$WORDS"
```

Word count is a sensibility, not a gate. If it is well under ~600 or well past ~1,200 words, flag as a warning (do not block); the real test is that every section earns its place.

Print summary:

```
Save gates passed:
  OG image: dynamic (/og/{slug}.png, rendered + cached on first scrape)
  pnpm astro check: 0 errors
  check-blog-prose.mjs: 0 critical
  Word count: {N}
```

---

## Phase 7: Ship (optional)

### 7a. Commit

```
Commit this draft to {current-branch}? (commit / skip)
```

If `commit`:

```bash
git -C . add "src/content/blog/{slug}.mdx"
git -C . commit -m "{commit message generated from post title + intent}"
```

If the post references media artifacts (diagrams, screenshots the build/agent
produced), those belong in R2, not git: `npx wrangler r2 object put
codyanthony-dev-bucket/blog/{slug}/{file} --file=… --remote` and reference them
as `/assets/blog/{slug}/{file}` (served by `src/pages/assets/[...path].ts`).

The commit message follows the repo convention (imperative, descriptive, ≤72 chars). Co-author line per the project's git convention if present.

Generate the message from the post: e.g., `Add blog post: {post title}` or more specific based on content.

### 7b. Preview deploy

```
Push branch and trigger a Cloudflare preview deploy? (deploy / skip)
```

If `deploy`:

```bash
git -C . push -u origin "{current-branch}"
pnpm build
npx wrangler versions upload --config dist/server/wrangler.json
```

The `--config dist/server/wrangler.json` is required: the site now builds
through the `@astrojs/cloudflare` adapter, and the deploy config is the
generated one (the root `wrangler.jsonc` has no Worker `main`).

Capture and report the preview URL from wrangler's output.

Then warm the post's OG card so the first social scraper gets an instant R2
hit instead of paying the cold Satori render (which a scraper with a tight
timeout could occasionally drop, caching "no image"):

```bash
curl -s -o /dev/null -w "OG warm: HTTP %{http_code}\n" \
  "https://codyanthony.dev/og/{slug}.png?title={url-encoded-title}"
```

This step is intentionally inside the `deploy` branch only — there's nothing
to warm (and no audience scraping the post) until it's deployed. The `/og`
endpoint renders from the `title` query param, so this pre-generates and
caches the production card even before the post page itself goes live; once it
is live and shared, the card is already warm. `{url-encoded-title}` must match
the title in the deployed `og:image` meta exactly, or it warms a different
cache key.

If `skip`: continue to 7c.

### 7c. Final report

```
{post title}

File: src/content/blog/{slug}.mdx
OG image: dynamic — /og/{slug}.png (rendered + cached on first scrape)
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
  Word count: {N}

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
- **Writer is not first to catch.** Compose ends with a fix-in-place self-review (Phase 3) that runs the Phase 4b checklist and the deterministic script before the draft is presented; Phase 4 is then writer-in-the-loop verification, not the first catch. This is a re-sequence of the existing validate phase, not a new mechanism.
- **No invention.** Do not introduce examples, metrics, or quotes the writer did not provide. If a beat needs an example and the writer didn't offer one, pause and ask.
- **AI credit honesty.** Per `personal-tone`, name AI involvement when AI did the work. If the writer prompts a draft with minimal input, the post is AI-drafted — flag in the draft itself where contextually appropriate, not just hidden disclosure.
- **No save without all gates passing.** Phase 6 deterministic gates (OG, astro check, prose re-check, word count) all must pass. If any fail, surface the error and do not declare success.
- **Cancel preserves the file.** Cancel at Phase 5 sets `draft: true` in frontmatter and leaves the file on disk. Writer can resume by re-running `/blog-draft` on the same slug. Cancel before any file is written (Phases 0–2) just exits.
- **Existing draft check before overwrite.** Phase 2c surfaces the existing draft and offers `resume / overwrite / rename / cancel`. Never silently overwrite.
- **Branch hygiene.** Never write a new blog post directly to `main` without explicit writer consent in Phase 0b. Default to feature-branch flow. Temporary `blog/wip-{date}` branch is fine; gets renamed to `blog/{slug}` once the slug exists.
- **Series stakes.** For series posts, recommend `/blog-review` (Phase 5 `review` option). The cross-author chain and public series brand justify the second pass.
- **One post per invocation.** This command drafts a single post. Multi-post sessions invoke the command separately for each.

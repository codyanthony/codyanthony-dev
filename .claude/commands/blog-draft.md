---
description: Draft a blog post for codyanthony.dev/blog/ from an approved blog-plan blueprint. Executes the motivating question, violated expectation, architecture, reader movement, evidence map with collision events, personal-tone voice, and ai-antipatterns style guide into a ready-to-merge draft. Interactive flow with branch management, proposals, series support, deterministic-script validation, and optional commit/deploy.
version: 1.2
---

---

# /blog-draft

Executes an approved blueprint from `/blog-plan` into a ready-to-merge draft. The motivating question, violated expectation, central claim, architecture, reader movement, anchor story, evidence map with collision events, beat outline, opener shape, working title, slug, and links are already decided and validated in the plan. This command does not re-plan. Eight phases: Setup → Blueprint → Proposals → Compose → Validate → Review → Save → Ship. Each phase gates on user confirmation; the deterministic script runs before LLM judgment during validation.

> **Running blog-draft v1.2** — Skill load + verification gate → branch management → load the blueprint (`.claude/plans/{slug}.md`) + confirm remaining metadata → confirm proposals (title, slug, blueprint summary, tags) → compose direct to file → deterministic + LLM validation → user review → deterministic save gates → optional commit/deploy.

> Run `/blog-plan` first. It produces the blueprint this command consumes. Starting here without one is only for a simple post with one obvious example; anything with real architecture should be planned first.

Print the banner above verbatim before doing anything else. Then print:

> Type `cancel` at any point to exit. Files already written will be preserved with `draft: true` in frontmatter — re-run `/blog-draft` on the same slug to resume.

## Dependencies

**Required skills (must load before drafting begins):**

- `.claude/skills/ai-antipatterns/SKILL.md` — universal negative style guide (canonical)
- `.claude/skills/personal-tone/SKILL.md` — voice, brand alignment, audience layering
- `.claude/skills/blog-post-framework/SKILL.md` — three-beat content checks, opener shapes, structural integrity
- `.claude/skills/blog-checklist/SKILL.md` — pre-publish gates
- `writer-context` (**global skill, not in this repo**) — verified work history, role specifics, NDA/proprietary reference guidance, common overclaims to refuse. Personal to the writer, so it lives at `~/.claude/skills/writer-context/` rather than in the repo; load it by name via the Skill tool.

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

Load the project-local skills (`ai-antipatterns`, `personal-tone`, `blog-post-framework`, `blog-checklist`, and conditionally `series-blocks`) via Read at their `.claude/skills/<name>/SKILL.md` paths — project-local auto-discovery via the Skill tool can be session-dependent, so Read is the reliable path for these. Load `writer-context` via the Skill tool **by name**: it is a global, writer-personal skill (`~/.claude/skills/writer-context/`) that lives outside the repo, and global skills surface reliably by name. If `writer-context` fails to load, stop and report — do not draft claims about the writer without it.

Confirm each skill is loaded by listing one key rule from each in this format:

```text
Skills loaded:
  [x] ai-antipatterns — "Zero em dashes in prose (description lists / link lists exempt)"
  [x] personal-tone — "Audience layering: peers primary, recruiters always reading too"
  [x] blog-post-framework — "Three beats are content checks, not section templates"
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

```text
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

```text
On existing feature branch: {branch}

Options:
  continue  Use this branch (draft will save to this branch)
  new       Create a new blog/wip-{date} branch off main
  cancel    Exit
```

**If `CURRENT_BRANCH` is any other branch:** ask:

```text
On branch: {branch}

Options:
  stay      Stay on this branch (draft will save to it)
  setup     Create a blog/wip-{date} branch off main
  cancel    Exit
```

Print the resolved branch and proceed.

---

## Phase 1: Load the blueprint

Drafting consumes a blueprint produced by `/blog-plan`. The motivating question, violated expectation, central claim, architecture and required parts / moves, reader movement, anchor story, evidence map with collision events, beat outline, opener shape, working title, slug, and links are already decided and validated there. **Do not re-open them here.** This command executes the plan; it does not re-plan.

### 1a. Read the blueprint

Ask the writer for the slug, or locate the blueprint:

```bash
ls .claude/plans/*.md 2>/dev/null
```

Read `.claude/plans/{slug}.md` and extract:

- motivating question
- violated expectation
- central claim
- architecture and required parts / moves
- reader movement
- anchor story
- evidence map, including collision events and status for each row
- beat outline
- opener shape/register
- working title
- slug
- links/cross-references
- contentious decisions:
  - employer name/abstract
  - sensitive examples screened
  - opener shape/register
  - second-instance/on-ramp budget

- open questions / placeholders

The employer name/abstract decision feeds the employer-abstraction check at Phase 4b. Evidence-map rows marked `weak` or `empty`, or rows missing collision events, block drafting and route back to `/blog-plan`.

**If no blueprint exists:**

- **Substantial or systems post:** stop and recommend running `/blog-plan` first. The motivating-question, reader-movement, anchor-fit, and collision-event gates are the cheap checkpoints; skipping them is what produces throwaway drafts.
- **Simple post, one obvious example:** run a quick inline plan now:
  - motivating question or violated expectation
  - central claim in one sentence
  - chosen architecture
  - reader movement
  - single anchor
  - collision event
  - three-beat outline
  - opener shape

  Keep it short. If the quick plan reveals more than one real architecture choice, stop and route to `/blog-plan`.

### 1b. Confirm remaining metadata

The blueprint settles structure. Confirm the few draft-time items it does not carry, one at a time:

- **Publish date.** Default today ({YYYY-MM-DD}); ISO 8601. For series posts, match the coordinator's confirmed window.
- **Tags.** Propose 3–5 topical tags from the central claim, audience, title, and subject. Writer confirms or edits.
- **Series specifics** (only if the blueprint marks the post series-participating): load `series-blocks`; confirm `series_theme` name and `series_theme_url`, or leave `[CONFIRM PRE-LAUNCH: ...]` placeholders; confirm the theme tie-back is by substance, not labeling.

### 1c. Blueprint revision boundary

The blueprint is the source of truth for drafting, but it must stay honest.

If drafting reveals a better motivating question, violated expectation, central claim, architecture, reader movement, anchor story, evidence-map row, collision event, or conclusion landing, stop and update `.claude/plans/{slug}.md` before continuing. Do not keep drafting against a stale blueprint, and do not patch prose around a plan that no longer describes the post.

Use this boundary:

- **Drafting-level change:** improves expression while preserving the blueprint.
  - sentence-level tightening
  - paragraph rhythm adjustment
  - transition repair
  - title or description refinement
  - cutting repetition
  - moving a paragraph within the same reader movement

- **Blueprint-level change:** changes what the post is.
  - different motivating question
  - different violated expectation
  - material change to central claim
  - architecture change
  - reader movement change
  - anchor change
  - required part / move added or removed
  - evidence-map row becomes weak or empty
  - collision event changes
  - conclusion lands a different changed understanding

If unsure, treat it as blueprint-level and route back to `/blog-plan`.

---

## Phase 2: Proposals

System generates each artifact; writer confirms or proposes alternative.

### 2a. Title

The blueprint carries a working title; start from it. If the writer wants options, generate **3–5 distinct title candidates** from the blueprint's working title, motivating question, violated expectation, central claim, and reader movement. Constraints:

- No buzzwords from `ai-antipatterns` banned-words list
- No "X, not Y" contrast framing (per `personal-tone`)
- No anchoring on "Documentation Strategist" as the hook
- Lead with substance, not brand
- Vary across shapes: descriptive, provocative, structural, scene-led, question-led — at least three distinct shapes
- Do not over-index on the architecture if the reader movement or violated expectation is the stronger hook

Present with brief framing notes:

```text
Title candidates:

A. {title} — {frame: e.g., "Descriptive; foregrounds the changed belief"}
B. {title} — {frame: e.g., "Provocative; sets up the violated expectation"}
C. {title} — {frame: e.g., "Structural; names the system boundary"}
D. {title} — {frame: ...}
E. {title} — {frame: ...}

Pick A / B / C / D / E, or propose your own.
```

If the writer dislikes all five, regenerate once with their feedback. Cap regeneration at two rounds — if no fit after two, stop and ask the writer to articulate what's missing.

### 2b. Slug

Derive 2–3 slug variants from the chosen title:

- kebab-case, no special characters
- 2–4 words ideally
- reads well as a permanent URL
- does not repeat brand framing in URL form

```text
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

```text
A draft already exists at src/content/blog/{slug}.mdx (dated {date}, {N} words).

Options:
  resume      Load the existing content as the starting point; continue at Phase 4 (validate)
  overwrite   Delete existing and start fresh
  rename      Return to Phase 2b for a different slug
  cancel      Exit; existing file untouched
```

Behavior:

- `resume`: read the file, skip to Phase 4. Also load the blueprint, if it exists, so validation can check drift against motivating question, architecture, reader movement, evidence map, and collision events.
- `overwrite`: delete file with `rm`, continue normally to Phase 2d.
- `rename`: return to Phase 2b.
- `cancel`: exit with no changes.

### 2d. Branch rename

If currently on `blog/wip-{date}` (created in Phase 0b), rename to `blog/{slug}`:

```bash
git -C . branch -m "blog/{slug}"
```

If on any other branch, leave alone.

### 2e. Blueprint confirmation

The motivating question, violated expectation, central claim, architecture, reader movement, anchor story, evidence map with collision events, beat outline, and opener shape are in the blueprint. If the writer wants a structural change — different motivating question, violated expectation, central claim, architecture, reader movement, anchor, evidence-map row, collision event, close landing, or beat that does not fit — that is a blueprint-level change, not a drafting change. Stop and route it back to `/blog-plan` so the blueprint is updated and the fit gates run again. Do not absorb structural rework into the draft flow; that is the loop this split exists to prevent.

Use this format:

```text
Blueprint summary:

Motivating question:
  {motivating question}

Violated expectation:
  {violated expectation}

Central claim:
  {central claim}

Architecture:
  {architecture}
  Required parts / moves: {list}

Reader movement:
  Starting point: {starting point}
  First pressure: {first pressure}
  Escalation: {escalation}
  Turn: {turn}
  Landing: {landing}

Evidence map:
  {N} rows filled
  {N} weak
  {N} empty
  Missing collision events: {N}

Beat outline:
  Why this: {summary}
  What's true: {summary}
  What's portable: {summary}
  What's next: {summary or "skip"}
```

If any evidence-map row is `weak` or `empty`, or any collision event is missing, stop and route back to `/blog-plan`.

If the writer wants a structural change (different motivating question, central claim, architecture, reader movement, anchor, collision event, or beat that does not fit), that is a planning change, not a drafting change. Stop and route it back to `/blog-plan` so the fit gates run again. Do not absorb structural rework into the draft flow; that is the loop this split exists to prevent.

### 2f. Tags

Generate 3–5 topical tags from the central claim, audience, title, and subject. Present:

```text
Tag proposal: ["{tag-a}", "{tag-b}", "{tag-c}", "{tag-d}"]

Confirm, edit, or replace.
```

Wait for writer confirmation.

---

## Phase 3: Compose

Write the draft directly to `src/content/blog/{slug}.mdx`. **Do not show the draft inline in chat.** Print a structured summary instead; the writer inspects the file in VS Code.

### Composition rules

Compose to the approved blueprint. Its motivating question, violated expectation, architecture, reader movement, anchor story, evidence map with collision events, and beat outline are the spine. Apply all loaded skills during composition:

- **`blog-post-framework`** — the three beats are present as content checks, not section templates. Opener shape follows the blueprint. Length is not a compose-time target; write to the blueprint and let structural integrity govern.
- **`personal-tone`** — first-person, present tense, contractions natural, no contrast framing, no effort signaling, audience layering, brand alignment.
- **`ai-antipatterns`** — universal style banishments, zero em dashes in prose, no banned words, no aphoristic closings, no "Without X, Y. Without Y, X." inversions, no triple parallel construction.
- **`series-blocks`** (if applicable) — insert intro block at top of body, navigation block at bottom.

Apply these blueprint-specific rules:

- **Reader movement through the architecture.** Use the blueprint's reader movement as the reader-facing path through the post. The architecture governs the draft, but the prose should unfold through pressure, escalation, discovery, contradiction, changed belief, or a sharpening question. Do not render the post as a tour of architecture parts unless the blueprint explicitly says that enumeration is the intended movement.
- **Opener authenticity.** Draft the opener from the blueprint's motivating question, violated expectation, reader-movement starting point, or first pressure. Do not open by announcing the topic, architecture, or broad field trend. Before writing the body, check whether the opener could only belong to this post, from this writer. If it could open any competent article on the topic, revise before continuing.
- **Collision events drive examples.** Use the blueprint's evidence map and collision-event column when drafting the substantive middle. Every load-bearing example should include the pressure that made the example matter: a decision, tradeoff, ambiguity, contradiction, failed assumption, boundary condition, consequence, escalation, or changed understanding. Do not draft examples as illustrations of architecture parts. If the blueprint has a weak or missing collision event, stop and route back to `/blog-plan` rather than manufacturing pressure in prose.
- **Structural integrity.** Apply forward motion (each section changes the reader's state, no timeline resets, no re-established context), semantic duplication checks (no insight restated in fresh words across the post), earn-the-abstraction (concrete before claim unless the abstraction is itself the hook and is paid off), one dominant idea per section, and varied rendering across parallel sections. The reader should feel the post moving, not see the framework operating.
- **Paragraph rhythm and emphasis density.** Vary paragraph function as the draft moves: concrete observation, specific example, pressure, interpretation, transition, consequence, earned claim, quiet landing. Do not stack too many thesis-heavy, abstraction-first, or equally emphatic paragraphs in a row. If every paragraph ends by explaining what it means, revise so some paragraphs carry evidence, consequence, or movement instead of emphasis.
- **Conclusion as discovery.** End on the changed understanding the post earned through the anchor story, reader movement, and collision events. Do not end by summarizing the architecture, repeating the central claim unchanged, reaching for a maxim, or adding a CTA disguised as a conclusion. The final sentence should feel discovered by the post, not attached to it.
- **No architecture announcement.** Do not introduce the post by naming the architecture unless that naming is the story. Architecture is usually hidden support, not reader-facing scaffolding.
- **No invention.** Do not introduce examples, metrics, quotes, employer claims, or project details not in the blueprint or writer-context. If the draft needs material the blueprint does not supply, stop and ask or route back to `/blog-plan`.

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

### Body shape

The body follows the blueprint's reader movement and beat outline. Do not force fixed section headings or a visible three-beat template.

Requirements:

1. **If series:** insert intro block at the top (per `series-blocks` template, `[CONFIRM PRE-LAUNCH: ...]` placeholders for unknowns).
2. **Why this** must be present: opener + stakes through the motivating question, violated expectation, starting point, or first pressure.
3. **What's true** must be present: the chosen architecture developed through the anchor story, evidence map, collision events, and reader movement.
4. **What's portable** must be present: the changed understanding, sharper question, or single carry-away insight the post earns.
5. **What's next** is optional and included only if natural.
6. **If series:** insert navigation block at the bottom (after a `---` horizontal rule).

### Write the file

Use the Write tool to save to `src/content/blog/{slug}.mdx`.

### Pre-presentation self-review (fix-in-place)

Before printing the structured summary or inviting review, re-read the draft once as a skeptical senior reader and **correct in place** against the Phase 4b checklist below. Then run the deterministic script (Phase 4a) and fix any critical findings in place. Only after both passes, present.

The principle: _the writer must not be the first to catch a failure on this list._ This is a **re-sequence of the existing validate phase, not a new mechanism** — it moves the first cleanup ahead of presentation so the writer reviews an already-screened draft instead of a raw one. Note in the structured summary how many issues this pass corrected.

### Structured summary

After write, print:

```text
Composed: src/content/blog/{slug}.mdx
  Word count: {N}
  Self-review (fix-in-place): {N} issues corrected; deterministic script 0 critical
  Motivating question preserved: {yes|no}
  Reader movement preserved: {yes|no}
  Collision events present: {N}/{N}
  Conclusion lands as discovery: {yes|no}
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

```text
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

In addition, run the draft-flow-specific checks `blog-checklist` may not carry yet:

- **Motivating question preservation:** the draft still feels driven by the blueprint's motivating question, not merely by the topic.
- **Violated expectation preservation:** the opener, body, or close carries the expectation the work complicated.
- **Reader movement preservation:** the draft follows the blueprint's reader movement. Flag if it has collapsed into a static framework tour.
- **Architecture consistency:** the draft still delivers the claim through the blueprint's architecture, without silently swapping in a different structure.
- **Evidence-map consistency:** every required part / move is represented, and no load-bearing example has been dropped.
- **Collision-event presence:** every load-bearing example includes the pressure that made the example matter. Flag examples that only illustrate architecture parts.
- **Opener authenticity:** the opener connects to the motivating question, violated expectation, starting point, or first pressure. Flag if it could open any competent article on the topic.
- **Paragraph rhythm:** the draft does not feel over-engineered at the paragraph level. Flag runs of thesis-heavy, abstraction-first, or equally emphatic paragraphs, especially where every paragraph ends with a meaning statement.
- **Conclusion as discovery:** the ending lands the changed understanding the post earned. Flag if the close summarizes the architecture, restates the claim unchanged, turns into a maxim, or could attach unchanged to any competent article on the topic.
- **Series checks** (if applicable): placeholders flagged, intro/nav blocks present.

Report each item pass/fail per `blog-checklist`'s format. For each failure, propose the fix with the same `yes / edit / skip` interaction.

Print structured summary:

```text
Validation:
  Deterministic (check-blog-prose.mjs): 0 critical, {N} warnings
  LLM checklist: {P} pass / {F} fail
  Draft-flow checks:
    Motivating question preserved: {pass|fail}
    Reader movement preserved: {pass|fail}
    Collision events present: {pass|fail}
    Opener authenticity: {pass|fail}
  {if fails: list each fail with line + brief description}
```

---

## Phase 5: Review

Present:

```text
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

### 6d. Word count

```bash
# Strip frontmatter, count words
WORDS=$(awk 'BEGIN{f=0} /^---$/{f++; next} f==2{print}' src/content/blog/{slug}.mdx | wc -w | tr -d ' ')
echo "WORDS=$WORDS"
```

Word count is a sensibility, not a gate. If it is well under ~600 or well past ~1,200 words, flag as a warning (do not block); the real test is that every section earns its place.

Print summary:

```text
Save gates passed:
  OG image: dynamic (/og/{slug}.png, rendered + cached on first scrape)
  pnpm astro check: 0 errors
  check-blog-prose.mjs: 0 critical
  Word count: {N}
```

---

## Phase 7: Ship (optional)

### 7a. Commit

```text
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

```text
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

```text
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
- **Blueprint is canonical, but not a prison.** `/blog-draft` executes the blueprint. It does not silently re-plan. If drafting reveals that the motivating question, violated expectation, central claim, architecture, reader movement, anchor, evidence map, collision events, or conclusion landing should change, stop and update `.claude/plans/{slug}.md` before continuing. Do not patch prose around a stale plan.
- **System proposes, writer confirms.** Phases 2a–2f are generation steps. The writer picks or proposes alternatives; the agent does not pre-decide.
- **Deterministic before LLM.** Phase 4a (script) runs before Phase 4b (LLM judgment). Critical script findings block advancement.
- **Writer is not first to catch.** Compose ends with a fix-in-place self-review (Phase 3) that runs the Phase 4b checklist and the deterministic script before the draft is presented; Phase 4 is then writer-in-the-loop verification, not the first catch. This is a re-sequence of the existing validate phase, not a new mechanism.
- **No invention.** Do not introduce examples, metrics, or quotes the writer did not provide. If a beat needs an example and the writer didn't offer one, pause and ask or route back to `/blog-plan`.
- **AI credit honesty.** Per `personal-tone`, name AI involvement when AI did the work. If the writer prompts a draft with minimal input, the post is AI-drafted — flag in the draft itself where contextually appropriate, not just hidden disclosure.
- **No save without all gates passing.** Phase 6 deterministic gates (astro check, prose re-check, word count warning) all must run. If any hard gate fails, surface the error and do not declare success.
- **Cancel preserves the file.** Cancel at Phase 5 sets `draft: true` in frontmatter and leaves the file on disk. Writer can resume by re-running `/blog-draft` on the same slug. Cancel before any file is written (Phases 0–2) just exits.
- **Existing draft check before overwrite.** Phase 2c surfaces the existing draft and offers `resume / overwrite / rename / cancel`. Never silently overwrite.
- **Branch hygiene.** Never write a new blog post directly to `main` without explicit writer consent in Phase 0b. Default to feature-branch flow. Temporary `blog/wip-{date}` branch is fine; gets renamed to `blog/{slug}` once the slug exists.
- **Series stakes.** For series posts, recommend `/blog-review` (Phase 5 `review` option). The cross-author chain and public series brand justify the second pass.
- **One post per invocation.** This command drafts a single post. Multi-post sessions invoke the command separately for each.

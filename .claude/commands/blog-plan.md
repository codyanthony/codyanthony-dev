---
description: Plan a blog post for codyanthony.dev/blog/ before drafting. Turns a seed idea into a central claim, an architecture, and an anchor story validated against an evidence map, then emits a blueprint that blog-draft consumes. The cheap checkpoint that prevents throwaway drafts.
version: 1.1
---

# /blog-plan

Turns a seed idea into a validated plan **before** any prose is written. Output is a blueprint at `.claude/plans/<slug>.md` that `/blog-draft` consumes. This is the cheap place to catch the expensive failure: an architecture the anchor story cannot actually carry.

> **Running blog-plan v1.1** — Seed intake (light, one question at a time) → central claim → architecture proposal → anchor selection from `writer-context` → evidence-map fit gate → outline + metadata → emit blueprint. Drafting does not start here; this hands off to `/blog-draft`.

Print the banner above verbatim before doing anything else.

## Why this command is separate from blog-draft

The expensive failure in a systems essay is choosing an architecture, anchoring it to a project, drafting, and only then discovering the project is missing a part the architecture requires. Planning and drafting are different jobs with different inputs. Keeping them separate makes the architecture/anchor fit a cheap, throwaway-able checkpoint instead of a post-draft discovery. The blueprint is the handoff, the same way the solution-guide pipeline handed a research artifact from `sg-audit` to `sg-draft`.

Scale depth to the topic. A craft post with one obvious example needs a two-minute pass. A systems essay with a multi-part architecture needs the full anchor/evidence work. Same command, depth proportional to need.

## Dependencies

**Skills:**
- `blog-post-framework` — three beats, opener shapes, and the structural-integrity rules (forward motion, semantic duplication, earn-the-abstraction, anchor-story fit). Always load.
- `writer-context` — the writer's verified facts **and the project inventory** this command queries to nominate anchor stories. Always load.
- `systems-writing` — load only when the subject is a system (pipeline, migration, automation, workflow, documentation/knowledge system, responsibility boundaries). Provides the architecture palette and the anchor-validation method.
- `series-blocks` — load only when the post participates in a collaborative series.
- `personal-tone`, `ai-antipatterns` — not needed for planning; they apply at draft time.

Planning is git-light. No branch is created here; `/blog-draft` handles branch and file creation.

---

## Phase 0: Setup

Load `blog-post-framework` and `writer-context`. Verify both are loaded before continuing; if either is missing, stop and report. Hold `systems-writing` and `series-blocks` until Phase 1 reveals whether they apply.

---

## Phase 1: Seed intake

**Do not gate on existing blog content.** An existing draft in `src/content/blog/`, a ship date, or a memory note about a post does **not** mean the post is already planned, and is **not** a reason to stop or to redirect the writer to `/blog-draft`. Re-anchoring or rewriting an existing post is a normal, expected use of this command; plan (or re-plan) regardless of what content already exists. The only "already planned" signal is an existing *blueprint* (`.claude/plans/{slug}.md`), and even that is not a stop, it is checked at blueprint time (Phase 6) because you cannot match a blueprint before you know what the writer intends to plan. Proceed straight into intake.

The writer arrives with a seed, not a finished plan. Ask only what is needed to route, one question at a time. Do not ask for an outline or an anchor yet; this command produces those.

- **Q1: Seed.** What is the rough idea, in a sentence or two?
- **Q2: Subject type.** Is the subject a *system* (pipeline, migration, automation, workflow, documentation/knowledge system, responsibility boundary), or a craft / process / personal essay? If a system, load `systems-writing` now.
- **Q3: Audience.** Primary reader for this one (recruiter, tech-comm peer, LinkedIn share). All three matter; which leads here?
- **Q4: Series.** Does this participate in a collaborative series? If yes, load `series-blocks`.
- **Q5: Cross-references.** Is there a planned case study or prior post this should link to or seed? (A project that also seeds a case study earns weight as an anchor.)

---

## Phase 2: Central claim and architecture

### 2a. Central claim

State the one thing the post argues, in a single sentence the reader could disagree with. If the seed only yields a topic ("AI and documentation"), press until it is a claim ("documentation systems fail at the seams where one kind of work stops being sufficient"). A topic cannot be validated against an anchor; a claim can.

### 2b. Architecture

Propose one to three candidate architectures that would argue the claim. For a systems essay, draw from the `systems-writing` palette (layer decomposition, seam trace, before/after migration, responsibility map, capability→boundary→transition) and **name the parts each architecture requires**. For a non-systems post, the architecture is usually the three beats with a single example; say so and move on.

Let the writer pick. Record the chosen architecture and its required parts.

---

## Phase 3: Anchor selection

This is the step that prevents throwaway drafts. Do not skip it for systems essays.

1. From `writer-context` (the project inventory), nominate candidate anchor stories that might carry the claim.
2. For the chosen architecture, build the **evidence map**: for each required part, name the concrete moment in a candidate project that demonstrates it. A part with no concrete evidence is an empty cell.
3. Recommend the single anchor that fills every cell. Prefer recency and strategic value (a project that seeds a planned case study, so the post can link to it).
4. Apply the dilution rule: prefer one anchor that contains the whole structure over several that each contain a fragment. Do not stitch partial anchors together.

---

## Phase 4: Fit gate (the checkpoint)

Present the evidence map for the chosen anchor as a table: `required part | concrete evidence in anchor | status`.

- **If every cell is filled:** the anchor fits. Continue to Phase 5.
- **If any cell is empty:** STOP. The anchor does not carry the architecture. Do one of:
  - swap to an anchor (nominate alternatives from `writer-context`) that fills every cell, or
  - change the architecture to the parts the best available anchor actually contains.

Do not proceed to outline or drafting with an empty cell. Manufacturing the missing part through abstraction is the exact failure this command exists to prevent.

---

## Phase 5: Outline and metadata

With a fitting anchor, sketch the plan. Do not write prose.

- **Beat outline.** Map the three beats (`blog-post-framework`): Why this (opener + stakes), What's true (the anchor, walked through the architecture's parts and the seams between them), What's portable (the single carry-away insight). Note an optional What's next only if natural.
- **Opener shape.** Pick a shape from the `blog-post-framework` table that fits *this* story, varied from recent posts.
- **Working title and slug.** Propose both (slug kebab-case, no spaces).
- **Links / cross-references.** Note any case study or prior post to link.
- **Open questions / placeholders.** Anything unresolved at plan time (series URLs, a metric to confirm), using the `[CONFIRM PRE-LAUNCH: ...]` convention.

---

## Phase 6: Emit the blueprint

**Blueprint-collision check first.** Look in `.claude/plans/` for a blueprint at `{slug}.md`, or one whose central claim closely matches this plan's. If none, write normally. If one exists, do not silently overwrite and do not stop: surface it and ask the writer — **overwrite** (this is a re-plan of the same post), **rename** (this is a different post; choose a new slug), or **cancel**. This is the *only* planned-work collision that warrants a pause; existing draft content in `src/content/blog/` never does.

Write the blueprint to `.claude/plans/<slug>.md` (this path is gitignored scratch; it is the handoff artifact, not committed content, and must not go under `src/content/blog/`, which the content collection would try to load). Then print it.

### Blueprint template

```markdown
# Blog plan: {working title}

- **Slug:** {slug}
- **Post type:** {systems | craft | process | personal}
- **Audience (lead):** {recruiter | tech-comm | LinkedIn}
- **Series:** {none | series name}
- **Status:** plan complete, ready for /blog-draft

## Central claim
{one sentence the reader could disagree with}

## Architecture
{chosen architecture}. Required parts:
- {part 1}
- {part 2}
- {…}

## Anchor story
{project}. Why this one: {recency / fills every part / seeds case study}.

## Evidence map (fit gate — all cells filled)
| Required part | Concrete evidence in anchor |
|---|---|
| {part 1} | {moment in the project} |
| {part 2} | {moment in the project} |

## Beat outline
- **Why this:** {opener shape} — {stakes}
- **What's true:** {the anchor walked through the parts / seams}
- **What's portable:** {single carry-away}
- **What's next (optional):** {only if natural}

## Links / cross-references
- {case study or prior post}

## Open questions
- {placeholders, [CONFIRM PRE-LAUNCH: ...] items}
```

### Hand-off

Tell the writer the plan is complete and to run `/blog-draft` with this blueprint. `/blog-draft` consumes the blueprint and does not re-open the architecture. If `/blog-draft` is ever started without a blueprint, it should run a quick inline plan for a simple post, or point back here for anything with real architecture.

## Scope boundary

This command covers:
- Seed → central claim → architecture → anchor → evidence-map fit gate → blueprint

This command does **not** cover:
- **Drafting, prose validation, save, ship** → `commands/blog-draft.md`
- **Adversarial review of a finished draft** → `commands/blog-review.md`
- **The structural rules themselves** → `blog-post-framework`
- **The systems architecture palette and anchor method** → `systems-writing`

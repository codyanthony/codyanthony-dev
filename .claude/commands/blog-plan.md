---
description: Plan a blog post for codyanthony.dev/blog/ before drafting. Turns a seed idea into a motivating question, violated expectation, central claim, architecture, reader movement, and anchor story validated against an evidence map with collision events, then emits a blueprint that blog-draft consumes. The cheap checkpoint that prevents throwaway drafts.
version: 1.4
---

# /blog-plan

Turns a seed idea into a validated plan **before** any prose is written. Output is a blueprint at `.claude/plans/<slug>.md` that `/blog-draft` consumes. This is the cheap place to catch the expensive failure: an architecture the anchor story cannot carry, or a structurally valid post that lacks a real question, movement, or pressure.

> **Running blog-plan v1.4** — Seed intake (light, one question at a time) → motivating question + violated expectation → central claim → architecture proposal → reader movement → anchor selection from `writer-context` → evidence-map fit gate with collision events → outline + metadata → emit blueprint. Drafting does not start here; this hands off to `/blog-draft`.

Print the banner above verbatim before doing anything else.

## Why this command is separate from blog-draft

The expensive failure in a blog post is choosing an architecture, anchoring it to a project, drafting, and only then discovering that the project is missing a part the architecture requires, or that the structure is valid but the post has no real question, movement, or pressure. Planning and drafting are different jobs with different inputs. Keeping them separate makes architecture/anchor fit, motivating question, reader movement, and evidence quality cheap, throwaway-able checkpoints instead of post-draft discoveries. The blueprint is the handoff, the same way the solution-guide pipeline handed a research artifact from `sg-audit` to `sg-draft`.

Scale depth to the topic. A craft post with one obvious example needs a two-minute pass. A systems post with a multi-part architecture needs the full motivating-question, architecture, reader-movement, anchor, and evidence-map work. Same command, depth proportional to need.

## Dependencies

**Skills:**

- `blog-post-framework` — three beats, opener shapes, and the structural-integrity rules (forward motion, semantic duplication, earn-the-abstraction, anchor-story fit). Always load.
- `writer-context` — the writer's verified facts **and the project inventory** this command queries to nominate anchor stories. Always load.
- `systems-writing` — load only when the subject is a system (pipeline, migration, automation, workflow, documentation/knowledge system, responsibility boundaries). Provides systems-writing lenses, system-shaped and inquiry-shaped architecture options, collision-event evidence, and the anchor-validation method.
- `series-blocks` — load only when the post participates in a collaborative series.
- `personal-tone`, `ai-antipatterns` — not needed for planning; they apply at draft time.

Planning is git-light. No branch is created here; `/blog-draft` handles branch and file creation.

---

## Phase 0: Setup

Load `blog-post-framework` and `writer-context`. Verify both are loaded before continuing; if either is missing, stop and report. Hold `systems-writing` and `series-blocks` until Phase 1 reveals whether they apply.

---

## Phase 1: Seed intake

**Do not gate on existing blog content.** An existing draft in `src/content/blog/`, a ship date, or a memory note about a post does **not** mean the post is already planned, and is **not** a reason to stop or to redirect the writer to `/blog-draft`. Re-anchoring or rewriting an existing post is a normal, expected use of this command; plan (or re-plan) regardless of what content already exists. The only "already planned" signal is an existing _blueprint_ (`.claude/plans/{slug}.md`), and even that is not a stop, it is checked at blueprint time (Phase 6) because you cannot match a blueprint before you know what the writer intends to plan. Proceed straight into intake.

The writer arrives with a seed, not a finished plan. Ask only what is needed to route, one question at a time. Do not ask for an outline or an anchor yet; this command produces those.

- **Q1: Seed.** What is the rough idea, in a sentence or two?
- **Q2: Subject type.** Is the subject a _system_ (pipeline, migration, automation, workflow, documentation/knowledge system, responsibility boundary), or a craft / process / personal post? If a system, load `systems-writing` now.
- **Q3: Audience.** Primary reader for this one (recruiter, tech-comm peer, LinkedIn share). All three matter; which leads here?
- **Q4: Series.** Does this participate in a collaborative series? If yes, load `series-blocks`.
- **Q5: Cross-references.** Is there a planned case study or prior post this should link to or seed? A project that also seeds a case study earns weight as an anchor.
- **Q6: Motivating question / violated expectation.** What question made this topic worth carrying forward, or what expectation did the work disturb?

  Ask this before central claim or architecture. The answer should identify the human tension behind the post: the assumption, surprise, contradiction, irritation, or unresolved question that made the writer keep thinking about it. If the answer is only a topic summary ("AI documentation workflows," "content strategy," "migration systems"), press once:

  > What did you expect to happen, and what actually happened?

  Or:

  > What kept bothering you after the work was done?

  Record both:
  - **Motivating question:** the question the post is trying to understand.
  - **Violated expectation:** the assumption or expectation the work complicated.

  Do not proceed to Phase 2 until at least one of these is concrete enough to shape the opener and close. A blog post can have a valid architecture and still fail if it lacks a question the audience genuinely cares about.

---

## Phase 2: Central claim and architecture

Architecture means the governing structure of this post: the shape that will carry the claim, organize the evidence, and guide the reader from opener to close.

For systems posts, the architecture may come from the structure of the system itself: layers, seams, handoffs, constraints, feedback loops, failure paths, ownership boundaries, information flow, or responsibility transitions. But the architecture does not have to mirror the system's internal structure. It can also follow the writer's inquiry, a changed assumption, a repeated pattern across examples, or an escalation in what the work revealed.

Do not choose an architecture merely because it is available in `systems-writing`. Choose the architecture that best carries the motivating question and violated expectation.

### 2a. Motivating question gate

Before stating the central claim, restate the motivating question and violated expectation from Phase 1.

Use this format:

```text
Motivating question: {question the post is trying to understand}
Violated expectation: {what the writer expected vs. what the work revealed}
```

Then run the gate:

- **Pass:** The question creates genuine curiosity and can plausibly drive the opener, the example selection, and the close.
- **Fail:** The question is only a topic, category, or thesis in disguise.

A passing motivating question sounds like something the writer might actually have wondered while doing the work:

- "Why does judgment keep surviving automation?"
- "Why did the system make me more involved instead of less?"
- "Why did the fix that improved one part of the workflow create a harder problem somewhere else?"

A failing motivating question sounds like an article assignment:

- "How do AI workflows affect technical writing?"
- "What are the layers of a documentation pipeline?"
- "Why are documentation systems important?"

If the gate fails, ask one follow-up and revise before continuing:

> What assumption did this experience change for you?

The central claim should answer or complicate the motivating question. The architecture should carry that answer. Do not choose an architecture before this gate passes.

### 2b. Central claim

State the one thing the post argues, in a single sentence the reader could disagree with. If the seed only yields a topic ("AI and documentation"), press until it is a claim ("documentation systems fail at the seams where one kind of work stops being sufficient"). A topic cannot be validated against an anchor; a claim can.

### 2c. Architecture

Propose one to three candidate architectures that would argue the claim. The architecture is the governing structure of the post: the shape that carries the claim, organizes the evidence, and guides the reader from opener to close.

For a systems post, draw from `systems-writing`, including both system-shaped and inquiry-shaped architectures. System-shaped architectures may include layer decomposition, seam trace, before/after migration, responsibility map, capability→boundary→transition, failure/recovery, information flow, constraints/tradeoffs, or feedback loops. Inquiry-shaped architectures may include expectation → pressure → changed belief, question → failed explanation → sharper explanation, or repeated encounters → emerging pattern → revised assumption.

For a non-systems post, propose the structure that best carries the claim: a single-example craft argument, before/after learning arc, mistake → revision, question trace, principle through example, or another fitting shape. Do not treat the three beats as the architecture. The beats are content checks that the final plan must satisfy.

For each candidate, name the required parts or moves. Let the writer pick. Record the chosen architecture and its required parts / moves.

### 2d. Reader movement

After choosing the post architecture, define how that architecture should unfold for the reader.

The architecture is the governing structure of the post. Reader movement is the path through that structure: how the reader's understanding changes from the opener to the close.

Do not assume the architecture should render as a static framework tour. A post can have a valid structure and still fail if the reader is simply walked through parts. Most strong posts move through pressure, escalation, discovery, contradiction, changed belief, or a sharpening question.

Use this format:

```text
Reader movement:
  Starting point: {what the reader or writer assumes, notices, or believes at the beginning}
  First pressure: {the first concrete moment that complicates the starting point}
  Escalation: {what becomes harder, stranger, more consequential, or more specific}
  Turn: {where the writer's understanding changes, or where the argument becomes sharper}
  Landing: {what the reader understands by the end}
```

Run the gate:

- **Pass:** The movement shows a change in understanding across the post.
- **Fail:** The movement is only a list of sections or framework parts.

Passing shapes:

- expectation → pressure → escalation → changed belief
- question → failed explanation → better explanation → sharper question
- old assumption → concrete exception → broader pattern → revised assumption
- familiar problem → overlooked cause → consequence → more useful framing
- capability → boundary → consequence → revised model

Failing shapes:

- part 1 → part 2 → part 3
- problem → solution → lesson
- intro → example → takeaway
- deterministic → agentic → human, unless each step changes what the reader understands

If the gate fails, revise the movement before continuing. Do not draft until the architecture has a reader-facing path through it.

---

## Phase 3: Anchor selection

This is the step that prevents throwaway drafts. Do not skip it for systems posts or any post with real architecture.

1. From `writer-context` (the project inventory), nominate candidate anchor stories that might carry the claim.
2. For the chosen architecture, build the **evidence map**: for each required part / move, name the concrete moment in a candidate project that demonstrates it. A part or move with no concrete evidence is an empty cell.
3. For each concrete moment, identify the **collision event**: the pressure that makes the example worth using. A collision event can be a decision, tradeoff, ambiguity, contradiction, failed assumption, boundary condition, consequence, escalation, or changed understanding. If the example only illustrates a point already made, it is weak evidence even if it is accurate.
4. **Screen the evidence and collision events for reputational cost.** For each load-bearing example, ask whether its reputational cost exceeds its narrative value — compliance failures, security incidents, near-misses, anything that could read as airing a former employer's problems, blaming colleagues, exposing proprietary detail, or self-incrimination. An active job search raises the cost. Prefer a non-sensitive example of equal structural value; if the only example that fills a cell is reputationally costly, surface it for the writer's explicit decision before locking the anchor.
5. Recommend the single anchor that fills every cell. Prefer recency and strategic value, especially a project that seeds a planned case study or strengthens the writer's current positioning.
6. Apply the dilution rule: prefer one anchor that contains the whole structure over several that each contain a fragment. Do not stitch partial anchors together unless the chosen architecture explicitly depends on comparison across examples.

---

## Phase 4: Fit gate (the checkpoint)

Present the evidence map for the chosen anchor as a table:

```text
required part / move | concrete evidence in anchor | collision event | status
```

Where:

- **required part / move** = the architecture element the evidence must support
- **concrete evidence in anchor** = the specific project moment, artifact, workflow, decision, or observation
- **collision event** = the pressure that makes the evidence do argumentative work: decision, tradeoff, ambiguity, contradiction, failed assumption, boundary condition, consequence, escalation, or changed understanding
- **status** = filled / weak / empty

A cell is **filled** only when both the concrete evidence and collision event are present.

A cell is **weak** when the evidence is accurate but merely illustrative, underdeveloped, too abstract, or missing pressure.

A cell is **empty** when there is no concrete evidence, no collision event, or the only available collision event is too reputationally costly to use.

- **If every cell is filled:** the anchor fits. Continue to Phase 5.
- **If any cell is weak:** revise the evidence, sharpen the collision event, swap the example, or change the architecture. Do not proceed with weak evidence unless the writer explicitly accepts the risk.
- **If any cell is empty:** STOP. Do one of:
  - swap to an anchor that fills every cell,
  - change the architecture to the parts / moves the best available anchor actually contains, or
  - narrow the claim.

Do not proceed to outline or drafting with an empty cell. Manufacturing the missing part through abstraction is the exact failure this command exists to prevent.

---

## Phase 5: Outline and metadata

With a fitting anchor, sketch the plan. Do not write prose.

- **Beat outline.** Map the three beats (`blog-post-framework`) through the chosen architecture, reader movement, and evidence map. The beats are content checks, not section templates:
  - **Why this:** establish stakes through the motivating question, violated expectation, starting point, or first pressure.
  - **What's true:** develop the chosen architecture through the anchor story, evidence map, collision events, and reader movement. Each load-bearing example should apply pressure to the claim, not merely illustrate it. Do not merely enumerate architecture parts unless enumeration is the intended reader movement.
  - **What's portable:** land the changed understanding, sharper question, or single carry-away insight the post earns.
  - **What's next:** include only if natural.

- **Opener shape.** Pick a shape from the `blog-post-framework` table that fits _this_ story, varied from recent posts. The opener should connect to the motivating question, violated expectation, starting point, or first pressure rather than announce the architecture.
- **Working title and slug.** Propose both (slug kebab-case, no spaces).
- **Links / cross-references.** Note any case study or prior post to link.
- **Contentious decisions (resolve before the blueprint).** These otherwise detonate at draft time; settle them now and record the answers in the blueprint. (a) Name or abstract the employer? (`personal-tone` → Employer identity; default abstract for blog/craft.) (b) Any reputationally sensitive examples to screen, including collision events whose narrative value depends on blame, internal failure, or proprietary detail? (c) Opener shape/register — builder-experience, scene, claim, question, or expectation? (d) Is a brief second instance / on-ramp wanted, and at what length budget?
- **Open questions / placeholders.** Anything unresolved at plan time (series URLs, a metric to confirm), using the `[CONFIRM PRE-LAUNCH: ...]` convention.

---

## Phase 6: Emit the blueprint

**Blueprint-collision check first.** Look in `.claude/plans/` for a blueprint at `{slug}.md`, or one whose central claim closely matches this plan's. If none, write normally. If one exists, do not silently overwrite and do not stop: surface it and ask the writer — **overwrite** (this is a re-plan of the same post), **rename** (this is a different post; choose a new slug), or **cancel**. This is the _only_ planned-work collision that warrants a pause; existing draft content in `src/content/blog/` never does.

Write the blueprint to `.claude/plans/<slug>.md` (this path is gitignored scratch; it is the handoff artifact, not committed content, and must not go under `src/content/blog/`, which the content collection would try to load). Then print it.

### Blueprint revision rule

The blueprint is canonical for drafting, but it is not a prison.

If drafting or review reveals that a different motivating question, architecture, reader movement, anchor, evidence map, collision event, or close would make a stronger post, do not patch the prose around the old plan. Update the blueprint first, then resume drafting.

Treat these as blueprint-level changes:

- the post wants to answer a different motivating question
- the violated expectation changes
- the central claim changes materially
- the architecture changes
- the reader movement changes
- the anchor story changes
- a required part / move no longer has evidence
- a collision event is missing, weak, or different from the planned one
- the close reveals a better changed understanding than the original landing

Treat these as drafting-level changes:

- paragraph order within the same reader movement
- sentence-level voice edits
- clearer transitions
- cutting repetition
- replacing a weak phrase with stronger prose
- adjusting title, description, tags, or section rendering without changing the underlying plan

If a change is blueprint-level, revise `.claude/plans/{slug}.md` before continuing. The plan should remain an honest record of the post being drafted, not a discarded artifact.

### Blueprint template

````markdown
# Blog plan: {working title}

- **Slug:** {slug}
- **Post type:** {systems | craft | process | personal}
- **Audience (lead):** {recruiter | tech-comm | LinkedIn}
- **Series:** {none | series name}
- **Status:** plan complete, ready for /blog-draft

## Motivating question

{the question the post is trying to understand}

## Violated expectation

{what the writer expected, assumed, or believed before the work complicated it}

## Central claim

The claim should answer or complicate the motivating question, not merely summarize the topic.

{one sentence the reader could disagree with}

## Architecture

{chosen architecture}

Required parts / moves:

- {part or move 1}
- {part or move 2}
- {…}

The architecture is the governing structure of the post. It may be system-shaped, inquiry-shaped, or craft/process-shaped depending on what best carries the claim.

## Reader movement

```text
Starting point: {what the reader or writer assumes, notices, or believes at the beginning}
First pressure: {the first concrete moment that complicates the starting point}
Escalation: {what becomes harder, stranger, more consequential, or more specific}
Turn: {where the writer's understanding changes, or where the argument becomes sharper}
Landing: {what the reader understands by the end}
```
````

The draft should follow this movement. The architecture governs the post; reader movement determines how that architecture unfolds on the page.

## Anchor story

{project}. Why this one: {recency / fills every required part or move / carries the motivating question / seeds case study}.

## Evidence map (fit gate — all cells filled)

| Required part / move | Concrete evidence in anchor                                             | Collision event                                                                                                                          | Status                  |
| -------------------- | ----------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| {part or move 1}     | {specific project moment, artifact, workflow, decision, or observation} | {decision, tradeoff, ambiguity, contradiction, failed assumption, boundary condition, consequence, escalation, or changed understanding} | {filled / weak / empty} |
| {part or move 2}     | {specific project moment, artifact, workflow, decision, or observation} | {decision, tradeoff, ambiguity, contradiction, failed assumption, boundary condition, consequence, escalation, or changed understanding} | {filled / weak / empty} |

A draft should not use an example whose only function is illustration. Each load-bearing example must apply pressure to the claim.

## Beat outline

The beats are content checks, not section templates.

- **Why this:** {opener shape} — {motivating question / violated expectation / starting point / first pressure}
- **What's true:** {chosen architecture developed through the anchor story, evidence map, collision events, and reader movement}
- **What's portable:** {changed understanding / sharper question / single carry-away insight}
- **What's next (optional):** {only if natural}

## Contentious decisions (resolved)

- **Employer:** {name | abstract — and why}
- **Sensitive examples:** {none | screened: which, and the call}
- **Opener shape/register:** {builder-experience | scene | claim | question | expectation}
- **Second instance / on-ramp:** {none | yes — length budget}

## Links / cross-references

- {case study or prior post}

## Open questions

- {placeholders, [CONFIRM PRE-LAUNCH: ...] items}

### Hand-off

Tell the writer the plan is complete and to run `/blog-draft` with this blueprint. `/blog-draft` consumes the approved blueprint and does not silently re-open the motivating question, violated expectation, architecture, reader movement, anchor, evidence map, collision events, or close. If drafting discovers a better structure, route back here, update the blueprint, then resume drafting.

## Scope boundary

This command covers:

- Seed → motivating question → violated expectation → central claim → architecture → reader movement → anchor → evidence-map fit gate with collision events → blueprint

This command does **not** cover:

- **Drafting, prose validation, save, ship** → `commands/blog-draft.md`
- **Adversarial review of a finished draft** → `commands/blog-review.md`
- **The structural rules themselves** → `blog-post-framework`
- **The systems-writing lenses, system-shaped and inquiry-shaped architecture options, collision-event evidence, and anchor method** → `systems-writing`

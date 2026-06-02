---
name: systems-writing
description: Domain scaffolding for essays whose subject is a system — pipelines, migrations, automation, workflows, documentation/knowledge systems, responsibility boundaries. Generative: helps turn a seed idea into a sound architecture and a fitting anchor story before drafting. Load in blog-plan when the topic is a system.
tags: [writing, systems, architecture, planning, domain]
---

# Skill: systems-writing

## When to load this skill

Load in `blog-plan` (and available to `blog-draft`/`blog-review`) when the post's subject is a *system*: a pipeline, a migration, an automation, a workflow, a documentation or knowledge system, or the responsibility boundaries between parts of one. This is a conditional, domain skill, like `series-blocks`. Do not load it for general craft or personal essays.

## Why this skill exists

Cody writes systems essays repeatedly: it is the core of the "systems designer / strategist" brand, and the same essays seed the portfolio case studies. The recurring friction is not prose. It is reaching a sound *architecture* and finding an *anchor story that actually contains it* before any drafting happens. Without front-loaded knowledge, that search costs hours and throwaway drafts: pick an architecture, anchor it to a project, draft, then discover the project is missing a part the architecture requires.

This skill front-loads the knowledge so a seed idea reaches a fitting architecture and anchor in one planning pass instead of through trial and error. It is **generative** (it helps produce the plan), not a checklist. Universal structure rules live in `blog-post-framework`; this skill is the systems-specific scaffolding `blog-plan` draws on.

## What makes an essay a systems essay

The subject is how a system *behaves, is built, or breaks at its seams*, not a how-to for using it. A systems essay argues something about the structure: where one kind of work stops being sufficient, how responsibility moves, what a constraint forced. If the draft would read as a tutorial or a feature tour, it is not a systems essay, and this skill does not apply.

## Analyze the system: pick a lens

Before structuring the essay, work out *what is interesting about the system*. A lens is the analytical angle that surfaces the insight; the architecture (next section) is how you communicate it. **Lens finds the insight; architecture carries it.** They are separate choices, and this is the order: lens first.

Pick the lens that best explains *this* system. Most systems essays have one dominant lens, sometimes two. Do not force a system through a lens that does not fit it; an information-architecture, knowledge-decay, or usability essay is usually not a responsibility-transition story, and forcing it into one is the overfitting trap.

| Lens | Surfaces | Questions to interrogate the system |
|---|---|---|
| **Responsibility transitions** | where work hands off | Where does responsibility change hands? What can each layer decide? What stays unresolved? What triggers escalation? When does one layer stop being sufficient? |
| **Information flow** | where meaning moves and degrades | How does information move? Where is context lost? Where is fidelity gained? Where do transformations happen? |
| **Constraints and tradeoffs** | what an optimization cost | What was optimized for? What cost did that introduce? What got easier, and what got harder? |
| **Feedback loops** | self-reinforcing behavior | How do outputs shape future inputs? What behavior compounds? What stabilizes the system? |
| **Failure and recovery** | how it breaks and heals | How does it fail? How is failure detected? How is recovery achieved? What stops cascades? |
| **Incentives and ownership** | why behavior persists | Who maintains it? Why does the behavior persist? What incentives shape outcomes? |

A lens usually suggests an architecture: a responsibility-transitions lens points toward a responsibility-map or seam structure; an information-flow lens toward a before/after or transformation structure. The job of this skill is to help find the lens that fits the system, not to route every system through the same one.

## Architecture palette

Once a lens has surfaced the insight, choose an architecture to communicate it. Pick the shape the *actual system* has. This is a palette, not a template. Do not impose a shape the anchor story does not contain.

| Architecture | When it fits | The parts it requires |
|---|---|---|
| **Layer decomposition** | The system does genuinely different *kinds* of work that hand off to each other | One section per layer, plus the seams between them. Layer count comes from the system, not from a habit. Two layers is fine; so is four. |
| **Seam / boundary trace** | The interesting thing is the moment one kind of work stops being enough | The capability, the boundary where it runs out, what takes over |
| **Before / after migration** | A constraint was removed and behavior changed | The old constraint, the intervention, the new behavior, what it cost |
| **Responsibility map** | The point is who owns what across a boundary | Each owner, the handoff, where ownership was ambiguous |
| **Capability → boundary → transition** | A single capability is followed to its edge | Capability, the boundary event, the transition to the next kind of work |

The layer/seam shapes are the most common for this brand, but **the three-layer "deterministic / agentic / human" decomposition is one instance, not the default.** Let the system set the count and the shape.

## Strong systems evidence

The strongest evidence in a systems essay is a **boundary event**: a concrete moment where the structure showed itself.

- One kind of work stopped being sufficient and another had to take over.
- Responsibility or ownership changed hands.
- A constraint forced a decision with a real tradeoff.
- Interpretation became necessary where a rule used to be enough.

Weak evidence: a feature list, a tidy success story with no seam, an example that illustrates a claim without a decision or a cost. Prefer the moment of strain over the moment of success.

## Finding the anchor (the part that prevents throwaway drafts)

This is the step that fails silently when skipped. Do it before drafting.

1. **List the parts** the chosen architecture requires (the right-hand column above).
2. **Nominate candidate anchors from `writer-context`.** That skill is the project inventory: Cody's real work, with what each project demonstrates. Pull candidates from it rather than inventing or guessing.
3. **Build the evidence map.** For each required part, name the concrete moment in a candidate project that demonstrates it. A part with no concrete evidence is an empty cell.
4. **Choose the single anchor that fills every cell.** Prefer recency and strategic value (a project that also seeds a planned case study earns extra weight, because the post can link to it).
5. **If no single project fills every cell:** either change the architecture to the parts the best anchor actually has, or pick a different anchor. **Do not stitch several partial projects together.** Multiple partial anchors dilute the argument and force abstraction to paper over the empty cells. One whole anchor beats three fragments.

### Worked example

Claim: documentation systems fail at the seams where one kind of work stops being sufficient. Chosen architecture: three-layer decomposition (deterministic, agentic, human).

Required parts and the evidence map across two candidate anchors from `writer-context`:

| Required part | AWS XML→AsciiDoc migration | Cloudflare solution-guide pipeline |
|---|---|---|
| Deterministic layer | Yes (parsing, element mapping, cross-reference rewriting) | Yes (templated generation) |
| Agentic layer | **Empty** (no agent step in that project) | Yes (multi-step Claude agents with validation gates between steps) |
| Human layer | Partial (review/judgment) | Yes (judgment on what ships, what a gate rejects) |

The AWS migration fails the gate: the agentic-layer cell is empty, so a three-layer essay anchored to it would have to manufacture the missing layer through abstraction. The Cloudflare pipeline fills every cell, is the most recent work, and seeds the Cloudflare case study the post can link to. Anchor on Cloudflare. This is the call that, made at planning time, replaces hours of drafting-then-discovering.

## Hand-off

`blog-plan` uses this skill to fill the blueprint's architecture, anchor, and evidence-map sections, then gates on the evidence map before drafting. `blog-draft` consumes the approved blueprint and does not re-open the architecture.

## Scope boundary

This skill covers:
- Recognizing a systems essay
- Lens selection (the analytical step that finds the insight)
- The architecture palette and how to choose (how the insight is communicated)
- What counts as strong systems evidence
- Finding and validating an anchor against the required parts

This skill does **not** cover:
- **Universal structure** (three beats, forward motion, semantic duplication, anchor-fit principle) → `blog-post-framework`
- **Voice** → `personal-tone`
- **Style banishments** → `ai-antipatterns`
- **The writer's verified facts and project inventory** → `writer-context`
- **The planning flow and the blueprint artifact** → `commands/blog-plan.md`

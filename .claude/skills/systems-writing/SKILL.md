---
name: systems-writing
description: Domain scaffolding for systems blog posts — pipelines, migrations, automation, workflows, documentation/knowledge systems, information architecture, validation processes, and responsibility boundaries. Generative: helps turn a seed idea into a sound architecture, reader movement, anchor story, and collision-event evidence map before drafting. Load in blog-plan when the topic is a system.
tags: [writing, systems, architecture, planning, domain]
---

# Skill: systems-writing

## When to load this skill

Load in `blog-plan` and make available to `blog-draft` / `blog-review` when the post's subject is a _system_: a pipeline, a migration, an automation, a workflow, a documentation or knowledge system, an information architecture, a content model, a validation process, or the responsibility boundaries between parts of one.

This is a conditional, domain skill, like `series-blocks`. Do not load it for general craft, process, or personal posts.

## Terminology

Use **systems post** as the artifact label.

The target artifact is a public blog post on `codyanthony.dev/blog/`, even when the structure is argument-shaped or inquiry-shaped. Do not let the word "essay" pull the output toward academic framing, slow thesis setup, literary abstraction, or a generic thinkpiece voice.

A systems post still needs:

- a concrete opener
- visible stakes
- recruiter-safe specificity
- peer-level substance
- reader movement
- a portable insight
- enough builder voice that the post feels grounded in work actually done

## Why this skill exists

Cody writes systems posts repeatedly: it is the core of the "systems designer / strategist" brand, and the same posts can seed portfolio case studies. The recurring friction is not prose. It is reaching a sound _architecture_, finding an _anchor story that actually contains it_, and identifying the _collision events_ that make the evidence do argumentative work before any drafting happens.

Without front-loaded systems thinking, that search costs hours and throwaway drafts: pick an architecture, anchor it to a project, draft, then discover the project is missing a part the architecture requires, or that the examples only illustrate the claim without applying pressure to it.

This skill front-loads the domain knowledge so a seed idea reaches a fitting architecture, reader movement, anchor, and collision-event evidence map in one planning pass instead of through trial and error. It is **generative**: it helps produce the plan. It is not a publish checklist. Universal structure rules live in `blog-post-framework`; this skill is the systems-specific scaffolding `blog-plan` draws on.

## What makes a blog post a systems post

The subject is how a system _behaves, is built, changes, or breaks at its seams_, not a how-to for using it. A systems post argues something about structure, pressure, responsibility, constraints, information flow, workflow behavior, or changed understanding inside a system.

A systems post might ask:

- Where does one kind of work stop being sufficient?
- How does responsibility move?
- What does a constraint force?
- Where does information degrade or gain meaning?
- What behavior compounds through a feedback loop?
- What assumption did repeated encounters with the system complicate?
- What changed in the writer's understanding because the system kept revealing the same pressure?

If the draft would read as a tutorial, feature tour, generic lesson, or abstract framework explanation, it is not yet a systems post. Redirect the plan toward a claim, pressure point, or changed understanding.

## Analyze the system: pick a lens

Before structuring the post, work out _what is interesting about the system_. A lens is the analytical angle that surfaces the insight; the architecture is how you communicate it. **Lens finds the insight; architecture carries it.** They are separate choices, and this is the order: lens first.

Pick the lens that best explains _this_ system. Most systems posts have one dominant lens, sometimes two. Do not force a system through a lens that does not fit it. An information-architecture, knowledge-decay, validation, or usability post is usually not a responsibility-transition story, and forcing it into one is the overfitting trap.

| Lens                           | Surfaces                         | Questions to interrogate the system                                                                                                                             |
| ------------------------------ | -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Responsibility transitions** | where work hands off             | Where does responsibility change hands? What can each layer decide? What stays unresolved? What triggers escalation? When does one layer stop being sufficient? |
| **Information flow**           | where meaning moves and degrades | How does information move? Where is context lost? Where is fidelity gained? Where do transformations happen?                                                    |
| **Constraints and tradeoffs**  | what an optimization cost        | What was optimized for? What cost did that introduce? What got easier, and what got harder?                                                                     |
| **Feedback loops**             | self-reinforcing behavior        | How do outputs shape future inputs? What behavior compounds? What stabilizes the system?                                                                        |
| **Failure and recovery**       | how it breaks and heals          | How does it fail? How is failure detected? How is recovery achieved? What stops cascades?                                                                       |
| **Incentives and ownership**   | why behavior persists            | Who maintains it? Why does the behavior persist? What incentives shape outcomes?                                                                                |
| **Validation and judgment**    | where rules stop being enough    | What could be checked mechanically? What required interpretation? Where did human judgment move rather than disappear?                                          |
| **Knowledge decay**            | where truth becomes stale        | What changed? What did the system fail to notice? Where did old content remain plausible but wrong?                                                             |
| **User path / task fit**       | where structure meets use        | What did the system assume the user would do? Where did that assumption fail? What task shape did the structure need to support?                                |

A lens usually suggests an architecture: a responsibility-transitions lens points toward a responsibility map or seam structure; an information-flow lens points toward a before/after or transformation structure; a validation-and-judgment lens often points toward capability → boundary → transition or expectation → pressure → changed belief.

The job of this skill is to help find the lens that fits the system, not to route every system through the same one.

## Architecture palette

Once a lens has surfaced the insight, choose an architecture to communicate it. This is a palette, not a template. Do not impose a shape the anchor story does not contain.

The palette includes both **system-shaped architectures** and **inquiry-shaped architectures**.

A system-shaped architecture mirrors the structure of the system: layers, seams, handoffs, constraints, feedback loops, failure paths, information transformations, or responsibility boundaries.

An inquiry-shaped architecture follows how the writer's understanding changed while working inside the system: expectation, pressure, contradiction, escalation, failed explanation, sharper question, or revised belief.

Use a system-shaped architecture when the system's structure is the main thing the reader needs to understand. Use an inquiry-shaped architecture when the interesting discovery is not the topology of the system, but what repeated encounters with the system changed in the writer's thinking.

Do not force an inquiry-shaped post into a layer decomposition. If the draft wants to answer "why did this keep happening?" or "why did this change what I believed?", prefer an inquiry-shaped architecture.

| Architecture                                                    | When it fits                                                                                                              | The parts / moves it requires                                                                                                            |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| **Layer decomposition**                                         | The system does genuinely different _kinds_ of work that hand off to each other                                           | One section per layer, plus the seams between them. Layer count comes from the system, not from a habit. Two layers is fine; so is four. |
| **Seam / boundary trace**                                       | The interesting thing is the moment one kind of work stops being enough                                                   | The capability, the boundary where it runs out, what takes over                                                                          |
| **Before / after migration**                                    | A constraint was removed and behavior changed                                                                             | The old constraint, the intervention, the new behavior, what it cost                                                                     |
| **Responsibility map**                                          | The point is who owns what across a boundary                                                                              | Each owner, the handoff, where ownership was ambiguous                                                                                   |
| **Capability → boundary → transition**                          | A single capability is followed to its edge                                                                               | Capability, the boundary event, the transition to the next kind of work                                                                  |
| **Failure → detection → recovery**                              | The system's behavior is clearest when something breaks                                                                   | Failure mode, detection mechanism, recovery path, what prevents recurrence or cascade                                                    |
| **Information flow / degradation trace**                        | Meaning changes as it moves through tools, formats, roles, or contexts                                                    | Source context, transformation, loss or gain of meaning, consequence                                                                     |
| **Constraint → tradeoff → changed operating model**             | A constraint forced a decision that changed how the system worked                                                         | Constraint, decision, tradeoff, changed behavior                                                                                         |
| **Expectation → pressure → changed belief**                     | The post is driven by an assumption the work complicated, especially when several examples reveal the same deeper pattern | Starting expectation, first pressure, escalation through 2–4 concrete moments, turn, changed belief                                      |
| **Question → failed explanation → sharper explanation**         | The writer began with a question and found that the obvious answer did not explain the repeated evidence                  | Initial question, plausible but insufficient explanation, evidence that breaks it, sharper explanation                                   |
| **Repeated encounters → emerging pattern → revised assumption** | Several small moments reveal the same hidden behavior over time                                                           | Encounter 1, encounter 2, encounter 3 if needed, emerging pattern, revised assumption                                                    |

### Architecture fit warning

A systems post does not have to explain the system as a framework.

If the strongest version of the post is about how the writer's understanding changed, do not convert it into a tour of system parts. A clean decomposition can produce a correct but lifeless post when the real story is a violated expectation, a recurring contradiction, or a changed belief.

Before locking the architecture, ask:

- Is the reader supposed to understand the system's structure?
- Or is the reader supposed to understand what the system revealed?
- Is the post trying to explain how the system works?
- Or is it trying to explain why the writer's first explanation stopped working?

If the answer is revelation, pressure, or changed belief, choose an inquiry-shaped architecture.

## Reader movement in systems posts

Reader movement is the path by which the post changes the reader's understanding. Architecture governs the post; reader movement is how that architecture unfolds.

A systems post often fails when the architecture becomes too visible and the movement disappears. The reader should not feel like they are being walked through a framework. They should feel pressure accumulating until the claim becomes necessary.

Useful systems reader movements include:

- expectation → first pressure → escalation → changed belief
- capability → boundary → consequence → revised model
- local fix → exposed upstream problem → responsibility shift → new operating rule
- concrete failure → attempted explanation → failed explanation → sharper explanation
- repeated small incidents → pattern recognition → changed assumption
- old constraint → intervention → new behavior → new cost

When planning, name the movement separately from the architecture:

- **Starting point:** what the reader believes or accepts at the beginning
- **First pressure:** what complicates that starting point
- **Escalation:** what makes the first pressure matter beyond one incident
- **Turn:** what the writer now understands differently
- **Landing:** what the reader should carry away

If the movement is only "part 1 → part 2 → part 3," the plan is probably a framework tour.

## Strong systems evidence

The strongest evidence in a systems post is usually a **collision event**: a concrete moment where the system, assumption, or responsibility boundary becomes visible because something applies pressure to it.

A collision event does not have to be dramatic. It can be a small moment where the writer had to decide, interpret, trade off, revise, escalate, or admit that the original framing was incomplete.

Useful collision events include:

- one kind of work stopped being sufficient and another had to take over
- responsibility or ownership changed hands
- a constraint forced a decision with a real tradeoff
- interpretation became necessary where a rule used to be enough
- a generated draft looked correct but failed against product reality
- a migration preserved syntax but lost meaning
- a workflow solved one bottleneck and exposed another
- a user-path assumption changed the shape of the content
- a handoff made ownership unclear
- a validation gate caught an issue the drafting step could not see
- a repeated exception revealed that the original model was wrong

For some lenses, the collision event may take a specific shape:

| Lens                       | Strong evidence often looks like                           |
| -------------------------- | ---------------------------------------------------------- |
| Responsibility transitions | Boundary event, handoff, escalation                        |
| Information flow           | Degradation trace, transformation, context loss            |
| Constraints and tradeoffs  | Decision forced by constraint, explicit cost               |
| Feedback loops             | Compounding behavior, output shaping future input          |
| Failure and recovery       | Failure mode, detection moment, recovery path              |
| Incentives and ownership   | Persistent behavior explained by ownership or incentive    |
| Validation and judgment    | Rule reaches boundary; interpretation takes over           |
| Knowledge decay            | Plausible old truth becomes wrong under changed conditions |
| User path / task fit       | System assumes the wrong user action or sequence           |

Weak evidence: a feature list, a tidy success story with no seam, an example that illustrates a claim without a decision, cost, ambiguity, or changed understanding. Prefer the moment of strain over the moment of success.

Weak evidence names what existed. Strong evidence names what happened.

**Reputational cost vs narrative value.** Screen the strongest evidence before committing to it, whatever shape it takes for your lens. Avoid any example whose reputational cost exceeds its narrative value: compliance failures, security incidents, near-misses, anything that could read as airing a former employer's problems or as self-incrimination. Prefer a non-sensitive example of equal structural value. An active job search raises the reputational cost.

## Keep the served party visible

A systems post describes a system, and the people it exists for can vanish behind the architecture. Keep them present: who is served, and what breaks for them when the output is wrong. A reader should be able to answer "who cares?" from the post itself.

This is the subject system's users — distinct from `blog-post-framework`'s audience-layering, which is the blog's readers.

Served parties might include:

- customers trying to complete a task
- engineers trying to contribute content safely
- writers trying to govern quality without blocking delivery
- support teams trying to answer questions consistently
- future maintainers trying to understand why something exists
- AI systems retrieving content that must remain accurate and bounded

Do not let the post become a diagram with no people in it.

## The builder stance (apply `personal-tone` → Builder voice)

This is an application note, not a restatement; the rule lives in `personal-tone` → Builder voice.

In a systems post:

- lead each move with the observed failure, pressure, constraint, or design decision, not the principle it illustrates
- earn the thesis from the catches rather than asserting it up front
- let collision events create the abstraction
- keep the writer inside the work as someone making judgments, not outside it as someone explaining how systems generally work
- end on what the work revealed, not a maxim about systems or AI

## Finding the anchor (the part that prevents throwaway drafts)

This is the step that fails silently when skipped. Do it before drafting.

1. **List the required parts / moves** the chosen architecture requires.
2. **Name the reader movement** the post needs to create: starting point, first pressure, escalation, turn, landing.
3. **Nominate candidate anchors from `writer-context`.** That skill is the project inventory: Cody's real work, with what each project demonstrates. Pull candidates from it rather than inventing or guessing.
4. **Build the evidence map.** For each required part / move, name:
   - the concrete evidence in the candidate anchor
   - the collision event that makes the evidence do argumentative work
   - the status: `filled`, `weak`, or `empty`

5. **Choose the single anchor that fills every cell.** Prefer recency and strategic value. A project that also seeds a planned case study earns extra weight because the post can link to it.
6. **If no single project fills every cell:** either change the architecture to the parts the best anchor actually has, narrow the claim, or pick a different anchor. **Do not stitch several partial projects together by default.** Multiple partial anchors dilute the argument and force abstraction to paper over the empty cells. One whole anchor beats three fragments.
7. **Exception:** use multiple anchors only when the architecture explicitly depends on comparison across examples. If using multiple anchors, state what comparison each one enables.

Evidence-map status definitions:

- `filled`: concrete evidence exists, and the collision event is clear.
- `weak`: evidence exists but only illustrates the claim, or the collision event is vague.
- `empty`: no concrete evidence exists for the required part / move.

A `weak` cell requires revision before drafting unless the writer explicitly accepts the risk. An `empty` cell stops the plan: change the anchor, architecture, or claim.

### Worked example

Claim: automation did not remove judgment from the documentation workflow; it moved judgment into system design.

Chosen architecture: expectation → pressure → changed belief.

Reader movement:

- Starting point: better automation should make the writer less involved
- First pressure: generated output looked plausible but exposed assumptions the script could not resolve
- Escalation: each improvement solved one bottleneck and revealed another decision point upstream
- Turn: the writer was not being removed from the work; judgment was moving into the workflow design
- Landing: automation changed the location of judgment, not the need for it

Evidence map across two candidate anchors from `writer-context`:

| Required part / move | AI-assisted documentation workflow                                                                                                                                                                                 | AWS XML→AsciiDoc migration                                                                                                |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| Starting expectation | **Filled** — expected automation to reduce involvement. Collision event: a plausible generated output still required product judgment.                                                                             | **Weak** — automation reduced mechanical conversion work, but expectation about judgment is not the core project tension. |
| First pressure       | **Filled** — generated draft surfaced an assumption about audience/task path. Collision event: the workflow had no rule for deciding which assumption was correct.                                                 | **Weak** — conversion exposed format and mapping decisions, but not the same AI/judgment pressure.                        |
| Escalation           | **Filled** — validation gates solved some errors but exposed upstream content-quality and ownership questions. Collision event: each gate moved the decision boundary rather than removing it.                     | **Empty** — no agentic validation loop in this project.                                                                   |
| Changed belief       | **Filled** — judgment moved from sentence-level drafting into system design, gates, and review boundaries. Collision event: the writer had to redesign the workflow rather than simply improve the generated text. | **Partial** — good for migration constraints, weak for AI judgment movement.                                              |

The AWS migration fails the gate for this post: it has useful automation and migration material, but it does not contain the agentic validation loop or changed-belief pressure the claim requires. The AI-assisted workflow fills every cell and contains the collision events. Anchor on that. This is the call that, made at planning time, replaces hours of drafting-then-discovering.

## Hand-off

`blog-plan` uses this skill to fill the blueprint's systems-specific sections:

- lens
- architecture
- required parts / moves
- reader movement
- anchor candidates
- evidence map with collision events and statuses
- reputational-screening notes
- served-party notes, when relevant

`blog-draft` consumes the approved blueprint and does not re-open the architecture unless drafting reveals a weak or missing collision event, a reader-movement collapse, or a genuine architecture mismatch.

`blog-review` uses this skill to check whether the draft preserved the planned architecture, reader movement, evidence map, collision events, and served party.

## Scope boundary

This skill covers:

- Recognizing a systems post
- Lens selection (the analytical step that finds the insight)
- The architecture palette and how to choose (how the insight is communicated)
- Reader movement for systems posts
- What counts as strong systems evidence, especially collision events
- Screening systems evidence for reputational cost
- Keeping the subject system's served party visible
- Finding and validating an anchor against required parts / moves and collision events

This skill does **not** cover:

- **Universal structure** (three beats, forward motion, semantic duplication, opener authenticity, anchor-fit principle) → `blog-post-framework`
- **Voice** → `personal-tone`
- **Style banishments** → `ai-antipatterns`
- **The writer's verified facts and project inventory** → `writer-context`
- **The planning flow and the blueprint artifact** → `commands/blog-plan.md`
- **The draft execution and review orchestration** → `commands/blog-draft.md`, `commands/blog-review.md`

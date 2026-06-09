---
description: Adversarial review of an existing blog post draft against ai-antipatterns, personal-tone, blog-post-framework, blog-checklist, and any available blog-plan blueprint. Returns structured findings without auto-fixing.
version: 1.2
---

---

# /blog-review

Adversarial reviewer for blog posts. Reads a draft, runs every check from the required skills, checks the draft against any available `/blog-plan` blueprint, and returns a structured findings report. Does not auto-fix — the writer decides which findings to act on.

> **Running blog-review v1.2** — Adversarial pass against `ai-antipatterns`, `personal-tone`, `blog-post-framework`, `blog-checklist`, and any available `/blog-plan` blueprint. Findings only; no auto-fix. Use after `/blog-draft` and before publish, or on any handed-off draft.

Print the banner above verbatim before doing anything else.

## When to use

- **After `/blog-draft`** — second pass with fresh eyes before publish.
- **On a hand-authored draft** — when the writer composed the post manually and wants a system check before publishing.
- **On an externally-sourced draft** — when adapting a guest post, conference talk, or other source into a blog post on this brand.

The command is **read-only on the draft** — it does not modify the file. The writer applies fixes manually after reviewing findings.

## Dependencies

**Required skills:**

- `ai-antipatterns`
- `personal-tone`
- `blog-post-framework`
- `blog-checklist`

**Conditional skill:**

- `systems-writing` when the draft is a systems post, when a blueprint marks the architecture as system-shaped or inquiry-shaped systems work, or when the review references collision events / served-party visibility.

**Required input:** path to a draft file, either:

- An MDX file already in `src/content/blog/` (most common)
- A markdown draft anywhere on the local filesystem (for unsaved drafts)

## Step 0: Load skills

Load the four required skills:

1. `.claude/skills/ai-antipatterns/SKILL.md`
2. `.claude/skills/personal-tone/SKILL.md`
3. `.claude/skills/blog-post-framework/SKILL.md`
4. `.claude/skills/blog-checklist/SKILL.md`

If the draft or blueprint indicates a systems post, also load:

5. `.claude/skills/systems-writing/SKILL.md`

If any required skill is missing, **STOP** and report which one. If `systems-writing` is missing for a systems post, **STOP** and report it. If the post is not a systems post, skip `systems-writing`.

## Step 1: Identify the draft

If `$ARGUMENTS` includes a path, use it. Otherwise ask:

> What's the path to the draft? (e.g., `src/content/blog/content-alchemy.mdx`)

Verify the file exists. If not, **STOP** and report the path that wasn't found.

If the file is in `src/content/blog/`, also gather context: the most recent 2–3 published posts in the same directory (for opener-shape comparison).

## Step 2: Read and parse the draft

Read the full file. Separate frontmatter from body. Note:

- Word count of body
- Slug from filename
- Date from frontmatter
- Tags from frontmatter
- Series value, if present

If `.claude/plans/{slug}.md` exists, load it as blueprint context. Extract:

- motivating question
- violated expectation
- central claim
- architecture and required parts / moves
- reader movement
- anchor story
- evidence map with collision events and row statuses
- beat outline
- opener shape/register
- contentious decisions
- open questions / placeholders

If no blueprint exists, continue. Mark blueprint-specific checks as `SKIP: no blueprint`.

## Step 3: Run skill checks

For each skill, run every checklist item against the draft. Record each item as:

- **PASS** — clean
- **FAIL** — specific issue
- **WARN** — borderline, judgment call
- **SKIP** — not applicable or no blueprint available

For FAIL and WARN, cite the specific line or passage from the draft.

### 3a: ai-antipatterns scan

Check every banned word from the table. Check every banned phrase category. Check structural antipatterns. Check formatting antipatterns. Run the self-check at the end of the skill.

### 3b: personal-tone scan

Check voice (first-person, contractions, builder voice — recounts what was built, no blogger drift, abstraction after the evidence). Check tone (invitational, AI credit, no verbatim praise, no effort/scale flexing, employer abstracted by default in blog/craft posts). Check flow (no em dashes, no "X, not Y" contrast framing or its variants, no sales closing). Check brand alignment (canonical title, three pillars, three principles).

### 3c: blog-post-framework scan

Check beat presence (Why this, What's true, What's portable). Check opener shape variation against recent posts. Check opener authenticity: the opener connects to the motivating question, violated expectation, starting point, or first pressure rather than a generic topic frame. Check substance requirements (concrete example, disagreeable claim, respects reader's knowledge). Check word count is in a comfortable range (~600–1,200); shorter or longer is fine if every section earns its place. Check structural integrity (forward motion, no semantic duplication, paragraph rhythm, emphasis density, one dominant idea per section / no two competing decompositions, conclusion thesis discipline, conclusion as discovery, anchor-story fit, reader movement, collision-event evidence).

### 3d: blog-checklist scan

Run every item from the checklist that isn't covered by the three above (frontmatter validation, operational checks, cross-references, length, pacing).

### 3e: systems-writing scan, if applicable

For systems posts or posts whose blueprint uses a systems-writing architecture, check:

- The selected system-shaped or inquiry-shaped architecture still fits the draft.
- The served party remains visible.
- Collision events are present for load-bearing examples.
- The draft does not force an inquiry post into a layer decomposition.
- The draft does not convert a changed-belief post into a static framework tour.
- Sensitive examples are abstracted or screened when needed.

Skip this section for non-systems posts.

## Step 4: Adversarial pass

After the mechanical checks above, do one additional pass with explicit skepticism. Ask:

1. **Is the portable insight actually portable?** Read the sentence the writer is treating as the takeaway. Could it be shared on LinkedIn? Does it state something specific and defensible, or restate consensus? Flag if weak.

2. **Does each example earn its place? (deletion test + collision-event test)** For every load-bearing example, ask: if it were removed, would the argument lose something essential — a decision, consequence, tradeoff, ambiguity, constraint, competing interpretation, escalation, or changed understanding? Then identify the collision event: the pressure that makes the example do argumentative work. An example that only illustrates a point already made does not pass, even when it is concrete, accurate, and relevant. Flag each example that fails. Run this per example, not once per beat. Criteria live in `blog-post-framework` → Structural integrity → Examples apply pressure, and `systems-writing` → Collision events.

3. **Could a thoughtful peer disagree?** If no thoughtful peer would push back on the post's claims, the post is restating consensus. Flag if the post lacks a defensible claim.

4. **Is the opener doing work, and is it authentic to this post?** Read just the first paragraph. Would a busy reader keep reading past sentence two? Does the opener connect to the motivating question, violated expectation, starting point, or first pressure? Could it only open this post, from this writer, or could it open any competent article on the topic? Flag if the opener is generic, windup-shaped, architecture-announcing, or detached from the actual question the post is trying to understand.

5. **Does the writer's voice come through, in builder voice?** Could this post be written by anyone, or does it sound like the writer? In particular, is it in builder voice (recounting what was built and observed) or has it drifted into blogger mode (explaining how the field works)? A sentence that could open anyone's thinkpiece is the tell. Flag if the voice reads generic. (`personal-tone` → Builder voice. Subjective; offer specific phrasings that would sharpen voice if so.)

6. **Does the paragraph rhythm feel human, or over-engineered?** Scan the post paragraph by paragraph. Are too many consecutive paragraphs thesis-heavy, abstraction-first, or equally emphatic? Does every paragraph end by explaining what it means? Are there enough concrete resets, quieter observations, transitions, consequences, or specific details to let high-weight claims land? Flag sections where the ideas are correct but the rhythm feels monotonous, compressed, or artificially polished. (`blog-post-framework` → Paragraph rhythm and emphasis density.)

7. **Are there cross-link opportunities missed?** The site has case studies that may relate. If the post discusses a topic also covered in a case study, flag the missed cross-link.

8. **Blueprint consistency (only if a blueprint exists).** If `.claude/plans/{slug}.md` exists, load it. Does the final draft still deliver the post promised by the blueprint?

   Check:
   - **Motivating question:** The draft is still driven by the question the plan identified, not merely by the topic.
   - **Violated expectation:** The draft preserves what the writer expected, assumed, or believed before the work complicated it.
   - **Central claim:** The draft answers or complicates the central claim rather than drifting into a neighboring idea.
   - **Architecture:** The draft still uses the blueprint's governing structure, unless the drift clearly improves the blog post.
   - **Reader movement:** The draft follows the planned movement from starting point to first pressure to escalation to turn to landing. Flag if it collapses into a static framework tour.
   - **Anchor story:** The draft uses the planned anchor, or explains why a different anchor works better.
   - **Evidence map:** Each required part / move is represented.
   - **Collision events:** Every load-bearing example includes the pressure that made the example matter. Flag examples that only illustrate architecture parts.
   - **Beat outline:** The three beats are present as content checks, not visible templates.

   Classify every drift as one of three types:
   - **Drafting-level drift:** prose changed but the blueprint still describes the post. Recommend local edits only.
   - **Beneficial blueprint-level drift:** the draft found a stronger version of the post. Recommend updating `.claude/plans/{slug}.md` before further drafting.
   - **Accidental blueprint-level drift:** the draft dropped, weakened, or contradicted the plan. Recommend repair or route back to `/blog-plan`.

   Do not force the draft back to the blueprint if the draft discovered a stronger post. Do not ignore the blueprint if the draft merely wandered.

   This is **flag-and-decide, not plan enforcement.** Drift is not automatically wrong. If the drift improved the post, note it and recommend updating the blueprint. If it is a genuine architecture change, route back to `/blog-plan` so the fit gates run again. If it is accidental loss — a dropped part, missing collision event, evidence gap, or generic opener — flag it for repair. Skip entirely if no blueprint exists.

9. **Does the close land as discovery?** Read the last sentence and the sentence closing the penultimate paragraph. Do they land the changed understanding the post earned, or do they merely summarize the architecture, restate the central claim, or turn the argument into a maxim? Does the close emerge from the evidence, collision events, reader movement, or violated expectation? Could the final sentence be attached unchanged to any competent article on the topic? Flag if the emphatic slot holds the wrong idea, if the ending is an aphoristic closing, or if the post stops at summary rather than discovery. (`blog-post-framework` → Conclusion as discovery; `ai-antipatterns` → Aphoristic slogan closings.)

10. **(Systems posts only) Is the served party visible?** Can a reader answer "who cares?" from the post — who the system serves, and what breaks for them when its output is wrong? Flag if the people the system exists for have vanished behind the architecture. Skip for non-systems posts. (`systems-writing` → Keep the served party visible.)

11. **Is the post overexplaining its structure?** Flag if the post announces its architecture, explains its own framework, or repeatedly summarizes what the examples already show. A strong draft should let the reader experience the movement of the argument rather than watch the scaffolding.

## Step 5: Structured findings report

Output the findings in this exact format:

```markdown
# Blog review: {slug}

**File:** {path}
**Date:** {date}
**Words:** {N}
**Tags:** {comma-separated}

## Summary

- **Critical (must fix):** {count}
- **Recommended (should fix):** {count}
- **Optional (consider):** {count}

## Critical findings

{numbered list of items the writer must fix before publish — anti-pattern violations, missing beats, frontmatter errors, blueprint-breaking drift. Cite line numbers and quote the offending passage.}

## Recommended findings

{numbered list of items that improve the post without blocking publish — voice tightening, opener strengthening, example sharpening, reader-movement repair. Cite specific passages.}

## Optional findings

{numbered list of judgment-call items — cross-link suggestions, alternative phrasings, structural variants. The writer decides.}

## Beat-by-beat assessment

- **Why this:** {pass/weak/missing — one sentence per beat}
- **What's true:** {pass/weak/missing}
- **What's portable:** {pass/weak/missing — quote the sentence the writer is treating as the takeaway; note whether the close lands as discovery or summary}

## Blueprint assessment

{If blueprint exists, include:}

- **Motivating question:** {pass/weak/missing}
- **Violated expectation:** {pass/weak/missing}
- **Architecture:** {pass/weak/drifted}
- **Reader movement:** {pass/weak/collapsed into framework tour}
- **Evidence map:** {pass/weak/missing rows}
- **Collision events:** {pass/weak/missing}
- **Opener authenticity:** {pass/weak/generic}
- **Drift classification:** {none/drafting-level/beneficial blueprint-level/accidental blueprint-level}
- **Blueprint update needed:** {yes/no — if yes, name what changed}

{If no blueprint exists: `SKIP — no blueprint found.`}

## Recommendation

{One sentence: ship as-is, ship after critical fixes, or restructure before publish}
```

## Step 6: Hand back to writer

Print: "Findings above. Apply fixes manually, then re-run `/blog-review` or proceed to publish."

Do **not** modify the draft file.

## Rules

- **Read-only on the draft.** This command never writes to the post file. Findings only.
- **Cite specific passages.** Every FAIL or WARN must quote the offending text or cite a line number. Generic findings ("watch your tone") are not actionable.
- **Mechanical checks first, judgment second.** Apply the four skill checklists before the adversarial pass. The skill checks are deterministic; the adversarial pass is judgment-based and should be labeled as such.
- **Blueprint-aware when possible.** If a blueprint exists, review against it. If no blueprint exists, do not invent blueprint failures; mark those checks as skipped.
- **Classify drift, don't just flag it.** If a blueprint exists, determine whether differences are drafting-level, beneficial blueprint-level, or accidental blueprint-level. A beneficial draft discovery should update the blueprint; accidental drift should be repaired or routed back to `/blog-plan`.
- **Distinguish critical / recommended / optional.** Anti-pattern violations and missing beats are critical. Blueprint-breaking drift is critical when the draft no longer delivers the planned post. Voice tightening, opener strengthening, example sharpening, and reader-movement repair are recommended unless they undermine the central claim. Cross-link suggestions are optional.
- **No false positives.** If unsure whether something violates a rule, mark it WARN with a specific question for the writer rather than declaring it FAIL.
- **No flattery.** "This is a great post" is not useful feedback. The writer wants findings, not encouragement.

---
description: Adversarial review of an existing blog post draft against ai-antipatterns, personal-tone, blog-post-framework, and blog-checklist. Returns structured findings without auto-fixing.
version: 1.1
---

# /blog-review

Adversarial reviewer for blog posts. Reads a draft, runs every check from the four skills, and returns a structured findings report. Does not auto-fix — the writer decides which findings to act on.

> **Running blog-review v1.1** — Adversarial pass against `ai-antipatterns`, `personal-tone`, `blog-post-framework`, `blog-checklist`. Findings only; no auto-fix. Use after `/blog-draft` and before publish, or on any handed-off draft.

Print the banner above verbatim before doing anything else.

## When to use

- **After `/blog-draft`** — second pass with fresh eyes before publish.
- **On a hand-authored draft** — when the writer composed the post manually and wants a system check before publishing.
- **On an externally-sourced draft** — when adapting a guest post, conference talk, or other source into a blog post on this brand.

The command is **read-only on the draft** — it does not modify the file. The writer applies fixes manually after reviewing findings.

## Dependencies

**Required skills:** `ai-antipatterns`, `personal-tone`, `blog-post-framework`, `blog-checklist`.

**Required input:** path to a draft file, either:

- An MDX file already in `src/content/blog/` (most common)
- A markdown draft anywhere on the local filesystem (for unsaved drafts)

## Step 0: Load skills

Load all four skills:

1. `.claude/skills/ai-antipatterns/SKILL.md`
2. `.claude/skills/personal-tone/SKILL.md`
3. `.claude/skills/blog-post-framework/SKILL.md`
4. `.claude/skills/blog-checklist/SKILL.md`

If any skill is missing, **STOP** and report which one.

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

## Step 3: Run all four skill checks

For each skill, run every checklist item against the draft. Record each item as:

- **PASS** — clean
- **FAIL** — specific issue
- **WARN** — borderline, judgment call

For FAIL and WARN, cite the specific line or passage from the draft.

### 3a: ai-antipatterns scan

Check every banned word from the table. Check every banned phrase category. Check structural antipatterns. Check formatting antipatterns. Run the self-check at the end of the skill.

### 3b: personal-tone scan

Check voice (first-person, contractions, builder voice — recounts what was built, no essayist drift, abstraction after the evidence). Check tone (invitational, AI credit, no verbatim praise, no effort/scale flexing, employer abstracted by default in blog/craft posts). Check flow (no em dashes, no "X, not Y" contrast framing or its variants, no sales closing). Check brand alignment (canonical title, three pillars, three principles).

### 3c: blog-post-framework scan

Check beat presence (Why this, What's true, What's portable). Check opener shape variation against recent posts. Check substance requirements (concrete example, disagreeable claim, respects reader's knowledge). Check word count is in a comfortable range (~600–1,200); shorter or longer is fine if every section earns its place. Check structural integrity (forward motion, no semantic duplication, one dominant idea per section / no two competing decompositions, conclusion thesis discipline, anchor-story fit).

### 3d: blog-checklist scan

Run every item from the checklist that isn't covered by the three above (frontmatter validation, operational checks, cross-references, length, pacing).

## Step 4: Adversarial pass

After the mechanical checks above, do one additional pass with explicit skepticism. Ask:

1. **Is the portable insight actually portable?** Read the sentence the writer is treating as the takeaway. Could it be shared on LinkedIn? Does it state something specific and defensible, or restate consensus? Flag if weak.

2. **Does each example earn its place? (deletion test)** For _every_ example, ask: if it were removed, would the argument lose something essential — a decision, consequence, tradeoff, ambiguity, constraint, or competing interpretation? An example that only illustrates a point already made does not pass, even when it is concrete, accurate, and relevant. Flag each one that fails. Run this per example, not once per beat. (Criteria live in `blog-post-framework` → Structural integrity → Examples apply pressure.)

3. **Could a thoughtful peer disagree?** If no thoughtful peer would push back on the post's claims, the post is restating consensus. Flag if the post lacks a defensible claim.

4. **Is the opener doing work?** Read just the first paragraph. Would a busy reader keep reading past sentence two? Flag if the opener is generic or windup-shaped.

5. **Does the writer's voice come through, in builder voice?** Could this post be written by anyone, or does it sound like the writer? In particular, is it in builder voice (recounting what was built and observed) or has it drifted into essayist mode (explaining how the field works)? A sentence that could open anyone's thinkpiece is the tell. Flag if the voice reads generic or essayist. (`personal-tone` → Builder voice. Subjective; offer specific phrasings that would sharpen voice if so.)

6. **Are there cross-link opportunities missed?** The site has case studies that may relate. If the post discusses a topic also covered in a case study, flag the missed cross-link.

7. **Architecture consistency (only if a blueprint exists).** If `.claude/plans/{slug}.md` exists, load it. Does the final draft still deliver the claim through the blueprint's architecture and evidence map? Check for drift: a part the blueprint required that the draft dropped, a section the evidence map does not support, the anchor changing, a thread abandoned mid-draft. This is **flag-and-decide, not plan enforcement.** Drift is not automatically wrong. If the drift improved the essay, note it and update the blueprint; if it is a genuine architecture change, route back to `/blog-plan` so the fit gate runs again; if it is accidental loss (a dropped part, an evidence gap), flag it for repair. Skip entirely if no blueprint exists (an externally-authored draft).

8. **Does the close land the thesis?** Read the last sentence and the sentence closing the penultimate paragraph. Do they land the post's one thesis, or a supporting idea (often an optimistic one that gets misremembered as the point)? Then apply the final-line test: does the ending land on an observation, or reach for a maxim/slogan? Flag if the emphatic slot holds the wrong idea, or the ending is an aphoristic closing. (`blog-post-framework` → Thesis discipline in the close; `ai-antipatterns` → Aphoristic slogan closings.)

9. **(Systems essays only) Is the served party visible?** Can a reader answer "who cares?" from the essay — who the system serves, and what breaks for them when its output is wrong? Flag if the people the system exists for have vanished behind the architecture. Skip for non-systems posts. (`systems-writing` → Keep the served party visible.)

## Step 5: Structured findings report

Output the findings in this exact format:

```
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

{numbered list of items the writer must fix before publish — anti-pattern violations, missing beats, frontmatter errors. Cite line numbers and quote the offending passage.}

## Recommended findings

{numbered list of items that improve the post without blocking publish — voice tightening, opener strengthening, example sharpening. Cite specific passages.}

## Optional findings

{numbered list of judgment-call items — cross-link suggestions, alternative phrasings, structural variants. The writer decides.}

## Beat-by-beat assessment

- **Why this:** {pass/weak/missing — one sentence per beat}
- **What's true:** {pass/weak/missing}
- **What's portable:** {pass/weak/missing — quote the sentence the writer is treating as the takeaway}

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
- **Distinguish critical / recommended / optional.** Anti-pattern violations and missing beats are critical. Voice tightening is recommended. Cross-link suggestions are optional.
- **No false positives.** If unsure whether something violates a rule, mark it WARN with a specific question for the writer rather than declaring it FAIL.
- **No flattery.** "This is a great post" is not useful feedback. The writer wants findings, not encouragement.

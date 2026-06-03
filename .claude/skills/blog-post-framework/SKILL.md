---
name: blog-post-framework
description: Structural framework for blog posts on the Cody Anthony brand — three beats (Why this, What's true, What's portable), opener-shape variety, length guidance. Beats are content checks, not render templates. Pair with personal-tone and ai-antipatterns.
tags: [writing, blog, framework, structure]
---

# Skill: blog-post-framework

## When to load this skill

Load when drafting, reviewing, or editing a blog post for `codyanthony.dev/blog/`. Pair with `personal-tone` (voice) and `ai-antipatterns` (universal negative style guide).

## Scope

This skill covers the **content shape** of blog posts on this brand: what beats must be present, how openers should vary, what length range fits. It is structural framework — voice and brand alignment live in `personal-tone`; universal style banishments live in `ai-antipatterns`.

The shape encoded here is for **technical opinion / craft posts** — the work of Mandy Brown, Simon Willison, Julia Evans, Hillel Wayne. Substantive enough for peers (tech comm community), personally-voiced enough for recruiters to see craft, hooky enough for LinkedIn sharing. Not academic essay; not marketing asset.

## Audience and goals

Three audiences read these posts. Each beat in the framework serves all three:

| Audience                    | What they want                                       | Failure mode if missing                                                                                      |
| --------------------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| **Recruiters**              | Signal of craft, depth, and current thinking         | Reads as generic content marketing; recruiter doesn't differentiate from a hundred other "tech writer blogs" |
| **Tech comm community**     | Substantive engagement with shared problems          | Reads as brand-promotion; peers disengage                                                                    |
| **LinkedIn share audience** | Memorable hooks, portable ideas, scannable structure | Doesn't get shared; loses amplification                                                                      |

A post that serves all three is the goal. Posts that serve only one tend to fail at the other two.

## The three beats

Every post moves through three beats. Beats are **content checks** (all three must be present somewhere in the post), not **render templates** (no required section headings, no required order).

| Beat                | Purpose                                                                                                | Length                     | How it shows up                                                                                                                           |
| ------------------- | ------------------------------------------------------------------------------------------------------ | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **Why this**        | Why should the reader care, right now? Hook + stakes collapsed into one beat.                          | 1–3 paragraphs             | Vivid scenario, surprising claim, personal anecdote, question, metric — any opener shape that establishes stakes by the second paragraph. |
| **What's true**     | The substance. The actual idea with at least one concrete example readers can map to their own work.   | 3–10 paragraphs (the bulk) | Multiple paragraphs, often with sub-points. Includes at least one specific example with detail, not abstract claims.                      |
| **What's portable** | The memorable insight readers carry away. Not a summary. Not a CTA. The thing they can apply tomorrow. | 1–2 sentences              | Often a single sentence near the end. Sometimes implicit in a strong reframe and doesn't need explicit labeling.                          |

**Optional fourth beat — "What's next."** Invitation to engage (subscribe, share, respond, RSVP). Include only when natural to the post. Skip when forced.

### Beat 1: Why this

The stakes-setting beat. By the second paragraph, the reader should know:

- What this post is about (the topic anchor)
- Why it matters to them, right now (the stakes)
- That they're in the hands of someone who knows the territory (the credibility signal)

The friction is the substance. The **shape** wrapped around it is a separate choice — and one worth varying across posts. Repeating the same opener shape across posts is a tell that the framework is doing the rendering, not the writer.

#### Opener shapes table

Pick the shape that fits _this_ story, not the shape that fit the last post.

| Opener shape                                   | Example                                                                                                                                                                                                                                 |
| ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Vivid concrete scenario**                    | "A junior writer joined my team last quarter. Her first task was a deployment guide for a service spanning four engineering teams, three configuration surfaces, and a half-dozen edge cases none of the engineers thought to mention." |
| **Surprising claim / reframe**                 | "Most documentation problems aren't writing problems. They're problems of input — what you start with determines what you can ship, no matter how skilled the writer."                                                                  |
| **Personal anecdote with universal resonance** | "I spent six months rewriting an API reference that nobody read. The fix wasn't better prose; it was figuring out who the reader actually was."                                                                                         |
| **Genuine question**                           | "What does 'good documentation' look like when half your readers are LLM agents pulling chunks into a tool call?"                                                                                                                       |
| **Metric-led / defamiliarizing data**          | "Forty percent of the documentation requests I closed last year originated from a single broken assumption: that the customer would read the docs in order."                                                                            |
| **Connect-to-prior-work**                      | "Last month I wrote about why content design belongs in product design reviews. The follow-up question every reader asked was: how does that work in practice?"                                                                         |
| **Counterintuitive observation**               | "Writing the documentation last is sometimes the right call. Here's the version of 'last' that works."                                                                                                                                  |
| **Quote-led**                                  | (Only when the quote earns its place — a quote that is itself the surprising or memorable thing. Otherwise skip.)                                                                                                                       |

#### Avoid generic stakes-setting

| Avoid this                                | Replace with the shapes above |
| ----------------------------------------- | ----------------------------- |
| "Documentation is important..."           | Any shape above.              |
| "In today's world of complex software..." | Any shape above.              |
| "Many writers struggle with..."           | Any shape above.              |
| "It's no secret that..."                  | Any shape above.              |

### Beat 2: What's true

The substantive middle. The actual idea, fully unfolded, with at least one concrete example.

#### Substance requirements

- **At least one specific example.** Abstract argument without example is generic. The example should be detailed enough that a reader can map it to their own work.
- **The example earns its place.** It must do more than illustrate a claim already made; illustration alone is decoration. Apply the deletion test from Structural integrity → Examples apply pressure: if the example were removed, would the argument lose something essential?
- **Parallel examples should be developed to comparable depth.** If the post uses N parallel examples (cases, projects, situations), each should be developed to comparable depth unless the imbalance is intentional and the writer can name why. A thin parallel example signals that the writer didn't have enough material; consider cutting it or strengthening it. Imbalanced parallel examples often surface during the validate phase, when the deterministic script passes but the LLM reviewer flags depth inconsistency.
- **Name your specifics, with NDA and proprietary exceptions.** When referencing artifacts, tools, files, or systems, name them when the artifact is **your own work product** (your portfolio, your skills, your scripts) or **already publicly known** (open-source projects, public documentation, published case studies, public talks). "A negative style guide and a structural framework" is weaker than "the `ai-antipatterns` skill and the `blog-post-framework` skill." Vague references to artifacts you can legitimately name undercut the substance and signal paraphrasing instead of concrete material. **Abstract instead when** the artifact is a current or former employer's proprietary tool, information is under NDA, naming would create reputational risk, or you're referencing internal codenames or unpublished features. If in doubt about whether something is safe to name, abstract.
- **The reader can disagree.** A post that no one could reasonably push back on is probably restating consensus. The strongest posts make claims a thoughtful peer could argue with.
- **The reader's existing knowledge is respected.** Don't explain things experienced readers already know. If a beat depends on shared context (Docs-as-Code, JTBD, AI-assisted writing), assume the reader has it.

#### Two-thread posts

If the post has two threads (e.g., "here's the problem AND here's how I tried to solve it"), render them however they fit. Do not force a parallel three-beat scaffold onto the second thread. Beats must be present _across_ the post; they do not need to repeat _within_ each thread.

### Beat 3: What's portable

The memorable insight. The thing readers can apply tomorrow.

The test for this beat: if a reader shared one sentence from this post on LinkedIn, what would the sentence be? That sentence is — or contains — the portable insight.

Examples of strong portable insights:

- "Documentation problems are upstream problems. The quality ceiling for any doc is set at the input stage, not the writing stage."
- "Treat your readers as if they will leave the page mid-sentence. Most of them will."
- "The best style guides are negative — they tell you what not to do. Positive style guides become aspirational walls of text that no one reads."

Examples of weak portable insights (avoid):

- "Documentation matters." (Restates consensus.)
- "Good writing is hard." (True but useless.)
- "We should all do better." (CTA disguised as insight.)

If the post is missing this beat — if the reader can't extract a usable insight — the post is probably restating consensus. Revise toward a specific, defensible claim before publishing.

#### Thesis discipline in the close

Name the one thesis, then check the final-emphasis positions — the last sentence and the sentence closing the penultimate paragraph. A supporting idea that lands there (especially an optimistic one) will be remembered as the thesis. If the emphatic slot holds a supporting idea, or one that contradicts the thesis, move it. The examples already made the case; the close places them, it doesn't re-argue them.

This is distinct from the quality test above (whether the portable insight is strong): it governs *which* idea occupies the emphatic slot, not whether the idea is good.

### Optional beat: What's next

A closing invitation. Include only when natural. Skip when forced.

Acceptable shapes:

- "I'll be writing more on this; subscribe via RSS if it's useful."
- "If you've worked on this problem differently, I'd want to read about it."
- "Next post: how I built the AI-assisted migration toolkit referenced above."

Unacceptable shapes:

- "Get in touch if you'd like help with your documentation strategy." (Sales pitch.)
- "Like and share if this was helpful!" (Generic engagement bait.)
- "Stay tuned for more!" (Vague.)

If "What's next" feels forced, leave it out. The closing line of "What's portable" is a complete ending.

## Structural integrity

The three beats check _what_ the post contains. These checks govern _how it moves_. Treat the post as a system of ideas advancing through time, not a set of paragraphs that each read well in isolation. Apply during drafting and review.

### Forward motion

Every section changes the reader's state: it adds information, evidence, a consequence, or an interpretation the reader did not have a paragraph ago. A section that re-states an established point in fresh words is an echo, not a section. Two specific tells:

- **Timeline resets.** "Early on…", "At first…", "Going back…" placed after the timeline is already established. Build forward from where the reader is; do not restart the clock.
- **Context re-establishment.** Re-explaining something already covered. This is distinct from respecting reader knowledge (Beat 2): here the post repeats _itself_. Once context is set, later sections build on it.

### Semantic duplication

Two passages that carry the same insight in different words are one passage. This is broader than the sentence-level "remove what restates" in the drafting process, and broader than `ai-antipatterns` word-level repetition: it catches the same _idea_ surfacing twice across the post. Common shapes: an abstraction and its example making the same point; a section opener and its body making the same point; two examples making the same point. Keep the strongest instance; cut the rest. Leave deliberate setup-and-payoff callbacks alone; those advance state.

### One dominant idea per section; one decomposition at a time

Each section carries a single load-bearing idea; supporting detail serves it or moves to where it's load-bearing. In particular, avoid running two different decompositions of the same system in one section (for example, describing it by *phases* and by *layers* at once). Pick the decomposition that section needs and defer the other to where it does work.

This is distinct from semantic duplication above: that rule catches the same *idea* repeated across the post; this one catches a single section *overloaded* with two organizing schemes at once.

### Earn the abstraction

Default to concrete before claim: observation → example → insight, so the evidence brings the reader to the point rather than the point being asserted and then decorated. This is the structural face of `ai-antipatterns` "the windup pitch" and of the stance `personal-tone` names as Builder voice (recount, don't pontificate): lead with the concrete point, and do not bury it under windup.

An abstraction-first opener is legitimate when the abstraction is itself the hook or thesis (see the opener-shapes table, "surprising claim / reframe"). The requirement is not that an abstraction can never come first; it is that the abstraction gets paid off with concrete evidence before the piece ends. What to avoid is an abstraction asserted and then merely decorated, with nothing that earns it.

### Anchor-story fit

The anchor story must already contain the structure the post claims. If the post decomposes a system into parts (stages, layers, seams), the anchor must visibly contain those parts; do not manufacture missing structure through abstraction. When story and structure disagree, change the story, not the prose. Prefer one anchor that contains the whole structure over several that each contain a fragment: multiple partial anchors dilute the argument and force abstraction to cover the gaps. This is validated upstream, before drafting, in `commands/blog-plan.md`.

### Examples apply pressure

This is the single source for example strength; the drafting and review steps apply this test rather than restating the criteria.

An example earns its place when it introduces a decision, ambiguity, a tradeoff, a consequence, a constraint, or competing interpretations. An example that only illustrates a claim already made, or restates it, is decoration, **even when it is concrete, accurate, and relevant.** That last case is the one that slips through, so the criteria alone are not enough; apply an active test.

**The deletion test:** if the example were removed, would the argument lose something essential? If nothing essential is lost, the example is decoration. Cut it, or replace it with one that forces a choice. Run this per example, not once per beat: a passage of three illustrative sentences gets three deletions, not one.

## Length

There is no enforced word count. In practice, **~600–1,200 words** is a comfortable range: long enough to say something substantive, short enough to actually be read. If a post naturally runs longer or shorter, that is fine.

Length is a signal, not a target. The real governor is **structural integrity**: every section earns its place (forward motion, no semantic duplication). A post that passes that test is exactly as long as it should be. Two diagnostics worth a second look, never a cap:

- **Very short (under ~600 words):** often too thin to earn the post URL; might work better as a LinkedIn post or a social thread.
- **Well past ~1,200 words:** check for padding or for a hidden second post. A systems essay that genuinely needs the room is fine; an essay padded to look substantive is not.

Do not measure reading time. It assumes a reading speed that varies too much between readers to mean anything. Word count is the objective measure; treat it as a sensibility, not a gate.

## The drafting process

### Step 1: Draft from the idea (15–30 min)

Start with the portable insight (Beat 3). What's the one thing readers should leave with? Write that down as a single sentence.

Then sketch:

- What's the stakes-setting hook? (Beat 1, opener shape)
- What's the example that illustrates the idea? (Beat 2)

If any of these are missing, the post isn't ready yet. Spend more time with the idea before drafting.

### Step 2: Write a first draft (30–60 min)

Compose the full draft, voice-on. Don't optimize for length yet; just get the three beats present.

### Step 3: Beat-presence check (5 min)

Read the draft. Can you point to each beat? If "What's portable" is missing or weak, revise before tightening.

### Step 4: Apply personal-tone and ai-antipatterns (15 min)

Run the self-checks from both skills. Cut banned words. Rewrite em-dash sentences. Remove "X, not Y" contrast framings. Strip throat-clearing openers.

### Step 5: Tighten (10 min)

- Cut the first paragraph if the second one would work as the opener (frequently the case)
- Compress where you can
- Remove sentences that restate what just was said
- Verify the closing sentence delivers the portable insight

### Step 6: Read aloud

Read the entire post aloud once. Anywhere you stumble or want to skip is a candidate for revision.

## Self-check

Before submitting any blog post:

- [ ] All three beats present: Why this, What's true, What's portable
- [ ] Opener shape varies from the writer's last 2–3 posts
- [ ] At least one concrete example with detail
- [ ] Every example passes the deletion test (remove it; if the argument loses nothing essential, it is decoration)
- [ ] Parallel examples developed to comparable depth (or imbalance is intentional and explainable)
- [ ] Each section advances narrative state (no timeline resets, no context re-establishment)
- [ ] No semantic duplication (the same insight stated twice across the post)
- [ ] One dominant idea per section; no two competing decompositions overloaded into one section
- [ ] Close lands the thesis: the final-emphasis positions hold the thesis, not a supporting idea (per Beat 3 → Thesis discipline)
- [ ] Anchor story contains the structure the post claims (set in `blog-plan`)
- [ ] Artifacts named where the writer can legitimately name them (own work or public); abstracted only where NDA, proprietary, or reputational concerns apply
- [ ] Portable insight extractable as a single shareable sentence
- [ ] Word count in a comfortable range (~600–1,200); longer or shorter is fine if every section earns its place
- [ ] No "What's next" beat unless natural
- [ ] `personal-tone` self-check passed
- [ ] `ai-antipatterns` self-check passed
- [ ] `writer-context` self-check passed (no overclaims about the writer's history)

## Scope boundary

This skill covers:

- Three-beat structure
- Opener shapes
- Length (word-count sensibility)
- Drafting process
- Structural integrity (forward motion, semantic duplication, earn-the-abstraction, anchor-story fit)

This skill does **not** cover:

- **Personal voice** (first-person, contractions, brand alignment) → `personal-tone`
- **Universal style banishments** (banned words, em dashes, throat-clearing) → `ai-antipatterns`
- **Pre-publish operational checks** (OG image regen, frontmatter validation, save path) → `blog-checklist`
- **Planning, architecture selection, and the anchor-fit gate** → `commands/blog-plan.md`
- **Domain scaffolding for systems essays** (architecture palette, seam analysis, anchor selection) → `systems-writing`
- **Orchestration of the draft-execution flow** → `commands/blog-draft.md`

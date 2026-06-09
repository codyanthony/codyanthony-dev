---
name: blog-post-framework
description: Structural framework for blog posts on the Cody Anthony brand — three beats (Why this, What's true, What's portable), opener authenticity, reader movement, example pressure, and length guidance. Beats are content checks, not render templates. Pair with personal-tone, ai-antipatterns, and systems-writing where applicable.
tags: [writing, blog, framework, structure]
---

# Skill: blog-post-framework

## When to load this skill

Load when drafting, reviewing, or editing a blog post for `codyanthony.dev/blog/`. Pair with `personal-tone` (voice) and `ai-antipatterns` (universal negative style guide). Pair with `systems-writing` when the post is about a system, workflow, automation, migration, documentation architecture, responsibility boundary, or another systems-shaped or inquiry-shaped structure.

## Scope

This skill covers the **content shape** of blog posts on this brand: what beats must be present, how openers should work, how reader movement should feel, what makes examples earn their place, and what length range fits. It is a structural framework. Voice and brand alignment live in `personal-tone`; universal style banishments live in `ai-antipatterns`; systems-specific architecture and evidence guidance lives in `systems-writing`.

The shape encoded here is for **technical opinion / craft posts** — the work of Mandy Brown, Simon Willison, Julia Evans, Hillel Wayne. Substantive enough for peers (tech comm community), personally voiced enough for recruiters to see craft, hooky enough for LinkedIn sharing. Not academic essay; not marketing asset.

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

The architecture selected in `/blog-plan` governs the post. The reader movement defines how that architecture unfolds. The three beats check that the finished post has stakes, substance, and a portable insight. They do not replace architecture, and they should not appear as visible scaffolding unless the post itself naturally calls for that structure.

| Beat                | Purpose                                                                                                | Length                     | How it shows up                                                                                                                         |
| ------------------- | ------------------------------------------------------------------------------------------------------ | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **Why this**        | Why should the reader care, right now? Hook + stakes collapsed into one beat.                          | 1–3 paragraphs             | Vivid scenario, surprising claim, personal anecdote, question, metric, violated expectation, or first pressure that establishes stakes. |
| **What's true**     | The substance. The actual idea with at least one concrete example readers can map to their own work.   | 3–10 paragraphs (the bulk) | Multiple paragraphs, often with sub-points. Develops the chosen architecture through evidence, collision events, and reader movement.   |
| **What's portable** | The memorable insight readers carry away. Not a summary. Not a CTA. The thing they can apply tomorrow. | 1–2 sentences              | Often a single sentence near the end. Sometimes implicit in a strong reframe and doesn't need explicit labeling.                        |

**Optional fourth beat — "What's next."** Invitation to engage (subscribe, share, respond, RSVP). Include only when natural to the post. Skip when forced.

### Beat 1: Why this

The stakes-setting beat. By the second paragraph, the reader should know:

- What this post is about (the topic anchor)
- Why it matters to them, right now (the stakes)
- That they're in the hands of someone who knows the territory (the credibility signal)

#### Opener authenticity

A valid opener is not enough. The opener should feel attached to the actual question that made the writer keep thinking about the post.

Before accepting an opener, ask:

- Does it connect to the motivating question, violated expectation, starting point, or first pressure?
- Could this opener only belong to this post, from this writer?
- Does it begin from a lived observation, concrete tension, genuine question, or changed assumption?
- Or could it open any competent article on the topic?

Generic but structurally valid openers fail this check.

| Generic opener                                                             | Why it fails                                                                |
| -------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| "AI is changing how documentation gets written."                           | Topic summary; no writer-specific tension.                                  |
| "Documentation systems often reveal hidden complexity."                    | Plausible thesis, but detached from a lived question.                       |
| "As technical writers adopt automation, human judgment remains important." | Consensus framing; gives away the conclusion before the blog post earns it. |

Specific openers pass when they surface the writer's actual point of entry.

| Specific opener                                                                                                                            | Why it works                                                     |
| ------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------- |
| "I grew up on automation stories where the machine eventually took over."                                                                  | Opens from a specific expectation the blog post will complicate. |
| "I expected the workflow to make me less involved."                                                                                        | States a violated expectation the post can test.                 |
| "The first sign that the automation had not solved the problem was not a bad sentence. It was a decision the workflow had no way to make." | Begins with pressure, not topic summary.                         |

If the opener is abstraction-first, it must be an earned reframe or a genuinely surprising claim. If it sounds like a category introduction, revise toward the question, expectation, or pressure that made the post worth writing.

The friction is the substance. The **shape** wrapped around it is a separate choice — and one worth varying across posts. Repeating the same opener shape across posts is a tell that the framework is doing the rendering, not the writer.

#### Opener shapes table

Pick the shape that fits _this_ story, not the shape that fit the last post.

| Opener shape                                   | Example                                                                                                                                                                                                                                 |
| ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Vivid concrete scenario**                    | "A junior writer joined my team last quarter. Her first task was a deployment guide for a service spanning four engineering teams, three configuration surfaces, and a half-dozen edge cases none of the engineers thought to mention." |
| **Surprising claim / reframe**                 | "Most documentation problems aren't writing problems. They're problems of input — what you start with determines what you can ship, no matter how skilled the writer."                                                                  |
| **Personal anecdote with universal resonance** | "I spent six months rewriting an API reference that nobody read. The fix wasn't better prose; it was figuring out who the reader actually was."                                                                                         |
| **Genuine question**                           | "What does 'good documentation' look like when half your readers are LLM agents pulling chunks into a tool call?"                                                                                                                       |
| **Violated expectation**                       | "I expected the workflow to make me less involved. Instead, every improvement moved my judgment somewhere else."                                                                                                                        |
| **First pressure**                             | "The first draft looked fine until I tried to explain which user it was actually for."                                                                                                                                                  |
| **Metric-led / defamiliarizing data**          | "Forty percent of the documentation requests I closed last year originated from a single broken assumption: that the customer would read the docs in order."                                                                            |
| **Connect-to-prior-work**                      | "Last month I wrote about why content design belongs in product design reviews. The follow-up question every reader asked was: how does that work in practice?"                                                                         |
| **Counterintuitive observation**               | "Writing the documentation last is sometimes the right call. Here's the version of 'last' that works."                                                                                                                                  |
| **Quote-led**                                  | Only when the quote earns its place — a quote that is itself the surprising or memorable thing. Otherwise skip.                                                                                                                         |

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
- **The example earns its place.** It must do more than illustrate a claim already made; illustration alone is decoration. Apply the deletion test and the collision-event test from Structural integrity → Examples apply pressure.
- **Collision events make examples load-bearing.** A collision event is the pressure that makes an example do argumentative work: a decision, tradeoff, ambiguity, contradiction, failed assumption, boundary condition, consequence, escalation, or changed understanding. Without one, the example may be concrete and accurate but still inert.
- **Parallel examples should be developed to comparable depth.** If the post uses N parallel examples (cases, projects, situations), each should be developed to comparable depth unless the imbalance is intentional and the writer can name why. A thin parallel example signals that the writer didn't have enough material; consider cutting it or strengthening it. Imbalanced parallel examples often surface during the validate phase, when the deterministic script passes but the LLM reviewer flags depth inconsistency.
- **Name your specifics, with NDA and proprietary exceptions.** When referencing artifacts, tools, files, or systems, name them when the artifact is **your own work product** (your portfolio, your skills, your scripts) or **already publicly known** (open-source projects, public documentation, published case studies, public talks). "A negative style guide and a structural framework" is weaker than "the `ai-antipatterns` skill and the `blog-post-framework` skill." Vague references to artifacts you can legitimately name undercut the substance and signal paraphrasing instead of concrete material. **Abstract instead when** the artifact is a current or former employer's proprietary tool, information is under NDA, naming would create reputational risk, or you're referencing internal codenames or unpublished features. If in doubt about whether something is safe to name, abstract.
- **The reader can disagree.** A post that no one could reasonably push back on is probably restating consensus. The strongest posts make claims a thoughtful peer could argue with.
- **The reader's existing knowledge is respected.** Don't explain things experienced readers already know. If a beat depends on shared context (Docs-as-Code, JTBD, AI-assisted writing), assume the reader has it.

#### Two-thread posts

If the post has two threads (for example, "here's the problem AND here's how I tried to solve it"), render them however they fit. Do not force a parallel three-beat scaffold onto the second thread. Beats must be present _across_ the post; they do not need to repeat _within_ each thread.

### Beat 3: What's portable

The memorable insight. The thing readers can apply tomorrow.

The test for this beat: if a reader shared one sentence from this post on LinkedIn, what would the sentence be? That sentence is — or contains — the portable insight.

Examples of strong portable insights:

- "Documentation problems are upstream problems. The quality ceiling for any doc is set at the input stage, not the writing stage."
- "Treat your readers as if they will leave the page mid-sentence. Most of them will."
- "The best style guides are negative — they tell you what not to do. Positive style guides become aspirational walls of text that no one reads."
- "Automation did not remove the judgment from the work. It moved the judgment to a different layer."

Examples of weak portable insights (avoid):

- "Documentation matters." (Restates consensus.)
- "Good writing is hard." (True but useless.)
- "We should all do better." (CTA disguised as insight.)

If the post is missing this beat — if the reader can't extract a usable insight — the post is probably restating consensus. Revise toward a specific, defensible claim before publishing.

#### Thesis discipline in the close

Name the one thesis, then check the final-emphasis positions — the last sentence and the sentence closing the penultimate paragraph. A supporting idea that lands there (especially an optimistic one) will be remembered as the thesis. If the emphatic slot holds a supporting idea, or one that contradicts the thesis, move it. The examples already made the case; the close places them, it doesn't re-argue them.

This is distinct from the quality test above (whether the portable insight is strong): it governs _which_ idea occupies the emphatic slot, not whether the idea is good.

#### Conclusion as discovery

The close should land the changed understanding the post earned.

A weak close can be technically on-thesis and still feel flat if it merely summarizes the architecture, repeats the central claim unchanged, or turns the argument into a maxim. The ending should feel like the post arrived somewhere through its evidence.

Before accepting the close, ask:

- What does the writer understand now that they did not understand at the start?
- What did the anchor story reveal?
- What pressure, contradiction, or collision event changed the framing?
- Does the final sentence land that changed understanding, or does it restate the thesis?
- Does the close emerge from the post's evidence, or could it be attached to any competent article on the topic?

Weak close shapes:

- summary of the architecture
- restatement of the central claim
- portable insight phrased as a slogan
- optimistic supporting idea in the emphatic slot
- "and that's why this matters" explanation
- CTA disguised as conclusion

Strong close shapes:

- changed belief
- sharper question
- consequence now visible
- quieter observation earned by the evidence
- return to the opener with altered understanding
- concrete image or decision that carries the thesis without sloganizing it

The close does not need to be dramatic. It does need to feel discovered.

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

## Reader movement

Reader movement is how the post changes the reader's understanding from opener to close. It is not a second architecture. The architecture governs the post; reader movement is how that architecture unfolds on the page.

A strong post usually moves through one of these shapes:

- expectation → pressure → escalation → changed belief
- question → failed explanation → better explanation → sharper question
- old assumption → concrete exception → broader pattern → revised assumption
- familiar problem → overlooked cause → consequence → more useful framing
- capability → boundary → consequence → revised model

A weak post often collapses into one of these shapes:

- part 1 → part 2 → part 3
- problem → solution → lesson
- intro → example → takeaway
- framework explanation → examples → summary

The issue is not that structure is visible. The issue is when structure replaces movement. A reader should feel that the post is discovering, sharpening, or revealing something, not merely presenting a valid decomposition.

## Structural integrity

The three beats check _what_ the post contains. These checks govern _how it moves_. Treat the post as a system of ideas advancing through time, not a set of paragraphs that each read well in isolation. Apply during drafting and review.

### Forward motion

Every section changes the reader's state: it adds information, evidence, a consequence, or an interpretation the reader did not have a paragraph ago. A section that re-states an established point in fresh words is an echo, not a section. Two specific tells:

- **Timeline resets.** "Early on…", "At first…", "Going back…" placed after the timeline is already established. Build forward from where the reader is; do not restart the clock.
- **Context re-establishment.** Re-explaining something already covered. This is distinct from respecting reader knowledge (Beat 2): here the post repeats _itself_. Once context is set, later sections build on it.

### Semantic duplication

Two passages that carry the same insight in different words are one passage. This is broader than the sentence-level "remove what restates" in the drafting process, and broader than `ai-antipatterns` word-level repetition: it catches the same _idea_ surfacing twice across the post. Common shapes: an abstraction and its example making the same point; a section opener and its body making the same point; two examples making the same point. Keep the strongest instance; cut the rest. Leave deliberate setup-and-payoff callbacks alone; those advance state.

### Paragraph rhythm and emphasis density

A post can be structurally sound and still feel artificial if every paragraph carries the same rhetorical weight.

Watch for emphasis density: too many consecutive paragraphs that all state, sharpen, or conclude an idea without giving the reader a concrete reset. The post starts to feel like a sequence of thesis sentences instead of a movement through observation, pressure, evidence, interpretation, and landing.

Strong rhythm varies paragraph function. A draft should move among:

- concrete observation
- specific example
- pressure or complication
- interpretation
- transition
- consequence
- earned claim
- quiet landing

Weak rhythm often looks like:

- every paragraph ending with a thesis sentence
- every paragraph beginning with abstraction
- three or more consecutive paragraphs making claims without a concrete moment
- repeated “this matters because” moves
- sections that all follow the same internal shape: claim → example → meaning
- too many short emphatic paragraphs stacked together
- no low-pressure sentence after a high-weight claim

The fix is not to make prose decorative. The fix is to vary load. After a high-emphasis sentence, give the reader something grounded: a concrete detail, a consequence, a decision, a quieter observation, or a transition that lets the previous point land.

Run this check at the paragraph level, not only the section level.

### One dominant idea per section; one decomposition at a time

Each section carries a single load-bearing idea; supporting detail serves it or moves to where it's load-bearing. In particular, avoid running two different decompositions of the same system in one section (for example, describing it by _phases_ and by _layers_ at once). Pick the decomposition that section needs and defer the other to where it does work.

This is distinct from semantic duplication above: that rule catches the same _idea_ repeated across the post; this one catches a single section _overloaded_ with two organizing schemes at once.

### Earn the abstraction

Default to concrete before claim: observation → example → insight, so the evidence brings the reader to the point rather than the point being asserted and then decorated. This is the structural face of `ai-antipatterns` "the windup pitch" and of the stance `personal-tone` names as Builder voice (recount, don't pontificate): lead with the concrete point, and do not bury it under windup.

An abstraction-first opener is legitimate when the abstraction is itself the hook or thesis (see the opener-shapes table, "surprising claim / reframe"). The requirement is not that an abstraction can never come first; it is that the abstraction gets paid off with concrete evidence before the piece ends. What to avoid is an abstraction asserted and then merely decorated, with nothing that earns it.

### Anchor-story fit

The anchor story should already contain the structure the post claims. If the post has required parts or moves, the anchor must visibly contain them; do not manufacture missing structure through abstraction.

For systems-shaped posts, those parts may be layers, seams, handoffs, constraints, failure paths, information-flow changes, responsibility boundaries, or ownership shifts.

For inquiry-shaped posts, those moves may be an expectation, first pressure, escalation, turn, and changed belief.

When story and structure disagree, change the story, narrow the claim, or change the architecture. Do not fix the mismatch with prose. Prefer one anchor that contains the whole structure over several that each contain a fragment, unless the architecture explicitly depends on comparison across examples. This is validated upstream, before drafting, in `commands/blog-plan.md`.

### Examples apply pressure

This is the single source for example strength; the drafting and review steps apply this test rather than restating the criteria.

An example earns its place when it introduces a decision, ambiguity, tradeoff, consequence, constraint, competing interpretation, escalation, or changed understanding. An example that only illustrates a claim already made, or restates it, is decoration, **even when it is concrete, accurate, and relevant.** That last case is the one that slips through, so the criteria alone are not enough; apply an active test.

**The deletion test:** if the example were removed, would the argument lose something essential? If nothing essential is lost, the example is decoration. Cut it, or replace it with one that forces a choice. Run this per example, not once per beat: a passage of three illustrative sentences gets three deletions, not one.

**The collision-event test:** can you name the pressure that makes the example matter? Useful collision events include a decision, tradeoff, ambiguity, contradiction, failed assumption, boundary condition, consequence, escalation, or changed understanding. If the collision event is missing, the example is not yet load-bearing.

Weak evidence names what existed. Strong evidence names what happened.

### Framework-tour warning

A post can pass the beat check and still fail if it merely walks the reader through a framework.

Watch for these tells:

- the opener announces the architecture instead of creating curiosity
- section headings mirror the architecture too neatly
- examples appear only to illustrate parts
- the close summarizes the framework instead of landing a changed understanding
- the post keeps explaining what it is doing

If the draft feels correct but lifeless, check whether the reader movement has collapsed into architecture enumeration. The fix is usually to return to the motivating question, violated expectation, first pressure, or collision events.

## Length

There is no enforced word count. In practice, **~600–1,200 words** is a comfortable range: long enough to say something substantive, short enough to actually be read. If a post naturally runs longer or shorter, that is fine.

Length is a signal, not a target. The real governor is **structural integrity**: every section earns its place (forward motion, no semantic duplication). A post that passes that test is exactly as long as it should be. Two diagnostics worth a second look, never a cap:

- **Very short (under ~600 words):** often too thin to earn the post URL; might work better as a LinkedIn post or a social thread.
- **Well past ~1,200 words:** check for padding or for a hidden second post. A systems post that genuinely needs the room is fine; a post that's padded to look substantive is not.

Do not measure reading time. It assumes a reading speed that varies too much between readers to mean anything. Word count is the objective measure; treat it as a sensibility, not a gate.

## The drafting process

This section describes the human drafting method. For the automated workflow, `/blog-plan` produces the blueprint and `/blog-draft` executes it.

### Step 1: Find the post's question

Start with the motivating question or violated expectation. What made the idea worth carrying forward? What assumption did the work disturb? What kept bothering the writer after the work was done?

If there is no real question, the post may only be a topic, not a blog post.

### Step 2: Name the claim and architecture

State the one thing the post argues in a sentence a thoughtful reader could disagree with. Then choose the architecture that carries it. The architecture may be system-shaped, inquiry-shaped, or craft/process-shaped.

Do not default to the three beats as the architecture. The beats are content checks.

### Step 3: Map reader movement

Before drafting, name how the reader's understanding should change:

- starting point
- first pressure
- escalation
- turn
- landing

If this sequence is only a list of parts, revise before drafting.

### Step 4: Select evidence that applies pressure

Choose examples that contain collision events. For each example, name what happened: the decision, ambiguity, tradeoff, contradiction, failed assumption, boundary condition, consequence, escalation, or changed understanding.

If the example only illustrates the claim, it is not strong enough yet.

### Step 5: Draft with the beats present

Compose the draft, voice-on. Make sure the three beats are present somewhere in the post:

- Why this
- What's true
- What's portable

Do not render them as visible section templates unless the post naturally calls for that.

### Step 6: Tighten against structure and voice

Run the checks from this skill, `personal-tone`, and `ai-antipatterns`.

Cut banned words. Rewrite em-dash sentences. Remove "X, not Y" contrast framings. Strip throat-clearing openers. Remove sentences that restate what was just said. Verify the closing sentence delivers the portable insight.

### Step 7: Read aloud

Read the entire post aloud once. Anywhere you stumble or want to skip is a candidate for revision.

## Self-check

Before submitting any blog post:

- [ ] All three beats present: Why this, What's true, What's portable
- [ ] Opener authenticity passes: the opener connects to the motivating question, violated expectation, starting point, or first pressure
- [ ] Opener shape varies from the writer's last 2–3 posts
- [ ] At least one concrete example with detail
- [ ] Every example passes the deletion test (remove it; if the argument loses nothing essential, it is decoration)
- [ ] Every load-bearing example has a collision event
- [ ] Parallel examples developed to comparable depth (or imbalance is intentional and explainable)
- [ ] Reader movement is clear: the post changes the reader's understanding as it moves
- [ ] Each section advances narrative state (no timeline resets, no context re-establishment)
- [ ] No semantic duplication (the same insight stated twice across the post)
- [ ] Paragraph rhythm varies: no long run of thesis-heavy, abstraction-first, or equally emphatic paragraphs
- [ ] One dominant idea per section; no two competing decompositions overloaded into one section
- [ ] Close lands the thesis: the final-emphasis positions hold the thesis, not a supporting idea (per Beat 3 → Thesis discipline)
- [ ] Close lands as discovery: it carries the changed understanding the post earned, not a summary of the architecture, a restated claim, or a slogan
- [ ] Anchor story contains the required parts / moves the post claims (set in `blog-plan`)
- [ ] Draft has not collapsed into a static framework tour
- [ ] Artifacts named where the writer can legitimately name them (own work or public); abstracted only where NDA, proprietary, or reputational concerns apply
- [ ] Portable insight extractable as a single shareable sentence
- [ ] Word count in a comfortable range (~600–1,200); longer or shorter is fine if every section earns its place
- [ ] No "What's next" beat unless natural
- [ ] `personal-tone` self-check passed
- [ ] `ai-antipatterns` self-check passed
- [ ] `writer-context` self-check passed (no overclaims about the writer's history)

## Scope boundary

This skill covers:

- Three-beat content checks
- Opener shapes and opener authenticity
- Reader movement
- Length (word-count sensibility)
- Human drafting process
- Structural integrity and close discipline (forward motion, semantic duplication, paragraph rhythm, emphasis density, earn-the-abstraction, anchor-story fit, examples applying pressure, conclusion-as-discovery, framework-tour warning)

This skill does **not** cover:

- **Personal voice** (first-person, contractions, brand alignment) → `personal-tone`
- **Universal style banishments** (banned words, em dashes, throat-clearing) → `ai-antipatterns`
- **Pre-publish operational checks** (dynamic OG card verification, frontmatter validation, save path) → `blog-checklist`
- **Planning, architecture selection, reader movement, and the anchor/evidence fit gate** → `commands/blog-plan.md`
- **Domain scaffolding for systems posts** (systems-writing lenses, architecture palette, collision-event evidence, anchor selection) → `systems-writing`
- **Orchestration of the draft-execution flow** → `commands/blog-draft.md`

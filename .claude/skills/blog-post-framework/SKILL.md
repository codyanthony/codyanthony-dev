---
name: blog-post-framework
description: Structural framework for blog posts on the Cody Anthony brand — three beats (Why this, What's true, What's portable), opener-shape variety, length guidance. Beats are content checks, not render templates. Pair with personal-tone and ai-antipatterns.
tags: [writing, blog, framework, structure]
---

# Skill: blog-post-framework

## When to load this skill

Load when drafting, reviewing, or editing a blog post for `codyanthony.dev/blog/`. Pair with `personal-tone` (voice) and `ai-antipatterns` (universal negative style guide).

## Scope

This skill covers the **content shape** of blog posts on this brand: what beats must be present, how openers should vary, what length to target. It is structural framework — voice and brand alignment live in `personal-tone`; universal style banishments live in `ai-antipatterns`.

The shape encoded here is for **technical opinion / craft posts** — the work of Mandy Brown, Simon Willison, Julia Evans, Hillel Wayne. Substantive enough for peers (tech comm community), personally-voiced enough for recruiters to see craft, hooky enough for LinkedIn sharing. Not academic essay; not marketing asset.

## Audience and goals

Three audiences read these posts. Each beat in the framework serves all three:

| Audience | What they want | Failure mode if missing |
|---|---|---|
| **Recruiters** | Signal of craft, depth, and current thinking | Reads as generic content marketing; recruiter doesn't differentiate from a hundred other "tech writer blogs" |
| **Tech comm community** | Substantive engagement with shared problems | Reads as brand-promotion; peers disengage |
| **LinkedIn share audience** | Memorable hooks, portable ideas, scannable structure | Doesn't get shared; loses amplification |

A post that serves all three is the goal. Posts that serve only one tend to fail at the other two.

## The three beats

Every post moves through three beats. Beats are **content checks** (all three must be present somewhere in the post), not **render templates** (no required section headings, no required order).

| Beat | Purpose | Length | How it shows up |
|---|---|---|---|
| **Why this** | Why should the reader care, right now? Hook + stakes collapsed into one beat. | 1–3 paragraphs | Vivid scenario, surprising claim, personal anecdote, question, metric — any opener shape that establishes stakes by the second paragraph. |
| **What's true** | The substance. The actual idea with at least one concrete example readers can map to their own work. | 3–10 paragraphs (the bulk) | Multiple paragraphs, often with sub-points. Includes at least one specific example with detail, not abstract claims. |
| **What's portable** | The memorable insight readers carry away. Not a summary. Not a CTA. The thing they can apply tomorrow. | 1–2 sentences | Often a single sentence near the end. Sometimes implicit in a strong reframe and doesn't need explicit labeling. |

**Optional fourth beat — "What's next."** Invitation to engage (subscribe, share, respond, RSVP). Include only when natural to the post. Skip when forced.

### Beat 1: Why this

The stakes-setting beat. By the second paragraph, the reader should know:
- What this post is about (the topic anchor)
- Why it matters to them, right now (the stakes)
- That they're in the hands of someone who knows the territory (the credibility signal)

The friction is the substance. The **shape** wrapped around it is a separate choice — and one worth varying across posts. Repeating the same opener shape across posts is a tell that the framework is doing the rendering, not the writer.

#### Opener shapes table

Pick the shape that fits *this* story, not the shape that fit the last post.

| Opener shape | Example |
|---|---|
| **Vivid concrete scenario** | "A junior writer joined my team last quarter. Her first task was a deployment guide for a service spanning four engineering teams, three configuration surfaces, and a half-dozen edge cases none of the engineers thought to mention." |
| **Surprising claim / reframe** | "Most documentation problems aren't writing problems. They're problems of input — what you start with determines what you can ship, no matter how skilled the writer." |
| **Personal anecdote with universal resonance** | "I spent six months rewriting an API reference that nobody read. The fix wasn't better prose; it was figuring out who the reader actually was." |
| **Genuine question** | "What does 'good documentation' look like when half your readers are LLM agents pulling chunks into a tool call?" |
| **Metric-led / defamiliarizing data** | "Forty percent of the documentation requests I closed last year originated from a single broken assumption: that the customer would read the docs in order." |
| **Connect-to-prior-work** | "Last month I wrote about why content design belongs in product design reviews. The follow-up question every reader asked was: how does that work in practice?" |
| **Counterintuitive observation** | "Writing the documentation last is sometimes the right call. Here's the version of 'last' that works." |
| **Quote-led** | (Only when the quote earns its place — a quote that is itself the surprising or memorable thing. Otherwise skip.) |

#### Avoid generic stakes-setting

| Avoid this | Replace with the shapes above |
|---|---|
| "Documentation is important..." | Any shape above. |
| "In today's world of complex software..." | Any shape above. |
| "Many writers struggle with..." | Any shape above. |
| "It's no secret that..." | Any shape above. |

### Beat 2: What's true

The substantive middle. The actual idea, fully unfolded, with at least one concrete example.

#### Substance requirements

- **At least one specific example.** Abstract argument without example is generic. The example should be detailed enough that a reader can map it to their own work.
- **The example earns its place.** Either it illustrates the idea, OR it deepens it (shows a complication the abstract version missed). Examples that just restate the abstract claim in narrative form add length without adding insight.
- **The reader can disagree.** A post that no one could reasonably push back on is probably restating consensus. The strongest posts make claims a thoughtful peer could argue with.
- **The reader's existing knowledge is respected.** Don't explain things experienced readers already know. If a beat depends on shared context (Docs-as-Code, JTBD, AI-assisted writing), assume the reader has it.

#### Two-thread posts

If the post has two threads (e.g., "here's the problem AND here's how I tried to solve it"), render them however they fit. Do not force a parallel three-beat scaffold onto the second thread. Beats must be present *across* the post; they do not need to repeat *within* each thread.

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

## Length guidance

Target reading time: **3–8 minutes** for most posts. That's roughly 600–1,600 words.

- **Under 3 min (under 600 words):** rare and usually too thin to earn the post URL. Better as a LinkedIn post or a social thread.
- **3–5 min (600–1,000 words):** the sweet spot. Most posts should land here.
- **5–8 min (1,000–1,600 words):** for posts with multiple examples or a complex argument. Each section should earn its place.
- **Over 8 min:** justify it. Long posts have to be load-bearing — either the topic genuinely needs the length, or the post is doing the work of two or three smaller posts and should be split.

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
- [ ] Portable insight extractable as a single shareable sentence
- [ ] Reading time 3–8 min (or justified if longer)
- [ ] No "What's next" beat unless natural
- [ ] `personal-tone` self-check passed
- [ ] `ai-antipatterns` self-check passed

## Scope boundary

This skill covers:
- Three-beat structure
- Opener shapes
- Length guidance
- Drafting process

This skill does **not** cover:
- **Personal voice** (first-person, contractions, brand alignment) → `personal-tone`
- **Universal style banishments** (banned words, em dashes, throat-clearing) → `ai-antipatterns`
- **Pre-publish operational checks** (OG image regen, frontmatter validation, save path) → `blog-checklist`
- **Orchestration of a full draft flow** → `commands/blog-draft.md`

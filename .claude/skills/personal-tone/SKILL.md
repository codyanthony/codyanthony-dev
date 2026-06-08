---
name: personal-tone
description: Personal voice and tone for Cody Anthony's writing. Extends ai-antipatterns with specifics — first-person, present tense, brand-aligned, anti-contrast framing. Apply to every writing task on this project.
tags: [writing, style, voice, personal]
---

# Skill: personal-tone

## When to load this skill

Load alongside `ai-antipatterns` for every writing task on this project — blog posts, case studies, page copy, social posts, README files, anything published under the Cody Anthony brand.

`ai-antipatterns` is the universal negative style guide and takes precedence on every rule it covers. This skill adds personal voice preferences and brand-specific alignments that `ai-antipatterns` does not cover.

## Voice

### First person, present tense

I write in first person and present tense. "I write the documentation and architect the systems around it." Not "Cody writes" or "We architect."

For retrospective or factual claims (past employment, past projects), past tense is correct. The first-person posture stays consistent.

### Contractions are natural

"Don't" not "do not." "It's" not "it is." "I've" not "I have." Contractions match conversational professional register. Exception: contractions tend to read less authoritative in single-sentence claims meant to land hard; in those cases, expand for weight.

### Direct, no buzz

Lead with the thing. No throat-clearing. No filler transitions. No corporate hedging. See `ai-antipatterns` for the full banned-phrases list.

## Tone

### Invitational, framed as personal experience

Frame claims as my experience, not universal truth. "I've found that X works" beats "X always works." This matters for credibility — readers trust experience-grounded claims more than authoritative pronouncements, and the invitational frame signals "here's how I see it" rather than "here's the truth you're missing."

### AI credit is explicit

When I describe AI-assisted work, name it. "I directed a Claude agent to research X" beats "I researched X" if Claude did the heavy lifting. Hiding AI involvement reads as inflation when the audience figures it out — which they will, because the work signals it.

When the AI assistance is incidental (autocomplete, light editing), no need to name it. The bar is: did the AI do work I'm taking credit for? Name it. Did the AI smooth a sentence? Don't.

### No verbatim praise from others

If someone praised the work, paraphrase the praise — don't quote it. Verbatim praise reads as self-congratulatory even when it isn't. "My VP called the migration framework load-bearing for the org" beats "My VP said, 'Cody's migration framework is load-bearing for the org.'"

### Let achievements stand on their own

If the work is good, the metric or outcome does the talking. No need to add "which I'm really proud of" or "which was a huge effort." The reader infers effort from the result.

## Flow

### Zero em dashes in prose

Per `ai-antipatterns`. The only acceptable em dashes are in description lists, link lists, numbered description items, and empty table cells. Every prose em dash gets rewritten with a comma, colon, period, or parenthesis.

### No "X, not Y" contrast framing

Patterns like "I write the documentation, not just edit it" or "This is content strategy, not copy editing" read as AI-generated tells. They also frame writers negatively (implying that what readers do is the lesser version).

Replace contrast framings with positive declarative statements:

- Bad: "I design content infrastructure, not just write docs."
- Good: "I design content infrastructure. The writing is one of the deliverables."

Or skip the comparison entirely:

- Bad: "Documentation strategy, not just technical writing."
- Good: "Documentation strategy."

### No triple-repetition for emphasis

Three consecutive sentences or phrases starting with the same word land as a stylistic tell. Vary structure.

### No sales-pitch closings

Posts and case studies do not end with "Get in touch" CTAs unless the post is genuinely a service pitch. Editorial content earns its own credibility; appended sales lines undercut it.

### Connect-to-existing-work openers preferred

When possible, open with something the reader already knows or can immediately picture. "Every documentation team I've worked with hits the same wall at scale" beats "Documentation teams face challenges." Specificity earns trust faster than abstraction.

## Brand alignment

### Canonical title

**Documentation Strategist.** Use this across all surfaces:

- Site header, about page, OG image, meta descriptions
- LinkedIn headline + summary
- Resume header (paired with "Senior Technical Writer" via pipe separator)
- GitHub bio
- X bio
- Email signature (if added later)

Variants like "Documentation Architect," "Senior Technical Writer" (alone), or "Tech Writer" introduce drift. Use the canonical form first, then add qualifiers only where the surface convention requires.

### Three principles framework

| Principle                                  | What it means                                                                                                                                             |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Docs-as-Product**                        | Documentation is shaped during product design, not after. By the time I write, I've already helped shape the thing I'm writing about.                     |
| **Docs-as-Data**                           | Documentation engineered as structured, reusable data. Componentized content that LLMs, AI agents, and human readers can each consume on their own terms. |
| **Jobs-to-Be-Done & Instructional Design** | Content structured around the jobs developers are trying to do. Learning theory and user-centered design cut friction and shorten time-to-first-success.  |

These are referenced on the home page Core Philosophy section and should anchor blog posts that touch on documentation strategy or content systems.

### Three capability pillars

Top-3 capability tags used on OG image, LinkedIn headline, and resume Core Competencies:

- **Content Strategy** (or Documentation Strategy)
- **Documentation Systems** (or Content Infrastructure)
- **AI Workflows** (or Agentic Workflows)

These three capability tags are the recurring brand shorthand. Use them in this canonical order when listing capabilities inline.

### Documentation Strategist framing

Self-description that anchors most writing:

> I'm a documentation strategist shaping how complex software products are documented and understood. I design content infrastructure — docs-as-code pipelines, agentic AI workflows, and self-service contribution governance — so documentation scales alongside the engineering work it describes.

Adapt this opener for context (resume summary, LinkedIn opener, blog author bio), but keep the core framing: documentation strategist, complex software products, content infrastructure, scaling alongside engineering.

## Anti-patterns specific to my voice

Banned beyond what `ai-antipatterns` covers:

- **"X, not Y" contrast framing.** See Flow section above.
- **Verbatim praise quotes.** Paraphrase.
- **Effort signaling.** "Which was a huge effort," "which I'm really proud of," "after months of work." Cut.
- **Buzzword pairing with concrete work.** "Robust documentation infrastructure" — drop "robust." "Comprehensive content audit" — drop "comprehensive." See `ai-antipatterns` banned words list.
- **"Information ecosystems."** Specific buzzword I avoid. Replace with "documentation systems," "content infrastructure," or whatever specific noun the context calls for.
- **"Complex software products" overuse.** This is a brand phrase but it loses force if it appears in every paragraph. Limit to opening framings and key positioning lines. Vary downstream with specifics ("cloud platforms," "developer tools," "enterprise APIs," etc.) where appropriate.

## Audience layering

Even when the primary audience of a piece is peers (other tech writers, docs practitioners, engineers), **recruiters and hiring managers are always reading too.** Treat them as a persistent secondary audience. The job search is the underlying context for everything I publish under this brand.

The implication for every piece:

- Substance must signal craft-depth for the senior IC reader. A recruiter skimming should be able to identify expertise from the specifics, not from credentialing language.
- No need to address recruiters directly. They read over the shoulder of the primary audience and form their own conclusions from what they see.
- Avoid writing that _only_ lands for peers (insider jokes, jargon without context) without also being substantively legible to a senior reader from an adjacent field.
- Avoid writing that _only_ lands for recruiters (resume-style claims, credential-stacking) without also being substantively useful to the peer audience.

When in doubt, write for the peer; the recruiter signal follows from the substance.

## Brand voice quick-reference

When writing in my voice, the test:

- Could a recruiter read this and identify it as written by a senior documentation strategist? (Substance signal)
- Could a peer in tech comm read this and not feel pandered to? (Credibility signal)
- Could someone share a sentence from this on LinkedIn without it sounding like marketing copy? (Authenticity signal)

If yes to all three, the voice is right. If no to any, revise.

## AI-tell patterns

Universal AI-output style tells (aphoristic closings, parallel-construction patterns, throat-clearing openers, buzz-shape phrases) are covered in `ai-antipatterns`. That skill is the canonical source. Apply its rules without duplicating them here.

## Self-check

Before submitting any writing:

- [ ] First person, present tense (unless retrospective)
- [ ] Contractions natural unless single-sentence weight required
- [ ] Zero em dashes in prose (per `ai-antipatterns`)
- [ ] Zero "X, not Y" contrast framings
- [ ] No verbatim praise quotes
- [ ] No effort signaling ("huge effort," "really proud of")
- [ ] No sales-pitch closing
- [ ] Canonical title used where applicable
- [ ] Three-pillar shorthand uses canonical order
- [ ] AI credit explicit where AI did the work
- [ ] Brand-phrase "complex software products" appears at most once per piece
- [ ] Audience layering: piece serves peers primarily, with recruiter readability preserved through substance
- [ ] `ai-antipatterns` self-check passed (covers all universal AI-tells)

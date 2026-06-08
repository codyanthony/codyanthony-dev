---
name: ai-antipatterns
description: Negative style guide for AI-generated writing. Bans specific words, phrases, and structural patterns that signal low-quality AI output. Load before any writing task.
tags: [writing, style, quality, ai]
---

# Skill: ai-antipatterns

## Purpose

This is a negative style guide. It tells you what NOT to do when writing.

AI defaults to patterns it has seen most often. These patterns signal low-quality, generic output. This skill forces you off those defaults.

Apply this skill to every piece of prose you generate: documentation drafts, changelogs, PR descriptions, session summaries, emails, blog posts. No exceptions.

## Skill maintenance strategy

This skill contains universal negative constraints that apply to all writing tasks. It
must work standalone — any agent loading this skill gets the full set of antipatterns
regardless of what other skills are loaded.

- **Universal antipatterns** (banned words, phrases, structural patterns) live here.
- **Content-type-specific negative examples** (for example, solution guide framing
  issues) live in the relevant content-type skill, not here.
- When a universal rule needs a content-type-specific example, the example goes in the
  content-type skill. The universal rule stays here without the specific example.

## Banned words

Never use these words. Replace or remove them.

| Banned          | Replacement                                                  |
| --------------- | ------------------------------------------------------------ |
| leverage        | use                                                          |
| utilize         | use                                                          |
| seamless        | say what makes it smooth                                     |
| robust          | say what makes it strong                                     |
| comprehensive   | say what it covers                                           |
| ecosystem       | name the actual things                                       |
| synergy         | delete the sentence                                          |
| paradigm        | say what changed                                             |
| ideate          | delete the sentence                                          |
| streamline      | say what it simplifies                                       |
| empower         | state the action directly                                    |
| unlock          | state what becomes possible                                  |
| harness         | use                                                          |
| optimize        | improve, or say what gets better                             |
| landscape       | say what you mean (market, ecosystem, field)                 |
| cutting-edge    | remove — let the feature speak                               |
| best-in-class   | remove                                                       |
| world-class     | remove                                                       |
| next-generation | remove                                                       |
| holistic        | say what it covers                                           |
| scalable        | say how it scales                                            |
| innovative      | remove — show, do not label                                  |
| facilitate      | allow, enable, or just state it                              |
| bolster         | strengthen, or say what improves                             |
| whilst          | while                                                        |
| moreover        | cut or restructure                                           |
| furthermore     | cut or restructure                                           |
| thus            | cut or restructure                                           |
| hence           | cut or restructure                                           |
| thereof         | rewrite                                                      |
| therein         | rewrite                                                      |
| definitely      | remove or qualify                                            |
| certainly       | remove or qualify                                            |
| guarantees      | remove or qualify — say what it does, not that it guarantees |
| eliminates      | remove or qualify — say what it reduces or prevents          |
| impossible      | remove or qualify — say what is not supported                |

**Certainty terms with context-dependent rules:**

The following words are not universally banned. They are banned when the agent chooses
them to sound authoritative, but permitted when they appear in source material:

| Word   | Banned when                                          | Permitted when                                                                                                          |
| ------ | ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| always | Agent adds for emphasis ("always use HTTPS")         | Matches source docs, UI element names ("Always Use HTTPS"), or documented behavior ("DDoS protection is always on")     |
| never  | Agent adds for emphasis ("never skip this step")     | Matches source docs or documented constraint                                                                            |
| every  | Agent adds for emphasis ("every request is checked") | Matches source docs ("shows every request that your rules...")                                                          |
| all    | Agent adds for emphasis ("all traffic is protected") | Matches source docs, UI labels ("All remaining custom rules"), or factual scope ("available on all plans" when sourced) |

The test: did the word come from source documentation, a UI element name, or a documented
product behavior? If yes, keep it. If the agent chose it to sound confident, replace it
with the specific claim from the source docs.

## Banned phrases

Never use these phrases. The fix is always the same: delete the phrase and start with the actual point.

### Throat-clearing openers

These phrases delay the point. Cut them.

- "It's important to note that..."
- "It's worth mentioning that..."
- "Worth remembering that..."
- "It should be noted that..."
- "It bears mentioning that..."
- "As previously mentioned..."
- "As noted above/earlier..."
- "As you may know..."
- "As we all know..."
- "Needless to say..."
- "Interestingly..."
- "The thing is..."
- "The reality is..."
- "A common framing in [community] right now..."
- "There's been a lot of discussion about X lately."
- "Many [people] face the same problem..."

### Summary padding

Do not announce that you are summarizing. Just end.

- "In conclusion..."
- "To summarize..."
- "To sum up..."
- "In summary..."
- "All in all..."
- "At the end of the day..."
- "The bottom line is..."
- "To recap..."
- "With all of the above in mind..."

### Forced enthusiasm

If the work is good, it does not need a sales pitch.

- "Excited to share..."
- "Thrilled to announce..."
- "We're happy to report..."
- "Great news!"
- "This is a game-changer..."
- "This powerful feature..."
- "This exciting update..."

### Filler transitions

These add no information. Cut them or restructure.

- "The next step is to..."
- "Now that you have completed..."
- "With that out of the way..."
- "Moving on to..."
- "Let's take a look at..."
- "Let's dive into..."
- "Let's explore..."
- "Without further ado..."
- "Having said that..."
- "That being said..."
- "It goes without saying..."
- "In order to..." (replace with "To")
- "Due to the fact that..." (replace with "Because")
- "In light of the fact that..." (replace with "Because")
- "For the purpose of..." (replace with "To" or "For")
- "On a daily basis" (replace with "Daily")
- "At this point in time" (replace with "Now")

### Over-qualification

Stop hedging. Say the thing.

- "depending on your specific use case and configuration"
- "based on your particular needs and requirements"
- "in certain scenarios and conditions"
- "may vary depending on various factors"
- "it is generally recommended to..."
- "you might want to consider..."
- "it could potentially..."

## Structural antipatterns

### Restating the obvious

After an instruction ("Turn on Bot Fight Mode"), do not explain what just happened ("After you turn on Bot Fight Mode, Cloudflare begins..."). The reader just did it. They know.

### Preachy justifications

Do not tell the reader why they should read the section they are already reading. If they
opened the section, they are already convinced. Cut paragraphs that exist only to justify
the section's existence.

Bad: "Configuring bot rules without understanding these categories leads to false positives.
The goal is to act on the automated category while protecting the other two."
Fix: Cut it. The section content already teaches the categories.

### Value judgments disguised as facts

State what happens. Let the reader decide how important it is. Do not make value judgments
for them.

Bad: "Protecting these endpoints is not optional."
Bad: "Bot Fight Mode is your first line of defense."
Bad: "The damage goes beyond noise."
Fix: Describe the consequences. "Unprotected form endpoints receive spam submissions and
credential stuffing attempts." The reader draws their own conclusion.

### False absolutes

Do not make claims that are broader than the evidence supports. Absolutes like "no content
exists" or "there is no way to" are almost always false and undermine credibility. Qualify
the scope of the claim.

Bad: "Customers have no content showing how products work together."
Fix: "Cross-product guidance showing how products connect is sparse."

Bad: "No page explains how to combine products."
Fix: "No page in the app sec product areas explains how to combine products for a specific goal."

The narrower the claim, the harder it is to dispute.

### Inferred product behavior

Do not infer what a product does or does not do based on what adjacent or competing
products advertise as differentiators. Only state what the product's own documentation
says. If Product B advertises "verified bot allowlisting" as a feature, you cannot
conclude that Product A lacks this feature unless Product A's documentation explicitly
says so.

Bad: "Bot Fight Mode does not distinguish between good bots and bad bots." (inferred
from Super Bot Fight Mode advertising verified bot allowlisting)
Fix: State the documented limitations: "Bot Fight Mode protects entire domains without
endpoint restrictions and cannot be customized via custom rules."

### Escalated certainty

Any claim about what a product does, how it behaves, or what outcomes it produces must
use the exact language from the source documentation. Do not paraphrase with stronger
or weaker qualifiers. If the source says "quite certain," write "quite certain." Do not
substitute "definitely," "likely," "probably," or any other qualifier.

UI labels use categorical shorthand ("Definitely automated") that is stronger than how
the feature is described in prose. Match the prose description, not the UI label.

Do not make prescriptive recommendations ("Always allow verified bots") when the source
documentation presents something as a configuration choice. If the product gives the user
a choice, the guide should too.

Match the source docs' framing, not just their facts. If the source presents product
characteristics under "Considerations" (neutral), do not reframe them as "Limitations"
(negative). If the source describes a behavior as a feature, do not present it as a
drawback. Product teams choose their framing deliberately.

### Unsourced feature descriptions

Do not write your own explanation of what a product feature does. Use the exact language
from the feature's source documentation. If the source says "Offers protection for static
resources," write that. Do not expand to "extends bot detection to static assets like
images and scripts" — that adds claims not in the source.

When listing features inline, evaluate whether each description adds value the reader
cannot get from the feature name plus a link. If the description is just a thin restatement,
replace the list with one sentence naming the features and a link to the source page.

### Paired synonyms

Pick one word, not two.

- "detect and identify" -- pick one
- "monitor and track" -- pick one
- "configure and set up" -- pick one
- "review and examine" -- pick one
- "manage and control" -- pick one
- "protect and secure" -- pick one
- "deploy and implement" -- pick one

### Tripled lists for emphasis

Do not list three adjectives or examples when one suffices.

Bad: "This provides fast, reliable, and efficient delivery."
Fix: "This speeds up delivery."

Bad: "...including scrapers, credential stuffers, and inventory hoarders."
Fix: Use only when the list adds distinct information the reader needs.

### Parallel-construction tells

AI defaults toward balanced, parallel syntactic structures. Real writing varies its rhythms. Watch for these specific patterns:

**Aphoristic slogan closings.** Short, parallel-construction sentences at the end of a section or post, designed to be quotable. Common shapes:

- "The X is the Y."
- "X is what does the work. Y is what holds the quality."
- "The unit of [concept] is the [thing]."

These read as deliberate craft on first pass; they read as LLM tics on second. Even one is borderline. Two in the same piece (especially as bookends) is a clear tell. Replace with sentences that finish a thought rather than summarize it.

**"Without X, Y. Without Y, X." inversions.** A parallel two-sentence inversion structure:

- "Without the conventions, the pipeline produces a thousand inconsistent translations. Without the pipeline, the conventions never apply at scale."

Real writers might use this construction once in a career. LLMs reach for it constantly. Detect and rewrite.

**Triple parallel construction across consecutive sentences.** Three consecutive sentences with identical syntactic structure carrying three different verbs:

- "The deterministic layer scales repetition. The agentic layer scales judgment at volume. The human layer handles judgment that doesn't scale."

The fact that the same structure carries three different verbs is the tell. Variation is the point of prose. Rewrite at least one sentence to break the rhythm.

**Schematic identical templates across parallel sections.** When a piece has multiple sections that each describe a parallel set of items (cases, examples, layers), AI tends to render every section with the _same_ template (same bold-label structure, same bullet count, same closing-sentence shape).

Real writing varies the rendering even when the underlying structure is parallel. One section might be a narrative paragraph. Another a bulleted list. A third a short scene. Same beats, different shapes.

### Buzz-shape phrases

Phrases that sound profound but resolve to little:

- "judgment that doesn't scale"
- "strategic handoffs live here"
- "load-bearing the work"
- "the unit of craft is the X"

These reach for weight through abstraction. The fix: name the concrete thing instead. "Judgment that doesn't scale" → "the conventions I set by hand for each ambiguous source file." Replace abstract weight with specific weight.

### Fake precision

Do not cite statistics without a source. Do not approximate with false confidence.

Bad: "Bots account for approximately 40% of all web traffic."
Fix: Either link to a source or remove the claim.

### The windup pitch

Do not spend a paragraph building up to the point. Lead with the point.

This is the sentence-level face of `blog-post-framework` "Earn the abstraction." One rule, two scales: lead with the concrete point, do not bury it under windup, and do not open with an abstract claim you then illustrate. Concrete first; abstraction earned.

Bad: "Bots and malicious actors do not always target your server directly. Third-party scripts loaded by your pages can be hijacked or replaced to exfiltrate form data. These supply chain attacks happen entirely in the browser. Client-side security monitors these scripts."
Fix: "Client-side security monitors third-party scripts on your pages for hijacking and data exfiltration."

### Numbered lists that should be prose

Not everything needs to be a numbered list. Use numbered lists for sequential steps. Use prose or bullets for non-sequential information.

### Excessive bolding

Bold draws the eye. If everything is bold, nothing is. Bold UI elements and key terms only.

## Formatting antipatterns

### Em dashes

Do not use em dashes in prose. Use commas, periods, colons, or parentheses instead. Every
sentence that uses an em dash can be rewritten without one.

Exceptions — these standard markdown conventions use em dashes by design:

- **Description lists**: `**Bold term** — Description` (bold key followed by em dash and value, with or without a leading bullet)
- **Link lists**: `- [Link text](/path/) — one-line description` (Related Resources pattern)
- **Numbered description items**: `1. **Bold term** — Description`
- **Empty table cells**: `—` used alone to indicate no value

These conventions override the em dash ban. The ban applies only to em dashes in regular
prose sentences, section intros, callout content, and procedure step descriptions.

### Leading spaces

Random spaces at the start of paragraphs. These appear in AI output frequently. Remove them.

### Emoji in technical documentation

Never. Not in headings, not in lists, not in callouts. Technical documentation is not a Slack message.

### Exclamation points

Never in documentation. Reserve for error messages or success states in UI copy.

### Scare quotes

Do not put quotation marks around technical terms for emphasis. Either the term is correct (use it directly) or it needs definition (define it).

Bad: Bot Fight Mode "challenges" suspected bots.
Fix: Bot Fight Mode challenges suspected bots.

## Self-check

Before finishing any writing output, verify:

- [ ] No words from the banned words list
- [ ] No phrases from the banned phrases list
- [ ] No throat-clearing openers on any paragraph
- [ ] No summary padding at the end
- [ ] No paired synonyms
- [ ] No restating what the reader just did
- [ ] No statistics without sources
- [ ] Zero em dashes in prose (description lists and link lists are exempt)
- [ ] No leading spaces on paragraphs
- [ ] No emoji
- [ ] No exclamation points
- [ ] First sentence of every section leads with the point, not the windup
- [ ] No absolute certainty terms (definitely, certainly, guarantees, eliminates, impossible) added by agent
- [ ] Context-dependent terms (always, never, every, all) only used when matching source docs or UI element names
- [ ] Qualification terms (mostly, likely, ensures, prevents) only used when matching source docs or SME language, not chosen by the agent
- [ ] No aphoristic closing slogans (especially as bookends)
- [ ] No "Without X, Y. Without Y, X." inversions
- [ ] No triple parallel construction across consecutive sentences
- [ ] Parallel sections render with structural variety, not identical templates
- [ ] No buzz-shape phrases reaching for weight through abstraction

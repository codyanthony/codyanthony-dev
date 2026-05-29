---
name: series-blocks
description: Templates and conventions for blog posts that participate in a collaborative series or roundup. Defines the intro and navigation block formats per series, the frontmatter contract, and the placeholder convention for unknowns at draft time.
tags: [blog, series, roundup, templates]
---

# Skill: series-blocks

## When to load this skill

Load when drafting or reviewing a blog post that participates in a collaborative series (e.g., Per the Docs). Pair with `blog-post-framework`, `personal-tone`, and `ai-antipatterns`.

For standalone (non-series) blog posts, this skill is not needed.

## Frontmatter contract

A series post has a `series` frontmatter field whose value matches one of the supported series slugs below. The presence of this field signals to the blog system (commands, layout, checklist) that series blocks must be inserted into the body.

```yaml
series: per-the-docs
```

If the field is absent or empty, the post is treated as standalone.

## Where the blocks live

Series blocks (intro at top, navigation at bottom, disclaimer) live **inline in the MDX body**, not auto-rendered by the layout. Reasoning:

- Writers see the actual rendered text in the file (no surprises at build time)
- Per-post overrides are trivial (custom disclaimer, different navigation order)
- Pre-launch placeholder fill-in happens by editing the same file the prose lives in
- No layout component or schema complexity required

The blog-draft command inserts the blocks at draft time, applying the template for the chosen series. The writer fills in placeholders before launch (the launch coordinator typically provides previous/next post details 24-48 hours pre-launch).

## Placeholder convention

Any value not known at draft time gets a placeholder of the form `[CONFIRM PRE-LAUNCH: KEY-NAME]`. This makes placeholders findable via grep:

```bash
grep -rn "CONFIRM PRE-LAUNCH" src/content/blog/
```

Required placeholder coverage before publishing: zero `CONFIRM PRE-LAUNCH` markers remaining in the post body.

## Supported series

### Per the Docs

A monthly collaborative series where technical writers explore different aspects of their craft. Each month features a new topic with perspectives from writers across the community. The chain is circular — the first participant's "Previous" link points to the last participant; the last's "Next" link points to the first.

**Series identifier:** `per-the-docs`

**Required intro block** (insert at the very top of the post body, immediately after frontmatter):

```markdown
This post is part of the [Per the Docs]([CONFIRM PRE-LAUNCH: PER-THE-DOCS-URL]) article series.
Links to the rest of the series are at the end of this piece.
```

**Required navigation block** (insert at the very bottom of the post body, after a horizontal rule):

```markdown
---

This post is part of the [Per the Docs]([CONFIRM PRE-LAUNCH: PER-THE-DOCS-URL]) article series, a monthly collaborative series where technical writers explore different aspects of our craft. Each month features a new topic with perspectives from writers across the community.

Previous article: [CONFIRM PRE-LAUNCH: PREV-AUTHOR] - [[CONFIRM PRE-LAUNCH: PREV-POST-TITLE]]([CONFIRM PRE-LAUNCH: PREV-POST-URL])
Next article: [CONFIRM PRE-LAUNCH: NEXT-AUTHOR] - [[CONFIRM PRE-LAUNCH: NEXT-POST-TITLE]]([CONFIRM PRE-LAUNCH: NEXT-POST-URL])

[See the full list of participants and articles →]([CONFIRM PRE-LAUNCH: PER-THE-DOCS-URL])

*Disclaimer: Each article in this series is written and owned by its respective author. The views, opinions, and experiences shared belong solely to the individual writer and do not represent the perspectives of other participants or their employers (past or present).*
```

**Placeholders used:**

| Placeholder | What to fill in pre-launch |
|---|---|
| `PER-THE-DOCS-URL` | The series landing-page URL provided by the coordinator (unique per month until perthedocs.com goes live) |
| `PREV-AUTHOR` | Author name of the previous post in the chain |
| `PREV-POST-TITLE` | Title of the previous post (becomes linked text) |
| `PREV-POST-URL` | URL of the previous post (becomes the link target) |
| `NEXT-AUTHOR` | Author name of the next post in the chain |
| `NEXT-POST-TITLE` | Title of the next post |
| `NEXT-POST-URL` | URL of the next post |

**Coordinator confirmation timing:** Coordinator confirms PER-THE-DOCS-URL and previous/next chain assignments at least 48 hours before launch. Do not publish until all placeholders are filled.

## Adding a new series

When a new collaborative series comes along (e.g., a different roundup or hopping pattern), add a new section to this skill following the structure above:

1. Series identifier (the slug used in frontmatter)
2. Required intro block template
3. Required navigation block template
4. Placeholder table
5. Coordinator confirmation timing or relevant operational notes

Also extend the `series` enum in `src/content.config.ts` to accept the new slug.

## Pre-launch checklist for series posts

Run before publishing any post with a `series` frontmatter value:

- [ ] All `CONFIRM PRE-LAUNCH` placeholders filled in with real values
- [ ] Series landing-page URL resolves (no 404)
- [ ] Previous post URL resolves
- [ ] Next post URL resolves
- [ ] Author names match what the coordinator confirmed
- [ ] Disclaimer block present unchanged (legal/social-contract requirement)
- [ ] Intro block present at the very top of the body (before all prose)
- [ ] Navigation block present at the very bottom of the body (after a `---` horizontal rule)

## Scope boundary

This skill covers:
- Series block templates and placeholders
- Frontmatter contract for series participation
- Per-series operational notes (coordinator timing, chain shape)
- Pre-launch checklist items specific to series posts

This skill does **not** cover:
- The main blog post structure → `blog-post-framework`
- Voice and brand alignment → `personal-tone`
- Universal style banishments → `ai-antipatterns`
- Per-post OG image generation → `scripts/generate-blog-og.mjs`
- General pre-publish gates → `blog-checklist`

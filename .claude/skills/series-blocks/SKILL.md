---
name: series-blocks
description: Templates and conventions for blog posts that participate in a collaborative series. Defines inline intro and navigation block formats, the frontmatter contract, placeholder convention, coordinator-confirmation workflow, and theme-fit checks for draft-time and pre-launch review.
tags: [blog, series, collaboration, templates]
---

# Skill: series-blocks

## When to load this skill

Load when drafting or reviewing a blog post that participates in a collaborative series, such as Per the Docs. Pair with `blog-post-framework`, `personal-tone`, `ai-antipatterns`, and `blog-checklist`.

For standalone blog posts, this skill is not needed.

## Frontmatter contract

A series post has a `series` frontmatter field whose value matches one of the supported series slugs below. The presence of this field signals to the commands, checklist, and reviewer that series blocks must be present in the MDX body and that series-specific pre-launch checks apply.

```yaml
series: per-the-docs
```

If the field is absent or empty, the post is treated as standalone.

Optional structured fields may be present when the series uses a named theme:

```yaml
series_theme: "Theme Name"
series_theme_url: "https://example.com/theme-page"
```

These fields do not replace the inline navigation block. They give commands and future layouts structured access to the theme data.

## Where the blocks live

Series blocks live **inline in the MDX body**, not auto-rendered by the layout.

Blocks may include:

- Intro block at the top of the body
- Navigation block at the bottom of the body
- Disclaimer block, when required by the series

Reasoning:

- Writers see the actual rendered text in the file.
- Per-post overrides are easy.
- Pre-launch placeholder fill-in happens in the same file as the prose.
- No hidden layout behavior changes the published post.
- The final draft is portable and reviewable as a single artifact.

The `blog-draft` command inserts the blocks at draft time, applying the template for the chosen series. The writer fills in placeholders before launch after the coordinator confirms chain assignments, theme links, or participant details.

## Placeholder convention

Any value not known at draft time gets a placeholder of the form `[CONFIRM PRE-LAUNCH: KEY-NAME]`. This makes placeholders findable via grep:

```bash
grep -rn "CONFIRM PRE-LAUNCH" src/content/blog/
```

Required placeholder coverage before publishing: zero `CONFIRM PRE-LAUNCH` markers remaining in the post body.

Do not publish a series post while placeholders remain unless the writer explicitly decides to publish without the series block being complete.

## Theme fit

Series participation is not only a formatting choice. The post must fit the monthly or collaborative theme through substance.

The theme connection should usually live in the post's argument, not in heavy explicit labeling. A post on a theme like "Mind the Gap" might examine taxonomy as a gap-finding mechanism. A post on a theme like "Content Alchemy" might examine transformation between inputs and outputs. The connection is woven through the claim, examples, and portable insight.

Avoid forcing the theme into the opener or conclusion unless it is genuinely part of the post's motivating question or reader movement.

Before drafting, confirm:

- The post's central claim fits the series theme.
- The theme connection is substantive, not decorative.
- The series context does not distort the post's architecture.
- The post can stand alone outside the series.
- The series block provides context without making the post depend on the reader clicking elsewhere.

If the writer cannot articulate how the post connects to the theme, surface that during `blog-plan` or `blog-draft`, not at final pre-publish review.

## Supported series

### Per the Docs

A monthly collaborative series where technical writers explore different aspects of their craft. Each month features a new topic with perspectives from writers across the community. The chain is circular: the first participant's "Previous" link points to the last participant, and the last participant's "Next" link points to the first.

**Series identifier:** `per-the-docs`

**Required intro block**
Insert at the very top of the post body, immediately after frontmatter and before all prose:

```markdown
This post is part of the [Per the Docs]([CONFIRM PRE-LAUNCH: PER-THE-DOCS-URL]) article series.
Links to the rest of the series are at the end of this piece.
```

**Required navigation block**
Insert at the very bottom of the post body, after a horizontal rule:

```markdown
---

This post is part of the [Per the Docs]([CONFIRM PRE-LAUNCH: PER-THE-DOCS-URL]) article series, a monthly collaborative series where technical writers explore different aspects of our craft. This month's topic is [[CONFIRM PRE-LAUNCH: THEME-NAME]]([CONFIRM PRE-LAUNCH: THEME-LANDING-URL]). Each month features a new theme with perspectives from writers across the community.

Previous article: [CONFIRM PRE-LAUNCH: PREV-AUTHOR] - [[CONFIRM PRE-LAUNCH: PREV-POST-TITLE]]([CONFIRM PRE-LAUNCH: PREV-POST-URL])
Next article: [CONFIRM PRE-LAUNCH: NEXT-AUTHOR] - [[CONFIRM PRE-LAUNCH: NEXT-POST-TITLE]]([CONFIRM PRE-LAUNCH: NEXT-POST-URL])

[See the full list of participants and articles →]([CONFIRM PRE-LAUNCH: PER-THE-DOCS-URL])

_Disclaimer: Each article in this series is written and owned by its respective author. The views, opinions, and experiences shared belong solely to the individual writer and do not represent the perspectives of other participants or their employers (past or present)._
```

### Theme-name pattern

The navigation block may name the specific monthly theme and link to a theme-specific landing page. When the writer has the theme name and landing URL at draft time, populate the `THEME-NAME` and `THEME-LANDING-URL` placeholders directly. When unknown, leave the placeholders for pre-launch fill-in.

The theme name and theme URL can also live in frontmatter as `series_theme` and `series_theme_url` fields, if those fields are defined in `src/content.config.ts`.

Do not assume the theme landing page URL pattern. Use the URL provided by the coordinator.

### Placeholders used

| Placeholder         | What to fill in pre-launch                                                                                   |
| ------------------- | ------------------------------------------------------------------------------------------------------------ |
| `PER-THE-DOCS-URL`  | The series or monthly landing-page URL provided by the coordinator                                           |
| `THEME-NAME`        | The monthly theme name, if the series uses one. May also be set in frontmatter as `series_theme`.            |
| `THEME-LANDING-URL` | URL to the theme-specific landing page, if applicable. May also be set in frontmatter as `series_theme_url`. |
| `PREV-AUTHOR`       | Author name of the previous post in the chain                                                                |
| `PREV-POST-TITLE`   | Title of the previous post                                                                                   |
| `PREV-POST-URL`     | URL of the previous post                                                                                     |
| `NEXT-AUTHOR`       | Author name of the next post in the chain                                                                    |
| `NEXT-POST-TITLE`   | Title of the next post                                                                                       |
| `NEXT-POST-URL`     | URL of the next post                                                                                         |

### Coordinator confirmation timing

The coordinator typically confirms the series landing URL, theme details, and previous/next chain assignments close to launch. Do not publish until all placeholders are filled and all links resolve.

If the coordinator has not provided final chain details, keep the post in draft or hold the merge until the placeholders can be filled.

## Adding a new series

When a new collaborative series comes along, add a new section to this skill following the structure above:

1. Series identifier: the slug used in frontmatter
2. Required intro block template
3. Required navigation block template
4. Disclaimer block, if required
5. Placeholder table
6. Theme-fit notes, if the series has monthly themes
7. Coordinator confirmation timing or relevant operational notes

Also extend the `series` enum in `src/content.config.ts` to accept the new slug.

## Draft-time checklist for series posts

Run during `blog-plan` or `blog-draft` before composing the final post:

- [ ] `series` frontmatter value is set to a supported slug.
- [ ] The post's central claim fits the series theme through substance.
- [ ] The series theme does not distort the post's architecture, reader movement, or opener.
- [ ] The post can stand alone for readers who arrive outside the series chain.
- [ ] Unknown coordinator-provided values use `[CONFIRM PRE-LAUNCH: ...]` placeholders.
- [ ] `series_theme` and `series_theme_url` are set in frontmatter if known and supported by `src/content.config.ts`.

## Pre-launch checklist for series posts

Run before publishing any post with a `series` frontmatter value:

- [ ] All `CONFIRM PRE-LAUNCH` placeholders filled in with real values
- [ ] Series landing-page URL resolves
- [ ] Theme-name and theme-landing URL resolve, when the navigation block includes them
- [ ] Previous post URL resolves
- [ ] Next post URL resolves
- [ ] Author names match what the coordinator confirmed
- [ ] Post titles match what the coordinator confirmed
- [ ] Disclaimer block present unchanged, when required
- [ ] Intro block present at the very top of the body, before all prose
- [ ] Navigation block present at the very bottom of the body, after a `---` horizontal rule
- [ ] Frontmatter `series` value matches the supported series slug
- [ ] Frontmatter `series_theme` and `series_theme_url` match the navigation block, if present

## Theme tie-back convention

Posts tie back to a monthly theme through **substance, not explicit labeling**.

Heavy theme-labeling reads as forced and can undercut the post's argument. Light theme references in the navigation block are usually sufficient. If the theme appears in the prose, it should be because the theme names the real pressure of the post, not because the post needs to prove it belongs.

Good theme tie-back:

- The motivating question naturally intersects with the theme.
- The post's anchor story demonstrates the theme.
- The portable insight would still make sense without the series, but gains context from it.

Weak theme tie-back:

- The intro says "this month's theme is X" and then the post proceeds as if the theme does not matter.
- The conclusion adds a theme sentence that was not earned by the body.
- The post changes its claim to match the theme label rather than using the theme to sharpen the claim.

If the theme connection only works through explicit labeling, the post probably is not a fit for the series this month.

## Scope boundary

This skill covers:

- Series block templates and placeholders
- Frontmatter contract for series participation
- Per-series operational notes
- Coordinator timing and chain-confirmation workflow
- Theme-fit checks specific to series posts
- Pre-launch checklist items specific to series posts

This skill does **not** cover:

- The main blog post structure → `blog-post-framework`
- Systems-post architecture and evidence guidance → `systems-writing`
- Voice and brand alignment → `personal-tone`
- Universal style banishments → `ai-antipatterns`
- Per-post OG cards → generated dynamically by the `/og/[slug].png` endpoint
- General pre-publish gates → `blog-checklist`

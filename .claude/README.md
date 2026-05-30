# Authoring system — `.claude/`

Skills and slash commands for writing blog posts (and eventually other content) on the Cody Anthony brand. Built for Claude Code as the immediate runtime, designed to port cleanly to OpenCode later.

## What's here

```
.claude/
├── README.md                                    # This file
├── skills/
│   ├── ai-antipatterns/SKILL.md                 # Universal negative style guide
│   ├── personal-tone/SKILL.md                   # Voice + brand alignment
│   ├── writer-context/SKILL.md                  # Verified work history, NDA/proprietary guidance, common overclaims to refuse
│   ├── blog-post-framework/SKILL.md             # Three-beat structure for blog posts
│   ├── blog-checklist/SKILL.md                  # Pre-publish gates
│   └── series-blocks/SKILL.md                   # Series intro/navigation block templates (Per the Docs)
└── commands/
    ├── blog-draft.md                            # Orchestrates a full draft flow
    └── blog-review.md                           # Adversarial review of an existing draft
```

`settings.local.json` and any session-state files in `.claude/` are gitignored. Only `skills/`, `commands/`, and `README.md` are tracked.

## Architecture

Three layers, mirroring the OpenCode convention:

- **Skills** — reusable knowledge files. One canonical copy each. Loaded at runtime by commands and applied to writing tasks. Format: `skills/<name>/SKILL.md` with YAML frontmatter.
- **Commands** — user-facing slash commands. Thin orchestrators that load skills and sequence steps. Format: `commands/<name>.md` with YAML frontmatter. Filename minus `.md` becomes the slash command (e.g., `commands/blog-draft.md` → `/blog-draft`).
- **Scripts (deterministic layer)** — Node scripts in `scripts/` handle anything that should be deterministic across runs: image generation, file processing, validation. Commands invoke scripts via Bash; they do NOT reimplement deterministic work in LLM context.

The boundary matters: LLMs handle judgment (voice, structure, anti-pattern detection, prose composition). Scripts handle determinism (image rendering, file writes, schema validation). Mixing them produces drift between runs and unreviewable behavior.

## Canonical skills

### `ai-antipatterns`

The universal negative style guide. Authored by Cody. Treat as canonical for **every writing task on this project** — blog posts, case studies, page copy, README files, social posts. Loads first.

### `personal-tone`

Voice and brand alignment that extends `ai-antipatterns`. First-person, present-tense, anti-contrast-framing, canonical title, three-pillar shorthand. Pair with `ai-antipatterns` on every writing task.

### `blog-post-framework`

Three-beat structure for blog posts on `codyanthony.dev/blog/`:

- **Why this** — stakes-setting (opener + stakes collapsed into one beat)
- **What's true** — substance with at least one concrete example
- **What's portable** — the insight readers carry away

Beats are content checks, not render templates. No fixed section headings; no fixed order. Includes opener-shape variety table.

### `blog-checklist`

Pre-publish gates. Aggregates checks from the three skills above plus operational checks (frontmatter validation, OG image regeneration, astro check). Runs as the final gate before merging to `main`.

## Commands

### `/blog-draft`

Drives a blog post from idea to ready-to-merge draft. Asks the writer four input questions, sketches the three beats, generates the full draft, runs the pre-publish checklist, and saves to `src/content/blog/{slug}.mdx`. The per-post OG card is generated dynamically by the `/og/[slug].png` endpoint (cached to R2) — no static image step.

Use this to write a new post from scratch.

### `/blog-review`

Adversarial review of an existing draft. Read-only — does not modify the file. Returns a structured findings report (critical / recommended / optional) the writer applies manually.

Use this after `/blog-draft` for a fresh-eyes second pass, or on any externally-authored draft before publish.

## Deterministic-script pattern

Commands defer to scripts for anything that should produce the same output given the same input. Current deterministic scripts referenced by this system:

| Script | Purpose | Called from |
|---|---|---|
| `scripts/generate-og.mjs` | Renders site-level OG image | Not part of blog flow; run manually when brand changes |
| `scripts/generate-linkedin-assets.mjs` | Renders LinkedIn banner + headshot | Not part of blog flow; run when brand or photo changes |
| `pnpm astro check` (via Bash) | Validates Astro/MDX syntax + types | `blog-checklist` operational checks |

If a deterministic operation isn't yet scripted but should be (e.g., word count, frontmatter schema validation), add the script under `scripts/` and reference it from the relevant skill or command. Don't reimplement deterministic work in LLM context — it produces drift between runs.

## Portability to OpenCode

The file format and directory shape match OpenCode's APM-canonical convention. Migration is a copy:

```bash
cp -r .claude/skills/* ~/.config/opencode/skills/
cp .claude/commands/* ~/.config/opencode/commands/
```

After copying, run `/commands` in OpenCode to refresh the discovery index. No content changes required — every skill and command in this repo is framework-agnostic.

Differences worth knowing:

| Layer | Claude Code | OpenCode |
|---|---|---|
| Skill discovery | `.claude/skills/<name>/SKILL.md` (project-level) | `~/.config/opencode/skills/<name>/SKILL.md` (user-level) |
| Command discovery | `.claude/commands/<name>.md` (project-level) | `~/.config/opencode/commands/<name>.md` (user-level) |
| Skill invocation | Skill tool (auto-discovered) | Loaded by commands at runtime via skill name |
| Slash commands | Available in chat | Available via `/<name>` |

The CF `opencode-commands` repo at `opencode-commands/` (gitignored, reference only) is the source pattern this system follows.

## How to extend

### Add a new skill

1. Create `skills/<name>/SKILL.md` with frontmatter:
   ```yaml
   ---
   name: <name>
   description: <one-line summary>
   tags: [<topical>, <tags>]
   ---
   ```
2. Write the skill content (rules, tables, examples, self-check).
3. Reference the skill from any command that should load it.
4. Update this README's skill inventory.

### Add a new command

1. Create `commands/<name>.md` with frontmatter:
   ```yaml
   ---
   description: <one-line summary>
   version: <semver>
   ---
   ```
2. Write the command body — banner, dependencies, numbered steps, rules.
3. Steps should load skills explicitly and defer deterministic work to scripts.
4. Update this README's command inventory.

### Add a script (deterministic layer)

1. Create `scripts/<name>.mjs` (or `.py` if Python is the right tool).
2. Document the script in `scripts/README.md` (already established convention in this repo).
3. Reference the script from the command or skill that invokes it.

## Conventions

- **One canonical copy per skill.** Don't duplicate skill content into commands. Commands `load` skills.
- **Skills are framework-agnostic.** No CF-specific paths, no project-specific assumptions inside skill files (those belong in commands or scripts).
- **Commands are thin.** Commands sequence steps; they don't hold knowledge that belongs in a skill.
- **Deterministic work goes in scripts.** If the same input should produce the same output, it's a script — not LLM-judged.
- **No invention.** Commands that draft content do not introduce examples, metrics, or quotes the writer did not provide.
- **Voice is canonical.** `personal-tone` and `ai-antipatterns` are not negotiable per-post. If a rule needs to bend, the writer edits the skill.

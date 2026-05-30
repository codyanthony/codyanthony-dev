---
name: writer-context
description: Cody Anthony's verified work history, role specifics, and accomplishment claims. Load before drafting any content that references the writer's history. Canonical source for fact-checking claims the agent might generate about the writer.
tags: [writer, context, fact-checking, history]
---

# Skill: writer-context

## Purpose

Drafting agents tend to generate plausible-sounding but inaccurate claims about the writer's history (overstating roles, conflating timelines, misattributing accomplishments). This skill is the reference the agent loads before generating any content that references Cody's work history, role tenure, or specific accomplishments.

Use this skill alongside `ai-antipatterns` and `personal-tone` when drafting blog posts, case studies, About-page copy, LinkedIn content, or any other writing that makes claims about Cody's professional history.

**Treat the claims in this skill as ground truth.** If the writer asks the agent to generate a piece that references their history, the agent's output must align with this file. Anything beyond this file is either an overclaim or unverified.

## Employment history (chronological)

| Dates | Employer | Role | Location |
|---|---|---|---|
| 2018-01 – 2020-09 | Cody Anthony Technical Writing Services (own consultancy) | Technical Writing Consultant | Katy, TX |
| 2020-09 – 2022-04 | Pluralsight (formerly A Cloud Guru) | Technical Writer | Austin, TX |
| 2022-04 – 2026-01 | Amazon Web Services (AWS) | Technical Writer / Systems Strategist | Austin, TX |
| 2026-02 – 2026-05 | Cloudflare | Senior Technical Writer | Remote |
| 2026-05 – present | (job search) | — | Georgetown, TX (Austin metro) |

Total technical writing experience: ~8 years (2018–present).

## AWS role specifics (2022-04 to 2026-01, ~3.5 years)

### ROSA (Red Hat OpenShift Service on AWS)

- **Correct claim:** "First AWS technical writer dedicated to ROSA, joining after the service went GA."
- **Incorrect claim:** "Founding writer for ROSA" or "Led ROSA documentation from private preview through GA" — Cody joined the dedicated ROSA writer role *after* GA. The "founding writer / preview through GA" arc applies to EVS, not ROSA.
- Cody led the dedicated ROSA documentation practice at AWS, established conventions, and authored the case study referenced at `/case-studies/systems-strategy/adoc-modernization/`.

### EVS (Amazon Elastic VMware Service)

- **Correct claim:** "Founding lead writer for Amazon EVS, driving launch readiness from private preview through General Availability (GA)."
- Cody owned end-to-end documentation architecture for EVS from preview through GA.

### AsciiDoc adoption at AWS

- **Correct claim:** "Led the multi-year XML-to-AsciiDoc modernization at AWS, with ROSA as the first continuously maintained AsciiDoc package."
- **Correct claim:** "Built an AI-assisted Python migration toolkit using Claude for the DocBook XML-to-AsciiDoc conversion. Conversion time went from days to hours per service."
- **Correct claim:** "The patterns developed for AsciiDoc adoption at AWS were later adopted by EKS and SAP, becoming an org-wide standard for AWS service documentation modernization."
- **Multi-region coverage:** The modernization spanned AWS's standard, regulated, and air-gapped regions. Same patterns applied across all three.
- AWS pre-migration format: **DocBook XML** (not DITA).
- AWS post-migration format: **AsciiDoc**.
- AWS-side ROSA docs are now AsciiDoc, not Markdown.

**DocBook ↔ DITA structural similarity.** DocBook and DITA are both XML-based structured authoring formats with similar element conventions, modular content models, and conditionalization patterns. Migration patterns between AsciiDoc and either DocBook or DITA translate at the schema level. This is the correct framing when Cody is asked about DITA experience: he led a DocBook→AsciiDoc migration, and the schema-level work is familiar territory. The migration leadership experience (building conversion tooling, defining patterns, retraining a team, governing the transition) is the harder-to-find skill; DITA-specific on-ramp is a matter of weeks of immersion, not a structural barrier.

**Why the migration direction matters.** Red Hat is currently migrating in the opposite direction (AsciiDoc → DITA via AEM Guides). Cody's AWS experience is the inverse migration. This positions him uniquely on any conversation about Red Hat's current tooling transition — he led a successful migration in one direction; he can speak credibly to what's gained and lost in either direction.

### Cross-vendor collaboration with Red Hat

- **Correct claim:** "Led the AsciiDoc adoption at AWS with the explicit goal of enabling cross-vendor docs collaboration with Red Hat."
- **Incorrect claim:** "Wrote alongside Red Hat's technical writers" — overstates the actual collaboration state. The AsciiDoc adoption was built *to enable* that collaboration; it wasn't an established practice yet. The structural barriers (AWS Legal, AppSec, closed-vendor tooling on the AWS side) prevented full collaboration even after the AsciiDoc bridge was built.
- **Correct claim:** "The XML toolchain was the wall between Red Hat's writers and the AWS-side ROSA docs they wanted to contribute to."

### Other AWS accomplishments

#### Governance and prioritization

- **Established the first ROSA documentation Quarterly Business Review** with product leadership. Used VOC and support ticket trends to surface gaps, align on priorities, and standardize documentation performance reviews.
- **Created a 7-tier risk model** (Security/Trust > Features) used to anchor the QBR and stop documentation roadmap randomization. Adopted as bar-raising standard for the org.
- **Identified critical product defects via VP-level Strategic Business Reviews (SBRs)**, driving immediate engineering fixes and improving enterprise customer retention.

#### Customer data and product feedback

- **Built a customer data pipeline** across support tickets, partner syncs, and Voice of Customer (VOC) channels. Enabled deeper insight into ROSA customer pain points.
- **Detected a critical DNS forwarding defect** affecting enterprise customers via the support pipeline; drove an immediate engineering fix.
- **Analyzed ROSA customer escalations** around AWS Marketplace billing and private offers; identified the integration as a persistent friction point for enterprise accounts.

#### Cross-functional product work

- **Partnered with ROSA PM, UX, and AWS Marketplace** on a new in-console contract UX; authored ROSA and Marketplace documentation closing gaps in the end-to-end flow.
- **Designed the Contract "Receipt" pattern** — a read-only cost-summary UI element to reduce purchase cognitive load. Adopted as standard.
- **Drove the "Enable ROSA" console branding fix.** Button was previously "Enable OpenShift," which broke the AWS-Native value proposition. Cody recognized the misalignment and drove the change. Reduced onboarding confusion.
- **Launched and led a weekly EVS console UI workshop** with PMs, UX designers, and developers. Drove design improvement suggestions implemented in the product and improved in-product copy. Reduced UX design approval cycles.

#### Compliance and security

- **Led GovCloud compliance documentation for ROSA.** During the launch, escalated to Legal and triggered discovery; **found hidden export-controlled data in support telemetry, preventing potential ITAR violation.** Published the ROSA service page in the AWS GovCloud User Guide.
- **Led AWS-side validation for ROSA Security & Access documentation**, aligning messaging with AWS's shared responsibility model and security principles to provide a coherent story for regulated customers.

#### Infrastructure for documentation

- **Architected a secure, scalable web hosting model for AWS private preview documentation** using a custom CI/CD pipeline (React, Vite, AWS Amplify). Secured AppSec approval as a secure baseline for future pre-release deployments across all AWS service documentation.
- **Scoped EVS Private Preview documentation** to 11 critical help panels (negotiated down from 28 proposed), prioritizing foundational content over supplemental for the launch deadline. Enabled successful customer migrations during preview.

#### Self-service contribution model

- **Authored the "Documentation Ownership Runbook"** enabling engineering teams to take governed ownership of content via Git-based workflows.
- **Delivered tooling demos and co-hosted office hours** to drive adoption of the self-service documentation model.
- **Drove EKS non-writer contribution rate from under 1% to 25%** using the AsciiDoc tooling patterns. Also enabled non-writer and partner contributions across the AWS content surface more broadly.

## Cloudflare role specifics (2026-02 to 2026-05, ~4 months)

- **Title:** Senior Technical Writer
- **Correct claim:** "Architected the information architecture and content model for a new collection of cross-product solution guides at Cloudflare."
- **Correct claim:** "Defined standardized design patterns and self-service governance required to scale high-quality, repeatable delivery across global teams."
- **Correct claim:** "Collaborated with UX content strategists to influence site structure and navigation, mapping disparate Cloudflare services into cohesive Zero Trust and Application Security customer workflows."
- **Correct claim:** "Built an agentic AI workflow using OpenCode and Python to automate cross-product research and drafting. Orchestrated multi-step Claude agents with structured validation gates between each step, compressing production cycles from days to hours."
- **Validation gates example** (specific to this work): "Every product capability the draft mentions has to cite a source page, or the gate rejects it back to the previous step." Another: "Any cross-product workflow that doesn't trace to an actual customer journey is flagged."
- **Avoid:** "Solution guide ecosystem" — `ecosystem` is on the ai-antipatterns banned-words list. Use "collection," "set," or "line."
- **Avoid:** "Non-deterministic logic to systematize complex research" — opaque phrasing flagged in the resume audit. Use the concrete framing: "multi-step Claude agents with structured validation gates between each step."
- **The Cloudflare role ended in May 2026** as part of Cloudflare's reduction, which affected senior IC roles across the documentation team. The work Cody shipped is still in production.

## Pluralsight role specifics (2020-09 to 2022-04, ~1.5 years)

- **Title:** Technical Writer (started at A Cloud Guru, which Pluralsight acquired)
- Authored hands-on learning content for cloud and DevOps practitioners
- Covered AWS, Azure, GCP, Kubernetes
- Built scaffolded, task-based learning modules

## Earlier consulting (2018-01 to 2020-09, ~2.5 years)

- Self-employed under Cody Anthony Technical Writing Services
- Clients in SaaS, eCommerce, and private equity
- Information architecture and documentation lifecycle work for high-growth SaaS firms
- Transformed tribal knowledge into structured docs for startups

## Education

- **B.A., English (cum laude)** — Truman State University
- **Content Strategy Specialization** — Northwestern University
- **Programming and Development (Python, Java)** — Eastern Gateway Community College

## Prior interview activity (selected biographical facts)

- **Red Hat PM (ROSA team), Nov–Dec 2025:** Interviewed for a Product Manager – Technical role on the ROSA team. Received offer 2025-12-10. Declined in favor of remaining open to senior technical writing roles. Maintains a working relationship with the team. Useful context when the writer references their existing relationship with the Red Hat ROSA team.

## Canonical brand identity

- **Title:** Documentation Strategist (canonical), paired with "Senior Technical Writer" on the resume header for ATS compatibility
- **Three principles framework:** Docs-as-Product, Docs-as-Data, Jobs-to-Be-Done & Instructional Design
- **Three capability pillars:** Content Strategy, Documentation Systems, AI Workflows
- **Geographic location:** Georgetown, TX (Austin metro)
- **Remote preference:** Yes (primary)
- **Brand voice:** First person, present tense (past tense for retrospective claims), conversational professional register, no em dashes in prose, no "X, not Y" contrast framing

## Common overclaims to refuse

When generating writer-history content, refuse to write the following without explicit user confirmation that the claim is accurate. These are the patterns that have produced inaccuracies in prior drafts:

| Pattern | Why refuse | Use instead |
|---|---|---|
| "Founding writer for ROSA" | Cody joined ROSA post-GA, not at founding | "First AWS technical writer dedicated to ROSA after GA" |
| "From private preview through GA" applied to ROSA | This arc applies to EVS, not ROSA | "Founding lead writer for EVS, driving launch readiness from private preview through GA" |
| "Inherited a backlog" of AWS XML docs | He took on the migration program, not received transferred ownership | "Took on a backlog" or "Picked up the program" |
| AWS ROSA docs are Markdown | They are AsciiDoc, which Cody led the adoption of | "AsciiDoc" |
| "Wrote alongside Red Hat's technical writers" at AWS | The collaboration was structurally constrained; the AsciiDoc bridge was built to enable it | "Built the AsciiDoc bridge so Red Hat's writers could contribute" or similar |
| "Solution guide ecosystem" at Cloudflare | `ecosystem` is banned per ai-antipatterns | "Collection of cross-product solution guides" |
| "Non-deterministic logic to systematize complex research" | Opaque phrasing | "Multi-step Claude agents with structured validation gates" |
| Total years of experience as "designing content infrastructure" | The strategy/systems work started at AWS (~4 years), not the full 8 years | "8 years of technical writing experience" + separate claim about systems work |

## Self-check for fact-accuracy

Before submitting any content that references Cody's history:

- [ ] All employer + title + date claims match the table above
- [ ] No "founding writer" claim for ROSA
- [ ] No "preview through GA" claim for ROSA (only for EVS)
- [ ] No "inherited" or "took ownership transferred" claim for the AWS XML migration
- [ ] No "wrote alongside Red Hat's technical writers" overstatement
- [ ] No use of banned words from `ai-antipatterns` (ecosystem, leverage, robust, etc.)
- [ ] Years-of-experience claims are accurate to the kind of work (e.g., "8 years technical writing" not "8 years content infrastructure")
- [ ] Total years claim adds up if asserted (start date 2018-01)

## NDA and proprietary references

When generating content that touches on Cody's employment history, default to abstracting any of the following unless they're already publicly known:

- **Internal tools and codenames** at AWS, Cloudflare, or any prior employer. Even when Cody mentions them in a conversation, treat them as abstracted-by-default in published content.
- **Unreleased features or roadmap items** he was exposed to under privilege.
- **Specific customer names, contract terms, or revenue figures** unless from public press releases.
- **Internal organizational dynamics, leadership decisions, or sensitive personnel matters.**

**Safe to name** (no NDA concern):
- Public products and services (ROSA, EVS, OpenShift, AWS Marketplace, etc.)
- Open-source projects (AsciiDoc, DocBook, Pantheon, OpenCode, Claude, etc.)
- Tools and methodologies that are widely known
- Cody's own portfolio artifacts (his skills, his portfolio repo, his published case studies)
- Information already published in his resume or on his portfolio site

If unsure, abstract. The reputational cost of overclaiming or breaching is higher than the substance cost of using a generic description.

## Scope boundary

This skill covers:
- Verified work history and dates
- Role-specific accomplishment claims
- Common overclaims to refuse
- NDA and proprietary reference guidance

This skill does **not** cover:
- Voice and brand alignment → `personal-tone`
- Universal style banishments → `ai-antipatterns`
- Structural blog framework → `blog-post-framework`
- Pre-publish operational checks → `blog-checklist`

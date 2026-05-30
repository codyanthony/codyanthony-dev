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

## STAR stories

Detailed accomplishment narratives in Situation / Task / Action / Result format. Each story is tagged by theme and role for retrieval. These are the stories the agent should draw on when content needs a deep specific example (resume bullets, screening-call stories, blog post case-citations).

### Marketplace Integration Fix (AWS / ROSA, early 2023)

- **Theme:** Cross-org collaboration, revenue protection, partner-team influence
- **Situation:** Enterprise ROSA customers using AWS Organizations were blocked from accepting Private Offers due to a Marketplace API logic gap with License Manager entitlements. Revenue blocker threatening renewals. Multiple stakeholders across separate orgs (AWS Marketplace, License Manager, ROSA Product, Red Hat).
- **Task:** Secure renewals immediately while driving a long-term fix with Marketplace outside direct influence.
- **Action:** Designed a Guided Contract Flow in the ROSA Console with PM (Eric Chapman) and UX, abstracting Marketplace API complexity. Authored new "How Marketplace Works" content in ROSA User Guide. Proactively authored missing upstream content for the AWS Marketplace User Guide. Organized a Joint Technical Review with ROSA Product, Marketplace, License Manager — presenting a complete solution, not a request.
- **Result:** Unblocked pending contract renewals. Marketplace team prioritized roadmap item for entitlement-check automation. Marketplace team adopted Cody's content as their official guidance. Eric Chapman cited as example of "going beyond documentation to solve product problems."

### EVS HCX API Design (AWS / EVS, Q1–Q3 2025)

- **Theme:** Conflict mediation, technical taste, influencing engineering upstream
- **Situation:** During EVS HCX public connectivity development, Product proposed a single-purpose API to meet tight launch deadlines. Single-purpose violated AWS API design standards (backward compatibility forever); would create technical debt.
- **Task:** Influence the team toward extensible architecture without derailing launch.
- **Action:** Embedded in daily engineering syncs from Q1 2025 to be in-the-room participant during API design. Discovered VPC team was working on parallel infrastructure; surfaced to EVS. Framed discussion around AWS API design standards with trade-offs. Proposed extensible v1 scope supporting current HCX needs while leaving room for future parameters without breaking changes.
- **Result:** EVS adopted extensible API. Shipped HCX public connectivity on schedule September 18, 2025. Senior PM Andy Reedy said Cody "saw around corners and totally made this a better product."

### GovCloud / ITAR Compliance Discovery (AWS / ROSA, 2024)

- **Theme:** Risk + compliance, challenging assumptions, cross-company legal alignment
- **Situation:** ROSA was launching in AWS GovCloud (ITAR export-control regulated). Initial plan assumed no export-controlled data, so team planned to omit ITAR compliance documentation.
- **Task:** Move from trust-based assumption to verified compliance posture.
- **Action:** Engaged the Business Line Lawyer to facilitate a deep-dive with AWS Legal, Red Hat Legal, ITAR/FedRAMP teams. Discovery revealed ROSA's support telemetry architecture contained components that could collect and transmit export-controlled data outside GovCloud. Led secure documentation cycle with Legal and AWS/RH product. Aligned doc-placement strategy: publish in AWS GovCloud User Guide exclusively, behind access controls.
- **Result:** Converted unverified assumption into validated compliance posture before launch. Prevented potential ITAR violation. Became standard "trust but verify" framework for future ROSA GovCloud updates.

### ROSA QBR + 7-Tier Risk Model (AWS / ROSA, 2022–2023)

- **Theme:** Governance, prioritization framework, stopping randomization
- **Situation:** Documentation roadmap was constantly randomized — every feature request came in as P0. Service teams overrode doc priorities with "urgent" features. No shared framework for sequencing.
- **Task:** Establish a framework that prioritized documentation work by risk, not feature pressure.
- **Action:** Created a 7-tier risk model: Tier 1 Security/Trust (non-negotiable), Tier 2 Usability Blockers, Tier 3 Support Deflection, Tier 4 Strategic Campaigns, Tier 5 New Features. Established the first ROSA documentation Quarterly Business Review with product leadership. Presented the framework with concrete examples (Sev-2 IAM vulnerability ranked higher than feature 5% of customers would use). Framed as shared prioritization principles.
- **Result:** Stopped randomization. Model adopted as bar-raising standard across the org. Manager feedback: the QBR was "exemplary" and outperformed those written by actual Documentation Managers.

### Support Data Pipeline + DNS Forwarding Defect (AWS / ROSA, ongoing)

- **Theme:** Customer data, problem solving, ambiguity, building systems when standard approaches fail
- **Situation:** Standard customer feedback metrics (NPP) were statistically insignificant (<50 responses/quarter). Cody was flying blind on ROSA friction because customer journey happened primarily in Red Hat's platform, not AWS.
- **Task:** Engineer a way to measure customer experience without access to primary platform data.
- **Action:** Built a Support Intelligence Pipeline by negotiating access to joint AWS/Red Hat Support syncs. Manually analyzed raw ticket dumps to reconstruct user journey failures. Identified a hidden pattern: DNS forwarding failures in PrivateLink setup (appeared as user error in logs).
- **Result:** Presented analysis in QBR. Data so compelling that the service team paused sprint to prioritize the DNS bug fix. Established permanent feedback loop where Support data directly informs Product Roadmap.

### EVS Dual-Audience Documentation (AWS / EVS, 2024–2025)

- **Theme:** UX + cognitive load, multi-audience information architecture, defensive documentation
- **Situation:** EVS documentation served two audiences with opposing mental models: AWS architects who knew VPC but not VMware, and VMware admins who knew ESXi/NSX but not AWS. The risk wasn't explaining concepts — it was preventing confident mistakes where each audience incorrectly assumed they understood the other domain.
- **Task:** Build documentation that served both personas through translation layers, validating assumptions from each domain while teaching the unfamiliar one.
- **Action:** Shadowed AWS solution architects during customer calls to learn how they explained EVS to VMware admins. Studied VMware documentation to learn their mental models. Architected "translation layers" throughout the docs. For boot volume encryption, surfaced the limitation upfront in Getting Started with compliance framing (FIPS 140-2, FedRAMP) — "Fail Fast" principle to prevent customers from investing in an architecture that wouldn't meet their needs. For Security Groups, anticipated VMware admin muscle memory and redirected to Network ACLs (defensive documentation). For VPC Route Server, created a "Constraint Wrapper" pattern that pointed to upstream VPC docs while explicitly calling out EVS-specific requirements.
- **Result:** Documentation enabled independent first deployments for both personas. Reduced support escalations from common mistakes. Field solution architects validated the docs "accurately reflected their customer conversations."

### EVS Boot Volume Encryption Escalation (AWS / EVS, 2024–2025)

- **Theme:** Connective tissue across teams, customer advocacy, escalation handling
- **Situation:** During EVS technical reviews, Cody suspected a gap between bare metal host hardware constraints and AWS's enterprise security promise — risk of failing compliance certification for highly regulated customers.
- **Task:** Validate the suspected gap and remediate before market entry.
- **Action:** Set up deep-dive sessions with Engineering, Solution Architects, and Product. Confirmed VPC architecture lacked feature needed for end-to-end encryption to internal L2 data plane components. Leveraged AWS network to find an EC2 Networking engineer working on a planned VPC feature that would remediate the gap. Facilitated a sync between EVS Product Team and the EC2 SME to align roadmaps.
- **Result:** Compliance roadmap aligned across teams. Boot volume encryption limitation was documented upfront in Getting Started for the "Fail Fast" customer experience while engineering worked on long-term fix. Avoided launching with a hidden compliance blocker for federal customers.

### AsciiDoc Modernization at AWS (AWS / scale, 2022–2025)

- **Theme:** Scale, force-multiplier tooling, cross-vendor collaboration, AI-assisted automation
- **Situation:** Legacy DocBook XML at AWS blocked non-writer contributions and didn't fit modern AI workflows. AWS-side ROSA docs had no AsciiDoc precedent.
- **Task:** Modernize ROSA as the AsciiDoc pilot. Build reusable patterns for other AWS services.
- **Action:** Pioneered the AsciiDoc adoption at AWS with ROSA as the first continuously maintained AsciiDoc package. In 2025 built an AI-assisted Python migration toolkit using Claude (Cline). Treated AI like a junior engineer — explicit constraints ("transform structure only, never modify content"), Git-based review of diffs line-by-line, automated link/build validation. Converted GovCloud, Secret Region, Top Secret Region guides (296+ files in Q3 2025 alone, AWSLCKDocs pilot). Created XML Entity to AsciiDoc Attribute Conversion Pipeline (4-script system) and 10+ automation scripts. Authored the Documentation Ownership Runbook to enable non-writer contributions via Git-based workflows. Built the cross-vendor collaboration channel with Red Hat that the AEM Guides migration has now closed.
- **Result:** Conversion time went from days to hours per file. Patterns adopted by EKS and 6 SAP guides as org-wide standard. EKS non-writer contribution rate went from under 1% to 25%. Engineers averaged 15-20 PR contributions per quarter.

### EVS HCX Public Connectivity Launch (AWS / EVS, Q3 2025)

- **Theme:** Cross-service technical research, launch coordination, multi-deliverable management
- **Situation:** Year-long EVS HCX public connectivity feature ready to ship. Documentation needed to span 8+ AWS services (VPC, IPAM, Service Quotas, EIPs, VLANs, Transit Gateways, Direct Connect, Site-to-Site VPN, VMware HCX), plus EVS user guide, API reference, and CloudFormation docs.
- **Task:** Deliver coordinated multi-surface documentation on the launch timeline.
- **Action:** Conducted cross-service technical research across the 8+ services. Coordinated multi-deliverable updates (Getting Started rewrite, Migration guide with public-vs-private comparison, new HCX public connectivity page, console help panel, API reference updates, CloudFormation updates). Provided UX design review and UI text improvements for the new console experience. Organized multiple rounds of technical reviews with product and engineering teams.
- **Result:** Shipped September 18, 2025, on schedule. Quantified deliverables: comprehensive Getting Started rewrite, new HCX public connectivity page, console help panel, API + CloudFormation updates.

### TCXKeystone Enhancement for AsciiDoc IAM Policy Documentation (AWS, Q3 2025)

- **Theme:** Tooling, automation, cross-format compatibility
- **Situation:** TCXKeystone package (AWS internal docs tooling) lacked AsciiDoc support for automated IAM policy documentation. NAPS (policy review) workflow was manual and inconsistent.
- **Task:** Add AsciiDoc support to TCXKeystone for automated IAM policy documentation.
- **Action:** Enhanced TCXKeystone with NAPS prompt chain for policy validation, analysis, and automated documentation generation for AsciiDoc files containing IAM policies. Built cross-format compatibility (works with both AsciiDoc and XML).
- **Result:** Automated managed policy updates for 5 releases in Q3 2025 (4 for ROSA, 1 for EVS). Eliminated repetitive formatting and content generation tasks. Standardized managed policy documentation format across packages.

### Shared Responsibility Matrix (AWS / ROSA, prior)

- **Theme:** Ambiguity resolution, cross-company legal alignment, definitive reference creation
- **Situation:** ROSA Shared Responsibility Matrix was vague — boilerplate didn't mention AWS by name; didn't clearly delineate infrastructure (AWS) from platform (Red Hat) ownership. Liability risk for both companies; practical confusion for customers.
- **Task:** Drive a complete rewrite protecting both companies from liability and clarifying customer obligations.
- **Action:** Organized working group across AWS Product Leadership, Red Hat SREs, AWS Legal, Red Hat Legal. Facilitated 7 rounds of review cycles. Drafted explicit responsibility breakdown: AWS (EC2, VPC, IAM, underlying infra), Red Hat (Control Plane, SRE monitoring, OpenShift platform updates), Customer (Application code, data, user access).
- **Result:** Published legally vetted, technically precise Shared Responsibility Matrix as the definitive ROSA reference. Reduced "who do I call for X?" support tickets. Became go-to reference for sales teams discussing compliance with enterprise buyers.

### ROSA Prerequisites Automation + Day 1 Help Panels (AWS / ROSA, Q3–Q4 2022)

- **Theme:** Building new capabilities, console UX, cross-company collaboration, learning new skills
- **Situation:** AWS preparing to launch a new ROSA console experience. Before this, customers manually verified AWS account prerequisites across multiple consoles. All ROSA docs lived exclusively on Red Hat's site — AWS customers expected getting-started info in the AWS ROSA User Guide on docs.aws.amazon.com but it didn't exist.
- **Task:** Design and create integrated Day 1 experience spanning the new console AND AWS-native documentation. Learn console UX writing as a new skill.
- **Action:** Took UX writing courses, studied AWS console best practices and the Polaris design system, learned to work in weekly design workshops with PM, UX, Console Developer, Front-End Engineer. Created 6 contextualized help panels from scratch (ROSA Enablement, Verify Prerequisites, Service Quotas, ELB Service-Linked Role, AWS Account Requirements, AWS and Red Hat Account Connection). Created comprehensive Getting Started documentation (landing page, Set Up Prerequisites, CLI cluster creation, PrivateLink deployment). Coordinated with Red Hat writers on terminology consistency.
- **Result:** Coordinated console + documentation shipped on schedule Q4 2022 — ROSA's first complete AWS-native enablement path. Pattern became template for subsequent ROSA console work including 2023 HCP launch.

### "Enable ROSA" Console Branding Fix (AWS / ROSA, prior)

- **Theme:** GTM intuition, product sense, AWS-native value prop alignment
- **Situation:** Console button said "Enable OpenShift," which broke the AWS-Native value proposition for ROSA. Customers couldn't tell if they were buying an AWS service or Red Hat software.
- **Task:** Fix the strategic misalignment.
- **Action:** Recognized the misalignment. Drove the change to "Enable ROSA" with integrated billing microcopy.
- **Result:** Reduced onboarding confusion. Aligned product UI with go-to-market strategy.

### Contract "Receipt" Design (AWS / ROSA, prior)

- **Theme:** UX intervention, reducing cognitive load, point-of-sale design
- **Situation:** ROSA console cost display was scattered across tabs — no consolidated summary at point of sale. Customers hesitated to buy because they couldn't see the total.
- **Task:** Reduce cognitive load at the point of sale.
- **Action:** Proposed a "Read-Only Receipt" pattern — static summary panel aggregating all selected costs, mimicking e-commerce checkout. Pitched to UX/Eng as a "trust feature" rather than just a UI detail. Wrote microcopy for line items matching exact AWS bill fields.
- **Result:** Adopted as standard for ROSA console. Simplified purchasing decision. Reduced support tickets about billing confusion.

### EVS Private Preview Scope Negotiation (AWS / EVS, 2024)

- **Theme:** Scope management, MVP discipline, critical path
- **Situation:** Fixed launch date for EVS Private Preview. Team wanted 28 help panels plus full docs.
- **Task:** Define MVP without missing deadline.
- **Action:** Negotiated scope down to 11 critical help panels (foundational vs supplemental). Moved the rest to "GA Fast Follow" backlog.
- **Result:** Hit deadline with high quality. Enabled successful customer migrations during preview.

### KMS Procurement Analysis (Freelance, pre-AWS)

- **Theme:** Stepping outside comfort zone, customer obsession, learning under pressure
- **Situation:** While freelancing, COO of a private equity firm client urgently paused a Confluence-to-KMS migration project mid-way through because the chosen KMS wasn't meeting business requirements. He needed a procurement recommendation within a week.
- **Task:** Cody had never led a procurement analysis before. Recommend an optimal KMS solution.
- **Action:** Questioned client on business requirements and employee needs. Gathered data on KMS features that mattered to client, prioritized them. Conducted product research, cross-checked against feature list, eliminated options. Self-taught a rudimentary cost-benefit analysis methodology. Presented findings in a structured presentation.
- **Result:** COO highly satisfied with the recommendation. Scheduled product demo with the chosen vendor and invited Cody to attend. Validated that customer obsession + willingness to learn outside comfort zone produces results.

### ROSA Documentation Practice Establishment (AWS / ROSA, May–June 2022)

- **Theme:** Building from zero, process design, onboarding, operating at level before having the title
- **Situation:** When Cody joined as the first AWS technical writer dedicated to ROSA (post-GA), there was no AWS-side ROSA documentation practice — no intake mechanism, no project management, no documented process.
- **Task:** Stand up the practice in the first weeks.
- **Action:** Over roughly 5 weeks, set up the original ROSA doc team practices: two foundational wiki pages (ROSA Documentation Team Info; ROSA Technical Documentation Process), a SIM-based intake mechanism, and Asana for project management. Trained on AWS-internal docs/broadcast tooling. Onboarded by mentor Monica Renneke (mrenneke).
- **Result:** Established the operating model the dedicated ROSA documentation practice ran on. The work mapped to Principal-level criteria across the leveling-guide categories (ambiguity, scope of influence, execution, impact, technical complexity).
- **Source:** 2022 Summary of Doc Projects.

### AWS–Red Hat Cross-Vendor GitHub Repo (AWS / ROSA, 2022)

- **Theme:** Legal/security navigation, cross-org enablement, governance
- **Situation:** No approved mechanism existed for AWS and Red Hat to collaborate on ROSA docs in a shared repo. The closed XML toolchain was the wall between the two companies' writers.
- **Task:** Establish a legally and security-approved private GitHub collaboration repo.
- **Action:** Drove the legal proposal; shepherded the AppSec review (approved 10/13/22) and OSPO review (approved 10/3/22); drafted GitHub admin / user / outside-collaborator runbooks. Worked with BLL Stevin George (then successor Caroline Bercier), IP attorney Lauren Hocket, ETSL legal Dan Mensonides, AppSec reviewer Bolaji Agunbiade, Security Guardian Ganesh Jangir, and OSPO reviewers Matt Bullock and Henri Yandell.
- **Result:** Created the cross-vendor collaboration channel that later ROSA AsciiDoc work flowed through. This is the structural groundwork behind the AsciiDoc bridge story.
- **Source:** 2022 Summary / Q1 2023.

### ROSA Content Strategy v2.0 (AWS / ROSA, Aug–Sept 2022)

- **Theme:** Content strategy, executive alignment, cross-company ownership negotiation
- **Situation:** No agreed model for where ROSA docs should live (AWS-hosted vs. Red Hat-hosted).
- **Task:** Define a content strategy and secure cross-company alignment.
- **Action:** Drafted the strategy in AWS 6-pager format. Reached alignment on 11/9/22 that ROSA docs would be AWS-hosted primary. Red Hat senior director of global product management Andrew Cathrow requested a Venn diagram of ownership to formalize the boundary.
- **Result:** Established the AWS-hosted-primary direction for ROSA documentation. Praised by ROSA product leadership (see Recognition: Ike Arias, Eric Chapman, Isaac Huben).
- **Source:** 2022 Summary.

### ROSA International Trademark-Risk Investigation (AWS / ROSA, late 2022–early 2023) — *[abstracted: market and legal specifics generalized]*

- **Theme:** Risk identification, legal escalation, brand protection
- **Situation:** Red Hat was hosting AWS-branded ROSA content in a regulated international market in a way that created a trademark / brand-protection exposure for AWS.
- **Task:** Identify, escalate, and drive mitigation.
- **Action:** Identified the exposure; escalated to AWS Legal (Caroline Bercier); drove Red Hat to implement a mitigation plan to identify and migrate the affected regional sites.
- **Result:** Converted an unmanaged brand/legal exposure into a tracked mitigation plan. *(Specific market and legal-process details abstracted for this skill.)*
- **Source:** Q1 2023.

### Asana Adoption Workshops (AWS / container services docs, Mar–Apr 2023)

- **Theme:** Teaching, process improvement, tooling adoption
- **Action:** Taught the AWS container services documentation team to use Asana for project management across three workshops (with Jay Carlson, Keerat Verma, Paul Gasca).
- **Result:** Standardized project-management tooling for the doc team's roadmap.
- **Source:** Q1 2023.

### ROSA HCP Console Integration (AWS / ROSA, Q1–Q2 2023)

- **Theme:** Console UX, cross-company terminology alignment, design review
- **Situation:** The ROSA service team was building the new ROSA-with-HCP console billing experience (HCP = leaner topology with the control plane in a Red Hat AWS account, ~10-minute provisioning vs. ~40 minutes for ROSA classic).
- **Task:** Deliver the console UI text and align terminology across AWS and Red Hat.
- **Action (2/13–5/24/23):** UI text and design review in weekly meetings with PM Eric Chapman, UX designer Kana Eiref, and console developers Arti Balwadkar and Nathan Foster. Brokered the AWS↔Red Hat agreement to adopt "ROSA with hosted control planes" as the official topology name. Rewrote UI text for the 6 states of the ROSA Enablement card. Identified terminology inconsistencies between AWS and Red Hat and drove a parallel project to fix the Red Hat documentation terminology.
- **Result:** Smooth UX review and approval; shipped the HCP console experience. Pattern reused for later ROSA console work.
- **Source:** Q2 2023.

### ROSA Purchasing Console / Polaris Compliance (AWS / ROSA, Q1 2023)

- **Theme:** Design-standards advocacy, scope expansion, challenging PM/UX
- **Action:** Challenged AWS UX and PM on a procurement modal that violated Polaris design patterns; succeeded in expanding the scope to a proper UX Sign-Off and Fit n' Finish review.
- **Result:** Higher-quality purchasing UX and a precedent for design rigor on the console. (Related to the Contract "Receipt" design.)
- **Source:** Q1 2023 / Q4 2023.

### AWS–Red Hat Joint Technical Review Process (AWS / ROSA, 2023)

- **Theme:** Process definition, quality governance, cross-org alignment
- **Situation:** ROSA docs spanned two companies with no joint review process, creating AWS quality risk in content owned across both orgs.
- **Task:** Define and operationalize a joint AWS + Red Hat technical review process.
- **Action:** Defined and documented the process; led the discussion across multiple weekly doc meetings; presented a proof of concept ("How ROSA works with AWS Marketplace" AWS deep-dive). Built during the ROSA security-chapter work.
- **Result:** Adopted as the joint review process. Red Hat PMs said the AWS deep-dive approach fostered better cross-org alignment.
- **Source:** Q2 / Q3 / Q4 2023.

### Slack Connect Cross-Org Channel (AWS / ROSA, 2023)

- **Theme:** Tooling, removing collaboration friction, security-aware decision-making
- **Situation:** AWS used single-channel guest access into Red Hat's Slack; access expired every 90 days and depended on Red Hat's 2-year data retention. Red Hat's only approved roadmapping tool (Trello) was being deprecated.
- **Task:** Establish durable, AWS-approved cross-org collaboration tooling.
- **Action:** Researched and compared options in a tooling analysis doc; proposed Slack Connect (#ext-rosa-docs) in the AWS External workspace as an AWS-approved alternative to guest access. On 7/10/23 Red Hat accepted. Membership grew to the full AWS + Red Hat doc team, PMs, and adjacent Red Hat doc teams (OCP, OKD).
- **Result:** Eliminated the 90-day expiration and the Red Hat-retention dependency; created a central cross-org knowledge repo. Red Hat writer Eric Ponvelle was supportive of the new channel.
- **Source:** Q2 2023 (tooling implementation plan) / Q4 2023.

### EKS AsciiDoc Conversion Partnership (AWS / EKS, Q3 2024)

- **Theme:** Scale, force-multiplier tooling, cross-team enablement
- **Action:** Partnered with EKS writers Paul Gasca and Geoffrey Cline (plus Donovan Finch and Chris Negus) on the EKS conversion strategy. Manually converted L1 TOC pages; set up a validation testing environment inside the ROSA AsciiDoc package shared with the EKS team so both teams could test bug fixes against each other's packages; documented AsciiDoc best practices for AWS writers; ran AsciiDoc workshops for Paul Gasca. Led a TCX engineering engagement (with Brad Yamauchi) to add Region-specific entity support for AsciiDoc — the AsciiDoc equivalent of a region-scoped ARN entity, introduced 6/26/24.
- **Result:** Validated the EKS conversion path and produced reusable AsciiDoc tooling and best-practices for AWS writers.
- **Source:** Q2 / Q3 2024.

### ROSA Scenario-Based Refactoring + AsciiDoc Tablist (AWS / ROSA, Q3 2024)

- **Theme:** Information architecture, eliminating duplication, format innovation
- **Action:** Refactored ROSA content around scenarios using AWS-internal docs tooling, eliminating 4 pages of duplication. Pioneered the first AWS implementation of AsciiDoc tablist syntax.
- **Result:** Approved by reviewer Debbie Brown on the first pass with no rework.
- **Source:** Q3 2024.

### Support-Data Prioritization Matrix + Q3 2024 QBR (AWS / ROSA, Q3 2024)

- **Theme:** Data-driven prioritization, executive communication
- **Action:** Spearheaded a new prioritization matrix for ROSA documentation derived from support-case data; presented it in the Q3 2024 ROSA doc QBR.
- **Result:** ROSA GM Ike Arias described the priorities as "crisp and easy to understand." Manager Samantha Lindsey-Ahmed called it bar-raising and on par with the exemplar QBR samples created by management. (Quotes in Recognition.)
- **Source:** Q3 2024.

### EVS PM-Tooling Influence (AWS / EVS, Q1 2025)

- **Theme:** Influence, process improvement, leading by template
- **Action:** Influenced the EVS product team to replace quip-based project management with Asana; built the docs team's Asana project as a template. The EVS product team built their own within weeks.
- **Source:** Q1 2025.

### EVS Service Quotas Integration Influence (AWS / EVS, Q1–Q2 2025) — *[abstracted: internal Service Quotas system name generalized]*

- **Theme:** Drawing on prior product experience to de-risk an engineering decision
- **Action:** Surfaced customer-experience and scalability risks of custom Service Quotas logic, drawing on ROSA experience. Drove the decision to onboard EVS to AWS's standard centralized Service Quotas integration path rather than custom logic — partial onboarding in Q1 2025, full onboarding in Q2 2025.
- **Result:** Avoided a custom-logic CX/scalability trap by steering the team to the standard integration. *(Internal Service Quotas backend name abstracted for this skill.)*
- **Source:** Q1 2025.

### SAP Guides AsciiDoc Conversion / Self-Serve Model (AWS / SAP, Q1–Q2 2025)

- **Theme:** Cross-team enablement, proving the self-service model, accessibility
- **Action:** Converted 5 Zonbook user guides for the SAP team; made accessibility improvements to tables and to regulated-region (Beijing / Ningxia) content. Operated a self-serve model where the SAP team did the conversion with Cody's guidance rather than Cody doing it for them.
- **Result:** SAP team adopted the model; SAP's first SA contributor (Ferry Mulyadi) confirmed on 5/14/25 that the self-serve publishing model works. Enthusiastic shoutouts from the SAP team (Nerys Olver, Guilherme Felix — quotes in Recognition).
- **Source:** Q1 / Q2 2025 + AWS shoutouts.

### Secure Private-Preview Doc Hosting + Self-Authored Threat Model (AWS / EVS, Q4 2024) — *[abstracted: internal build-tool names generalized]*

- **Theme:** Stepping outside the writer lane, security ownership, reusable infrastructure
- **Situation:** AWS private-preview docs were delivered as emailed PDFs — less usable than web content and a security concern. TCX had no secure web-hosting baseline for pre-release docs.
- **Task:** Build a secure, reusable web-hosting solution for private-preview user guides.
- **Action:** Architected a solution using AWS Amplify, a managed source repo, custom Node.js, AWS Certificate Manager, Route 53, KMS, and internal AWS build tooling (names abstracted). Hardened it per AppSec best practices: HTTPS-only, custom HTTP headers and a content security policy, Amazon-vended npm packages, least-privilege access controls, TLS on all connections, DMARC DNS records, and 90-day KMS credential rotation. Wrote the threat model himself and presented it in AppSec review. Piloted the solution for the EVS private preview at re:Invent 2024.
- **Result:** Secured AppSec approval as a reusable secure baseline for future pre-release deployments TCX-wide. Manager Samantha Lindsey-Ahmed noted that writing and presenting a threat model is "typically outside of a tech writer's field of expertise." (Quote in Recognition.) *(Internal build-tool names abstracted for this skill.)*
- **Source:** Q4 2024.

## Recognition

Documented praise from leaders, peers, and partners. Use these for credibility framing in resumes, screening calls, or any context where social proof strengthens a claim. Sources cited.

### Verbatim quotes

- **Andy Reedy (Senior PM, AWS):** "[Cody] saw around corners and totally made this a better product." — On EVS HCX API design contribution (CF interview master playbook + Q3 2025 quarterly summary).
- **npepin (AWS Sr programmer writer):** "I'm currently observing the DynamoDB TPM responsible for FFZ reviewing all of DynamoDB's features and verifying their availability in LCK/FFZ. They're addressing content that needed updates for quite some time. We've been referencing deprecated products that were removed from our service list long ago. The PMs have approved the new wording, and an SDE will update the page today. We will end up with the most accurate, current, and reliable content we've ever had on this page. I truly believe our layer wasn't adding value in this process—so glad we are reclaiming that time." — On the AsciiDoc conversion enabling service-team ownership of content (Q3 2025 quarterly summary, Slack thread cited).
- **Andy Reedy (Senior PM, AWS / EVS):** "Seriously man, you have done incredible work. Please let me know when you're up for promo. I'd love to be a feedback provider." and "You have a gift, man. You've seen around corners and totally made this a better product." — On EVS private- and public-preview performance, 6/3/25 (Q2 2025 quarterly summary; fuller context for the "saw around corners" quote already cited above).
- **Samantha Lindsey-Ahmed (AWS docs manager):** "Great meeting! I learned a lot. And very brave of you to write up the threat model and present, when it is typically outside of a tech writer's field of expertise." — After the AppSec review of the Amplify private-preview web-hosting solution, 10/17/24 (Q4 2024 quarterly summary).
- **Samantha Lindsey-Ahmed (AWS docs manager):** "I checked in with Kiran about the progress on the docs side for EVS, and he shared how pleased he is with everything you've been accomplishing. Excellent work—I'm proud of your efforts and the impact you're making!" — Relaying EVS PM Kiran Sundar, 11/22/24 (Q4 2024 quarterly summary).
- **Kiran Sundar (EVS PM, AWS):** "thanks to you too. Great job with all the attention to details on the console text." — After EVS console Fit n' Finish approval, 11/14/24 (Q4 2024 quarterly summary).
- **Katie Cumming (AWS technical editor):** "Great job in making this content clear, clean, and easy to go through! The getting started content looked very thorough. I felt like you were especially clear in how you wrote about the various services and roles and how they integrate with Amazon EVS." — After editorial review of the EVS user guide, 11/29/24 (Q4 2024 quarterly summary).
- **Eric Chapman (ROSA PM, AWS):** "Looks good to me Cody! Thanks for turning this around so quickly." — On final ROSA-with-HCP launch doc updates, 11/29/23 (Q4 2023 quarterly summary).
- **Eric Chapman (ROSA PM, AWS):** "Great work! Congrats [team], all of the hard work you put in really reflected well in the review!" — After the ROSA console Fit n' Finish review approval, 11/16/23 (Q4 2023 quarterly summary).
- **Eric Chapman (ROSA PM, AWS):** "Just read through the wiki. This is excellent. Very clear." (5/20/22, on the ROSA tech doc process wiki) and "Strong doc overall!" (6/14/22, on the ROSA content strategy) — 2022 Summary.
- **Ike Arias (ROSA GM / PMT, AWS):** "Very clear and well-written goal and background sections. Great job on the research for ROSA's business problem. Very thorough and well-researched." — On the ROSA content strategy doc, 8/18/22 (2022 Summary).
- **Ike Arias (ROSA GM / PMT, AWS):** "Wow! Excellent! Thanks for the super quick turnaround Cody!" — On the task to make /rosa the canonical URL path for the ROSA User Guide, 12/6/23 (Q4 2023 quarterly summary).
- **Samantha Lindsey-Ahmed (AWS docs manager):** "Your proposed content strategy for ROSA is impressive — I hope it got the visibility it deserves." (12/11/23, Q4 2023 summary) · "Just finished reading the final draft of the ROSA QBR: very nice — clean and focused and clear. Nice job!" and "Great job on the QBR! It went smoothly and served its purpose to align docs and the service team. Also a reminder that leading QBRs for your service team is bar raising!" (8/5/24, Q3 2024 summary) · "It did, and it is great that you are holding your own QBRs — it is bar raising!" (6/4/24, after the Q2 2024 ROSA doc QBR).
- **Monica Renneke (AWS onboarding buddy / mentor):** "I'm so proud of you and very impressed with all of your drive and abilities." (7/27/22) and "You've done very well in gathering and understanding our resources, general practices and innovating with the service team and the ROSA team. I'm so impressed with how well you're managing everything and moving forward!" (6/28/22) — 2022 Summary.
- **Stevin C. George (AWS ROSA BLL):** "I've appreciated your proactive nature in addressing ROSA's long-term needs. I think we all could learn a lesson from your actions." — 6/30/22 (2022 Summary).
- **Isaac Huben (ROSA editor, AWS):** "I'm no content strategist — impressive!" — 5/24/22 (2022 Summary).
- **Dan Mensonides (AWS ETSL legal):** "thanks for the quip doc with all the background. super helpful." — 6/10/22 (2022 Summary).
- **Tom Gilman (AWS TPM):** "Thank you @codymant, this is super helpful and much appreciated." — After an AsciiDoc setup discussion, 9/24/24 (Q3 2024 quarterly summary).

### Paraphrased feedback

- **Eric Chapman (ROSA PM, AWS):** Cited Cody's Marketplace integration work as an example of "going beyond documentation to solve product problems" (CF interview master playbook).
- **Cody's manager at AWS:** Feedback that the ROSA QBR Cody created was "exemplary" and outperformed those written by actual Documentation Managers (Modular interview master playbook).
- **Field solution architects (AWS):** Validated that EVS dual-audience documentation "accurately reflected their customer conversations" (CF interview master playbook).
- **Modular interview team (Jan 2026):** Extended a Senior Technical Writer offer following technical and culture interviews (declined by Cody in favor of accepting the Cloudflare offer).
- **Red Hat ROSA PM team (Dec 2025):** Extended a Product Manager – Technical offer on 2025-12-10 following multi-round interviews. Hiring manager Abhishek Gupta advocated for Cody throughout the process. Declined by Cody in favor of remaining open to senior technical writing roles.
- **Monica Renneke (AWS mentor):** Early in Cody's tenure (5/4/22), implied his talent for addressing project-management issues would make him suitable for a PM role (2022 Summary).
- **Eric Chapman (ROSA PM, AWS):** In a 6/17/22 meeting, complimented that Cody had already demonstrated significant expertise and made invaluable contributions to ROSA, with strategic vision that highlighted operational components needing improvement (2022 Summary).
- **Ike Arias (ROSA GM, AWS):** Q3 2024 — liked how clearly the priorities were laid out; described the QBR section as "crisp and easy to understand" (Q3 2024 quarterly summary).
- **Austin Quam (AWS security solution architect):** 5/3/23 — invited Cody to present their joint ROSA security-docs work at his team's Austin, TX offsite; spoke highly to his team about Cody's contributions and the impact of the partnership on the ROSA service and customers (Q2 2023 quarterly summary).
- **Eric Ponvelle (Red Hat ROSA writer):** Q3 2023 — expressed approval of the new cross-org ROSA docs Slack Connect channel Cody set up (Q2/Q3 2023 quarterly summaries).
- **Ferry Mulyadi (SAP service team SA, AWS):** 5/14/25 — as SAP's first SA contributor, confirmed that the self-serve AsciiDoc publishing model works ("the process works!") (Q2 2025 quarterly summary).
- **Will Garcia (AWS partner solution architect):** 6/13/23 — very pleased with the quality and speed (less than a week) with which Cody updated AWS docs and drove parallel Red Hat changes to resolve a customer pain point rooted in inaccurate documentation and complex dependencies (Q2 2023 quarterly summary).

### AWS shoutouts (transcribed)

Transcribed from the 12 image-based screenshots in `/home/cody-anthony/Desktop/OneDrive/Job Hunt/Shout-outs`. These are verbatim accolades from the AWS internal recognition tool. (Note: several other screenshots in that directory are shoutouts Cody *sent* to colleagues — Eric Chapman, Austin Quam, Isaac Huben — and are recorded under Cross-functional relationships, not here.)

- **Cindy House (TCX, 10/8/25):** "Kudos for being an outstanding TCX collaborator in September 2025! Your work in auditing, reorganizing, and redesigning the AWS Docs wiki has given our service team partners a core resource for support, which is critical in helping our organization evolve. Thank you for helping TCX work better together!" *(Earn Trust, Deliver Results.)*
- **Jill Shaheen Clark (TCX Service Docs, 10/2/25):** "Thank you for volunteering for the Service Docs (SD) Wiki Refresh initiative! Thanks to you, we reviewed over 2,000 wiki pages to consolidate content and improve procedures, significantly enhancing search, discovery, navigation, and the authoring experience for all of our doc owners. You exemplify the power of teamwork and a shared vision, and will have a lasting impact on the way we manage and deliver our service documentation. You are a testament to the exceptional talent and collaborative spirit within TCX Service Docs!" *(Ownership, Bias for Action, Insist on the Highest Standards.)* Comments — Samantha Lindsey-Ahmed: "This was a large-scale effort that landed cleanly, which speaks to how well it was executed." Janis Gray: "Thanks to everyone for getting this done — I know it was a huge undertaking and you all were able to Deliver Results!"
- **Nerys Olver (SAP team, 4/24/25):** "Huge thanks Cody for going above and beyond to help us transform our SAP documentation to AsciiDoc! Despite this not being your primary role, you've been incredibly responsive in fixing conversion errors, providing clear guidance and diving deep into complex formatting challenges. This conversion will make our documentation more accessible and easier to maintain — setting us up for more frequent and collaborative updates which will help us to earn trust with SAP Customers. Thanks for your support Cody. We appreciate it!" *(Invent and Simplify, Dive Deep.)*
- **Guilherme Felix (SAP team, 4/24/25):** "Cody went above and beyond on the SAP documentation migration to AsciiDoc. He supported our team in every single turn along the way, and raised the bar at every task. Kudos!"
- **Samantha Lindsey-Ahmed (3rd work anniversary, 4/4/25):** "Happy work anniversary, Cody! Your ownership, innovation, and persistence this past year, from aligning leadership and resolving complex cross-team issues to delivering high-visibility goals and prototyping scalable solutions, have made a huge impact." *(Ownership, Invent and Simplify, Customer Obsession.)*
- **Cindy House (TCX, 12/10/24):** "Kudos for being an outstanding TCX collaborator in November 2024! Your help in simplifying Solutions documentation was a critical step in smoothing out the transition of ownership to their engineering team. Thank you for helping TCX work better together!" *(Earn Trust, Deliver Results.)*
- **Samantha Lindsey-Ahmed (2-year anniversary, 3/28/24):** "Congratulations, Cody, on reaching your 2-year 'Amaversary!' I admire your knack for delving into the heart of problems, your relentless focus on customer experience, and your integrity in ensuring our actions align with customer interests. Your innovative approach, deep understanding of content strategy, consistent preparedness, and meticulous attention to detail elevate our collective performance. I am thankful to have you on board. Here's to your continued success!" *(Customer Obsession, Invent and Simplify, Insist on the Highest Standards.)*
- **Geoffrey Cline (AWS writer, 12/8/23):** "Cody completed a very impressive content inventory and audit for ROSA. This required working with many partners (including external) and analyzing data across documentation systems. He built and executed this strategy with limited resources. It transformed the ROSA documentation." *(Dive Deep, Ownership.)* Comment — Samantha Lindsey-Ahmed: "It's very impressive!"

## Technical domain expertise

Organized by depth. Use for matching against JD keywords during resume tailoring and for technical accuracy during drafting. Sources: CF interview master playbook, Modular interview master playbook, RH tech domain knowledge doc, quarterly summaries, portfolio case studies.

### Deep — daily working knowledge, can teach or lead

| Domain | Specifics |
|---|---|
| AWS core services | VPC, IPAM, Service Quotas, EIPs, VLANs, Transit Gateways, Direct Connect, Site-to-Site VPN, EC2, IAM (Role vs Policy), CloudFormation, Route 53, ELB (Service-Linked Roles), Security Groups vs Network ACLs, AWS Marketplace + License Manager, NAT Gateway, PrivateLink, OIDC, EBS (gp2/gp3), CSI Driver, AWS Amplify, AWS GovCloud |
| Kubernetes core | Pod, Node, Cluster, Control Plane, Data Plane, kube-apiserver, etcd, kube-scheduler, kube-controller-manager, kubelet, kube-proxy, Container Runtime |
| OpenShift differentiators | Operators (Day 2 automation), Routes vs Services, Namespaces vs Projects, Security Context Constraints, integrated console, integrated monitoring (Prometheus/Grafana), OTA updates |
| ROSA architecture | Classic (Control Plane in customer AWS account, ~40 min provisioning) vs HCP (Control Plane in Red Hat AWS account, ~10 min provisioning), Multi-AZ, STS, BYO-VPC |
| VMware infrastructure (EVS) | ESXi, NSX, HCX, Direct Connect, vSphere migration patterns, network architecture for VMware-on-AWS |
| Documentation formats | AsciiDoc (deep), DocBook XML (deep — led migration away from), Markdown / MDX, DITA (familiar — Red Hat is migrating to this) |
| Documentation tooling | AsciiDoctor build chain, Vale linter, Pantheon (Red Hat OSS publishing — now being deprecated), GitHub-based docs-as-code workflows, AWS internal: ZonBook, TCXKeystone, AWSLCKDocs |
| AI / LLM tooling | Claude (deep — primary collaborator), Cline (deep — used for migration tooling at AWS), OpenCode (deep — used for CF agentic workflows), Codex (working), prompt engineering, agentic workflow design with structured validation gates, MCP (Model Context Protocol) |
| Web stack (portfolio) | Astro (deep — site rebuild on plain Astro), Starlight (working — used in first portfolio iteration), Cloudflare Workers Static Assets, Cloudflare Pages, wrangler, Cloudflare DNS, MDX |
| Compliance + regulated environments | ITAR export control, FedRAMP, FIPS 140-2, GovCloud, regulated/air-gapped AWS regions, Secret Region, Top Secret Region |
| Methodologies | Docs-as-Code, Docs-as-Product, Docs-as-Data, Jobs-to-Be-Done (JTBD), Information Architecture (IA), Content modeling, Modular documentation, Agile, structured content schemas (JSON/YAML), self-service contribution governance |

### Working — comfortable, productive, can ramp quickly

| Domain | Specifics |
|---|---|
| Languages | Python (working — built XML-to-AsciiDoc migration toolkit, automation scripts, OG image generation), JavaScript / Node.js (working — portfolio site work), reads Rust and C++ fluently enough for documentation purposes |
| Frontend frameworks | React, Vite (used in AWS private preview portal CI/CD) |
| Console UX patterns | AWS Polaris design system, help panel patterns, console flow design, microcopy |
| Cloud platforms beyond AWS | Azure, GCP (Pluralsight era — labs and learning content across all three), Cloudflare developer platform (Workers, Pages, R2, D1) |
| Containerization | Docker, container image patterns |
| Infrastructure-as-Code | CloudFormation (deep at AWS), reads Terraform fluently |

### Familiar — read fluently, can document with engineering support

| Domain | Specifics |
|---|---|
| Mojo | Familiar from Modular interview prep; comfort with the Python superset story |
| ML / AI infrastructure | Kubernetes-native AI workload orchestration patterns (Mammoth-shaped), model deployment patterns, inference servers |
| Adobe Experience Manager Guides | Familiar from the Red Hat ROSA opportunity research; understands as the CCMS Red Hat is migrating to |
| Tridion, MadCap Flare, Paligo, Heretto, IXIASOFT | Familiar as CCMS landscape; not personally used |

## Cross-functional relationships

Named colleagues with role + product context + relationship history. Useful for resume framing ("partnered with PM / UX / security / Red Hat counterparts"), for screening-call name-dropping where appropriate, and for warm-intro angles in active job pursuit.

### AWS partners

| Name | Role at the time | Product | Relationship |
|---|---|---|---|
| Eric Chapman | ROSA PM | ROSA | Day-to-day PM partner. Cited Cody's Marketplace work as "going beyond documentation to solve product problems." |
| Andy Reedy | Senior PM | EVS | EVS PM partner. Quoted: "saw around corners and totally made this a better product." |
| Andrew Jones | Documentation manager | ROSA (Red Hat side) | Long-standing cross-vendor counterpart on the Red Hat side of ROSA. Now at Red Hat as Manager, Content Services. Mutual connection cited in the May 2026 inbound from Chanda Pittman. Cody holds him in high regard. |
| mhirayam | Senior TPM | AWS Special Regions | Q3 2025 partner on the AsciiDoc conversion pilot for AWSLCKDocs. |
| gcline | Writer | AWS endpoint docs | Cross-team writer collaborator on Q3 2025 conversion work. |
| hamilteh | Writer | AWS FFZ regions | Cross-team writer collaborator on Q3 2025 FFZ region inputs. |
| npepin | Sr programmer writer | AWS DynamoDB / FFZ | Provided strong Slack-based endorsement of the AsciiDoc conversion work in Q3 2025 (quote in Recognition section). |
| EC2 Networking engineer (unnamed) | Engineer | EC2 / VPC | Internal SME Cody connected with for the EVS boot-volume-encryption remediation. Demonstrated cross-team connective tissue. |
| Monica Renneke (mrenneke) | Senior writer / onboarding buddy | ROSA | Mentor and onboarding buddy early in Cody's AWS tenure. Repeated documented praise (see Recognition). |
| Ike Arias (ikearias) | ROSA GM / PMT (Head of ROSA) | ROSA | Senior ROSA product leader. Led the ROSA service-team weekly sync. Praised the content strategy and the Q3 2024 QBR. |
| Joel Brandenburg (brandejo) | Documentation manager (early) | ROSA | Early AWS ROSA doc manager. |
| Lee Hart (lheeharth) | Documentation manager (later) | ROSA | Subsequent AWS ROSA doc manager. |
| Samantha Lindsey-Ahmed (samlina) | Docs manager | ROSA / EVS | Cody's manager through much of the AWS tenure (incl. Q3 2024). Extensive documented praise (anniversaries, QBRs, threat-model AppSec work). |
| Kristy Walker (kristywa) | Senior doc manager | TCX | Senior docs manager; commented "Amazing!" on the Wiki Refresh shoutout. |
| Stevin George (ageorgst) | Business Line Lawyer (initial) | ROSA | Initial AWS ROSA BLL; partner on the cross-vendor GitHub repo. Documented praise (see Recognition). |
| Caroline Bercier | Business Line Lawyer (successor) | ROSA | Successor AWS ROSA BLL. Led ROSA GovCloud compliance discussions; escalation contact for the international trademark-risk investigation. |
| Lauren Hocket (lhhocket) | IP attorney | AWS Legal | IP attorney on the cross-vendor GitHub repo proposal. |
| Dan Mensonides (danmenso) | ETSL legal | AWS Legal | ETSL legal contact for ROSA. |
| Bolaji Agunbiade (ibraagun) | AppSec reviewer | AWS Security | Approved the cross-vendor GitHub repo (10/13/22). |
| Ganesh Jangir (jangirg) | Security Guardian | AWS Security | Security Guardian on the cross-vendor GitHub repo. |
| Matt Bullock (bullocm) | OSPO reviewer | AWS OSPO | OSPO reviewer on the cross-vendor GitHub repo. |
| Henri Yandell (hyandell) | OSPO reviewer | AWS OSPO | OSPO reviewer on the cross-vendor GitHub repo. |
| Isaac Huben (hubeni) | Editor | ROSA | ROSA editor; helped onboard Red Hat partner teams to the AWS editorial process. Documented praise (see Recognition). |
| Amber Arnold (amarnol) | SEO consult | AWS Docs | Docs SEO consult for ROSA. |
| Kana Eiref (kanaeire) | UX designer | ROSA | ROSA console UX designer; partner on HCP console UI text and Fit n' Finish. Documented praise (5/4/23). |
| Gaurav Anand | UX designer | ROSA | ROSA console UX designer; partner on help-panel UI text and Fit n' Finish review. |
| Arti Balwadkar (artijbal) | Console developer | ROSA | ROSA console developer; approved help-panel UI text recommendations. |
| Nathan Foster (nafoste) | Console developer | ROSA | ROSA console developer on the HCP console work. |
| Austin Quam | Security solution architect | ROSA | AWS security SA close to ROSA customers; year-plus partner on the ROSA security chapter. Invited Cody to present at his team's Austin offsite (5/3/23). |
| Calvin Ohnemus | Export compliance manager | ROSA / GovCloud | AWS export compliance manager; partner on ROSA GovCloud launch-risk discussions. |
| Ryan Niksch | Partner solution architect | ROSA | AWS partner solution architect. |
| Will Garcia | Partner solution architect | ROSA | AWS partner SA; surfaced a customer pain point Cody resolved across AWS + RH docs in under a week (6/13/23). |
| Paul Gasca (pgasca) | Writer | EKS / containers | TCX writer; EKS AsciiDoc conversion partner; co-presenter on the self-service doc-model panel. |
| Geoffrey Cline (gcline) | Writer | EKS / endpoint docs | AsciiDoc conversion partner; authored the 12/8/23 accolade on the ROSA content inventory/audit; co-presenter on the self-service doc-model panel. |
| Donovan Finch | Writer | EKS | EKS writer on the AsciiDoc conversion effort. |
| Chris Negus | Writer | EKS | EKS writer on the AsciiDoc conversion effort. |
| Brad Yamauchi (yamabrad) | Engineering | TCX | TCX engineering; built Region-specific entity support for AsciiDoc (6/26/24). |
| Geoffrey McCarthy | Writer | EC2 networking | Writer Cody collaborated with on EC2-networking dependencies for EVS. |
| Debbie Brown | Reviewer | TCX | Reviewer who approved the ROSA scenario-based refactoring on first pass. |
| Tom Gilman (gilmant) | TPM | AWS | TPM partner on AsciiDoc setup. Documented thanks (9/24/24). |
| Kiran Sundar | PM | EVS | EVS PM; Cody's weekly 1:1. Documented praise on EVS console text (11/14/24, 11/22/24). |
| Aarthi Raju (aartraju) | UX / PM | EVS | EVS partner; kudos on console-text contributions during Fit n' Finish (11/14/24). |
| Katie Cumming (katiecu) | Technical editor | EVS | AWS technical editor on the EVS user guide. Documented praise (11/29/24). |
| Jay Carlson, Keerat Verma | Doc team | Container services | Attendees/partners in the Asana adoption workshops (Q1 2023). |
| Jay Michael | (cross-team) | AWS | Worked with Cody on the private-GitHub-repo licensing/procurement process (6/19/24). |
| Beth Howie, Ellie Frank | Service Docs / SXO leads | TCX | Led the TCX Service Docs writers / SXO partnership initiative Cody beta-tested (2024). |
| Cindy House, Janis Gray, Andrea Jost, Lindsay Colahan Beck | Service Docs colleagues | TCX | TCX Service Docs peers/leaders who recognized Cody's Wiki Refresh and Solutions-docs collaboration work. |
| Nerys Olver, Guilherme Felix, Ferry Mulyadi | Service team / SA | SAP | SAP service-team partners and first SA self-serve contributor on the SAP AsciiDoc conversion. Enthusiastic shoutouts (Q1–Q2 2025). |
| Anuprasee (anupras) | Mentee | AWS | Cody's mentee at AWS. |

### Red Hat partners

| Name | Role at the time | Product | Relationship |
|---|---|---|---|
| Aaren de Jong | ROSA PM | ROSA (Red Hat side) | Years-long working history at the AWS-Red Hat ROSA boundary. Cody worked with Aaren more than any other Red Hat partner. Warm relationship. Strong mutual connection to current Red Hat ROSA team. |
| Bala | Principal PM | OpenShift platform (formerly AWS Senior PM for API Gateway and Identity) | Years-long working history on ROSA. Bala's prior AWS tenure creates shared cultural language. Cody worked with him alongside Aaren throughout the ROSA arc. |
| Abhishek Gupta | Senior Manager of Product Management | OpenShift Cloud Services | Years-long history of engagement on ROSA-related needs (though Cody worked primarily with his report Aaren). Was the hiring manager for the Red Hat PM-T offer Cody declined on 2025-12-10. Advocated for Cody throughout the hiring process. Strong partner and influential within Red Hat given his position. |
| Chanda Pittman | Technical Writing Manager (ROSA team) | ROSA (Red Hat side) | New mutual contact as of 2026-05-29. Reached out to Cody for the Sr Technical Writer role on her team. Predecessor (Andrew Jones) is the warm bridge. Background: edtech (Cengage / WebAssign) before Red Hat. |
| Andrew Cathrow | Senior director, global product management | Red Hat | Escalation/alignment contact during cross-vendor content-strategy alignment; requested the ownership Venn diagram (2022). |
| David Voss | Senior manager, cloud services | Red Hat | Senior cloud-services manager on the ROSA side. |
| Oren Kashi | Senior PMM | Red Hat | Senior product marketing manager. |
| Lauren Johnson | Content strategist | Red Hat | Surfaced the Trello deprecation that drove the cross-org tooling decision. |
| Brandi Munilla | Principal technical writer | Red Hat | Red Hat principal technical writer. |
| Will Gordon | PM | Red Hat | Red Hat PM (referenced on ROSA doc efforts). |
| Eric Ponvelle | ROSA writer | Red Hat | Red Hat ROSA writer; supportive of the cross-org Slack Connect channel; received Cody's help on IMDSv2 and persona-driven ROSA content. |
| Michael Shen | SRE | Red Hat | Red Hat SRE (gp3 quota discussions). |
| Taylor Fahlman | SRE | Red Hat | Red Hat SRE representing SRE-access interests in the responsibility-matrix and security-page work. |
| Mark Letalien | Writer | Red Hat | Red Hat writer; cross-collaboration on AWS service-name and ELB terminology fixes across ROSA/OCP/OKD docs. |
| Kris Yankovich | Customer Success Manager | Red Hat | Ran the AWS/RH biweekly ROSA support sync that fed Cody's support-data pipeline. |

### Cloudflare partners

| Name | Role at the time | Relationship |
|---|---|---|
| Kim Jeske | Former Head of Product Content at Cloudflare | Conducted Cody's interview during the hiring process. |
| Denise Peña | Senior Technical Writer at Cloudflare | PCX peer who interviewed Cody. Based in Austin like Cody. |
| Korinne Alpers | Senior PM, Workers (formerly Apollo GraphQL, HashiCorp, IBM Cloud Security) | Conducted Cody's Developer Partner interview. |
| Christelle Le Faucheur | Data Governance Specialist | Conducted Cody's Orange Cloud capabilities interview. |
| Thomas Desmond | Principal TPM | Conducted a Developer Partner interview. |
| Sam Rhea | VP Product Management | Conducted Cody's leadership interview. |

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

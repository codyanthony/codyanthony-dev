---
title: ROSA Jobs-to-be-Done Content Redesign
description: Restructuring ROSA documentation around customer workflows. Merged duplicate getting started pages into a tabbed interface, consolidated policy documentation, and retitled pages to match customer goals.
section: documentation-strategy
order: 20
---

When I joined as ROSA's first dedicated technical writer, its documentation was organized around product features rather than customer workflows. I restructured the ROSA User Guide around Jobs-to-be-Done, consolidating duplicate and fragmented content into goal-based guidance. This is the documentation-strategy view; for the console and getting-started work on the same product, see [ROSA Day 1 Experience](/case-studies/console-ux/rosa-prerequisites-automation/) and [ROSA with Hosted Control Planes Launch](/case-studies/console-ux/rosa-hcp-console-integration/).

## The challenge

ROSA's docs had grown organically through feature launches, so the information architecture mirrored the product's features instead of the customer's goals. Voice-of-Customer data and engagement metrics showed the cost: fragmentation, duplication, and navigation that made customers assemble information from several pages. Getting-started workflows were split across duplicate pages. Policy documentation was spread across multiple pages. Page titles named features rather than the job a customer was trying to do. The work was to move the information architecture from feature-centric to workflow-based while ROSA was still launching features continuously.

## The restructure

I ran a content audit when I joined that mapped the Jobs-to-be-Done opportunities, then held that plan while prioritizing new-feature documentation through ROSA's growth phase. Once organizational standards aligned with the workflow-centric direction, I re-validated the audit and executed the restructure in a single two-week sprint:

- **Consolidated cluster-creation workflows.** Merged the duplicate auto-mode and manual-mode getting-started pages, identical except for a `--mode` flag in step one, into one guide with console and CLI tabs. This required AWS engineering to unlock AsciiDoc tablist support, previously limited to legacy publishing formats, and shipped as the first AWS production use of the syntax. Customers no longer had to choose a deployment path before they understood the difference, and could switch approaches mid-workflow.
- **Consolidated policy documentation.** Restructured the AWS managed-policies content from a fragmented split into a single scannable reference, eliminating four duplicate pages and simplifying both customer navigation and internal review.
- **Introduced environment variables in CLI procedures.** Turned error-prone copy-paste commands into reproducible ones, reducing configuration errors from mistyped values.
- **Retitled pages to customer goals.** Renamed pages to match the job a customer is doing, such as _Create your first cluster_, rather than the underlying feature, improving findability.

I led the review across AWS and Red Hat Product, Engineering, and documentation stakeholders to align on scope and keep the cross-vendor narrative coherent.

## What this demonstrates

- Jobs-to-be-Done information architecture: reorganizing a sprawling, feature-centric doc set around customer workflows
- Consolidating duplication and fragmentation into maintainable, goal-based guidance
- Format innovation in service of IA: the first AWS production use of AsciiDoc tablist syntax
- Sequencing strategic IA work against an active feature-launch roadmap
- Cross-vendor coordination across AWS and Red Hat

## Outcomes

The restructure consolidated fragmented and duplicate content into workflow-based guidance, aligned titles and structure to customer jobs, and shipped with first-pass content-review approval, among the first in the organizational cohort to complete a Jobs-to-be-Done restructuring.

## Live documentation

- [ROSA User Guide](https://docs.aws.amazon.com/rosa/latest/userguide/) — complete restructured documentation ([archived snapshot](https://web.archive.org/web/20260508131635/https://docs.aws.amazon.com/rosa/latest/userguide/))
- [ROSA Getting Started](https://docs.aws.amazon.com/rosa/latest/userguide/getting-started-classic-cli.html) — consolidated workflow with tabbed interface ([archived snapshot](https://web.archive.org/web/20260412124606/https://docs.aws.amazon.com/rosa/latest/userguide/getting-started-classic-cli.html))
- [AWS Managed Policies](https://docs.aws.amazon.com/rosa/latest/userguide/security-iam-awsmanpol.html) — unified policy reference ([archived snapshot](https://web.archive.org/web/20260314213608/https://docs.aws.amazon.com/rosa/latest/userguide/security-iam-awsmanpol.html))

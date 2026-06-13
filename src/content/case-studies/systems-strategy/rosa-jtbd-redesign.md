---
title: ROSA Jobs-to-be-Done Content Redesign
description: Restructuring ROSA documentation around customer workflows. Merged duplicate getting started pages into a tabbed interface, consolidated policy documentation, and retitled pages to match customer goals.
section: documentation-strategy
order: 20
---

## The Challenge

### Information Architecture Misalignment

Before ROSA had a dedicated technical writer, its documentation reflected a rapid innovation cycle, with information architecture organized around new product features rather than customer workflows. Documentation had evolved organically through feature launches without strategic information architecture planning.

When I joined as ROSA's first dedicated technical writer, Voice-of-Customer data and engagement metrics revealed friction points across the User Guide: content fragmentation, duplication, and complex navigation that forced customers to piece together information from multiple sources.

Feature-centric organization worked during rapid feature launches but didn't scale with customer needs. Getting started workflows were fragmented across duplicate pages. Policy documentation split information across four pages that could have been consolidated. Page titles described features rather than customer goals, making findability difficult.

The challenge was transforming the information architecture from feature-centric to workflow-based while maintaining content accuracy through an active phase of continuous feature launches.

## Strategic Approach

### Long-Term Vision with Phased Execution

Soon after joining, I conducted a comprehensive content audit identifying opportunities for Jobs-to-be-Done restructuring. With ROSA in an active growth phase, I prioritized new feature documentation while maintaining the strategic vision for eventual information architecture modernization.

Aligning with broader organizational standards regarding workflow-centric content, I re-validated the initial audit findings to ensure continued relevance. With validation complete, I executed the restructuring in the first available two-week sprint, completing among the first in the organizational cohort with first-pass approval from content review.

This approach balanced immediate feature documentation needs with long-term information architecture planning, waiting for the right organizational moment to execute at scale.

## Implementation

**Consolidated cluster creation workflows** - Merged duplicate "auto mode" and "manual mode" getting started pages (identical except for step #1's `--mode` flag) into a single guide with console/CLI tabs. Worked with AWS engineering to unlock tabbed interface support for AsciiDoc (previously restricted to legacy publishing formats), then implemented as first production use case for ROSA consolidated workflows. This eliminated premature deployment path decisions and allowed customers to toggle between approaches mid-workflow.

**Policy documentation consolidation** - Eliminated 4 duplicate pages by restructuring AWS managed policies documentation from a fragmented two-page split into a single, scannable reference aligned with AWS documentation standards, simplifying navigation for external customers and streamlining internal reviews.

**Environment variables for CLI workflows** - Introduced environment variables in deployment procedures, transforming error-prone copy-paste workflows into clean, reproducible commands and reducing configuration errors from mistyped values.

**Customer-goal page titles** - Retitled pages throughout the User Guide to match customer goals ("Create your first cluster") rather than feature names, improving findability and aligning with jobs-to-be-done framework.

**Cross-functional stakeholder coordination** - Led review meetings with AWS and Red Hat Product, Engineering, and documentation stakeholders to align on restructuring scope and prioritization, ensuring changes served both customer bases and maintained coherent cross-vendor narrative.

## Impact

**Outcomes:**

- Consolidated duplicate and fragmented content into workflow-based guidance, removing navigation customers previously had to piece together themselves
- Aligned page titles and structure with customer jobs rather than product features, improving findability
- Shipped with first-pass content-review approval, among the first in the organizational cohort to complete a Jobs-to-be-Done restructuring

## Documentation Resources

**Live Documentation:**

- [ROSA User Guide](https://docs.aws.amazon.com/rosa/latest/userguide/) - Complete restructured documentation
- [ROSA Getting Started](https://docs.aws.amazon.com/rosa/latest/userguide/getting-started-classic-cli.html) - Consolidated workflow example with tabbed interface
- [AWS Managed Policies](https://docs.aws.amazon.com/rosa/latest/userguide/security-iam-awsmanpol.html) - Unified policy reference

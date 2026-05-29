---
title: AsciiDoc Modernization Program
description: Migrating AWS service documentation off legacy XML to AsciiDoc, unblocking engineering contributors and AI workflows. Started at ROSA, expanded across EKS, SAP on AWS, and high-compliance regions.
section: documentation-strategy
order: 10
---

## The Challenge

### The Documentation Infrastructure Gap

In the early stages of this initiative, AWS documentation infrastructure presented barriers to external contribution and emerging AI workflows. The standard XML-based format, while feature-rich, required specialized tooling knowledge that excluded engineers, product managers, and external partners from easy contribution. For services requiring external collaboration (like ROSA's partnership with Red Hat technical writers), this created bottlenecks.

Service teams without dedicated writer headcount had no way to maintain documentation themselves, creating dependencies and content freshness challenges. The XML complexity also positioned documentation poorly for AI-assisted workflows, making it less accessible for LLM processing and transformation.

AWS needed a lightweight, markdown-like format that would lower contribution barriers for human contributors and AI-assisted tools while maintaining production documentation requirements. The challenge was proving viability, demonstrating value through measurable outcomes, and enabling voluntary adoption across teams.

## Strategic Approach

### Pilot-Driven Adoption

I pursued a pilot approach: establish viability with early adopters, demonstrate measurable value, enable voluntary adoption across teams.

This progression moved from proving the concept with ROSA's Red Hat collaboration, to expanding with EKS open source contributions, to enabling self-service models for engineering teams without dedicated writers, to scaling for specialized high-compliance regions. Each phase validated the approach for different use cases: cross-company collaboration, external open source contributions, teams without writer support, and compliance-heavy regulated environments.

## Implementation Timeline

### ROSA Foundation

ROSA required close collaboration with external Red Hat technical writers. I researched and proposed AsciiDoc adoption over the standard format, recognizing that a markdown-like source format would lower contribution barriers for product and engineering teams and make content ready for LLM consumption.

I established ROSA's AsciiDoc implementation and created a framework enabling safe contributions from product managers and engineers. This foundation work proved sustainable. ROSA has remained continuously maintained in AsciiDoc format since adoption. The lessons learned from ROSA informed conversion standards that were later adopted by other teams.

### Cross-Service Expansion

The ROSA framework demonstrated scalability potential. Beginning in 2024, I influenced EKS adoption of AsciiDoc and provided strategic and implementation support for their transition through conversion testing, troubleshooting workshops, and authoring best practices documentation.

During the implementation phase, I collaborated with AWS engineering and writers to implement XML entity support for AsciiDoc, enabling reuse of standard AWS entities across converted documentation. Following EKS's adoption, the team reported a significant increase in engineering contribution participation, demonstrating the format's effectiveness in lowering contribution barriers.

I led conversion of six SAP on AWS guides to AsciiDoc in early 2025, establishing a self-service documentation model enabling the SAP service team to maintain content independently, reducing documentation team dependencies while preserving quality through review gates.

### Regulated Regions Modernization

Later in 2025, I converted documentation for multiple high-compliance and air-gapped regions, processing hundreds of files and establishing reusable processes for future conversions.

To accelerate these conversions while maintaining quality, I developed AI-assisted Python transformation scripts using Claude coding assistant, including a custom XML-to-AsciiDoc attribute conversion pipeline that preserves shared content post-conversion. This automation reduced conversion cycles from days to hours while preserving human-in-the-loop validation for compliance requirements and technical accuracy.

The tooling and processes I developed from this work have been adopted by platform engineering teams and other writers, who continue building on this foundation to improve conversion processes across the organization.

### Impact

**Measurable outcomes:**

- Significant increase in engineering contributor participation post-AsciiDoc adoption
- Automation tooling reduces conversion time from days to hours
- Framework voluntarily adopted across multiple service teams
- Self-service models established reducing documentation team dependencies
- Successfully converted multiple service user guides and high-compliance region documentation sets

**Strategic positioning:**

- Documentation infrastructure prepared for AI-assisted workflows
- Lightweight format more accessible to LLM processing
- Faster iteration cycles through simplified markup
- Quality maintained through automated validation and review gates
- Foundation enabling continued organizational adoption

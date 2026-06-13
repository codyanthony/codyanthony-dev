---
title: AsciiDoc Modernization Program
description: Migrating AWS service documentation off legacy XML to AsciiDoc, unblocking engineering contributors and AI workflows. Started at ROSA, expanded across EKS, SAP on AWS, and high-compliance regions.
section: documentation-strategy
order: 10
---

AWS documentation ran on a legacy XML format that only specialists could contribute to. I led a multi-year program to modernize it to AsciiDoc, a lightweight, markdown-like format that lowers the barrier for engineers, product managers, and partners to contribute and that suits AI-assisted authoring. It started with ROSA and grew into an org-wide standard. The judgment thesis behind the AI-assisted side of this work is the subject of my blog post, [Where the Script Stops and the Judgment Starts](/blog/where-the-script-stops/). I ran it alongside my ROSA and EVS documentation work, sequencing across those concurrent workstreams with a [Documentation Prioritization Framework](/case-studies/systems-strategy/rosa-doc-prioritization/).

## The challenge

The XML format was feature-rich but required specialized tooling knowledge, which kept engineers, product managers, and external partners from contributing easily. Services without dedicated writer headcount had no practical way to maintain their own content. For ROSA specifically, the XML toolchain was the wall between Red Hat's writers and the AWS-side docs they wanted to contribute to. The same complexity made the content a poor fit for AI-assisted workflows. AWS needed a lightweight, contribution-friendly format that still met production requirements.

## A pilot-driven rollout

I ran the program as a pilot that expanded by proving value at each step:

- **ROSA.** Researched and proposed AsciiDoc, established the first continuously maintained AsciiDoc package at AWS, and built a framework for safe contributions from PMs and engineers. ROSA has stayed in AsciiDoc since.
- **EKS (from 2024).** Supported the team's adoption with conversion testing, troubleshooting workshops, and authoring best-practices documentation, and collaborated with AWS engineering to add XML entity support for AsciiDoc so standard AWS entities carried over. EKS engineering contributions rose about 25% after adoption.
- **SAP on AWS (early 2025).** Converted six guides and set up a self-service model so the team maintains its own content, with review gates preserving quality.
- **Regulated and air-gapped regions (later 2025).** Converted hundreds of files, 296+ in a single quarter, with human-in-the-loop validation for compliance and technical accuracy.

## AI-assisted conversion tooling

To convert at scale without sacrificing accuracy, I built AI-assisted Python transformation scripts using Claude (with Cline), including a custom XML-entity-to-AsciiDoc-attribute conversion pipeline that preserves shared content after conversion. I treated the model like a junior engineer: tight constraints to transform structure only and never change content, line-by-line review of every diff, and automated link and build validation. Conversion cycles dropped from days to hours.

The conversion work also surfaced gaps in the build system itself. I shared the stop-gap scripts and documentation with the engineering managers who owned the build tooling, and they reverse-engineered them into permanent improvements to how the system handles conversion. Other writers and platform engineering teams have since built on the tooling and processes.

## What this demonstrates

- Leading a multi-year documentation-infrastructure modernization, from pilot to org-wide standard
- Designing for contribution, lowering the barrier for engineers, PMs, and partners
- Building AI-assisted automation with deterministic validation and human-in-the-loop review
- Prototypes that drove an engineering-owned system change
- Preparing documentation for AI-assisted, LLM-friendly workflows

## Outcomes

ROSA has stayed continuously maintained in AsciiDoc since adoption, and the patterns became an org-wide standard adopted by EKS and the SAP on AWS team. EKS engineering contributions rose about 25%. The AI-assisted tooling cut conversion time from days to hours, and engineering managers and other writers have continued building on it across the organization.

---

> Cody was a leader in converting our team's documentation to AsciiDoc, making our materials more accessible to contributions by PMs and engineers. The success of that project extended across the organization, with other documentation teams adopting our tooling and instructions for their own conversions. He developed Python scripts using Anthropic Claude and Cline workflows to drastically reduce manual documentation conversion time.
>
> — Chris Negus, author and technical writer, AWS (worked with Cody on the same team)

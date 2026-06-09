import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const caseStudies = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/case-studies" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    section: z.enum([
      "content-design",
      "technical-documentation",
      "documentation-strategy",
    ]),
    order: z.number().default(100),
    draft: z.boolean().default(false),
    /** Optional PDF download (path under /public, e.g. "/Foo.pdf"). Surfaces as a download button in the case-study header. */
    pdf: z
      .object({
        href: z.string(),
        label: z.string().default("Download PDF sample"),
      })
      .optional(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    /** Optional collaborative series participation. Signals the blog-draft command to insert intro/navigation blocks from the matching series-blocks template. Extend the enum when adding a new series. */
    series: z.enum(["per-the-docs"]).optional(),
    /** Optional monthly theme name for series posts (e.g., "Content Alchemy", "Mind the Gap"). Surfaced in the series navigation block when the series convention includes a per-month theme label. */
    series_theme: z.string().optional(),
    /** Optional URL to the theme-specific landing page on the series host's site. Surfaced in the navigation block alongside the theme name. */
    series_theme_url: z.string().optional(),
  }),
});

export const collections = {
  "case-studies": caseStudies,
  blog,
};

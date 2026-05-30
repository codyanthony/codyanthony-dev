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
  }),
});

export const collections = {
  "case-studies": caseStudies,
  blog,
};

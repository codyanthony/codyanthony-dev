import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const posts = (await getCollection("blog", ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime()
  );

  return rss({
    title: "Cody Anthony — Writing",
    description:
      "Essays on documentation strategy, content infrastructure, and AI workflows for technical writers.",
    site: context.site!.toString(),
    items: posts.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      pubDate: entry.data.date,
      link: `/blog/${entry.id.replace(/\.(md|mdx)$/, "")}/`,
      categories: entry.data.tags,
    })),
    customData: `<language>en-us</language>`,
  });
}

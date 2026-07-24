import { blogArticles } from "@/data/blogs";
import { absoluteUrl } from "@/lib/seo";

const publicRoutes = [
  "",
  "/about",
  "/all-vendor-services",
  "/automotive",
  "/blogs",
  "/catalog",
  "/contact",
  "/faq",
  "/gallery",
  "/help-center",
  "/portfolio",
  "/privacy-policy",
  "/subcategories",
  "/support",
  "/terms",
] as const;

const staticUrls = publicRoutes.map((path) => ({
  location: absoluteUrl(path || "/"),
  lastModified: undefined,
}));
const articleUrls = blogArticles.map((article) => ({
  location: absoluteUrl(`/blogs/${article.slug}`),
  lastModified: article.publishedAt,
}));

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticUrls, ...articleUrls]
  .map(
    ({ location, lastModified }) => `  <url>
    <loc>${location}</loc>${lastModified ? `\n    <lastmod>${lastModified}</lastmod>` : ""}
  </url>`,
  )
  .join("\n")}
</urlset>
`;

export function GET() {
  return new Response(sitemapXml, {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}

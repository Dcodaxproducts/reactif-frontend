import { blogArticles } from "@/data/blogs";
import { absoluteUrl } from "@/lib/seo";
import { getPublicServiceCatalog } from "@/lib/service-page-data";

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
  "/privacy-policy",
  "/support",
  "/terms",
] as const;

const staticUrls = publicRoutes.map((path) => ({
  location: absoluteUrl(path || "/"),
  lastModified: undefined,
}));
const articleUrls = blogArticles.map((article) => ({
  location: absoluteUrl(`/blogs/${article.slug}`),
  lastModified: article.modifiedAt,
}));

type SitemapEntry = {
  location: string;
  lastModified?: string;
  image?: {
    location: string;
    title: string;
  };
};

const escapeXml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

const createSitemapXml = (
  urls: SitemapEntry[],
) => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls
  .map(
    ({ location, lastModified, image }) => `  <url>
    <loc>${escapeXml(location)}</loc>${lastModified ? `\n    <lastmod>${lastModified}</lastmod>` : ""}${image ? `
    <image:image>
      <image:loc>${escapeXml(image.location)}</image:loc>
      <image:title>${escapeXml(image.title)}</image:title>
    </image:image>` : ""}
  </url>`,
  )
  .join("\n")}
</urlset>
`;

export async function GET() {
  const serviceUrls = (await getPublicServiceCatalog()).map(
    ({ id, name, service_image }) => ({
      location: absoluteUrl(`/services/${id}`),
      image: service_image
        ? {
            location: service_image,
            title: name,
          }
        : undefined,
    }),
  );
  const sitemapXml = createSitemapXml([
    ...staticUrls,
    ...articleUrls,
    ...serviceUrls,
  ]);

  return new Response(sitemapXml, {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}

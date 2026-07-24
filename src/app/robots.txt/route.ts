import { SITE_URL } from "@/lib/seo";

const robotsText = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /cart
Disallow: /forgot-password
Disallow: /login
Disallow: /messages
Disallow: /notifications
Disallow: /order/
Disallow: /profile
Disallow: /register
Disallow: /settings
Disallow: /verify-otp

Sitemap: ${SITE_URL}/sitemap.xml
Host: ${SITE_URL}
`;

export function GET() {
  return new Response(robotsText, {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}

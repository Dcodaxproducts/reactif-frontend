const manifest = {
  name: "RéactifPub",
  short_name: "RéactifPub",
  description:
    "Communication visuelle automobile, covering, signalétique et impression à Genève.",
  start_url: "/",
  display: "standalone",
  background_color: "#010101",
  theme_color: "#111111",
  lang: "fr-CH",
  icons: [
    {
      src: "/favicon.ico",
      sizes: "48x48",
      type: "image/x-icon",
    },
  ],
};

export function GET() {
  return Response.json(manifest, {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}

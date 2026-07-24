import { describe, expect, it } from "vitest";
import {
  createFaqPageJsonLd,
  createDescriptionSnippet,
  createNoIndexMetadata,
  createPageMetadata,
} from "./seo";

describe("SEO helpers", () => {
  it("keeps generated descriptions within search snippet guidance", () => {
    const description = createDescriptionSnippet(
      "Une description très détaillée ".repeat(12),
    );

    expect(description.length).toBeLessThanOrEqual(160);
    expect(description.endsWith("…")).toBe(true);
  });

  it("preserves long descriptions that contain no spaces", () => {
    const description = createDescriptionSnippet("a".repeat(200));

    expect(description).toHaveLength(160);
    expect(description).toBe(`${"a".repeat(159)}…`);
  });

  it("creates self-canonical public metadata with matching social URLs", () => {
    const metadata = createPageMetadata({
      title: "Covering automobile",
      description: "Description du service de covering automobile.",
      path: "/automotive",
    });

    expect(metadata.alternates?.canonical).toBe("/automotive");
    expect(metadata.openGraph?.url).toBe("/automotive");
    expect(metadata.robots).toMatchObject({
      index: true,
      follow: true,
    });
  });

  it("keeps workflow pages out of search while allowing link discovery", () => {
    const metadata = createNoIndexMetadata({
      title: "Configuration",
      description: "Parcours de configuration.",
    });

    expect(metadata.robots).toMatchObject({
      index: false,
      follow: true,
      nocache: true,
    });
  });

  it("maps visible FAQ content to valid FAQPage entities", () => {
    const schema = createFaqPageJsonLd(
      [
        {
          id: "quote",
          value: "quote",
          question: "Comment demander un devis ?",
          answer: "Utilisez le formulaire de contact.",
        },
      ],
      "/faq",
    );

    expect(schema).toMatchObject({
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Comment demander un devis ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Utilisez le formulaire de contact.",
          },
        },
      ],
    });
  });
});

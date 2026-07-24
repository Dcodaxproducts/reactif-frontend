export const blogArticles = [
  {
    key: "first",
    slug: "branded-wrap-moving-campaign",
    image:
      "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1400&q=85",
    publishedAt: "2026-05-28",
    modifiedAt: "2026-07-24",
    sections: [
      {
        titleKey: "staticPages.blogs.articles.first.sections.visibility",
        bodyKeys: [
          "staticPages.blogs.articles.first.body.first",
          "staticPages.blogs.articles.first.body.second",
        ],
      },
      {
        titleKey: "staticPages.blogs.articles.first.sections.vehicle",
        bodyKeys: [
          "staticPages.blogs.articles.first.body.fourth",
          "staticPages.blogs.articles.first.body.fifth",
        ],
      },
      {
        titleKey: "staticPages.blogs.articles.first.sections.production",
        bodyKeys: [
          "staticPages.blogs.articles.first.body.third",
          "staticPages.blogs.articles.first.body.sixth",
        ],
      },
    ],
    relatedServiceHref: "/automotive",
    relatedServiceLabelKey:
      "staticPages.blogs.articles.first.relatedService",
    takeawayKeys: [
      "staticPages.blogs.articles.first.takeaways.first",
      "staticPages.blogs.articles.first.takeaways.second",
      "staticPages.blogs.articles.first.takeaways.third",
    ],
  },
  {
    key: "second",
    slug: "vinyl-care-color-finish-edges",
    image:
      "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=1400&q=85",
    publishedAt: "2026-05-21",
    modifiedAt: "2026-07-24",
    sections: [
      {
        titleKey: "staticPages.blogs.articles.second.sections.cleaning",
        bodyKeys: [
          "staticPages.blogs.articles.second.body.first",
          "staticPages.blogs.articles.second.body.fourth",
        ],
      },
      {
        titleKey: "staticPages.blogs.articles.second.sections.exposure",
        bodyKeys: [
          "staticPages.blogs.articles.second.body.second",
          "staticPages.blogs.articles.second.body.fifth",
        ],
      },
      {
        titleKey: "staticPages.blogs.articles.second.sections.pressure",
        bodyKeys: [
          "staticPages.blogs.articles.second.body.third",
          "staticPages.blogs.articles.second.body.sixth",
        ],
      },
    ],
    relatedServiceHref: "/automotive",
    relatedServiceLabelKey:
      "staticPages.blogs.articles.second.relatedService",
    takeawayKeys: [
      "staticPages.blogs.articles.second.takeaways.first",
      "staticPages.blogs.articles.second.takeaways.second",
      "staticPages.blogs.articles.second.takeaways.third",
    ],
  },
  {
    key: "third",
    slug: "signage-storefront-event-display",
    image:
      "https://images.unsplash.com/photo-1525362081669-2b476bb628c3?auto=format&fit=crop&w=1400&q=85",
    publishedAt: "2026-05-14",
    modifiedAt: "2026-07-24",
    sections: [
      {
        titleKey: "staticPages.blogs.articles.third.sections.context",
        bodyKeys: [
          "staticPages.blogs.articles.third.body.first",
          "staticPages.blogs.articles.third.body.fourth",
        ],
      },
      {
        titleKey: "staticPages.blogs.articles.third.sections.materials",
        bodyKeys: [
          "staticPages.blogs.articles.third.body.second",
          "staticPages.blogs.articles.third.body.fifth",
        ],
      },
      {
        titleKey: "staticPages.blogs.articles.third.sections.production",
        bodyKeys: [
          "staticPages.blogs.articles.third.body.third",
          "staticPages.blogs.articles.third.body.sixth",
        ],
      },
    ],
    relatedServiceHref: "/catalog",
    relatedServiceLabelKey:
      "staticPages.blogs.articles.third.relatedService",
    takeawayKeys: [
      "staticPages.blogs.articles.third.takeaways.first",
      "staticPages.blogs.articles.third.takeaways.second",
      "staticPages.blogs.articles.third.takeaways.third",
    ],
  },
] as const;

export type BlogArticle = (typeof blogArticles)[number];

export const findBlogArticleBySlug = (slug: string) =>
  blogArticles.find((article) => article.slug === slug);

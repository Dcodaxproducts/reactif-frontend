import { ServiceDetailPage } from "@/components/pages/ServiceDetailPage";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  absoluteUrl,
  createDescriptionSnippet,
  createNoIndexMetadata,
  createPageMetadata,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo";
import { getServicePageData } from "@/lib/service-page-data";

type ServicePageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: ServicePageProps) {
  const { id } = await params;
  const service = await getServicePageData(id);

  if (!service) {
    return createNoIndexMetadata({
      title: "Service indisponible",
      description:
        "Ce service RéactifPub est temporairement indisponible ou n’existe plus.",
    });
  }

  const description = createDescriptionSnippet(
    service.description?.trim().length >= 40
      ? service.description.trim()
      : `Découvrez le service ${service.name} proposé par RéactifPub à Genève, ses options, son tarif et le parcours pour demander un devis ou réserver.`,
  );

  return createPageMetadata({
    title: `${service.name} à Genève`,
    description,
    path: `/services/${id}`,
    image: service.service_image || undefined,
    imageAlt: `${service.name} — service RéactifPub à Genève`,
  });
}

export default async function Page({ params }: ServicePageProps) {
  const { id } = await params;
  const service = await getServicePageData(id);
  const serviceUrl = absoluteUrl(`/services/${id}`);
  const description =
    service?.description?.trim() ||
    (service
      ? `Service ${service.name} proposé par RéactifPub à Genève.`
      : "");
  const serviceJsonLd = service
    ? {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${serviceUrl}#service`,
        name: service.name,
        description,
        url: serviceUrl,
        image: service.service_image || undefined,
        areaServed: {
          "@type": "AdministrativeArea",
          name: "Genève",
        },
        provider: {
          "@id": `${SITE_URL}/#organization`,
          "@type": "Organization",
          name: SITE_NAME,
        },
        ...(service.price > 0
          ? {
              offers: {
                "@type": "Offer",
                price: service.price,
                priceCurrency: "CHF",
                availability: "https://schema.org/InStock",
                url: serviceUrl,
              },
            }
          : {}),
      }
    : null;
  const breadcrumbJsonLd = service
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Accueil",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Catalogue",
            item: absoluteUrl("/catalog"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: service.name,
            item: serviceUrl,
          },
        ],
      }
    : null;

  return (
    <>
      {serviceJsonLd ? <JsonLd data={serviceJsonLd} /> : null}
      {breadcrumbJsonLd ? <JsonLd data={breadcrumbJsonLd} /> : null}
      <ServiceDetailPage initialService={service} />
    </>
  );
}

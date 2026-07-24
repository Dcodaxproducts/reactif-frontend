import { Suspense } from "react";

import { Container } from "@/components/common/Container";
import { PageShell } from "@/components/common/PageShell";
import { ServiceDetailPage } from "@/components/pages/ServiceDetailPage";
import { createPageMetadata } from "@/lib/seo";

type ServicePageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: ServicePageProps) {
  const { id } = await params;

  return createPageMetadata({
    title: "Détail du service",
    description:
      "Consultez les détails, options et spécialistes disponibles pour ce service de communication visuelle RéactifPub.",
    path: `/services/${id}`,
  });
}

export default function Page() {
  return (
    <Suspense
      fallback={
        <PageShell className="min-h-screen">
          <Container gutter="page" className="py-10">
            <div className="rounded-3xl border border-white/10 bg-black/45 p-10 text-center backdrop-blur-xl">
              <div className="mx-auto h-12 w-12 animate-spin rounded-full border-2 border-white/15 border-t-white" />
            </div>
          </Container>
        </PageShell>
      }
    >
      <ServiceDetailPage />
    </Suspense>
  );
}

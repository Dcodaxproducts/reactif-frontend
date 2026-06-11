import { Suspense } from "react";

import { Container } from "@/components/common/Container";
import { PageShell } from "@/components/common/PageShell";
import { DesignerProfilePage } from "@/components/pages/DesignerProfilePage";

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
      <DesignerProfilePage />
    </Suspense>
  );
}

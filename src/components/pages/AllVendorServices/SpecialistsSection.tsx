"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Container } from "@/components/common/Container";

import { SectionHeader } from "@/components/common/SectionHeader";
import { useDesigners } from "@/hooks/useDesigners";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import { LoadMoreSpecialistsButton } from "./LoadMoreSpecialistsButton";
import SpecialistGrid from "./SpecialistGrid";
import { SpecialistListStatus } from "./SpecialistListStatus";

function SpecialistsSectionContent() {
  const { t } = useAppTranslation();
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();

  const { designers, loading, error, page, totalPages, setPage } =
    useDesigners();
  const hasDesigners = designers.length > 0;

  return (
    <Container gutter="page" className="py-12 md:py-20">
      <SectionHeader
        badgeText={t("designers.sectionBadge")}
        title={
          <>
            {t("designers.sectionTitlePrefix")}{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #F262B5 0%, #9F73F1 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {t("designers.sectionTitleAccent")}
            </span>
          </>
        }
        description={t("designers.sectionDescription")}
      />

      <SpecialistListStatus
        loading={loading}
        error={error}
        hasDesigners={hasDesigners}
      />

      {hasDesigners && (
        <SpecialistGrid
          designers={designers}
          queryString={queryString}
        />
      )}

      {page < totalPages && (
        <LoadMoreSpecialistsButton
          loading={loading}
          onLoadMore={() => setPage((prev) => prev + 1)}
        />
      )}
    </Container>
  );
}

export function SpecialistsSection() {
  return (
    <Suspense
      fallback={
        <Container gutter="page" className="py-12 md:py-20">
          <SpecialistListStatus
            loading
            error={null}
            hasDesigners={false}
          />
        </Container>
      }
    >
      <SpecialistsSectionContent />
    </Suspense>
  );
}

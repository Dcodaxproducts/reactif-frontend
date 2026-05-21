"use client";

import { useSearchParams } from "next/navigation";
import { Container } from "@/components/common/Container";

import { SectionHeader } from "@/components/common/SectionHeader";
import { useDesigners } from "@/hooks/useDesigners";
import LoadMoreSpecialistsButton from "./LoadMoreSpecialistsButton";
import SpecialistGrid from "./SpecialistGrid";
import SpecialistListStatus from "./SpecialistListStatus";

export default function SpecialistsSection() {
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();
  const categoryId = searchParams.get("categoryId");

  const { designers, loading, error, page, totalPages, setPage } =
    useDesigners();
  const hasDesigners = designers.length > 0;

  return (
    <Container gutter="page" className="py-12 md:py-20">
      <SectionHeader
        badgeText="Our Commitment"
        title={
          <>
            SELECT A{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #F262B5 0%, #9F73F1 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              SPECIALIST
            </span>
          </>
        }
        description="Choose a certified vendor to explore their specific protection packages and designs."
      />

      <SpecialistListStatus
        loading={loading}
        error={error}
        hasDesigners={hasDesigners}
      />

      {hasDesigners && (
        <SpecialistGrid
          designers={designers}
          categoryId={categoryId}
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

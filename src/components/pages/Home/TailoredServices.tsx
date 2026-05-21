"use client";

import { useRef } from "react";
import Image from "next/image";
import { Container } from "@/components/common/Container";
import { useCategories } from "@/hooks/useCategories";
import { LoadMoreButton } from "./tailored-services/LoadMoreButton";
import { SkeletonGrid } from "./tailored-services/SkeletonGrid";
import { TailoredServicesAnimations } from "./tailored-services/TailoredServicesAnimations";
import { TailoredServicesGrid } from "./tailored-services/TailoredServicesGrid";
import { TailoredServicesHeader } from "./tailored-services/TailoredServicesHeader";

export default function TailoredServices() {
  const { categories, loading, hasMore, loadMore } = useCategories();
  const gridRef = useRef<HTMLDivElement | null>(null);

  const handleLoadMore = async () => {
    await loadMore();

    setTimeout(() => {
      gridRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }, 200);
  };

  return (
    <section className="relative w-full py-16 md:py-28 overflow-hidden">
      <TailoredServicesAnimations />

      <Image
        src="/assets/hero/gradient.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover -z-10"
      />

      <Container gutter="topbar">
        <TailoredServicesHeader />

        {loading && categories.length === 0 ? (
          <SkeletonGrid />
        ) : (
          <>
            <TailoredServicesGrid categories={categories} gridRef={gridRef} />
            {hasMore && (
              <LoadMoreButton loading={loading} onClick={handleLoadMore} />
            )}
          </>
        )}
      </Container>
    </section>
  );
}

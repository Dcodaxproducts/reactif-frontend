"use client";

import { PageShell } from "@/components/common/PageShell";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/common/Container";
import { StatusCard } from "@/components/common/StatusCard";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { PaintDetailsHeader } from "@/components/pages/PaintProtection/PaintDetailsHeader";
import ServicesRow from "@/components/pages/PaintProtection/ServicesRow";
import CarPreviewSection from "@/components/pages/PaintProtection/CarPreviewSection";
import { PaintProtectionCard } from "@/components/pages/PaintProtection/PaintProtectionCard";
import { Loader2 } from "lucide-react";
import {
  useCategoryDetail,
  useServices,
  useServicesBySubcategory,
} from "@/hooks/useCategories";
import type { Subcategory } from "@/types/categories";

type ActiveItem = string | null;

export default function Page() {
  return (
    <Suspense
      fallback={
        <PageShell className="min-h-screen">
          <Container gutter="page" className="py-10">
            <div className="w-full rounded-3xl border border-slate-800 bg-neutral-950/60 p-8 text-center text-neutral-400">
              Loading service details...
            </div>
          </Container>
        </PageShell>
      }
    >
      <PaintProtectionContent />
    </Suspense>
  );
}

function PaintProtectionContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const id = params?.id as string;
  const urlSubcategoryId = searchParams.get("subcategoryId");
  const urlServiceId = searchParams.get("serviceId");
  const designerId = searchParams.get("designerId");

  const [activeItem, setActiveItem] = useState<ActiveItem>(
    urlServiceId ?? "frontBlock",
  );
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [activeSubcategoryId, setActiveSubcategoryId] = useState<number | null>(
    null,
  );

  const {
    category,
    loading: isFetchingCategory,
    error: categoryError,
    refetch: fetchCategory,
  } = useCategoryDetail(id);
  const {
    services: subcategoryServices,
    loading: isLoadingSubcategoryServices,
  } =
    useServicesBySubcategory(activeSubcategoryId);
  const {
    services: categoryServices,
    loading: isLoadingCategoryServices,
  } = useServices(
    id && !activeSubcategoryId
      ? {
          category_id: id,
          limit: 100,
        }
      : undefined,
  );

  const categoryName = category?.name ?? "";
  const status = category?.status ?? 1;
  const subcategories = useMemo(
    () => (category?.subcategories ?? []) as Subcategory[],
    [category?.subcategories],
  );
  const displayCategoryName = activeCategory.trim()
    ? activeCategory
    : categoryName;
  const services = activeSubcategoryId ? subcategoryServices : categoryServices;
  const isLoading = activeSubcategoryId
    ? isLoadingSubcategoryServices
    : isLoadingCategoryServices;

  useEffect(() => {
    if (urlSubcategoryId) {
      const matched = subcategories.find(
        (sub) => sub.id === Number(urlSubcategoryId),
      );
      if (matched) {
        setActiveCategory(matched.name);
        setActiveSubcategoryId(matched.id);
        return;
      }
    }

    if (subcategories.length) {
      setActiveCategory(subcategories[0].name);
      setActiveSubcategoryId(subcategories[0].id);
      return;
    }

    setActiveCategory(categoryName);
    setActiveSubcategoryId(null);
  }, [categoryName, subcategories, urlSubcategoryId]);

  useEffect(() => {
    if (urlServiceId) {
      setActiveItem(urlServiceId);
    }
  }, [urlServiceId]);

  const handleRetry = () => {
    fetchCategory();
  };

  const Overlay = () => (
    <div className="fixed inset-0 z-[999] flex flex-col items-center justify-start pt-52 px-4">
      {isFetchingCategory ? (
        <div className="bg-neutral-900 border border-gray-700 rounded-xl p-6 w-full max-w-md text-center flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-white" />
          <p className="text-white font-medium text-lg">
            Fetching category data...
          </p>
          <p className="text-gray-400 text-sm">
            Please wait while we load the information.
          </p>
        </div>
      ) : categoryError ? (
        <StatusCard
          tone="error"
          label="Backend error"
          title="Category not found"
          description={categoryError}
          action={
            <Button
              variant="neutralOutline"
              className="h-10 rounded-full px-5"
              onClick={handleRetry}
            >
              Retry
            </Button>
          }
          className="w-full max-w-md p-6"
        />
      ) : null}
    </div>
  );

  return (
    <PageShell className="min-h-screen">
      {(isFetchingCategory || categoryError) && <Overlay />}

      {!categoryError && !isFetchingCategory && categoryName && (
        <Container gutter="page" className="pb-12 md:pb-20 pt-6 md:pt-10 flex flex-col">
          <PaintDetailsHeader name={categoryName} status={status} />

          {subcategories.length > 0 && (
            <ServicesRow
              subcategories={subcategories}
              totalCount={subcategories.length}
              activeCategory={activeCategory}
              setActiveCategory={(name: string, subId: number) => {
                setActiveCategory(name);
                setActiveSubcategoryId(subId);

                const nextSearchParams = new URLSearchParams(
                  window.location.search,
                );
                nextSearchParams.set("subcategoryId", String(subId));
                nextSearchParams.set("subcategoryName", name);

                router.replace(
                  `/paint-protection/${id}?${nextSearchParams.toString()}`,
                  {
                    scroll: false,
                  },
                );
              }}
            />
          )}

          <div className="w-full flex flex-col lg:flex-row items-stretch gap-8 md:gap-12">
            <div className="w-full lg:flex-1">
              <CarPreviewSection
                activeItem={activeItem}
                activeCategory={displayCategoryName}
                services={services}
                isLoading={isLoading}
              />
            </div>

            <div className="w-full lg:max-w-[480px] pr-1 pb-1">
              <PaintProtectionCard
                activeItem={activeItem}
                setActiveItem={setActiveItem}
                activeCategory={displayCategoryName}
                parentCategory={categoryName}
                services={services}
                isLoading={isLoading}
                designerId={designerId}
              />
            </div>
          </div>
        </Container>
      )}
    </PageShell>
  );
}

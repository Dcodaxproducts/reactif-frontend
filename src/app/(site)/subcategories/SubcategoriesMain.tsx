"use client";

import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/common/Container";
import { PageShell } from "@/components/common/PageShell";
import { CategoryServicesListing } from "@/components/pages/SubCategories/CategoryServicesListing";
import { useSearchParams, useRouter } from "next/navigation";
import {
  useCategories,
  useCategoryDetail,
  useServices,
} from "@/hooks/useCategories";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import { resolveCategorySlug } from "@/lib/category-routes";

export function SubcategoriesMain() {
  return (
    <Suspense
      fallback={
        <PageShell className="min-h-screen">
          <Container gutter="page" className="py-12 md:py-20">
            <div className="rounded-3xl border border-white/10 bg-black/40 p-10 text-center backdrop-blur-xl">
              <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-white border-t-transparent" />
              <p className="mt-5 text-sm text-slate-400">
                Loading category services...
              </p>
            </div>
          </Container>
        </PageShell>
      }
    >
      <SubcategoriesContent />
    </Suspense>
  );
}

const SubcategoriesContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { t } = useAppTranslation();
  const categoryId = searchParams.get("id");
  const categorySlug = searchParams.get("slug");
  const selectedSubcategoryId = searchParams.get("subcategoryId");

  const { categories, loading: categoriesLoading } = useCategories({
    per_page: 100,
  });
  const categoryFromSlug =
    !categoryId && categorySlug
      ? categories.find(
          ({ name }) =>
            resolveCategorySlug(name) === resolveCategorySlug(categorySlug),
        )
      : undefined;
  const resolvedCategoryId = categoryId ?? categoryFromSlug?.id ?? null;
  const {
    category,
    loading: categoryLoading,
    error: categoryError,
    refetch: refetchCategory,
  } = useCategoryDetail(resolvedCategoryId);
  const displayCategory = category ?? categoryFromSlug ?? null;
  const activeSubcategories = (displayCategory?.subcategories ?? []).filter(
    ({ status }) => status !== 0,
  );
  const shouldLoadServices = Boolean(resolvedCategoryId) &&
    (activeSubcategories.length === 0 || Boolean(selectedSubcategoryId));
  const serviceParams =
    shouldLoadServices && selectedSubcategoryId
      ? { sub_category_id: selectedSubcategoryId, limit: 100 }
      : shouldLoadServices && resolvedCategoryId
        ? { category_id: resolvedCategoryId, limit: 100 }
        : undefined;
  const {
    services,
    loading: servicesLoading,
    error: servicesError,
    refetch: refetchServices,
  } = useServices(serviceParams);

  const loading =
    categoriesLoading ||
    categoryLoading ||
    (shouldLoadServices && servicesLoading);
  const errorState = categoryError || servicesError;

  if (errorState) {
    return (
      <PageShell className="min-h-screen">
        <Container gutter="page" className="py-20">
          <div className="mx-auto max-w-md rounded-3xl border border-neutral-700 bg-neutral-950/80 p-10 text-center shadow-2xl backdrop-blur">
            <h2 className="text-2xl font-bold text-white mb-4">
              {t("categoryFlow.errorTitle")}
            </h2>
            <p className="text-neutral-400 mb-6">{errorState}</p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button
                onClick={() => {
                  refetchCategory();
                  refetchServices();
                }}
                className="rounded-full bg-white px-6 py-3 font-semibold text-black hover:bg-white/90"
              >
                {t("categoryFlow.retry")}
              </Button>
              <Button
                onClick={() => router.push("/")}
                className="rounded-full border border-white/15 bg-transparent px-6 py-3 font-semibold text-white hover:bg-white/10"
              >
                {t("categoryFlow.backHome")}
              </Button>
            </div>
          </div>
        </Container>
      </PageShell>
    );
  }

  if (!loading && !displayCategory) {
    return (
      <PageShell className="min-h-screen">
        <Container gutter="page" className="py-20">
          <div className="mx-auto max-w-md rounded-3xl border border-neutral-700 bg-neutral-950/80 p-10 text-center shadow-2xl backdrop-blur">
            <h2 className="text-2xl font-bold text-white mb-4">
              {t("categoryFlow.emptyTitle")}
            </h2>
            <p className="text-neutral-400 mb-6">
              {t("categoryFlow.emptyDescription")}
            </p>
            <Button
              onClick={() => router.push("/")}
              className="rounded-full bg-white px-6 py-3 font-semibold text-black hover:bg-white/90"
            >
              {t("categoryFlow.backHome")}
            </Button>
          </div>
        </Container>
      </PageShell>
    );
  }

  return (
    <PageShell className="min-h-screen">
      <Container gutter="page" className="py-12 md:py-20">
        {loading ? (
          <div className="rounded-3xl border border-white/10 bg-black/40 p-10 text-center backdrop-blur-xl">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-white border-t-transparent" />
            <p className="mt-5 text-sm text-slate-400">
              {t("categoryFlow.loadingServices")}
            </p>
          </div>
        ) : displayCategory ? (
          <CategoryServicesListing
            category={displayCategory}
            services={services}
            activeSubcategoryId={selectedSubcategoryId}
          />
        ) : null}
      </Container>
    </PageShell>
  );
};

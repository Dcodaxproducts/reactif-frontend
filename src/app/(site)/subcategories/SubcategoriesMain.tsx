"use client";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/common/Container";
import { PageShell } from "@/components/common/PageShell";
import { SectionHeader } from "@/components/common/SectionHeader";
import SubCategories from "@/components/pages/SubCategories/SubCategories";
import { useSearchParams, useRouter } from "next/navigation";
import { useCategoryDetail } from "@/hooks/useCategories";

const Subcategories = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryId = searchParams.get("id");

  const { category, loading, error } = useCategoryDetail(categoryId);
  const categoryName = category?.name ?? "";
  const subcategories = (category?.subcategories ?? []).filter(
    ({ status }) => status === 1,
  );
  const errorState =
    error ||
    (!loading && subcategories.length === 0
      ? "No subcategories available."
      : null);

  if (errorState) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50">
        <div className="bg-neutral-900 border border-neutral-700 rounded-3xl p-10 text-center max-w-md shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-4">Oops!</h2>
          <p className="text-neutral-400 mb-6">{errorState}</p>
          <Button
            onClick={() => router.push("/")}
            className="px-6 py-3 rounded-full bg-white text-black font-semibold"
          >
            Go Back Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <PageShell>
      <Container gutter="page" className="py-12 md:py-20">
        <SectionHeader
          title={
            <span style={{ color: "#F5F5F5" }}>
              {loading ? "" : categoryName}
            </span>
          }
          description={
            loading
              ? ""
              : "Select a service below to continue your design path."
          }
        />

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <SubCategories subcategories={subcategories} />
        )}
      </Container>
    </PageShell>
  );
};

export default Subcategories;

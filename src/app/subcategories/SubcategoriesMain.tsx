"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/navbar/navbar";
import { SectionHeader } from "@/components/shared/SectionHeader";
import SubCategories from "@/components/SubCategories/SubCategories";
import GlobalBackground from "@/hooks/GlobalBackground";
import { useSearchParams, useRouter } from "next/navigation";
import { API_BASE_URL } from "@/lib/constants";

/* =========================
   Types
========================= */

interface SubCategory {
  id: number;
  name: string;
  description: string;
  category_image: string;
  status: number;
}

const Subcategories = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryId = searchParams.get("id");

  const [categoryName, setCategoryName] = useState("");
  const [subcategories, setSubcategories] = useState<SubCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorState, setErrorState] = useState<string | null>(null);

  useEffect(() => {
    if (!categoryId) {
      setErrorState("No category selected.");
      setLoading(false);
      return;
    }

    const fetchCategory = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `${API_BASE_URL}/categories/${categoryId}`
        );

        if (!res.ok) {
          setErrorState("Category not found.");
          return;
        }

        const data = await res.json();

        if (!data?.data) {
          setErrorState("Category not found.");
          return;
        }

        setCategoryName(data.data.name);

        const activeSubs = (data.data.subcategories || []).filter(
          (item: SubCategory) => item.status === 1
        );

        if (activeSubs.length === 0) {
          setErrorState("No subcategories available.");
        }

        setSubcategories(activeSubs);
      } catch (error) {
        setErrorState("Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [categoryId]);

  /* =========================
     Error Popup
  ========================= */

  if (errorState) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50">
        <div className="bg-neutral-900 border border-neutral-700 rounded-3xl p-10 text-center max-w-md shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-4">
            Oops!
          </h2>
          <p className="text-neutral-400 mb-6">
            {errorState}
          </p>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-3 rounded-full bg-white text-black font-semibold"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="relative overflow-hidden">
      <Navbar />
      <GlobalBackground />

      <div className="mx-auto px-4 sm:px-6 md:px-30 py-12 md:py-20">
        <SectionHeader
  title={<span style={{ color: "#F5F5F5" }}>{loading ? "" : categoryName}</span>}
  description={
    loading ? "" : "Select a service below to continue your design path."
  }
/>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <SubCategories subcategories={subcategories} />
        )}
      </div>
    </section>
  );
};

export default Subcategories;
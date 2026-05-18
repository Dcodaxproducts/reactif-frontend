"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { IconType } from "react-icons";
import { FaLightbulb } from "react-icons/fa";
import { API_BASE_URL } from "@/lib/constants";

/* =========================
   Skeleton Card
========================= */

function SkeletonCard() {
  return (
    <div className="relative rounded-[24px] overflow-hidden animate-pulse">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-[length:200%_100%] animate-[shimmer_2s_linear_infinite]" />
      <div className="relative z-10 rounded-[24px] border border-[#F5F5F520] bg-black/40 p-6 md:p-8 flex flex-col gap-6 md:gap-8">
        <div className="w-14 h-14 rounded-xl bg-gray-700" />
        <div className="space-y-3">
          <div className="h-6 w-3/4 bg-gray-700 rounded" />
          <div className="h-4 w-1/2 bg-gray-700 rounded" />
          <div className="h-4 w-full bg-gray-700 rounded" />
          <div className="h-4 w-5/6 bg-gray-700 rounded" />
        </div>
      </div>
    </div>
  );
}

/* =========================
   Service Card
========================= */

interface ServiceCardProps {
  id: number;
  title: string;
  description: string;
  icon: IconType;
  index: number;
}

function ServiceCard({
  id,
  title,
  description,
  icon: Icon,
  index,
}: ServiceCardProps) {
  return (
    <div
      className="relative rounded-[24px] overflow-hidden opacity-0 translate-y-6 animate-[fadeUp_0.6s_ease_forwards]"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div
        className="absolute inset-0 blur-[20px] opacity-100"
        style={{
          background:
            "conic-gradient(from 132deg at 40.63% 50.41%, rgba(242, 98, 181, 0.00) 125.179deg, rgba(95, 197, 255, 0.20) 193.412deg, rgba(255, 172, 137, 0.20) 216.021deg, rgba(129, 85, 255, 0.20) 236.071deg, rgba(120, 157, 255, 0.20) 259.953deg, rgba(159, 115, 241, 0.00) 311.078deg)",
        }}
      />

      <div className="relative z-10 rounded-[24px] border border-[#F5F5F580] bg-black/40 backdrop-blur-xl p-6 md:p-8 flex flex-col gap-6 md:gap-8">
        <div className="w-14 h-14 p-2.5 rounded-xl bg-pink-400/20 flex justify-center items-center">
          <div className="w-10 h-10 p-2 rounded-lg bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex justify-center items-center">
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <h3 className="text-white text-2xl md:text-3xl font-bold">
              {title}
            </h3>
            <p className="text-white/70 text-sm md:text-base font-bold">
              Signboards & Stickers
            </p>
          </div>

          <p className="text-white/70 text-sm md:text-base">
            {description}
          </p>

          <div>
            <p className="text-white text-sm md:text-base font-medium mb-4">
              Key Services
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Full & Partial Wraps",
                "Paint Protection",
                "Fleet Branding",
                "Window Graphics",
              ].map((service, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-pink-400" />
                  <span className="text-white text-sm">
                    {service}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Link
          href={`/subcategories?id=${id}`}
          className="h-11 bg-white rounded-full flex justify-center items-center font-semibold text-zinc-800"
        >
          Learn More
        </Link>
      </div>
    </div>
  );
}

/* =========================
   Main Section
========================= */

export default function TailoredServices() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const gridRef = useRef<HTMLDivElement | null>(null);

  const fetchCategories = async (pageNumber = 1) => {
    try {
      setLoading(true);

      const res = await fetch(
        `${API_BASE_URL}/categories?page=${pageNumber}`
      );
      const data = await res.json();

      const active = data.data.filter(
        (item: any) => item.status === 1
      );

      setCategories((prev) =>
        pageNumber === 1 ? active : [...prev, ...active]
      );

      // ✅ Correct pagination check
      setHasMore(
        data.pagination.currentPage < data.pagination.totalPages
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories(1);
  }, []);

  const handleLoadMore = async () => {
    const nextPage = page + 1;
    setPage(nextPage);

    await fetchCategories(nextPage);

    setTimeout(() => {
      gridRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }, 200);
  };

  return (
    <section className="relative w-full py-16 md:py-28 overflow-hidden">
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes fadeUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <Image
        src="/assets/hero/gradient.png"
        alt="Background"
        fill
        className="object-cover -z-10"
      />

      <div className="mx-auto px-4 sm:px-6 md:px-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-semibold text-white">
            TAILORED{" "}
            <span className="bg-gradient-to-r from-[#5FC5FF] to-[#9F73F1] bg-clip-text text-transparent">
              CATEGORIES
            </span>
          </h2>
          <p className="text-gray-400 mt-6 max-w-3xl mx-auto">
            Complete Visual Communication Solutions Adapted To Your Needs.
          </p>
        </div>

        {loading && categories.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            {[...Array(4)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <>
            <div
              ref={gridRef}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10"
            >
              {categories.map((cat, index) => (
                <ServiceCard
                  key={cat.id}
                  id={cat.id}
                  title={cat.name}
                  description={cat.description}
                  icon={FaLightbulb}
                  index={index}
                />
              ))}
            </div>

            {hasMore && (
              <div className="flex justify-center mt-14">
                <button
                  onClick={handleLoadMore}
                  className="px-10 py-3 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-semibold hover:scale-105 transition-transform duration-300"
                >
                  {loading ? "Loading..." : "Load More"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
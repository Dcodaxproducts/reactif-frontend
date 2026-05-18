"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import DeliveryService from "@/components/AllVendorServices/DeliveryService";
import SpecialistCard from "@/components/cards/SpecialistCard";
import Navbar from "@/components/navbar/navbar";
import { SectionHeader } from "@/components/shared/SectionHeader";
import GlobalBackground from "@/hooks/GlobalBackground";

import { API_BASE_URL } from "@/lib/constants";

const avatarColors = ["#F472B6", "#60A5FA", "#818CF8", "#2563EB"];

interface Designer {
  id: number;
  name: string;
  email: string;
  rating: number;
  address: string | null;
  profile_image: string | null;
  contact_number: string | null;
  is_available: number;
  is_online: number;
}

const AllVendorServicesMain = () => {

  const searchParams = useSearchParams();

  const [designers, setDesigners] = useState<Designer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const queryString = searchParams.toString();

const fetchDesigners = async (pageNumber = 1) => {
  try {
    setLoading(true);
    setError("");

    const res = await fetch(
      `${API_BASE_URL}/designer-list?page=${pageNumber}`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch designers");
    }

    const json = await res.json();

    const newDesigners =
      (json?.data || []).filter(
        (designer: any) =>
          designer.is_verified_user === 1 &&
          designer.status === "active"
      );

    setDesigners((prev) =>
      pageNumber === 1 ? newDesigners : [...prev, ...newDesigners]
    );

    setTotalPages(json?.pagination?.totalPages || 1);
  } catch (err: any) {
    setError(err.message || "Something went wrong");
  } finally {
    setLoading(false);
  }
};
  useEffect(() => {
    fetchDesigners(page);
  }, [page]);

  return (
    <>
      {/* ================= MAIN SECTION ================= */}

      <section className="relative overflow-hidden">

        <Navbar />

        <GlobalBackground />

        <div className="mx-auto px-4 sm:px-6 md:px-30 py-12 md:py-20">

          <SectionHeader
            badgeText="Our Commitment"
            title={
              <>
                SELECT A{" "}
                <span
                  style={{
                    background:
                      "linear-gradient(90deg, #F262B5 0%, #9F73F1 100%)",
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

          {/* Loading */}
          {loading && designers.length === 0 && (
            <div className="text-center text-neutral-400 mt-10">
              Loading specialists...
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="text-center text-red-400 mt-10">
              {error}
            </div>
          )}

          {/* No Designers */}
          {!loading && designers.length === 0 && !error && (
            <div className="text-center text-neutral-400 mt-10">
              No designers available at the moment.
            </div>
          )}

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 md:gap-10 mt-10 md:mt-16">

            {designers.map((designer, index) => {

              const avatarColor = avatarColors[index % avatarColors.length];

              return (
                <SpecialistCard
                  key={designer.id}

                  name={designer?.name || "Unnamed Specialist"}

                  role={designer?.is_available
                    ? "Available Designer"
                    : "Currently Unavailable"}

                  rating={designer?.rating ?? 0}

                  reviews={0}

                  location={
                    designer?.address || "Location not specified"
                  }

                  tags={[
                    designer?.is_online ? "Online" : "Offline",
                    "Professional Designer",
                  ]}

                  experience="Professional"

                  price="Contact for price"

                  avatarColor={avatarColor}

                  avatarImage={designer?.profile_image}

                  portfolioLink={`/designer/${designer.id}`}

                  selectLink={`/paint-protection/${searchParams.get(
                    "categoryId"
                  )}?${queryString}&designerId=${designer.id}`}
                />
              );
            })}
          </div>

          {/* Load More */}
          {page < totalPages && (
            <div className="flex justify-center mt-12">

              <button
                onClick={() => setPage((prev) => prev + 1)}
                disabled={loading}
                className="
                px-6 py-3
                rounded-lg
                bg-gradient-to-r
                from-indigo-500
                to-purple-500
                text-white
                hover:opacity-90
                transition
                disabled:opacity-50
                "
              >
                {loading ? "Loading..." : "Load More"}
              </button>

            </div>
          )}

        </div>
      </section>

      {/* ================= DELIVERY SERVICE ================= */}

      <div className="bg-[#010304] px-4 sm:px-6 md:px-30 pb-16 md:pb-30">
        <DeliveryService />
      </div>
    </>
  );
};

export default AllVendorServicesMain;
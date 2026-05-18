import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FaArrowRight } from "react-icons/fa";

type SpecialistActionsProps = {
  available: boolean;
  portfolioLink?: string;
  selectLink?: string;
};

const PortfolioLink = ({ link }: { link?: string }) => {
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();

  return (
    <Link
      href={link || `/vendor-portfolio${queryString ? `?${queryString}` : ""}`}
      className="flex items-center gap-2 text-stone-300 hover:text-white cursor-pointer transition"
    >
      View Portfolio
      <FaArrowRight size={12} />
    </Link>
  );
};

export const SpecialistActions = ({
  available,
  portfolioLink,
  selectLink,
}: SpecialistActionsProps) => (
  <div className="absolute bottom-0 left-0 w-full h-10 border-t border-stone-500/40 bg-[#0F172A] rounded-b-xl flex items-center justify-between px-4 md:px-6 text-xs">
    <div
      className={`flex items-center gap-2 ${
        available ? "text-emerald-500" : "text-red-400"
      }`}
    >
      <span
        className={`w-2 h-2 rounded-full ${
          available ? "bg-emerald-500" : "bg-red-400"
        }`}
      />

      {available ? "Available" : "Unavailable"}
    </div>

    <div className="flex items-center gap-4">
      {portfolioLink && (
        <Link
          href={portfolioLink}
          className="text-stone-300 hover:text-white transition"
        >
          Portfolio
        </Link>
      )}

      {selectLink && (
        <Link
          href={selectLink}
          className="text-indigo-400 hover:text-indigo-300 transition"
        >
          Select
        </Link>
      )}

      {!portfolioLink && <PortfolioLink />}
    </div>
  </div>
);

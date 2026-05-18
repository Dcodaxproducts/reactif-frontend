interface SectionHeaderProps {
  badgeText?: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
  size?: "default" | "sm"; // 👈 NEW
}

export function SectionHeader({
  badgeText,
  title,
  description,
  align = "center",
  size = "default",
}: SectionHeaderProps) {
  return (
    <div
      className={`
        ${align === "center" ? "text-center" : "text-left"}
        mb-10 md:mb-15
        px-2 md:px-0
      `}
    >
      {/* Badge */}
      {badgeText && (
        <div
          className="
            inline-flex items-center justify-center
            h-[40px] md:h-[44px]
            px-4 md:px-5
            py-[8px] md:py-[10px]
            rounded-[181px]
            text-white
            text-[14px] md:text-[16px]
            font-bold
            font-hk
            mb-4 md:mb-5
          "
          style={{
            background:
              "conic-gradient(from 98deg at 62.65% 113.44%, #5FC5FF 0deg, #FFAC89 135deg, #8155FF 213deg, #789DFF 286deg, #9F73F1 357deg)",
            boxShadow: "0px 0px 80px #D43077",
          }}
        >
          {badgeText}
        </div>
      )}

      {/* Title */}
      <h2
        className={`
          font-semibold text-white font-hk mb-4 md:mb-5
          ${
            size === "sm"
              ? "text-2xl md:text-4xl" // 👈 FAQ style
              : "text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
          }
        `}
      >
        {title}
      </h2>

     {/* Description */}
{description && (
  <p
    className={`
      text-gray-400 max-w-4xl mx-auto
      ${
        size === "sm"
          ? "text-xs sm:text-sm md:text-base -mt-2"   // 👈 smaller for compact sections (FAQ etc.)
          : "text-sm sm:text-base md:text-[20px]"
      }
    `}
  >
    {description}
  </p>
)}
    </div>
  );
}
import { SectionHeader } from "@/components/shared/SectionHeader";

export function WhyChooseUsHeader() {
  return (
    <SectionHeader
      badgeText="Our Commitment"
      title={
        <>
          WHY{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #F262B5 0%, #9F73F1 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            CHOOSE US
          </span>
        </>
      }
      description="Our Commitment To Excellence And Your Satisfaction Makes Us The Ideal Partner For Your Visual Communication Projects."
    />
  );
}

import type { IconType } from "react-icons";

export type WhyCardData = {
  title: string;
  description: string;
  icon: IconType;
};

export type WhyCardProps = WhyCardData & {
  index: number;
};

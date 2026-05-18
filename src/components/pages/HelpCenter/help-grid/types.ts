import type { LucideIcon } from "lucide-react";

export type HelpCardData = {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
};

export type HelpCardProps = {
  card: HelpCardData;
};

import type { IconType } from "react-icons";

export type ServiceCardProps = {
  id: number;
  title: string;
  description: string;
  icon: IconType;
  index: number;
};

export type TailoredServicesGridProps = {
  categories: Array<{
    id: number;
    name: string;
    description?: string;
  }>;
  gridRef: React.RefObject<HTMLDivElement | null>;
};

export type LoadMoreButtonProps = {
  loading: boolean;
  onClick: () => void;
};

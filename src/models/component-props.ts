import type { RefObject, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import type { IconType } from "react-icons";
import type { NavItem } from "@/config/navigation";
import type { Service } from "@/models/categories";

export interface SpecialistCardProps {
  name: string;
  role: string;
  rating: number;
  reviews: number;
  location: string;
  tags: string[];
  experience: string;
  price: string;
  avatarColor?: string;
  avatarImage?: string | null;
  portfolioLink?: string;
  selectLink?: string;
  available?: boolean;
}

export type NavbarUser = {
  userId: number;
  email: string;
  displayName: string;
  isVerified: boolean;
};

export type DesktopNavLinksProps = {
  user: NavbarUser | null;
};

export type NavbarActionsProps = {
  user: NavbarUser | null;
  dropdownOpen: boolean;
  dropdownRef: RefObject<HTMLDivElement | null>;
  onToggleDropdown: () => void;
  onLogout: () => void;
};

export type UserDropdownProps = {
  user: NavbarUser;
  isOpen: boolean;
  dropdownRef: RefObject<HTMLDivElement | null>;
  onToggle: () => void;
  onLogout: () => void;
};

export type MobileSidebarProps = {
  isOpen: boolean;
  user: NavbarUser | null;
  navItems: NavItem[];
  onClose: () => void;
  onLogout: () => void;
  onLogin: () => void;
};

export type PopularHelpLinkProps = {
  label: string;
};

export type HelpCardData = {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
};

export type HelpCardProps = {
  card: HelpCardData;
};

export type FAQItemData = {
  value: string;
  question: string;
  answer: string;
};

export type QuoteButtonProps = {
  loading: boolean;
  onRequestQuote: () => void;
};

export type HeroActionLinkProps = {
  href: string;
  children: ReactNode;
};

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
  gridRef: RefObject<HTMLDivElement | null>;
};

export type LoadMoreButtonProps = {
  loading: boolean;
  onClick: () => void;
};

export type WhyCardData = {
  title: string;
  description: string;
  icon: IconType;
};

export type WhyCardProps = WhyCardData & {
  index: number;
};

export type SpecItemData = {
  label: string;
  value: string;
  iconColorClass: string;
};

export type DetailPair = {
  left: {
    label: string;
    value: string;
  };
  right: {
    label: string;
    value: string;
  };
};

export type InstallationNoteData = {
  title: string;
  description: string;
};

export type { Service };
export type ServiceFormValues = Record<string, unknown>;
export type ServiceFormErrors = Record<string, string>;
export type FieldChangeHandler = (fieldName: string, value: unknown) => void;

export type SpecialistListStatusProps = {
  loading: boolean;
  error: string | null;
  hasDesigners: boolean;
};

export type SpecialistGridProps = {
  categoryId: string | null;
  queryString: string;
};

export type LoadMoreSpecialistsButtonProps = {
  loading: boolean;
  onLoadMore: () => void;
};

export type CarrierBadgeProps = {
  carrier: string;
};

import type { RefObject, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import type { IconType } from "react-icons";
import type { NavItem } from "@/config/navigation";
import type { Service } from "@/types/categories";

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
  onCloseDropdown: () => void;
  onSignOut: () => void;
};

export type UserDropdownProps = {
  user: NavbarUser;
  isOpen: boolean;
  dropdownRef: RefObject<HTMLDivElement | null>;
  onToggle: () => void;
  onClose: () => void;
  onSignOut: () => void;
};

export type MobileSidebarProps = {
  isOpen: boolean;
  user: NavbarUser | null;
  navItems: NavItem[];
  onClose: () => void;
  onSignOut: () => void;
  onLogin: () => void;
};

export type PopularHelpLinkProps = {
  label: string;
  labelKey?: string;
};

export type HelpCardData = {
  title: string;
  titleKey?: string;
  description: string;
  descriptionKey?: string;
  icon: LucideIcon;
  color: string;
};

export type HelpCardProps = {
  card: HelpCardData;
};

export type FAQItemData = {
  value: string;
  question: string;
  questionKey?: string;
  answer: string;
  answerKey?: string;
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
  titleKey?: string;
  description: string;
  descriptionKey?: string;
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
export type ServiceFormValue = string | string[] | File | null;
export type ServiceFormValues = Record<string, ServiceFormValue>;
export type ServiceFormErrors = Record<string, string>;
export type FieldChangeHandler = (
  fieldName: string,
  value: ServiceFormValue,
) => void;

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

export type CatalogCardProps = {
  item: import("@/types/catalog").CatalogItem;
};

export type CatalogSectionProps = {
  title: string;
  items: import("@/types/catalog").CatalogItem[];
};

export type CatalogScrollerProps = {
  items: import("@/types/catalog").CatalogItem[];
};

export type CatalogCategoryButtonProps = {
  category: string;
  label?: string;
  active: boolean;
  onSelect: (category: string) => void;
};

export type OrderInfoItemData = {
  title: string;
  value: string;
};

export type OrderItemData = {
  name: string;
  qty: string;
  price: string;
};

export type OrderPriceRowData = {
  label: string;
  value: string;
};

export type OrderPaymentMethodData = {
  label: string;
  active?: boolean;
};

export type PaymentInputFieldProps = {
  label: string;
  placeholder: string;
  labelKey?: string;
  placeholderKey?: string;
};

export type EditableInputFieldProps = {
  label: string;
  labelKey?: string;
  defaultValue: string;
  fullWidth?: boolean;
  name?: string;
  value?: string;
  placeholder?: string;
  placeholderKey?: string;
  readOnly?: boolean;
  onChange?: (name: string, value: string) => void;
};

export type OrderConfigurationProps = {
  buttonText?: string;
  backgroundColor?: string;
  textColor?: string;
  basePrice?: number;
  finalPrice?: number;
  basePriceText?: string;
  finalPriceText?: string;
  basePriceColor?: string;
  finalPriceColor?: string;
  optionGroups?: OptionGroupData[];
  priceRows?: OrderPriceRowData[];
  totalEstimated?: string;
  subtitle?: string;
  showRating?: boolean;
  onBeforeNavigate?: () => boolean;
  route?: string;
};

export type OptionGroupData = {
  title: string;
  titleKey?: string;
  options: string[];
  optionKeys?: string[];
};

export type ProtectionFeatureData = {
  title: string;
  titleKey?: string;
  description: string;
  descriptionKey?: string;
};

export type ShipmentStatusData = {
  title: string;
  value: string;
};

export type TrackingDetailData = {
  title: string;
  value: string;
};

export type TrackingTimelineIcon = "store" | "truck" | "check";

export type TrackingTimelineItemData = {
  icon: TrackingTimelineIcon;
  title: string;
  date: string;
  last?: boolean;
};

export type BookingServiceData = {
  service_name?: string;
};

export type BookingParsedData = {
  serviceData: BookingServiceData | null;
  fieldResponses: import("@/types/bookings").BookingFieldResponse[];
};

export type OrderCardMetaProps = {
  title: string;
  subtitle: string;
  amount: string | number;
  status: string;
};

export type OrderProgressProps = {
  progress: number;
};

export type OrderInfoBoxProps = {
  scheduledDate: string;
  status: string;
  trackingNumber?: string;
};

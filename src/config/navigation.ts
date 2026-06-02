export type NavItem = {
  label: string;
  href: string;
  translationKey?: string;
  isAnchor?: boolean;
  badge?: string;
  highlight?: boolean;
  requiresAuth?: boolean;
};

export const publicNavItems: NavItem[] = [
  {
    label: "Categories",
    translationKey: "nav.categories",
    href: "/#categories",
    isAnchor: true,
    highlight: true,
  },
  {
    label: "Automotive",
    translationKey: "nav.automotive",
    href: "/automotive",
    badge: "New",
  },
  {
    label: "Catalog",
    translationKey: "nav.catalog",
    href: "/catalog",
  },
  {
    label: "Contact",
    translationKey: "nav.contact",
    href: "/#contact",
    isAnchor: true,
  },
];

export const authenticatedNavItems: NavItem[] = [
  {
    label: "My Bookings",
    translationKey: "nav.myBookings",
    href: "/order/management",
    requiresAuth: true,
  },
];

export const mobileNavItems: NavItem[] = [
  {
    label: "Dashboard",
    translationKey: "nav.dashboard",
    href: "https://customer-dashboard-reactif.vercel.app",
  },
  ...publicNavItems,
];

export type NavItem = {
  label: string;
  href: string;
  isAnchor?: boolean;
  badge?: string;
  highlight?: boolean;
  requiresAuth?: boolean;
};

export const publicNavItems: NavItem[] = [
  {
    label: "Categories",
    href: "/#categories",
    isAnchor: true,
    highlight: true,
  },
  {
    label: "Automotive",
    href: "/automotive",
    badge: "New",
  },
  {
    label: "Catalog",
    href: "/catalog",
  },
  {
    label: "Contact",
    href: "/#contact",
    isAnchor: true,
  },
];

export const authenticatedNavItems: NavItem[] = [
  {
    label: "My Bookings",
    href: "/order/management",
    requiresAuth: true,
  },
];

export const mobileNavItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "https://customer-dashboard-reactif.vercel.app",
  },
  ...publicNavItems,
];

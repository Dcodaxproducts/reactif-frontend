import type { RefObject } from "react";
import type { NavItem } from "@/config/navigation";

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

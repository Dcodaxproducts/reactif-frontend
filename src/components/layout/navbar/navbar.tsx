"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import { mobileNavItems } from "@/config/navigation";
import { DesktopNavLinks } from "./nav/DesktopNavLinks";
import { MobileSidebar } from "./nav/MobileSidebar";
import { NavbarActions } from "./nav/NavbarActions";
import { NavbarLogo } from "./nav/NavbarLogo";
import { useAuth } from "@/hooks/useAuth";

export function Navbar() {
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <nav className="w-full flex justify-center py-4 md:py-6 px-4 md:px-10">
        <div className="flex w-[95%] items-center justify-between gap-4 rounded-[14px] border border-[#FFFFFF3D] px-4 py-3 md:px-6 md:py-4">
          <div className="flex min-w-0 items-center gap-3 md:gap-5">
            <Button
              className="md:hidden text-white"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={26} />
            </Button>

            <NavbarLogo />
            <DesktopNavLinks user={user} />
          </div>

          <NavbarActions
            user={user}
            dropdownOpen={dropdownOpen}
            dropdownRef={dropdownRef}
            onToggleDropdown={() => setDropdownOpen((isOpen) => !isOpen)}
            onCloseDropdown={() => setDropdownOpen(false)}
            onLogout={handleLogout}
          />
        </div>
      </nav>

      <MobileSidebar
        isOpen={isSidebarOpen}
        user={user}
        navItems={mobileNavItems}
        onClose={() => setIsSidebarOpen(false)}
        onLogout={handleLogout}
        onLogin={() => router.push("/login")}
      />
    </>
  );
}

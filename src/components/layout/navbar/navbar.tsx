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
import type { NavbarUser } from "@/types/component-props";

const Navbar = () => {
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState<NavbarUser | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("current_user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

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
    localStorage.removeItem("sessionToken");
    localStorage.removeItem("current_user");
    setUser(null);
    router.push("/login");
  };

  return (
    <>
      <nav className="w-full flex justify-center py-4 md:py-6 px-4 md:px-10">
        <div className="w-[95%] border border-[#FFFFFF3D] rounded-[14px] px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 md:gap-5">
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
};

export default Navbar;

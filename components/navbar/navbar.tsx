"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, ShoppingCart, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  FiUser,
  FiSettings,
  FiLogOut,
  FiPackage,
} from "react-icons/fi";

interface User {
  userId: number;
  email: string;
  displayName: string;
  isVerified: boolean;
}

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("current_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("sessionToken");
    localStorage.removeItem("current_user");
    setUser(null);
    router.push("/login");
  };

  const handleContactClick = () => {
    router.push("/#contact");
  };

  const getInitials = (name?: string) => {
    if (!name) return ""; // handle undefined or empty string

    const parts = name.trim().split(" ").filter(Boolean); // remove empty parts
    if (parts.length === 0) return "";

    if (parts.length === 1) return parts[0][0].toUpperCase(); // single word
    return (parts[0][0] + parts[1][0]).toUpperCase(); // first letters of first two words
  };
  const closeSidebar = () => setIsSidebarOpen(false);

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
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* OUTER BAR */}
      <nav className="w-full flex justify-center py-4 md:py-6 px-4 md:px-10">
        <div className="w-[95%] border border-[#FFFFFF3D] rounded-[14px] px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">

          {/* LEFT SECTION */}
          <div className="flex items-center gap-3 md:gap-5">

            {/* MOBILE MENU BUTTON */}
            <button
              className="md:hidden text-white"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={26} />
            </button>

            {/* LOGO */}
            <div className="flex items-center gap-2">
              <Link href="/">
                <Image
                  src="/assets/logo.png"
                  alt="Reactif"
                  width={120}
                  height={30}
                  className="w-[100px] md:w-[120px]"
                />
              </Link>
            </div>

            {/* DESKTOP NAV LINKS */}
            <div className="hidden md:flex items-center gap-8 text-sm text-white">

              {/* Services with ellipse */}
              <div className="relative inline-block w-max">
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-32 h-16 pointer-events-none">
                  <Image
                    src="/assets/elipse.png"
                    alt="elipse background"
                    fill
                    className="object-contain"
                  />
                </div>
                <Link
                  href="/#categories"
                  className="relative px-4 py-1.5 rounded-full bg-transparent text-gray-300 z-10"
                >
                  Categories
                </Link>
              </div>

              {/* Automotive + New badge */}
              <div className="flex items-center gap-2">
                <span
                  onClick={() => router.push("/automotive")}
                  className="hover:text-blue-400 transition cursor-pointer text-gray-300"
                >
                  Automotive
                </span>
                <span className="text-[12px] bg-[#E2E2E2] px-3 py-[3px] rounded-full text-black font-[400]">
                  New
                </span>
              </div>

              <Link
                href="/catalog"
                className="hover:text-blue-400 transition text-gray-300"
              >
                Catalog
              </Link>

              <span
                onClick={handleContactClick}
                className="hover:text-blue-400 transition text-gray-300 cursor-pointer"
              >
                Contact
              </span>

              {
                user && (
                  <span
                    onClick={() => router.push("/order/management")}
                    className="hover:text-blue-400 transition text-gray-300 cursor-pointer"
                  >
                    My Bookings
                  </span>
                )
              }
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3 md:gap-4 relative">

            {/* Cart only if logged in */}
            {user && (
              <button
                onClick={() => router.push("/order/management")}
                className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-white flex items-center justify-center text-white hover:bg-white/10 transition"
              >
                <ShoppingCart size={19} />
              </button>
            )}

            {/* Logged In */}
            {user ? (
              <div ref={dropdownRef} className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="w-10 h-10 rounded-full bg-neutral-800 text-[#E2E2E2] flex items-center justify-center font-semibold"
                >
                  {getInitials(user.displayName)}
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-lg py-2 text-sm text-gray-700 z-50">
                    <div className="px-4 py-2 border-b text-xs text-gray-500">
                      {user.email}
                    </div>

                    <button
                      onClick={() => router.push("/profile")}
                      className="flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-100"
                    >
                      <FiUser size={16} />
                      Profile
                    </button>

                    {/* <button
                      onClick={() => router.push("/order/management")}
                      className="flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-100"
                    >
                      <FiPackage size={16} />
                      My Orders
                    </button> */}

                    <button
                      onClick={() => router.push("/settings")}
                      className="flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-100"
                    >
                      <FiSettings size={16} />
                      Settings
                    </button>

                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full px-4 py-2 hover:bg-red-50 text-red-600"
                    >
                      <FiLogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden md:block bg-neutral-800 text-[#E2E2E2] px-5 py-2 rounded-full transition text-[15px]"
              >
                Get Started
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* MOBILE SIDEBAR */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={closeSidebar}
          />
          <div className="absolute left-0 top-0 w-[280px] h-full bg-white shadow-xl">

            <div className="flex justify-end p-4">
              <button onClick={closeSidebar}>
                <X size={26} />
              </button>
            </div>

            <div className="flex flex-col gap-5 px-6 text-[15px]">
              <Link href="https://customer-dashboard-reactif.vercel.app" onClick={closeSidebar}>
                Dashboard
              </Link>
              <Link href="/automotive" onClick={closeSidebar}>
                Automotive
              </Link>
              <Link href="/#categories" onClick={closeSidebar}>
                Categories
              </Link>
              <Link href="/catalog" onClick={closeSidebar}>
                Catalog
              </Link>
              <Link href="/#contact" onClick={closeSidebar}>
                Contact
              </Link>

              {!user ? (
                <button
                  onClick={() => router.push("/login")}
                  className="mt-4 bg-black text-white py-2 rounded-full"
                >
                  Get Started
                </button>
              ) : (
                <button
                  onClick={handleLogout}
                  className="mt-4 bg-red-600 text-white py-2 rounded-full"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
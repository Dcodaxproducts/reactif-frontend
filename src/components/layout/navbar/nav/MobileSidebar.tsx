import { Button } from "@/components/ui/button";
import Link from "next/link";
import { X } from "lucide-react";
import type { MobileSidebarProps } from "@/types/component-props";

export function MobileSidebar({
  isOpen,
  user,
  navItems,
  onClose,
  onLogout,
  onLogin,
}: MobileSidebarProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="absolute left-0 top-0 w-[280px] h-full bg-white shadow-xl">
        <div className="flex justify-end p-4">
          <Button onClick={onClose}>
            <X size={26} />
          </Button>
        </div>

        <div className="flex flex-col gap-5 px-6 text-[15px]">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} onClick={onClose}>
              {item.label}
            </Link>
          ))}

          {!user ? (
            <Button
              onClick={onLogin}
              className="mt-4 bg-black text-white py-2 rounded-full"
            >
              Get Started
            </Button>
          ) : (
            <Button
              onClick={onLogout}
              className="mt-4 bg-red-600 text-white py-2 rounded-full"
            >
              Logout
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

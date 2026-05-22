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
          <Button
            type="button"
            aria-label="Close mobile menu"
            variant="ghost"
            className="h-auto w-auto p-0 text-black hover:bg-transparent"
            onClick={onClose}
          >
            <X size={26} />
          </Button>
        </div>

        <div className="flex flex-col gap-5 px-6 text-[15px]">
          {navItems.map(({ label, href }) => (
            <Link key={label} href={href} onClick={onClose}>
              {label}
            </Link>
          ))}

          {!user ? (
            <Button
              type="button"
              onClick={onLogin}
              variant="navDark"
              className="mt-4 py-2"
            >
              Get Started
            </Button>
          ) : (
            <Button
              type="button"
              onClick={onLogout}
              variant="destructive"
              className="mt-4 rounded-full py-2"
            >
              Logout
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
